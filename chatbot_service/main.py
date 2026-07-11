import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not set in .env")

genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="KrishiConnect Chatbot Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = """You are KrishiConnect AI, a helpful agricultural assistant for farmers in India.
You answer questions about farming, crops, soil, pests, fertilizers, weather, and government schemes.
Always give practical, actionable advice suitable for small and medium farmers.
If asked about something outside agriculture, politely redirect to farming topics.

LANGUAGE RULE - THIS IS CRITICAL:
You MUST detect the language of the user's question and respond in that EXACT same language.
- If the user writes in English, respond ONLY in English.
- If the user writes in Hindi, respond ONLY in Hindi.
- If the user writes in Tamil, respond ONLY in Tamil.
- Never switch to a different language than what the user used.
- Never mix languages in your response.
- The user's question language determines your response language, always.

Keep responses concise, clear, and easy to understand for farmers."""

class AskRequest(BaseModel):
    question: str
    language: str = "auto"

model = genai.GenerativeModel(
    "gemini-3.1-flash-lite",
    system_instruction=SYSTEM_PROMPT,
)

@app.post("/ask")
async def ask(req: AskRequest):
    if req.language and req.language != "auto":
        language_instruction = f"\n\n[LANGUAGE INSTRUCTION] Respond ONLY in the language code '{req.language}'. Do NOT use any other language. The user's question is in {req.language}."
        full_prompt = req.question + language_instruction
    else:
        language_instruction = "\n\n[LANGUAGE INSTRUCTION] Detect the language of my question above and respond ONLY in that exact same language. Do NOT switch to any other language."
        full_prompt = language_instruction + "\n\n" + req.question

    try:
        response = model.generate_content(full_prompt, stream=True)
    except Exception as e:
        error_msg = str(e)
        if "RESOURCE_EXHAUSTED" in error_msg or "quota" in error_msg.lower():
            def error_gen():
                yield {"event": "error", "data": "API quota exceeded. Please wait a moment and try again, or check your Gemini API billing plan."}
                yield {"event": "done", "data": ""}
            return EventSourceResponse(error_gen())
        def error_gen():
            yield {"event": "error", "data": "Sorry, I couldn't process your request. Please try again."}
            yield {"event": "done", "data": ""}
        return EventSourceResponse(error_gen())

    def event_generator():
        for chunk in response:
            if chunk.text:
                yield {"event": "token", "data": chunk.text}
        yield {"event": "done", "data": ""}

    return EventSourceResponse(event_generator())

import numpy as np
import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Crop Recommendation API")

model = joblib.load("crop_recommendation_xgb.pkl")
label_encoder = joblib.load("label_encoder.pkl")

class CropInput(BaseModel):
    N: float
    P: float
    K: float
    pH: float
    temperature: float

class CropOutput(BaseModel):
    predicted_crop: str
    confidence: float
    top5: list

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict", response_model=CropOutput)
def predict(data: CropInput):
    sample = np.array([[data.N, data.P, data.K, data.pH, data.temperature]])
    prediction = model.predict(sample)[0]
    crop = label_encoder.inverse_transform([prediction])[0]
    probabilities = model.predict_proba(sample)[0]
    confidence = float(probabilities[prediction] * 100)
    top5_idx = np.argsort(probabilities)[::-1][:5]
    top5 = [
        {
            "crop": label_encoder.inverse_transform([idx])[0],
            "confidence": f"{probabilities[idx]*100:.2f}%",
        }
        for idx in top5_idx
    ]
    return CropOutput(
        predicted_crop=crop, confidence=f"{confidence:.2f}%", top5=top5
    )

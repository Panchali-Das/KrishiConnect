# KrishiConnect 🌾

AI-powered platform for Indian farmers — crop disease detection, soil analysis & crop recommendation, and a multilingual farming chatbot.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite 7, Tailwind CSS 3, React Router 7, Framer Motion |
| **Backend** | Node.js + Express 5, MongoDB + Mongoose 9, JWT |
| **Crop Prediction** | Python + FastAPI, XGBoost, scikit-learn |
| **Chatbot** | Python + FastAPI, Google Gemini API, SSE streaming |
| **Infrastructure** | Docker, Vercel (frontend + backend), Render (crop API) |

## Project Structure

```
KrishiConnect/
├── backend/                    # Node.js Express API (auth, users, chatbot proxy)
│   ├── config/db.js            # MongoDB connection
│   ├── controllers/            # auth, user, chatbot logic
│   ├── middleware/              # JWT verification
│   ├── models/User.js          # Mongoose user schema
│   ├── routes/                 # API route definitions
│   ├── server.js               # Entry point
│   ├── .env                    # MONGO_URI, JWT_SECRET, PORT, CHATBOT_SERVICE_URL
│   └── package.json
│
├── frontend/                   # React SPA (Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # Navbar, Hero, Services, Footer, etc.
│   │   ├── context/            # AuthContext & useAuth hook
│   │   ├── data/               # Disease database (fallback), feature cards
│   │   ├── pages/              # Dashboard, Login, SignUp, Profile, SoilAnalysis,
│   │   │                       # DiseasePrediction, Chatbot, NotFound
│   │   ├── services/           # Axios instances (auth, user)
│   │   ├── utils/api.js        # API helper with JWT management
│   │   ├── App.jsx             # Router setup
│   │   └── main.jsx            # Entry point
│   ├── public/
│   ├── .env                    # VITE_GEMINI_API_KEY, VITE_API_URL
│   └── package.json
│
├── crop_prediction/            # Python FastAPI ML microservice
│   ├── app.py                  # FastAPI app with /predict endpoint
│   ├── crop_recommendation_xgb.pkl   # Trained XGBoost model
│   ├── label_encoder.pkl       # sklearn label encoder
│   ├── requirements.txt
│   ├── Dockerfile
│   └── render.yaml
│
├── chatbot_service/            # Python FastAPI chatbot microservice
│   ├── main.py                 # SSE-streamed Gemini responses
│   ├── .env                    # GEMINI_API_KEY
│   ├── requirements.txt
│   └── chatbot/                # Python virtual environment
│
├── docker-compose.yml          # Orchestrates crop-prediction service
├── vercel.json                 # Deployment config
└── README.md
```

## Setup & Running

### Prerequisites
- Node.js 18+
- Python 3.12+
- MongoDB (local or Atlas)

### 1. Backend
```bash
cd backend
npm install
# Edit .env with your MONGO_URI, JWT_SECRET, etc.
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
# Edit .env with your API URLs
npm run dev
```

### 3. Crop Prediction Service (Docker)
```bash
docker compose up -d
# Runs on http://localhost:8000
```

### 4. Chatbot Service
```bash
cd chatbot_service
pip install -r requirements.txt
# Edit .env with your GEMINI_API_KEY
uvicorn main:app --port 8001 --reload
```

## API Overview

### Backend (`/api`)
| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/auth/signup` | POST | No | Register user |
| `/api/auth/login` | POST | No | Login, returns JWT |
| `/api/auth/verify` | GET | Yes | Verify token |
| `/api/chatbot/ask` | POST | Yes | Ask chatbot (SSE stream) |
| `/api/features/disease-prediction` | POST | Yes | Disease prediction |
| `/api/features/soil-analysis` | POST | Yes | Soil analysis |
| `/api/user/profile` | GET/PUT | Yes | User profile |

### Crop Prediction (`/predict`)
| Parameter | Type | Description |
|-----------|------|-------------|
| N | float | Nitrogen in soil |
| P | float | Phosphorus in soil |
| K | float | Potassium in soil |
| pH | float | Soil pH level |
| temperature | float | Temperature in °C |

Returns `predicted_crop`, `confidence`, `top5` predictions.

### Chatbot Service (`/ask`)
Streams Gemini responses via SSE events: `token`, `done`, `error`.

## Features

- **Crop Disease Detection** — Upload leaf images for CNN-based disease identification with AI treatment advice (Gemini + local fallback)
- **Soil Analysis & Crop Recommendation** — Enter NPK, pH, temperature, humidity, rainfall for crop suggestions
- **AI Farming Chatbot** — Multilingual (10+ Indian languages), voice input, SSE streaming responses
- **User Authentication** — JWT-based signup/login with profile management

# KrishiConnect

AI-powered platform for Indian farmers — crop disease detection, soil analysis and crop recommendation, crop yield prediction, and a multilingual farming chatbot.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 3, React Router 7, Framer Motion |
| **Backend** | Node.js, Express 5, MongoDB, Mongoose 9, JWT |
| **Crop Prediction** | Python, FastAPI, XGBoost, scikit-learn |
| **Disease Prediction** | Python, FastAPI, TensorFlow/Keras, Pillow |
| **Yield Prediction** | Python, FastAPI, scikit-learn (KNN), pandas |
| **Chatbot** | Python, FastAPI, Google Gemini API, SSE streaming |
| **Infrastructure** | Docker, Vercel (frontend + backend), Render (ML services) |

## Project Structure

```
KrishiConnect/
├── backend/                         # Node.js Express API
│   ├── config/
│   │   └── db.js                    # MongoDB/Mongoose connection
│   ├── controllers/
│   │   ├── authController.js        # Signup, login (bcrypt + JWT)
│   │   ├── chatbotController.js     # SSE proxy to chatbot_service
│   │   └── userController.js        # Get/update user profile
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT Bearer token verification
│   ├── models/
│   │   └── User.js                  # Mongoose User schema
│   ├── routes/
│   │   ├── authRoutes.js            # POST /signup, /login
│   │   ├── chatbotRoutes.js         # POST /ask (SSE relay)
│   │   ├── featureRoutes.js         # Proxies to ML microservices
│   │   ├── protectedRoutes.js       # GET /dashboard
│   │   └── userRoutes.js            # GET/PUT /profile
│   ├── server.js                    # Express app entry point
│   ├── Dockerfile
│   ├── .env                         # Environment variables (see below)
│   └── package.json
│
├── frontend/                        # React SPA (Vite + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx / HeroCard.jsx / HeroContent.jsx
│   │   │   ├── Services.jsx / ServicesBanner.jsx
│   │   │   ├── ChatWidget.jsx / ChatMessage.jsx
│   │   │   ├── About.jsx / Contact.jsx / Testimonials.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Reveal.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # AuthProvider + AuthContext
│   │   │   └── useAuth.js
│   │   ├── data/
│   │   │   ├── diseaseDatabase.js    # Fallback disease database
│   │   │   └── services.js           # Service cards data
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx / SignUp.jsx / Profile.jsx
│   │   │   ├── DiseasePrediction.jsx
│   │   │   ├── SoilAnalysis.jsx
│   │   │   ├── YieldPrediction.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── authService.js        # Axios instance for /api/auth
│   │   │   └── userService.js        # Axios instance for /api/user
│   │   ├── utils/
│   │   │   └── api.js               # Fetch wrappers + token helpers
│   │   ├── Images/                   # Static images
│   │   ├── App.jsx                   # React Router setup
│   │   └── main.jsx                  # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── .env                          # Environment variables (see below)
│   └── package.json
│
├── crop_prediction/                 # Crop recommendation microservice
│   ├── app.py                       # FastAPI app (/health, /predict)
│   ├── crop_recommendation_xgb.pkl  # Trained XGBoost model
│   ├── label_encoder.pkl            # sklearn label encoder
│   ├── Dockerfile
│   ├── render.yaml                  # Render.com deploy config
│   ├── requirements.txt
│   └── test.py                      # CLI test script
│
├── disease_prediction/              # Plant disease classification microservice
│   ├── app.py                       # FastAPI app (/ and /predict)
│   ├── crop_disease_model_combined_data_augmentation.h5  # TensorFlow model
│   ├── dockerfile
│   ├── requirements.txt
│   ├── runtime.txt                  # python-3.11.9
│   └── .gitattributes               # Git LFS for .h5 file
│
├── Yield_prediction/                # Crop yield prediction microservice
│   ├── app.py                       # FastAPI app (/predict)
│   ├── knn_model.pkl                # Trained KNN model
│   ├── scaler.pkl                   # Feature scaler
│   ├── feature_columns.pkl          # Column names for one-hot encoding
│   ├── Dockerfile
│   └── requirements.txt
│
├── chatbot_service/                 # AI chatbot microservice
│   ├── main.py                      # FastAPI app (/ask, SSE streaming)
│   ├── .env                         # GEMINI_API_KEY
│   └── requirements.txt
│
├── docker-compose.yml               # Orchestrates crop-prediction service
├── vercel.json                      # Vercel deploy config (frontend + backend)
└── README.md
```

## Prerequisites

- **Node.js** 18 or later
- **Python** 3.11 or later (3.12 recommended)
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- **Docker & Docker Compose** — optional, for containerized crop prediction service
- **Google Gemini API key** — get one at [Google AI Studio](https://aistudio.google.com/apikey)

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string (e.g. `mongodb+srv://...`) |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `PORT` | No | Server port (default: `5000`) |
| `CHATBOT_SERVICE_URL` | Yes | URL of the chatbot service (default: `http://localhost:8001`) |
| `DISEASE_PREDICTION_API_URL` | Yes | URL of the disease prediction service (default: `http://localhost:8080`) |
| `CROP_RECOMMENDATION_API_URL` | Yes | URL of the crop prediction service (default: `http://localhost:8000`) |
| `YIELD_PREDICTION_API_URL` | Yes | URL of the yield prediction service |
| `FRONTEND_URL` | No | Allowed CORS origin for frontend |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Backend API base URL (e.g. `http://localhost:5000`) |
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key (used client-side) |

### Chatbot Service (`chatbot_service/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |

---

## Setup & Running

Below are the setup instructions for each service. Start them in order — backend first (requires MongoDB), then the ML microservices, then the frontend.

### 1. Backend (Node.js Express API)

The backend is the central API gateway. It handles authentication, user profiles, and proxies requests to the ML microservices.

```bash
# Navigate to backend directory
cd backend

# Install Node.js dependencies
npm install

# Create and configure the .env file
# Copy the required variables from the Environment Variables table above
# At minimum, set MONGO_URI and JWT_SECRET
```

**`backend/.env` example:**

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_random_secret_string_here
PORT=5000
CHATBOT_SERVICE_URL=http://localhost:8001
DISEASE_PREDICTION_API_URL=http://localhost:8080
CROP_RECOMMENDATION_API_URL=http://localhost:8000
YIELD_PREDICTION_API_URL=https://yield-prediction-ghws.onrender.com
```

```bash
# Start the development server (uses nodemon for auto-reload)
npm run dev
```

The backend starts on `http://localhost:5000`. Verify by visiting `http://localhost:5000/api/protected/dashboard` (should return a 401 without a token).

---

### 2. Crop Prediction Service (Python FastAPI)

Recommends crops based on soil parameters (N, P, K, pH, temperature) using a trained XGBoost model.

**Option A — Run with Docker (recommended):**

```bash
# From the project root
docker compose up -d

# Check container is running
docker compose ps

# View logs
docker compose logs -f crop-prediction
```

The service starts on `http://localhost:8000`.

**Option B — Run locally without Docker:**

```bash
cd crop_prediction

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

Verify: `curl http://localhost:8000/health` should return `{"status": "healthy"}`.

---

### 3. Disease Prediction Service (Python FastAPI)

Classifies plant diseases from leaf images using a TensorFlow CNN model (38 disease classes across 14 crop types).

```bash
cd disease_prediction

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Note: On Linux, you may need system packages for OpenCV:
# sudo apt-get install libglib2.0-0 libsm6 libxrender1 libxext6

# Start the server
uvicorn app:app --host 0.0.0.0 --port 8080 --reload
```

The service starts on `http://localhost:8080`. Verify by visiting `http://localhost:8080/` for the HTML upload form, or send a POST request to `http://localhost:8080/predict` with a multipart form containing an image file.

---

### 4. Yield Prediction Service (Python FastAPI)

Predicts crop production and yield (tonnes/hectare) using a KNN model with one-hot encoded features (crop, season, state, area, fertilizer, pesticide).

```bash
cd Yield_prediction

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

> **Port conflict:** If crop_prediction is also running locally on port 8000, start yield_prediction on a different port (e.g. `--port 8002`) and update `YIELD_PREDICTION_API_URL` in `backend/.env` accordingly.

Verify: send a POST request to `http://localhost:8000/predict` with the required JSON body.

---

### 5. Chatbot Service (Python FastAPI)

Multilingual AI farming chatbot powered by Google Gemini. Streams responses via Server-Sent Events (SSE). Supports 10+ Indian languages.

```bash
cd chatbot_service

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create the .env file with your Gemini API key
```

**`chatbot_service/.env` example:**

```
GEMINI_API_KEY=your_gemini_api_key_here
```

```bash
# Start the server
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

The service starts on `http://localhost:8001`. Verify: `curl http://localhost:8001/docs` should show the Swagger UI.

---

### 6. Frontend (React + Vite)

The React SPA provides the user interface for all features — authentication, dashboard, disease prediction, soil analysis, yield prediction, and the AI chatbot.

```bash
cd frontend

# Install dependencies
npm install

# Create and configure the .env file
```

**`frontend/.env` example:**

```
VITE_API_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

```bash
# Start the Vite development server
npm run dev
```

The frontend starts on `http://localhost:5173`. Open this URL in your browser.

> **Vite proxy:** The dev server automatically proxies `/predict` requests to the Render-hosted crop prediction service.

---

## Quick Start Summary

Open **5 terminal tabs** and run each service:

| # | Service | Command | Port |
|---|---------|---------|------|
| 1 | MongoDB | (must be running) | `27017` |
| 2 | Backend | `cd backend && npm run dev` | `5000` |
| 3 | Crop Prediction | `docker compose up -d` or see Section 2 | `8000` |
| 4 | Disease Prediction | `cd disease_prediction && uvicorn app:app --port 8080 --reload` | `8080` |
| 5 | Chatbot | `cd chatbot_service && uvicorn main:app --port 8001 --reload` | `8001` |
| 6 | Frontend | `cd frontend && npm run dev` | `5173` |

Then open `http://localhost:5173` in your browser.

---

## API Reference

### Backend — `/api`

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/auth/signup` | POST | No | Register a new user |
| `/api/auth/login` | POST | No | Login, returns a JWT token |
| `/api/protected/dashboard` | GET | Yes | Protected dashboard endpoint |
| `/api/user/profile` | GET | Yes | Get user profile |
| `/api/user/profile` | PUT | Yes | Update user profile |
| `/api/features/disease-prediction` | POST | Yes | Proxy to disease prediction service (multipart image upload) |
| `/api/features/soil-analysis` | POST | Yes | Proxy to crop recommendation service |
| `/api/features/yield-prediction` | POST | Yes | Proxy to yield prediction service |
| `/api/chatbot/ask` | POST | Yes | Proxy to chatbot service (SSE stream) |

### Crop Prediction — `POST /predict`

| Parameter | Type | Description |
|-----------|------|-------------|
| `N` | float | Nitrogen in soil |
| `P` | float | Phosphorus in soil |
| `K` | float | Potassium in soil |
| `pH` | float | Soil pH level |
| `temperature` | float | Temperature in °C |

**Response:** `predicted_crop`, `confidence`, `top5` predictions.

### Disease Prediction — `POST /predict`

| Parameter | Type | Description |
|-----------|------|-------------|
| `file` | image | Leaf image (multipart form upload) |

**Response:** `prediction` (class name, e.g. `"Tomato___Late_blight"`), `confidence`.

### Yield Prediction — `POST /predict`

| Parameter | Type | Description |
|-----------|------|-------------|
| `crop` | string | Crop name |
| `season` | string | Growing season |
| `state` | string | Indian state |
| `area` | float | Area in hectares |
| `fertilizer` | float | Fertilizer usage |
| `pesticide` | float | Pesticide usage |

**Response:** `predicted_production` (total tonnes), `predicted_yield` (tonnes/hectare).

### Chatbot — `POST /ask`

Streams Gemini responses via SSE. Events: `token`, `done`, `error`.

---

## Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel (static) | `*.vercel.app` |
| Backend | Vercel (serverless) | `*.vercel.app/api/*` |
| Crop Prediction | Render | `crop-recommendation-service-qjuq.onrender.com` |
| Yield Prediction | Render | `yield-prediction-ghws.onrender.com` |
| Disease Prediction | Local / Docker | `localhost:8080` |
| Chatbot | Local | `localhost:8001` |

### Vercel (`vercel.json`)

Routes `/api/*` to the backend serverless function. Everything else serves the frontend static build. ML services are not deployed via Vercel.

### Docker Compose (`docker-compose.yml`)

Orchestrates only the crop prediction service. Run with `docker compose up -d` from the project root.

---

## Features

- **Crop Disease Detection** — Upload leaf images for CNN-based disease identification across 38 disease classes (14 crop types), with AI treatment advice via Gemini and a local fallback database.
- **Soil Analysis & Crop Recommendation** — Enter NPK, pH, and temperature data to receive XGBoost-powered crop suggestions with confidence scores.
- **Crop Yield Prediction** — Predict production volume and yield per hectare based on crop type, season, region, and input factors using KNN.
- **AI Farming Chatbot** — Multilingual (10+ Indian languages) chatbot with voice input support and SSE streaming responses.
- **User Authentication** — JWT-based signup/login with bcrypt password hashing and profile management.

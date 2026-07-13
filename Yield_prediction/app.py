import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel

# -----------------------------
# Load Saved Objects
# -----------------------------
model = joblib.load("knn_model.pkl")
scaler = joblib.load("scaler.pkl")
feature_columns = joblib.load("feature_columns.pkl")

app = FastAPI(title="Crop Yield Prediction API")


# -----------------------------
# Input Schema
# -----------------------------
class CropInput(BaseModel):
    crop: str
    season: str
    state: str
    area: float
    fertilizer: float
    pesticide: float


# -----------------------------
# Prediction Endpoint
# -----------------------------
@app.post("/predict")
def predict(data: CropInput):

    # Convert input to DataFrame
    input_df = pd.DataFrame(
        {
            "Crop": [data.crop],
            "Season": [data.season],
            "State": [data.state],
            "Area": [data.area],
            "Fertilizer": [data.fertilizer],
            "Pesticide": [data.pesticide],
        }
    )

    # One-hot encoding
    input_df = pd.get_dummies(input_df)

    # Match training columns
    input_df = input_df.reindex(columns=feature_columns, fill_value=0)

    # Scale
    input_scaled = scaler.transform(input_df)

    # Predict production
    predicted_production = float(model.predict(input_scaled)[0])

    # Calculate yield
    predicted_yield = predicted_production / data.area

    # Return JSON
    return {
        "crop": data.crop,
        "season": data.season,
        "state": data.state,
        "area": data.area,
        "predicted_production": round(predicted_production, 2),
        "predicted_yield": round(predicted_yield, 4),
    }

import numpy as np
import joblib

# ==========================================================
# LOAD MODEL
# ==========================================================

model = joblib.load("crop_recommendation_xgb.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# ==========================================================
# INPUT VALUES
# ==========================================================

N = 90
P = 42
K = 43
pH = 6.5
temperature = 25.3

# ==========================================================
# CREATE INPUT
# ==========================================================

sample = np.array([[N, P, K, pH, temperature]])

# ==========================================================
# PREDICT
# ==========================================================

prediction = model.predict(sample)[0]
crop = label_encoder.inverse_transform([prediction])[0]

# ==========================================================
# PREDICT PROBABILITIES
# ==========================================================

probabilities = model.predict_proba(sample)[0]

top5 = np.argsort(probabilities)[::-1][:5]

print("="*60)
print("Crop Recommendation")
print("="*60)

print(f"N           : {N}")
print(f"P           : {P}")
print(f"K           : {K}")
print(f"pH          : {pH}")
print(f"Temperature : {temperature}")

print("\nPredicted Crop")
print("----------------------------")
print(crop)

print("\nConfidence")
print("----------------------------")
print(f"{probabilities[prediction]*100:.2f}%")

print("\nTop-5 Recommendations")
print("----------------------------")

for idx in top5:
    print(
        f"{label_encoder.inverse_transform([idx])[0]:20s}"
        f"{probabilities[idx]*100:.2f}%"
    )
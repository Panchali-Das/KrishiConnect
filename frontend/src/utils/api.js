// src/utils/api.js

// Call your ML model API with the uploaded image
export async function analyzePlantImage(file) {
  const formData = new FormData();
  // IMPORTANT: the key ("file") must match what your backend expects
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/predict", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  const data = await response.json();

  // Adapt these to match your backend's response keys
  return {
    label: data.label, // e.g. "Tomato___Late_blight"
    confidence: data.confidence ?? data.probability ?? 0.0,
  };
}

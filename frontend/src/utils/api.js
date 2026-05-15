// src/utils/api.js

// Call your ML model API with the uploaded image
/*export async function analyzePlantImage(file) {
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
}*/

// src/utils/api.js

const TOKEN_KEY = "dp_auth_token";

// ── Token helpers ─────────────────────────────────────────────────────────────

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// ── Base fetch wrapper (auto-attaches JWT) ────────────────────────────────────

async function apiFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

// ── Auth endpoints ────────────────────────────────────────────────────────────

export async function apiSignUp({ name, email, password }) {
  return apiFetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function apiLogIn({ email, password }) {
  return apiFetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function apiVerifyToken() {
  return apiFetch("http://localhost:5000/api/auth/verify");
}

// ── Gemini treatment endpoint ─────────────────────────────────────────────────

export async function apiGetTreatment(disease) {
  return apiFetch("http://localhost:5000/api/gemini-treatment", {
    method: "POST",
    body: JSON.stringify({ disease }),
  });
}

// ── ML model (your existing function, now sends JWT if present) ───────────────

export async function analyzePlantImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const token = getToken();

  const response = await fetch("http://localhost:8000/predict", {
    method: "POST",
    body: formData,
    // Content-Type intentionally omitted — browser sets it with boundary for FormData
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  const data = await response.json();

  return {
    label: data.label,
    confidence: data.confidence ?? data.probability ?? 0.0,
  };
}

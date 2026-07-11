const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const featureRoutes = require("./routes/featureRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.FRONTEND_URL, // Set this in Vercel env vars to your deployed URL
      ].filter(Boolean);

      // Allow any vercel.app subdomain automatically
      const isVercel = origin.endsWith(".vercel.app");

      if (allowedOrigins.includes(origin) || isVercel) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/protected", protectedRoutes);

app.use("/api/features", featureRoutes);

app.use("/api/user", userRoutes);

// ... keep all your routing code the same up here ...

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "KrishiConnect API Running Successfully",
  });
});

// IMPORTANT: Wrap your listener so it ONLY runs during local development,
// preventing it from blocking Vercel's serverless engine.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;

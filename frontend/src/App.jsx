import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DiseasePrediction from "./pages/DiseasePrediction";
import SoilAnalysis from "./pages/SoilAnalysis";
import YieldPrediction from "./pages/YieldPrediction";
import ServicesPage from "./pages/ServicesPage";
import Profile from "./pages/Profile";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* PUBLIC HOMEPAGE */}
          <Route path="/" element={<Dashboard />} />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              localStorage.getItem("authToken") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login />
              )
            }
          />

          {/* SIGNUP */}
          <Route
            path="/signup"
            element={
              localStorage.getItem("authToken") ? (
                <Navigate to="/dashboard" />
              ) : (
                <SignUp />
              )
            }
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/soil-analysis"
            element={
              <ProtectedRoute>
                <SoilAnalysis />
              </ProtectedRoute>
            }
          />

          <Route
            path="/disease-prediction"
            element={
              <ProtectedRoute>
                <DiseasePrediction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/yield-prediction"
            element={
              <ProtectedRoute>
                <YieldPrediction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />

          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <ServicesPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

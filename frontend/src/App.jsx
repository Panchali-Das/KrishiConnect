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
import NotFound from "./pages/NotFound";

function App() {
  const isAuthenticated = true; // Replace with actual auth check

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> {/* 👈 changed here */}
          {/* Protected Dashboard Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/disease-prediction"
            element={
              isAuthenticated ? <DiseasePrediction /> : <Navigate to="/login" />
            }
          />
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

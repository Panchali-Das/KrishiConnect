// src/components/ProtectedRoute.jsx
import { useAuth } from "../context/useAuth";

/**
 * If logged in     → render children normally
 * If not logged in → render fallback (default: null)
 * While loading    → show spinner
 */
export default function ProtectedRoute({ children, fallback = null }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm tracking-widest uppercase">
            Verifying session…
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback;
  }

  return children;
}

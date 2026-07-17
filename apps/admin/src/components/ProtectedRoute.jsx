import { Navigate, Outlet } from "react-router-dom";
import { Aperture } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-paper dark:bg-night">
        <Aperture
          size={32}
          strokeWidth={1.25}
          className="animate-spin text-safelight"
          style={{ animationDuration: "2s" }}
        />
        <p className="font-mono text-xs text-ash">Loading...</p>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

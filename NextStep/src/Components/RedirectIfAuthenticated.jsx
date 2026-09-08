import { Navigate } from "react-router-dom";

export default function RedirectIfAuthenticated({ children }) {
  const raw = localStorage.getItem("nexepUser");

  if (raw) {
    try {
      const user = JSON.parse(raw);
      if (user.role === "FRESHER") return <Navigate to="/fresherDashboard" replace />;
      if (user.role === "RECRUITER") return <Navigate to="/recruiterDashboard" replace />;
    } catch {
      // corrupted value, fall through to show login
    }
  }

  return children;
}
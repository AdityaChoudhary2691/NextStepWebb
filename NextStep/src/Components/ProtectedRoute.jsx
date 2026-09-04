import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const raw = localStorage.getItem("nexepUser");

  if (!raw) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(raw);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
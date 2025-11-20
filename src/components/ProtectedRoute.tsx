import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  if (!token) {
    // Sin token → redirigir según el rol requerido
    if (requiredRole === "ADMIN") {
      return <Navigate to="/admin-login" replace />;
    }
    if (requiredRole === "GESTOR") {
      return <Navigate to="/gestor-login" replace />;
    }
    return <Navigate to="/patient-login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Rol incorrecto → sin acceso
    return <Navigate to="/unauthorized" replace />;
  }

  // Todo correcto
  return <>{children}</>;
};

export default ProtectedRoute;

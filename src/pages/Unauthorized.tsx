// src/pages/Unauthorized.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <h1 className="text-3xl font-bold mb-4">Acceso denegado</h1>
      <p className="text-muted-foreground mb-6">
        No tienes permisos para acceder a esta sección.
      </p>
      <Button onClick={() => navigate("/")}>Volver al inicio</Button>
    </div>
  );
}
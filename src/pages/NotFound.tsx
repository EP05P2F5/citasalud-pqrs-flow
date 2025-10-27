import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home } from "lucide-react";
import { MedicalButton } from "../components/ui/medical-button";
import { useTheme } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-surface p-4">
      {/* Botón de tema */}
      <MedicalButton
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50"
        aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </MedicalButton>

      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 rounded-full mb-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">
          Página no encontrada
        </p>
        <p className="text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <MedicalButton
          variant="medical"
          size="lg"
          onClick={() => navigate('/')}
          className="mt-6"
        >
          <Home className="mr-2 h-5 w-5" />
          Volver al Inicio
        </MedicalButton>
      </div>
    </div>
  );
};

export default NotFound;

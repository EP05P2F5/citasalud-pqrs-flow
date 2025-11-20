import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Stethoscope, Lock, User as UserIcon } from "lucide-react";
import { MedicalButton } from "../components/ui/medical-button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useToast } from "../hooks/use-toast";
import { useTheme } from "../contexts/ThemeContext";
import { login } from "@/services/authService";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAccessibilityMode, toggleAccessibility } = useTheme();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Completa todos los campos requeridos.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const data = await login({
        nickname: formData.username,
        password: formData.password,
      });

      // authService ya guardó todo en localStorage
      toast({
        title: "Acceso autorizado",
        description: "Bienvenido al sistema PQRS de CITASalud",
        variant: "default",
      });

      // Redirigir según el rol
      if (data.rol === "USER") {
        navigate("/dashboard");
      } else if (data.rol === "Administrador") {
        navigate("/admin/dashboard");
      } else {
        setError("Rol no reconocido.");
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      {/* Botón de accesibilidad */}
      <MedicalButton
        variant="ghost"
        size="icon"
        onClick={toggleAccessibility}
        className={`fixed top-4 right-4 z-50 ${isAccessibilityMode ? "bg-primary/20" : ""}`}
        aria-label={isAccessibilityMode ? "Desactivar modo accesibilidad" : "Activar modo accesibilidad"}
        title={isAccessibilityMode ? "Modo Normal" : "Modo Accesibilidad"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </MedicalButton>

      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              CITASalud Paciente
            </h1>
            <p className="text-muted-foreground">
              Portal de Gestión PQRS
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium">
                Usuario *
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Ingrese su usuario"
                  className="pl-10"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Contraseña *
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Ingrese su contraseña"
                  className="pl-10 pr-10"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <MedicalButton
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Ingresar"}
            </MedicalButton>
          </form>

          {/* Credenciales de prueba */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Credenciales de prueba:
            </p>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Usuario: <span className="font-mono font-semibold text-foreground">usuario</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Contraseña: <span className="font-mono font-semibold text-foreground">123456</span>
              </p>
            </div>
          </div>

          {/* Enlaces de navegación */}
          <div className="mt-6 space-y-2 text-center text-sm">
            <p className="text-muted-foreground">
              ¿Eres administrador?{' '}
              <button 
                type="button"
                onClick={() => navigate("/admin-login")}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Ingresa aquí
              </button>
            </p>
            <p className="text-muted-foreground">
              ¿Eres gestor?{' '}
              <button 
                type="button"
                onClick={() => navigate("/gestor-login")}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Ingresa aquí
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>© 2025 CITASalud. Sistema de Gestión PQRS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Stethoscope, Lock, User as UserIcon } from "lucide-react";
import { MedicalButton } from "../components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from "../components/ui/medical-card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useToast } from "../hooks/use-toast";
import { useTheme } from "../contexts/ThemeContext";

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("No es posible iniciar sesión - Complete todos los campos requeridos");
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
      // Simular validación de login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular credenciales válidas
      if (formData.username === "usuario" && formData.password === "123456") {
        toast({
          title: "Acceso autorizado",
          description: "Bienvenido al sistema PQRS de CITASalud",
          variant: "default",
        });
        
        // Guardar sesión (simulado)
        localStorage.setItem("userSession", JSON.stringify({
          username: formData.username,
          loginTime: new Date().toISOString(),
        }));
        
        navigate("/dashboard");
      } else {
        setError("No es posible iniciar sesión - Credenciales incorrectas");
      }
    } catch (err) {
      setError("No es posible iniciar sesión - Error del servidor");
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
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-primary">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">CITASalud</h1>
          <p className="text-muted-foreground">Sistema PQRS - Acceso Seguro</p>
        </div>

        {/* Formulario de login */}
        <MedicalCard className="shadow-lg">
          <MedicalCardHeader>
            <MedicalCardTitle>Iniciar Sesión</MedicalCardTitle>
            <MedicalCardDescription>
              Ingrese sus credenciales para acceder al sistema de soporte
            </MedicalCardDescription>
          </MedicalCardHeader>
          
          <MedicalCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo Usuario */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
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
                    aria-describedby={error ? "error-message" : undefined}
                    aria-invalid={!!error}
                    required
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
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
                    aria-describedby={error ? "error-message" : undefined}
                    aria-invalid={!!error}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Mensaje de error */}
              {error && (
                <Alert variant="destructive" id="error-message" role="alert">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Botón de login */}
              <MedicalButton
                type="submit"
                variant="medical"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Verificando..." : "Iniciar Sesión"}
              </MedicalButton>
            </form>

            {/* Información de prueba */}
            <div className="mt-6 p-3 bg-accent/30 rounded-lg">
              <p className="text-xs font-medium text-accent-foreground mb-1">
                Credenciales de prueba:
              </p>
              <p className="text-xs text-muted-foreground">
                Usuario: <span className="font-mono">usuario</span> | 
                Contraseña: <span className="font-mono">123456</span>
              </p>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <button
            type="button"
            onClick={() => navigate('/admin-login')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ¿Eres administrador? Ingresa aquí
          </button>
          <p className="text-xs text-muted-foreground">
            © 2024 CITASalud. Sistema seguro de PQRS médicas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
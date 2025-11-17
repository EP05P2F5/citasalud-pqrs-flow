import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MedicalButton } from '@/components/ui/medical-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity, Eye, EyeOff, User as UserIcon, Lock } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { login } from "@/services/authService"; // 👈 importa el servicio

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAccessibilityMode, toggleAccessibility } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Completa todos los campos.");
      return;
    }

    setLoading(true);
    
    try {
      const data = await login({ nickname: username, password });

      // authService ya guardó todo en localStorage
      if (data.rol === "Administrador") {
        navigate("/admin/dashboard");
      } else {
        // Si no es admin, limpiar localStorage y mostrar error
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        setError("Acceso denegado. Solo administradores pueden ingresar.");
      }
    } catch (error: any) {
      setError(error.message || "Credenciales inválidas.");
    } finally {
      setLoading(false);
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
              <Activity className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              CITASalud Admin
            </h1>
            <p className="text-muted-foreground">
              Portal Administrativo PQRS
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium">
                Usuario Administrativo *
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ingrese su usuario"
                  className="w-full pl-10"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "error-message" : undefined}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Ingrese su contraseña"
                  className="w-full pl-10 pr-10"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "error-message" : undefined}
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

            {error && (
              <Alert variant="destructive" id="error-message" role="alert">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <MedicalButton
              type="submit"
              variant="medical"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión Administrativa"}
            </MedicalButton>

            {/* Información de prueba */}
            <div className="mt-4 p-3 bg-accent/30 rounded-lg">
              <p className="text-xs font-medium text-accent-foreground mb-1">
                Credenciales de prueba:
              </p>
              <p className="text-xs text-muted-foreground">
                Usuario: <span className="font-mono">admin</span> | 
                Contraseña: <span className="font-mono">admin123</span>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <button
            type="button"
            onClick={() => navigate('/patient-login')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ¿Eres paciente? Ingresa aquí
          </button>
          <p className="text-xs text-muted-foreground">
            © 2024 CITASalud. Sistema seguro de PQRS médicas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MedicalButton } from '@/components/ui/medical-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Credenciales inválidas. Intente nuevamente.');
      return;
    }

    // Simulación de validación administrativa
    // En producción, esto debe validarse con el backend
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminSession', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Credenciales inválidas. Intente nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      {/* Botón de tema */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-3 rounded-full bg-card border border-border hover:bg-accent transition-colors z-50"
        aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

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
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese su usuario"
                className="w-full"
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Contraseña *
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                className="w-full"
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
            </div>

            {error && (
              <div 
                className="p-4 bg-destructive/10 border border-destructive rounded-lg"
                role="alert"
                aria-live="assertive"
              >
                <p className="text-destructive text-sm font-medium">{error}</p>
              </div>
            )}

            <MedicalButton
              type="submit"
              variant="medical"
              size="lg"
              className="w-full"
            >
              Iniciar Sesión Administrativa
            </MedicalButton>

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ¿Eres usuario final? Ingresa aquí
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Sistema seguro y confidencial • CITASalud v1.0
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

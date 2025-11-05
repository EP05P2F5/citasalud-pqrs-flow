// src/components/layout/MedicalHeader.tsx
import React from "react";
import { Menu, Bell, User, LogOut, Stethoscope } from "lucide-react";
import { MedicalButton } from "../ui/medical-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

interface MedicalHeaderProps {
  showSidebar?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export const MedicalHeader: React.FC<MedicalHeaderProps> = ({
  showSidebar = true,
  sidebarOpen,
  onSidebarToggle,
}) => {
  const { isAccessibilityMode, toggleAccessibility } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate("/");
  };

  // 🔹 Obtener usuario actual
  const currentUser = getCurrentUser();
  const username = currentUser?.username || "Invitado";
  const role = currentUser?.rol === "GESTOR"
    ? "Gestor"
    : currentUser?.rol === "USER"
    ? "Paciente"
    : "Desconocido";

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y toggle sidebar */}
          <div className="flex items-center space-x-4">
            {showSidebar && (
              <MedicalButton
                variant="ghost"
                size="icon"
                onClick={onSidebarToggle}
                aria-label="Toggle sidebar"
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </MedicalButton>
            )}

            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CITASalud</h1>
                <p className="text-xs text-muted-foreground">Sistema PQRS</p>
              </div>
            </div>
          </div>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-3">
            {/* Botón de accesibilidad */}
            <MedicalButton
              variant="ghost"
              size="icon"
              onClick={toggleAccessibility}
              aria-label={
                isAccessibilityMode
                  ? "Desactivar modo accesibilidad"
                  : "Activar modo accesibilidad"
              }
              title={
                isAccessibilityMode
                  ? "Modo Normal"
                  : "Modo Accesibilidad"
              }
              className={isAccessibilityMode ? "bg-primary/20" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </MedicalButton>

            {/* Menú de usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MedicalButton
                  variant="ghost"
                  className="flex items-center space-x-2 px-3"
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{username}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </MedicalButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

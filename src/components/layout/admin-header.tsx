import React from "react";
import { Menu, Moon, Sun, LogOut, Activity } from "lucide-react";
import { MedicalButton } from "../ui/medical-button";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  showSidebar?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  showSidebar = true,
  sidebarOpen = false,
  onSidebarToggle,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {showSidebar && (
            <MedicalButton
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={sidebarOpen}
            >
              <Menu className="h-5 w-5" />
            </MedicalButton>
          )}
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-primary">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                CITASalud Admin
              </h1>
              <p className="text-xs text-muted-foreground">
                Sistema de Gestión PQRS
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MedicalButton
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </MedicalButton>

          <MedicalButton
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </MedicalButton>
        </div>
      </div>
    </header>
  );
};

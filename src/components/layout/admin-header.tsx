import React from "react";
import { Menu, User as UserIcon, LogOut, Activity, ChevronDown } from "lucide-react";
import { MedicalButton } from "../ui/medical-button";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { isAccessibilityMode, toggleAccessibility } = useTheme();
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
            onClick={toggleAccessibility}
            aria-label={isAccessibilityMode ? "Desactivar modo accesibilidad" : "Activar modo accesibilidad"}
            title={isAccessibilityMode ? "Modo Normal" : "Modo Accesibilidad"}
            className={isAccessibilityMode ? "bg-primary/20" : ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </MedicalButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MedicalButton
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Administrador</span>
                <ChevronDown className="h-4 w-4" />
              </MedicalButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

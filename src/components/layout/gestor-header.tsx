import React from "react";
import { Activity, Menu, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MedicalButton } from "../ui/medical-button";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout, getCurrentUser } from "@/services/authService";

interface GestorHeaderProps {
  showSidebar?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export const GestorHeader: React.FC<GestorHeaderProps> = ({
  showSidebar = true,
  sidebarOpen,
  onSidebarToggle,
}) => {
  const navigate = useNavigate();
  const { isAccessibilityMode, toggleAccessibility } = useTheme();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/gestor-login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {showSidebar && (
            <MedicalButton
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="lg:hidden"
              aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <Menu className="h-5 w-5" />
            </MedicalButton>
          )}
          
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">CITASalud</h1>
              <p className="text-xs text-muted-foreground">Portal Gestor</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Botón de accesibilidad */}
          <MedicalButton
            variant="ghost"
            size="icon"
            onClick={toggleAccessibility}
            className={isAccessibilityMode ? "bg-primary/20" : ""}
            aria-label={isAccessibilityMode ? "Desactivar modo accesibilidad" : "Activar modo accesibilidad"}
            title={isAccessibilityMode ? "Modo Normal" : "Modo Accesibilidad"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </MedicalButton>

          {/* Menú de usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MedicalButton
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
                aria-label="Menú de usuario"
              >
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                    {currentUser?.username?.charAt(0).toUpperCase() || "G"}
                  </AvatarFallback>
                </Avatar>
              </MedicalButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {currentUser?.username || "Gestor PQRS"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser?.email || "gestor@citasalud.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

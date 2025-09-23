import React from "react";
import { Menu, Bell, User, LogOut, Stethoscope } from "lucide-react";
import { MedicalButton } from "../ui/medical-button";
import { MedicalCard } from "../ui/medical-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

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
            {/* Notificaciones */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MedicalButton variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    3
                  </Badge>
                  <span className="sr-only">Notificaciones</span>
                </MedicalButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem className="p-3 cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">PQRS #12345 actualizada</p>
                      <p className="text-xs text-muted-foreground">
                        Su petición ha sido revisada y está en proceso
                      </p>
                      <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MedicalButton variant="ghost" className="flex items-center space-x-2 px-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Juan Pérez</p>
                    <p className="text-xs text-muted-foreground">Paciente</p>
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
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
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
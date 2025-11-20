import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, FileText, X } from "lucide-react";
import { MedicalButton } from "../ui/medical-button";

interface GestorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

export const GestorSidebar: React.FC<GestorSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      href: "/gestor",
      icon: Home,
      label: "Inicio",
      isActive: true,
    },
    {
      href: "/gestor/manage-pqrs",
      icon: FileText,
      label: "Gestionar PQRS",
      isActive: true,
    },
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header del sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="text-lg font-semibold text-foreground">Navegación Gestor</h2>
            <MedicalButton
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </MedicalButton>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isCurrentPage = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => item.isActive && handleNavigation(item.href)}
                    className={cn(
                      "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      isCurrentPage && item.isActive
                        ? "bg-primary text-primary-foreground shadow-primary"
                        : item.isActive
                        ? "text-foreground hover:bg-accent hover:text-accent-foreground"
                        : "text-muted-foreground cursor-not-allowed opacity-50",
                      item.isActive && "hover:bg-accent hover:text-accent-foreground"
                    )}
                    aria-current={isCurrentPage ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer del sidebar */}
          <div className="p-4 border-t border-border">
            <div className="bg-accent/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">
                CITASalud Gestor v1.0
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Sistema de gestión PQRS
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

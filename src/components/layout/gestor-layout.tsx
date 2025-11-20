import React from "react";
import { cn } from "@/lib/utils";
import { GestorSidebar } from "./gestor-sidebar";
import { GestorHeader } from "./gestor-header";

interface GestorLayoutProps {
  children: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export const GestorLayout: React.FC<GestorLayoutProps> = ({
  children,
  className,
  showSidebar = true,
  sidebarOpen = false,
  onSidebarToggle,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <GestorHeader 
        showSidebar={showSidebar}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={onSidebarToggle}
      />
      
      <div className="flex">
        {showSidebar && (
          <GestorSidebar 
            isOpen={sidebarOpen}
            onClose={() => onSidebarToggle?.()}
          />
        )}
        
        <main 
          className={cn(
            "flex-1 w-full",
            className
          )}
        >
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

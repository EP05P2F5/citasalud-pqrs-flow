import React from "react";
import { cn } from "@/lib/utils";
import { MedicalSidebar } from "./medical-sidebar";
import { MedicalHeader } from "./medical-header";

interface MedicalLayoutProps {
  children: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export const MedicalLayout: React.FC<MedicalLayoutProps> = ({
  children,
  className,
  showSidebar = true,
  sidebarOpen = false,
  onSidebarToggle,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <MedicalHeader 
        showSidebar={showSidebar}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={onSidebarToggle}
      />
      
      <div className="flex">
        {showSidebar && (
          <MedicalSidebar 
            isOpen={sidebarOpen}
            onClose={() => onSidebarToggle?.()}
          />
        )}
        
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            showSidebar && sidebarOpen && "lg:ml-64",
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
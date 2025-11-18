import React from "react";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
  className?: string;
  showSidebar?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  className,
  showSidebar = true,
  sidebarOpen = false,
  onSidebarToggle,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader 
        showSidebar={showSidebar}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={onSidebarToggle}
      />
      
      <div className="flex">
        {showSidebar && (
          <AdminSidebar 
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

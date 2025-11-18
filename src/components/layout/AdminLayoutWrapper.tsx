import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminLayout } from "./admin-layout";
import ProtectedRoute from "../ProtectedRoute";

export const AdminLayoutWrapper: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredRole="Administrador">
      <AdminLayout 
        showSidebar={true} 
        sidebarOpen={sidebarOpen} 
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      >
        <Outlet />
      </AdminLayout>
    </ProtectedRoute>
  );
};

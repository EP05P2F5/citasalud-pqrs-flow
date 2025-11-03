import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePQRS from "./pages/CreatePQRS";
import PQRSConfirmation from "./pages/PQRSConfirmation";
import ManagePQRS from "./pages/ManagePQRS";
import EditPQRS from "./pages/EditPQRS";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManagePQRS from "./pages/AdminManagePQRS";
import AdminUpdateStatus from "./pages/AdminUpdateStatus";
import AdminRespondPQRS from "./pages/AdminRespondPQRS";
import AdminStatistics from "./pages/AdminStatistics";
import AdminNotifications from "./pages/AdminNotifications";
import AdminPQRSDetail from "./pages/AdminPQRSDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Login />} />
            <Route path="/patient-login" element={<Login />} />
            <Route path="/pqrs/create" element={<CreatePQRS />} />
            <Route path="/pqrs/confirmation" element={<PQRSConfirmation />} />
            <Route path="/pqrs/manage" element={<ManagePQRS />} />
            <Route path="/pqrs/edit/:id" element={<EditPQRS />} />


            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="Usuario">
                  <Dashboard />
                </ProtectedRoute>
                } 
            />

            {/* Login administrativo */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ✅ Rutas protegidas para rol Administrador */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="Administrador">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-pqrs"
              element={
                <ProtectedRoute requiredRole="Administrador">
                  <AdminManagePQRS />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/update-status/:id"
              element={
                <ProtectedRoute requiredRole="Administrador">
                  <AdminUpdateStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/respond/:id"
              element={
                <ProtectedRoute requiredRole="Administrador">
                  <AdminRespondPQRS />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/statistics"
              element={
                <ProtectedRoute requiredRole="Administrador">
                  <AdminStatistics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute requiredRole="Administrador">
                  <AdminNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pqrs-detail/:id"
              element={
                <ProtectedRoute requiredRole="Administrador">
                  <AdminPQRSDetail />
                </ProtectedRoute>
              }
            />

            {/* Página de acceso denegado */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
export default App;

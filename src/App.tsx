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
import AdminManageGestores from "./pages/AdminManageGestores";
import AdminCreateGestor from "./pages/AdminCreateGestor";
import AdminEditGestor from "./pages/AdminEditGestor";
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
            <Route path="/pqrs/confirmation" element={<PQRSConfirmation />} />
            <Route path="/pqrs/manage" element={<ManagePQRS />} />
            <Route path="/pqrs/edit/:id" element={<EditPQRS />} />


            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="USER">
                  <Dashboard />
                </ProtectedRoute>
                } 
            />
            <Route 
              path="/pqrs/create"
              element={
                <ProtectedRoute requiredRole="USER">
                  <CreatePQRS />
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
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-pqrs"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminManagePQRS />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/update-status/:id"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminUpdateStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/respond/:id"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminRespondPQRS />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/statistics"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminStatistics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pqrs-detail/:id"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminPQRSDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gestores"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminManageGestores />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gestores/create"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminCreateGestor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gestores/edit/:id"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminEditGestor />
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

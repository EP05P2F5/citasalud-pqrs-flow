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
import { AdminLayoutWrapper } from "./components/layout/AdminLayoutWrapper";
import Index from "./pages/Index";

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
            <Route path="/" element={<Index />} />
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

            {/* ✅ Rutas protegidas anidadas para rol Administrador */}
            <Route path="/admin" element={<AdminLayoutWrapper />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-pqrs" element={<AdminManagePQRS />} />
              <Route path="update-status/:id" element={<AdminUpdateStatus />} />
              <Route path="respond/:id" element={<AdminRespondPQRS />} />
              <Route path="statistics" element={<AdminStatistics />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="pqrs-detail/:id" element={<AdminPQRSDetail />} />
              <Route path="gestores" element={<AdminManageGestores />} />
              <Route path="gestores/create" element={<AdminCreateGestor />} />
              <Route path="gestores/edit/:id" element={<AdminEditGestor />} />
            </Route>

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

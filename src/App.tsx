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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/patient-login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pqrs/create" element={<CreatePQRS />} />
            <Route path="/pqrs/confirmation" element={<PQRSConfirmation />} />
            <Route path="/pqrs/manage" element={<ManagePQRS />} />
            <Route path="/pqrs/edit/:id" element={<EditPQRS />} />
            
            {/* Rutas administrativas */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage-pqrs" element={<AdminManagePQRS />} />
            <Route path="/admin/update-status/:id" element={<AdminUpdateStatus />} />
            <Route path="/admin/respond/:id" element={<AdminRespondPQRS />} />
            <Route path="/admin/statistics" element={<AdminStatistics />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/pqrs-detail/:id" element={<AdminPQRSDetail />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

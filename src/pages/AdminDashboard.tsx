import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/admin-layout';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { FileText, Bell, BarChart3, ArrowRight } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const cards = [
    {
      title: "Gestionar PQRS",
      description: "Administra y responde todas las solicitudes de PQRS registradas en el sistema",
      icon: FileText,
      path: "/admin/manage-pqrs",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Notificaciones",
      description: "Revisa el historial de notificaciones enviadas a los usuarios",
      icon: Bell,
      path: "/admin/notifications",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Dashboard PQRS",
      description: "Visualiza métricas y estadísticas de gestión de PQRS",
      icon: BarChart3,
      path: "/admin/statistics",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <AdminLayout
      showSidebar={true}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Panel Principal Administrativo
          </h1>
          <p className="text-muted-foreground">
            Bienvenido al sistema de gestión PQRS de CITASalud
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <MedicalCard 
                key={card.path}
                variant="interactive"
                className="cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => navigate(card.path)}
                tabIndex={0}
                role="button"
                aria-label={`Ir a ${card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(card.path);
                  }
                }}
              >
                <MedicalCardHeader>
                  <div className={`w-12 h-12 rounded-full ${card.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <MedicalCardTitle>{card.title}</MedicalCardTitle>
                  <MedicalCardDescription>
                    {card.description}
                  </MedicalCardDescription>
                </MedicalCardHeader>
                <MedicalCardContent>
                  <MedicalButton
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between group"
                  >
                    Acceder
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </MedicalButton>
                </MedicalCardContent>
              </MedicalCard>
            );
          })}
        </div>

        <MedicalCard variant="elevated" className="mt-8">
          <MedicalCardHeader>
            <MedicalCardTitle>Información del Sistema</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <p className="text-2xl font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground">PQRS Activas</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <p className="text-2xl font-bold text-warning">8</p>
                <p className="text-sm text-muted-foreground">En Proceso</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/50">
                <p className="text-2xl font-bold text-success">156</p>
                <p className="text-sm text-muted-foreground">Resueltas</p>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

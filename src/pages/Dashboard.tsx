import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, List, Bell, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { MedicalLayout } from "../components/layout/medical-layout";
import { MedicalButton } from "../components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from "../components/ui/medical-card";
import { Badge } from "../components/ui/badge";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Verificar sesión
  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      navigate('/');
    }
  }, [navigate]);

  // Datos simulados
  const stats = [
    {
      title: "PQRS Activas",
      value: "3",
      description: "En proceso de gestión",
      icon: Clock,
      variant: "warning" as const,
    },
    {
      title: "PQRS Resueltas",
      value: "12",
      description: "Completadas exitosamente",
      icon: CheckCircle,
      variant: "success" as const,
    },
    {
      title: "Notificaciones",
      value: "5",
      description: "Nuevas actualizaciones",
      icon: Bell,
      variant: "default" as const,
    },
    {
      title: "Tiempo Promedio",
      value: "2.3 días",
      description: "De respuesta",
      icon: TrendingUp,
      variant: "default" as const,
    },
  ];

  const recentPQRS = [
    {
      id: "PQRS-2024-001",
      type: "Petición",
      title: "Solicitud cambio de horario cita",
      status: "En proceso",
      date: "15 Dic 2024",
      variant: "warning" as const,
    },
    {
      id: "PQRS-2024-002", 
      type: "Queja",
      title: "Demora en atención especializada",
      status: "Resuelta",
      date: "12 Dic 2024",
      variant: "success" as const,
    },
    {
      id: "PQRS-2024-003",
      type: "Sugerencia",
      title: "Mejora en sistema de recordatorios",
      status: "Radicada",
      date: "10 Dic 2024", 
      variant: "default" as const,
    },
  ];

  return (
    <MedicalLayout
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-8">
        {/* Header de bienvenida */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Bienvenido al Sistema PQRS
            </h1>
            <p className="text-muted-foreground">
              Gestione sus peticiones, quejas, reclamos y sugerencias de forma eficiente
            </p>
          </div>

          {/* Acciones rápidas */}
          <div className="flex flex-col sm:flex-row gap-4">
            <MedicalButton
              variant="medical"
              size="lg"
              onClick={() => navigate("/pqrs/create")}
              className="flex-1 sm:flex-none"
            >
              <FileText className="mr-2 h-5 w-5" />
              Solicitar PQRS
            </MedicalButton>
            
            <MedicalButton
              variant="medical-outline"
              size="lg"
              onClick={() => navigate("/pqrs/manage")}
              className="flex-1 sm:flex-none"
            >
              <List className="mr-2 h-5 w-5" />
              Mirar tus solicitudes
            </MedicalButton>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <MedicalCard key={index} variant="elevated">
                <MedicalCardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <div className="p-3 bg-accent rounded-lg">
                      <Icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
            );
          })}
        </div>

        {/* PQRS Recientes */}
        <MedicalCard variant="gradient">
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center justify-between">
              <span>PQRS Recientes</span>
              <MedicalButton
                variant="ghost"
                size="sm"
                onClick={() => navigate("/pqrs/manage")}
              >
                Ver todas
              </MedicalButton>
            </MedicalCardTitle>
            <MedicalCardDescription>
              Últimas solicitudes registradas en el sistema
            </MedicalCardDescription>
          </MedicalCardHeader>
          
          <MedicalCardContent>
            <div className="space-y-4">
              {recentPQRS.map((pqrs) => (
                <div
                  key={pqrs.id}
                  className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50 hover:border-border transition-colors cursor-pointer"
                  onClick={() => navigate("/pqrs/manage")}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{pqrs.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {pqrs.type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{pqrs.id}</span>
                      <span>{pqrs.date}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      pqrs.status === "Resuelta" ? "default" :
                      pqrs.status === "En proceso" ? "secondary" : "outline"
                    }
                  >
                    {pqrs.status}
                  </Badge>
                </div>
              ))}
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Información adicional */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle>Información Importante</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Las PQRS son atendidas en orden de llegada</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Tiempo promedio de respuesta: 2-3 días hábiles</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p>Puede editar sus PQRS mientras estén en estado "Radicada" o "En proceso"</p>
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle>Contacto y Soporte</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">Línea de Atención</p>
                  <p className="text-muted-foreground">01 8000 123 456</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">soporte@citasalud.com</p>
                </div>
                <div>
                  <p className="font-medium">Horario de Atención</p>
                  <p className="text-muted-foreground">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>
    </MedicalLayout>
  );
};

export default Dashboard;
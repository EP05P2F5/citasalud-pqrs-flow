import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/admin-layout';
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, CheckCircle2, Clock } from 'lucide-react';

interface Notification {
  id: string;
  usuario: string;
  tipo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
}

const AdminNotifications = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const notifications: Notification[] = [
    {
      id: 'NOT-001',
      usuario: 'Juan Pérez',
      tipo: 'Estado Actualizado',
      mensaje: 'El estado de su PQRS PQRS-001 ha sido actualizado a "En proceso". Estamos trabajando en su solicitud.',
      fecha: '2025-01-15 10:30',
      leida: true
    },
    {
      id: 'NOT-002',
      usuario: 'María González',
      tipo: 'Respuesta Enviada',
      mensaje: 'Su PQRS PQRS-002 ha sido resuelta. Hemos enviado una respuesta detallada a su consulta.',
      fecha: '2025-01-15 09:15',
      leida: true
    },
    {
      id: 'NOT-003',
      usuario: 'Carlos Rodríguez',
      tipo: 'PQRS Recibida',
      mensaje: 'Hemos recibido su PQRS PQRS-003. Le contactaremos pronto.',
      fecha: '2025-01-14 16:45',
      leida: false
    },
    {
      id: 'NOT-004',
      usuario: 'Ana Martínez',
      tipo: 'Estado Actualizado',
      mensaje: 'El estado de su PQRS PQRS-004 ha sido actualizado a "Resuelta".',
      fecha: '2025-01-14 14:20',
      leida: true
    },
  ];

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'Estado Actualizado':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'Respuesta Enviada':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'PQRS Recibida':
        return <Mail className="h-5 w-5 text-warning" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <AdminLayout
      showSidebar={true}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Notificaciones Enviadas
            </h1>
            <p className="text-muted-foreground">
              Historial de notificaciones enviadas a los usuarios
            </p>
          </div>
          <MedicalButton
            variant="outline"
            onClick={() => navigate('/admin/dashboard')}
          >
            Regresar
          </MedicalButton>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Lista de notificaciones */}
          <div className="space-y-4">
            <MedicalCard variant="elevated">
              <MedicalCardHeader>
                <MedicalCardTitle>Lista de Notificaciones</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => setSelectedNotification(notification)}
                      className={`w-full text-left p-4 rounded-lg border transition-all hover:shadow-md ${
                        selectedNotification?.id === notification.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-card hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.tipo)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground truncate">
                              {notification.usuario}
                            </p>
                            {notification.leida && (
                              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                                Enviada
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {notification.tipo}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.fecha}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Detalle de notificación seleccionada */}
          <div>
            {selectedNotification ? (
              <MedicalCard variant="elevated">
                <MedicalCardHeader>
                  <MedicalCardTitle>Detalle de Notificación</MedicalCardTitle>
                </MedicalCardHeader>
                <MedicalCardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ID</p>
                      <p className="font-medium">{selectedNotification.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Usuario</p>
                      <p className="font-medium">{selectedNotification.usuario}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tipo</p>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {selectedNotification.tipo}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fecha y Hora</p>
                      <p className="font-medium">{selectedNotification.fecha}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Mensaje</p>
                      <div className="p-4 bg-accent/30 rounded-lg">
                        <p className="text-foreground">{selectedNotification.mensaje}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Estado</p>
                      <Badge 
                        variant="outline" 
                        className={selectedNotification.leida 
                          ? "bg-success/10 text-success border-success/20" 
                          : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {selectedNotification.leida ? 'Enviada' : 'Pendiente'}
                      </Badge>
                    </div>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
            ) : (
              <MedicalCard variant="elevated">
                <MedicalCardContent className="py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Selecciona una notificación para ver su detalle
                  </p>
                </MedicalCardContent>
              </MedicalCard>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;

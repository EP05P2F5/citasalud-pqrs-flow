import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/admin-layout';
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, User } from 'lucide-react';

const AdminPQRSDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Datos de ejemplo
  const pqrsDetail = {
    id: id,
    usuario: 'Juan Pérez',
    email: 'juan.perez@example.com',
    tipo: 'Petición',
    estado: 'En proceso',
    fecha: '2025-01-15',
    descripcion: 'Solicito información sobre el proceso de agendamiento de citas para especialistas. Me gustaría conocer los tiempos de espera aproximados, los procedimientos necesarios y la documentación requerida para solicitar una cita con un cardiólogo.',
    archivoAdjunto: 'documento_medico.pdf'
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Recibida':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'En proceso':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Resuelta':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AdminLayout
      showSidebar={true}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Detalle de PQRS
            </h1>
            <p className="text-muted-foreground">
              Información completa de la solicitud {id}
            </p>
          </div>
          <MedicalButton
            variant="outline"
            onClick={() => navigate('/admin/manage-pqrs')}
          >
            Regresar
          </MedicalButton>
        </div>

        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <div className="flex items-center justify-between">
              <MedicalCardTitle>Información General</MedicalCardTitle>
              <Badge className={getStatusColor(pqrsDetail.estado)} variant="outline">
                {pqrsDetail.estado}
              </Badge>
            </div>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">ID PQRS</p>
                  </div>
                  <p className="font-semibold text-lg">{pqrsDetail.id}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Usuario</p>
                  </div>
                  <p className="font-medium">{pqrsDetail.usuario}</p>
                  <p className="text-sm text-muted-foreground">{pqrsDetail.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tipo</p>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {pqrsDetail.tipo}
                  </Badge>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Fecha de Creación</p>
                  </div>
                  <p className="font-medium">{new Date(pqrsDetail.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>Descripción de la Solicitud</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="p-4 bg-accent/30 rounded-lg">
              <p className="text-foreground leading-relaxed">{pqrsDetail.descripcion}</p>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {pqrsDetail.archivoAdjunto && (
          <MedicalCard variant="elevated">
            <MedicalCardHeader>
              <MedicalCardTitle>Archivo Adjunto</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{pqrsDetail.archivoAdjunto}</p>
                    <p className="text-sm text-muted-foreground">Documento adjunto</p>
                  </div>
                </div>
                <MedicalButton variant="outline" size="sm">
                  Descargar
                </MedicalButton>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        )}

        <div className="flex gap-4">
          <MedicalButton
            variant="medical"
            className="flex-1"
            onClick={() => navigate(`/admin/update-status/${id}`)}
          >
            Actualizar Estado
          </MedicalButton>
          <MedicalButton
            variant="medical"
            className="flex-1"
            onClick={() => navigate(`/admin/respond/${id}`)}
          >
            Responder
          </MedicalButton>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPQRSDetail;

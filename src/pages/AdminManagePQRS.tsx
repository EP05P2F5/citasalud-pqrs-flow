import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/admin-layout';
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, RefreshCw, MessageSquare } from 'lucide-react';

interface PQRS {
  id: string;
  usuario: string;
  tipo: string;
  estado: 'Recibida' | 'En proceso' | 'Resuelta';
  fecha: string;
}

const AdminManagePQRS = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Datos de ejemplo
  const pqrsData: PQRS[] = [
    { id: 'PQRS-001', usuario: 'Juan Pérez', tipo: 'Petición', estado: 'Recibida', fecha: '2025-01-15' },
    { id: 'PQRS-002', usuario: 'María González', tipo: 'Queja', estado: 'En proceso', fecha: '2025-01-14' },
    { id: 'PQRS-003', usuario: 'Carlos Rodríguez', tipo: 'Reclamo', estado: 'Recibida', fecha: '2025-01-13' },
    { id: 'PQRS-004', usuario: 'Ana Martínez', tipo: 'Sugerencia', estado: 'Resuelta', fecha: '2025-01-12' },
    { id: 'PQRS-005', usuario: 'Luis Hernández', tipo: 'Petición', estado: 'En proceso', fecha: '2025-01-11' },
  ];

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

  const handleUpdateStatus = (id: string) => {
    navigate(`/admin/update-status/${id}`);
  };

  const handleRespond = (id: string) => {
    navigate(`/admin/respond/${id}`);
  };

  const handleViewDetail = (id: string) => {
    navigate(`/admin/pqrs-detail/${id}`);
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
              Gestión de PQRS
            </h1>
            <p className="text-muted-foreground">
              Administra todas las solicitudes registradas en el sistema
            </p>
          </div>
          <MedicalButton
            variant="outline"
            onClick={() => navigate('/admin/dashboard')}
          >
            Volver al Inicio
          </MedicalButton>
        </div>

        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>Listado de PQRS</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Usuario</TableHead>
                    <TableHead className="font-semibold">Tipo</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                    <TableHead className="font-semibold">Fecha</TableHead>
                    <TableHead className="font-semibold text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pqrsData.map((pqrs) => (
                    <TableRow key={pqrs.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{pqrs.id}</TableCell>
                      <TableCell>{pqrs.usuario}</TableCell>
                      <TableCell>{pqrs.tipo}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(pqrs.estado)} variant="outline">
                          {pqrs.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(pqrs.fecha).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <MedicalButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateStatus(pqrs.id)}
                            title="Actualizar estado"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </MedicalButton>
                          <MedicalButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleRespond(pqrs.id)}
                            title="Responder"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </MedicalButton>
                          <MedicalButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetail(pqrs.id)}
                            title="Ver detalle"
                          >
                            <Eye className="h-4 w-4" />
                          </MedicalButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </AdminLayout>
  );
};

export default AdminManagePQRS;

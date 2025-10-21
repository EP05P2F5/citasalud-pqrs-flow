import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/admin-layout';
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2 } from 'lucide-react';

const AdminUpdateStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('Recibida');
  const [newStatus, setNewStatus] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatus) return;

    // Simulación de actualización
    setShowSuccess(true);
  };

  const handleBack = () => {
    navigate('/admin/manage-pqrs');
  };

  if (showSuccess) {
    return (
      <AdminLayout
        showSidebar={true}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <MedicalCard variant="success" className="text-center">
            <MedicalCardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-success mb-2">
                Estado actualizado correctamente
              </h2>
              <p className="text-success-foreground mb-6">
                El usuario ha sido notificado del cambio de estado de su PQRS.
              </p>
              <MedicalButton
                variant="medical"
                onClick={handleBack}
                className="w-full sm:w-auto"
              >
                Regresar a Gestión PQRS
              </MedicalButton>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      showSidebar={true}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Actualizar Estado PQRS
            </h1>
            <p className="text-muted-foreground">
              Modifica el estado de la solicitud {id}
            </p>
          </div>
        </div>

        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>Información de Estado</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pqrs-id" className="font-medium">
                  ID PQRS
                </Label>
                <Input
                  id="pqrs-id"
                  value={id}
                  disabled
                  className="bg-muted"
                  aria-readonly="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-status" className="font-medium">
                  Estado Actual
                </Label>
                <Input
                  id="current-status"
                  value={currentStatus}
                  disabled
                  className="bg-muted"
                  aria-readonly="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-status" className="font-medium">
                  Nuevo Estado *
                </Label>
                <Select
                  value={newStatus}
                  onValueChange={setNewStatus}
                  required
                >
                  <SelectTrigger id="new-status" aria-required="true">
                    <SelectValue placeholder="Seleccione el nuevo estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Recibida">Recibida</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  El usuario recibirá una notificación automática del cambio
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <MedicalButton
                  type="submit"
                  variant="medical"
                  className="flex-1"
                >
                  Guardar Cambios
                </MedicalButton>
                <MedicalButton
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Cancelar
                </MedicalButton>
              </div>
            </form>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </AdminLayout>
  );
};

export default AdminUpdateStatus;

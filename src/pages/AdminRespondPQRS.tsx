import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/admin-layout';
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminRespondPQRS = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Datos de ejemplo de la PQRS
  const pqrsData = {
    id: id,
    tipo: 'Petición',
    descripcion: 'Solicito información sobre el proceso de agendamiento de citas para especialistas. Me gustaría conocer los tiempos de espera y procedimientos.',
    fecha: '2025-01-15',
    estado: 'En proceso'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!response.trim()) {
      setError('La respuesta no puede estar vacía');
      return;
    }

    // Simulación de envío
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
                Respuesta enviada exitosamente
              </h2>
              <p className="text-success-foreground mb-6">
                La PQRS se marcó como resuelta y el usuario ha sido notificado.
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
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Responder PQRS
            </h1>
            <p className="text-muted-foreground">
              Proporciona una respuesta a la solicitud {id}
            </p>
          </div>
        </div>

        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>Información de la PQRS</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4 p-4 bg-accent/30 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tipo</p>
                  <p className="font-medium">{pqrsData.tipo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estado</p>
                  <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                    {pqrsData.estado}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Fecha de Creación</p>
                <p className="font-medium">{new Date(pqrsData.fecha).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Descripción</p>
                <p className="text-foreground">{pqrsData.descripcion}</p>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>Respuesta al Usuario</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="response" className="font-medium">
                  Redacta tu respuesta *
                </Label>
                <Textarea
                  id="response"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Escribe una respuesta clara y completa al usuario..."
                  className="min-h-[200px] resize-y"
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                />
                <p className="text-xs text-muted-foreground">
                  Esta respuesta será enviada al usuario y la PQRS se marcará como resuelta
                </p>
              </div>

              {error && (
                <div 
                  className="p-4 bg-destructive/10 border border-destructive rounded-lg"
                  role="alert"
                  aria-live="assertive"
                >
                  <p className="text-destructive text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <MedicalButton
                  type="submit"
                  variant="medical"
                  className="flex-1"
                >
                  Enviar Respuesta
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

export default AdminRespondPQRS;

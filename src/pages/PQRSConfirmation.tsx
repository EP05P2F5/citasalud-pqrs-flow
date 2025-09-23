import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, FileText, Home, List } from "lucide-react";
import { MedicalLayout } from "../components/layout/medical-layout";
import { MedicalButton } from "../components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from "../components/ui/medical-card";

const PQRSConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  // Si no hay datos en el estado, redirigir al dashboard
  React.useEffect(() => {
    if (!state?.pqrsId) {
      navigate("/dashboard");
    }
  }, [state, navigate]);

  if (!state?.pqrsId) {
    return null;
  }

  const { pqrsId, type, title } = state;

  return (
    <MedicalLayout showSidebar={false}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Icono de éxito */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ¡PQRS Enviada Exitosamente!
          </h1>
          <p className="text-muted-foreground">
            Su solicitud ha sido radicada correctamente en nuestro sistema
          </p>
        </div>

        {/* Detalles de la PQRS */}
        <MedicalCard variant="success">
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-success" />
              <span>Detalles de su PQRS</span>
            </MedicalCardTitle>
            <MedicalCardDescription>
              Guarde esta información para hacer seguimiento a su solicitud
            </MedicalCardDescription>
          </MedicalCardHeader>

          <MedicalCardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número de PQRS</p>
                  <p className="text-lg font-bold text-success">{pqrsId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fecha de radicación</p>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date().toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                <p className="text-lg font-semibold text-foreground capitalize">{type}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Título</p>
                <p className="text-lg font-semibold text-foreground">{title}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Estado</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-warning/20 text-warning-foreground">
                  <span className="w-2 h-2 bg-warning rounded-full mr-2"></span>
                  Radicada
                </div>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Información adicional */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>¿Qué sigue ahora?</MedicalCardTitle>
          </MedicalCardHeader>
          
          <MedicalCardContent>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">Revisión inicial</p>
                  <p className="text-muted-foreground">
                    Su PQRS será revisada por nuestro equipo de soporte en las próximas 24 horas
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">Procesamiento</p>
                  <p className="text-muted-foreground">
                    Su solicitud será asignada al área correspondiente para su gestión
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Notificación</p>
                  <p className="text-muted-foreground">
                    Recibirá notificaciones sobre el estado y respuesta de su PQRS
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent/30 rounded-lg">
              <p className="text-sm text-accent-foreground">
                <strong>Tiempo estimado de respuesta:</strong> 2-3 días hábiles
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Podrá hacer seguimiento a su solicitud en la sección "Mis Solicitudes"
              </p>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4">
          <MedicalButton
            variant="medical"
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="flex-1"
          >
            <Home className="mr-2 h-5 w-5" />
            Volver al Inicio
          </MedicalButton>
          
          <MedicalButton
            variant="medical-outline"
            size="lg"
            onClick={() => navigate("/pqrs/manage")}
            className="flex-1"
          >
            <List className="mr-2 h-5 w-5" />
            Ver Mis Solicitudes
          </MedicalButton>
        </div>

        {/* Información de contacto */}
        <div className="text-center text-sm text-muted-foreground">
          <p>¿Necesita ayuda adicional?</p>
          <p>
            Contáctenos: <span className="font-medium">01 8000 123 456</span> | 
            <span className="font-medium"> soporte@citasalud.com</span>
          </p>
        </div>
      </div>
    </MedicalLayout>
  );
};

export default PQRSConfirmation;
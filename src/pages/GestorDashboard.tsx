import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GestorLayout } from '@/components/layout/gestor-layout';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { FileText, ArrowRight } from 'lucide-react';
import { MedicalButton } from '@/components/ui/medical-button';

const GestorDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/gestor-login');
    }
  }, [navigate]);

  return (
    <GestorLayout
      showSidebar={true}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Panel de Gestión PQRS
          </h1>
          <p className="text-muted-foreground">
            Bienvenido al sistema de gestión de solicitudes CITASalud
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 max-w-2xl">
          <MedicalCard
            variant="interactive"
            className="cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/gestor/manage-pqrs')}
            tabIndex={0}
            role="button"
            aria-label="Ir a Gestionar PQRS"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/gestor/manage-pqrs');
              }
            }}
          >
            <MedicalCardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <MedicalCardTitle>Gestionar PQRS</MedicalCardTitle>
              <MedicalCardDescription>
                Administra y responde todas las solicitudes de PQRS registradas en el sistema
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
        </div>
      </div>
    </GestorLayout>
  );
};

export default GestorDashboard;

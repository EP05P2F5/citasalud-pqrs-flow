import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MedicalButton } from '@/components/ui/medical-button';
import { Activity, Heart, Users, FileText } from 'lucide-react';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-foreground">
                CITASalud
              </h1>
              <p className="text-muted-foreground">
                Sistema de Gestión PQRS
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plataforma integral para la gestión de Peticiones, Quejas, Reclamos y Sugerencias en el sector salud
          </p>
        </div>

        {/* Login Options */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-16">
          <MedicalCard variant="interactive" className="cursor-pointer hover:shadow-lg transition-all duration-300">
            <MedicalCardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <MedicalCardTitle>Acceso Pacientes</MedicalCardTitle>
              <MedicalCardDescription>
                Radica y consulta tus PQRS en el sistema
              </MedicalCardDescription>
            </MedicalCardHeader>
            <MedicalCardContent>
              <MedicalButton 
                onClick={() => navigate('/patient-login')}
                className="w-full"
              >
                Iniciar Sesión
              </MedicalButton>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="interactive" className="cursor-pointer hover:shadow-lg transition-all duration-300">
            <MedicalCardHeader>
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <MedicalCardTitle>Acceso Administrativo</MedicalCardTitle>
              <MedicalCardDescription>
                Gestiona y administra las PQRS del sistema
              </MedicalCardDescription>
            </MedicalCardHeader>
            <MedicalCardContent>
              <MedicalButton 
                onClick={() => navigate('/admin-login')}
                variant="secondary"
                className="w-full"
              >
                Iniciar Sesión Admin
              </MedicalButton>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">
            Características del Sistema
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <FileText className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Gestión de PQRS</h3>
              <p className="text-sm text-muted-foreground">
                Sistema completo para radicar, consultar y gestionar peticiones
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <Activity className="h-10 w-10 text-success mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Seguimiento en Tiempo Real</h3>
              <p className="text-sm text-muted-foreground">
                Monitorea el estado de tus solicitudes en todo momento
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <Users className="h-10 w-10 text-warning mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Gestión Administrativa</h3>
              <p className="text-sm text-muted-foreground">
                Panel completo para administradores y gestores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

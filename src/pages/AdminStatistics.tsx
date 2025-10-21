import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/admin-layout';
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, PieChart, Clock, TrendingUp } from 'lucide-react';

const AdminStatistics = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Datos de ejemplo para métricas
  const metrics = {
    byType: [
      { type: 'Petición', count: 45, color: 'bg-primary' },
      { type: 'Queja', count: 28, color: 'bg-warning' },
      { type: 'Reclamo', count: 15, color: 'bg-destructive' },
      { type: 'Sugerencia', count: 32, color: 'bg-success' },
    ],
    byStatus: [
      { status: 'Recibida', count: 24, color: 'bg-warning' },
      { status: 'En proceso', count: 40, color: 'bg-primary' },
      { status: 'Resuelta', count: 56, color: 'bg-success' },
    ],
    avgResponseTime: '2.5 días',
    totalPQRS: 120,
  };

  const maxCount = Math.max(...metrics.byType.map(m => m.count));

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
              Dashboard PQRS
            </h1>
            <p className="text-muted-foreground">
              Métricas y estadísticas de gestión de PQRS
            </p>
          </div>
          <MedicalButton
            variant="outline"
            onClick={() => navigate('/admin/dashboard')}
          >
            Regresar
          </MedicalButton>
        </div>

        {/* Filtros */}
        <MedicalCard variant="elevated">
          <MedicalCardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="filter-type">Filtrar por Tipo</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="filter-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="peticion">Petición</SelectItem>
                    <SelectItem value="queja">Queja</SelectItem>
                    <SelectItem value="reclamo">Reclamo</SelectItem>
                    <SelectItem value="sugerencia">Sugerencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="filter-status">Filtrar por Estado</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger id="filter-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="recibida">Recibida</SelectItem>
                    <SelectItem value="en-proceso">En proceso</SelectItem>
                    <SelectItem value="resuelta">Resuelta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <MedicalButton variant="medical" className="w-full">
                  Aplicar Filtros
                </MedicalButton>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Métricas principales */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MedicalCard variant="elevated">
            <MedicalCardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total PQRS</p>
                  <p className="text-3xl font-bold text-foreground">{metrics.totalPQRS}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="elevated">
            <MedicalCardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tiempo Promedio</p>
                  <p className="text-3xl font-bold text-foreground">{metrics.avgResponseTime}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="elevated">
            <MedicalCardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">En Proceso</p>
                  <p className="text-3xl font-bold text-foreground">40</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="elevated">
            <MedicalCardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Resueltas</p>
                  <p className="text-3xl font-bold text-foreground">56</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-success" />
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        {/* Gráfico de barras por tipo */}
        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>PQRS por Tipo</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4" role="img" aria-label="Gráfico de PQRS por tipo">
              {metrics.byType.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.type}</span>
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="w-full bg-accent rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={item.count}
                      aria-valuemin={0}
                      aria-valuemax={maxCount}
                      aria-label={`${item.type}: ${item.count} solicitudes`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Gráfico por estado */}
        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>PQRS por Estado</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {metrics.byStatus.map((item) => (
                <div key={item.status} className="text-center p-6 rounded-lg bg-accent/30">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${item.color}/20 flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${item.color.replace('bg-', 'text-')}`}>
                      {item.count}
                    </span>
                  </div>
                  <p className="font-medium text-foreground">{item.status}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((item.count / metrics.totalPQRS) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </AdminLayout>
  );
};

export default AdminStatistics;

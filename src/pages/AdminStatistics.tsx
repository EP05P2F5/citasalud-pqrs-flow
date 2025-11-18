import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/layout/admin-layout';
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { MedicalButton } from '@/components/ui/medical-button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, PieChart, Clock, TrendingUp } from 'lucide-react';

// Datos simulados completos
const allPQRSData = [
  { id: 1, type: 'Petición', status: 'Recibida', createdAt: '2024-01-15' },
  { id: 2, type: 'Petición', status: 'En proceso', createdAt: '2024-01-16' },
  { id: 3, type: 'Petición', status: 'En proceso', createdAt: '2024-01-17' },
  { id: 4, type: 'Petición', status: 'Resuelta', createdAt: '2024-01-18' },
  { id: 5, type: 'Petición', status: 'Resuelta', createdAt: '2024-01-19' },
  { id: 6, type: 'Queja', status: 'Recibida', createdAt: '2024-01-20' },
  { id: 7, type: 'Queja', status: 'En proceso', createdAt: '2024-01-21' },
  { id: 8, type: 'Queja', status: 'Resuelta', createdAt: '2024-01-22' },
  { id: 9, type: 'Queja', status: 'Resuelta', createdAt: '2024-01-23' },
  { id: 10, type: 'Reclamo', status: 'Recibida', createdAt: '2024-01-24' },
  { id: 11, type: 'Reclamo', status: 'En proceso', createdAt: '2024-01-25' },
  { id: 12, type: 'Reclamo', status: 'Resuelta', createdAt: '2024-01-26' },
  { id: 13, type: 'Sugerencia', status: 'Recibida', createdAt: '2024-01-27' },
  { id: 14, type: 'Sugerencia', status: 'En proceso', createdAt: '2024-01-28' },
  { id: 15, type: 'Sugerencia', status: 'Resuelta', createdAt: '2024-01-29' },
  { id: 16, type: 'Sugerencia', status: 'Resuelta', createdAt: '2024-01-30' },
  { id: 17, type: 'Petición', status: 'Recibida', createdAt: '2024-02-01' },
  { id: 18, type: 'Petición', status: 'En proceso', createdAt: '2024-02-02' },
  { id: 19, type: 'Petición', status: 'Resuelta', createdAt: '2024-02-03' },
  { id: 20, type: 'Queja', status: 'Recibida', createdAt: '2024-02-04' },
  { id: 21, type: 'Queja', status: 'En proceso', createdAt: '2024-02-05' },
  { id: 22, type: 'Queja', status: 'Resuelta', createdAt: '2024-02-06' },
  { id: 23, type: 'Reclamo', status: 'Recibida', createdAt: '2024-02-07' },
  { id: 24, type: 'Reclamo', status: 'En proceso', createdAt: '2024-02-08' },
  { id: 25, type: 'Sugerencia', status: 'Resuelta', createdAt: '2024-02-09' },
  { id: 26, type: 'Petición', status: 'Recibida', createdAt: '2024-02-10' },
  { id: 27, type: 'Petición', status: 'En proceso', createdAt: '2024-02-11' },
  { id: 28, type: 'Petición', status: 'Resuelta', createdAt: '2024-02-12' },
  { id: 29, type: 'Queja', status: 'Recibida', createdAt: '2024-02-13' },
  { id: 30, type: 'Queja', status: 'En proceso', createdAt: '2024-02-14' },
  { id: 31, type: 'Queja', status: 'Resuelta', createdAt: '2024-02-15' },
  { id: 32, type: 'Reclamo', status: 'Recibida', createdAt: '2024-02-16' },
  { id: 33, type: 'Reclamo', status: 'En proceso', createdAt: '2024-02-17' },
  { id: 34, type: 'Sugerencia', status: 'Resuelta', createdAt: '2024-02-18' },
  { id: 35, type: 'Petición', status: 'Recibida', createdAt: '2024-02-19' },
  { id: 36, type: 'Petición', status: 'En proceso', createdAt: '2024-02-20' },
  { id: 37, type: 'Petición', status: 'Resuelta', createdAt: '2024-02-21' },
  { id: 38, type: 'Queja', status: 'Recibida', createdAt: '2024-02-22' },
  { id: 39, type: 'Queja', status: 'En proceso', createdAt: '2024-02-23' },
  { id: 40, type: 'Queja', status: 'Resuelta', createdAt: '2024-02-24' },
];

// Generar más datos para llegar a 120 PQRS
for (let i = 41; i <= 120; i++) {
  const types = ['Petición', 'Queja', 'Reclamo', 'Sugerencia'];
  const statuses = ['Recibida', 'En proceso', 'Resuelta'];
  allPQRSData.push({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: `2024-02-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  });
}

const AdminStatistics = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredData, setFilteredData] = useState(allPQRSData);
  const [showNoResults, setShowNoResults] = useState(false);

  const applyFilters = () => {
    let filtered = allPQRSData;

    // Filtrar por tipo
    if (filterType !== 'all') {
      const typeMap: Record<string, string> = {
        'peticion': 'Petición',
        'queja': 'Queja',
        'reclamo': 'Reclamo',
        'sugerencia': 'Sugerencia',
      };
      filtered = filtered.filter(item => item.type === typeMap[filterType]);
    }

    // Filtrar por estado
    if (filterStatus !== 'all') {
      const statusMap: Record<string, string> = {
        'recibida': 'Recibida',
        'en-proceso': 'En proceso',
        'resuelta': 'Resuelta',
      };
      filtered = filtered.filter(item => item.status === statusMap[filterStatus]);
    }

    setFilteredData(filtered);
    setShowNoResults(filtered.length === 0);
  };

  // Calcular métricas basadas en los datos filtrados
  const metrics = {
    byType: [
      { 
        type: 'Petición', 
        count: filteredData.filter(d => d.type === 'Petición').length, 
        color: 'bg-primary' 
      },
      { 
        type: 'Queja', 
        count: filteredData.filter(d => d.type === 'Queja').length, 
        color: 'bg-warning' 
      },
      { 
        type: 'Reclamo', 
        count: filteredData.filter(d => d.type === 'Reclamo').length, 
        color: 'bg-destructive' 
      },
      { 
        type: 'Sugerencia', 
        count: filteredData.filter(d => d.type === 'Sugerencia').length, 
        color: 'bg-success' 
      },
    ],
    byStatus: [
      { 
        status: 'Recibida', 
        count: filteredData.filter(d => d.status === 'Recibida').length, 
        color: 'bg-warning' 
      },
      { 
        status: 'En proceso', 
        count: filteredData.filter(d => d.status === 'En proceso').length, 
        color: 'bg-primary' 
      },
      { 
        status: 'Resuelta', 
        count: filteredData.filter(d => d.status === 'Resuelta').length, 
        color: 'bg-success' 
      },
    ],
    avgResponseTime: '2.5 días',
    totalPQRS: filteredData.length,
  };

  const maxCount = Math.max(...metrics.byType.map(m => m.count), 1);
  const enProceso = metrics.byStatus.find(s => s.status === 'En proceso')?.count || 0;
  const resueltas = metrics.byStatus.find(s => s.status === 'Resuelta')?.count || 0;

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
                <MedicalButton 
                  variant="medical" 
                  className="w-full"
                  onClick={applyFilters}
                >
                  Aplicar Filtros
                </MedicalButton>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {showNoResults ? (
          <MedicalCard variant="elevated">
            <MedicalCardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-lg font-medium text-muted-foreground">
                  No se encontraron resultados para los filtros seleccionados.
                </p>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        ) : (
          <>
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
                      <p className="text-3xl font-bold text-foreground">{enProceso}</p>
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
                      <p className="text-3xl font-bold text-foreground">{resueltas}</p>
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
                        {metrics.totalPQRS > 0 ? ((item.count / metrics.totalPQRS) * 100).toFixed(1) : 0}%
                      </p>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminStatistics;

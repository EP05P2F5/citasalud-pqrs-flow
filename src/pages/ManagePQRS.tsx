import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { MedicalLayout } from "../components/layout/medical-layout";
import { MedicalButton } from "../components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from "../components/ui/medical-card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const ManagePQRS: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPQRS, setSelectedPQRS] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Datos simulados de PQRS
  const pqrsData = [
    {
      id: "PQRS-2024-001",
      type: "Petición",
      title: "Solicitud cambio de horario cita",
      description: "Necesito cambiar mi cita del 20 de diciembre debido a un compromiso laboral imprevisto. Solicito reprogramación para la semana siguiente.",
      category: "Citas Médicas",
      status: "En proceso",
      priority: "Normal",
      createdAt: "2024-12-15T10:30:00Z",
      updatedAt: "2024-12-16T14:20:00Z",
      canEdit: true,
      attachment: "Carta_laboral.pdf",
    },
    {
      id: "PQRS-2024-002",
      type: "Queja",
      title: "Demora en atención especializada",
      description: "He esperado más de 3 horas en consulta externa de cardiología sin recibir atención. La cita estaba programada para las 8:00 AM.",
      category: "Atención al Usuario",
      status: "Resuelta",
      priority: "Alta",
      createdAt: "2024-12-12T08:15:00Z",
      updatedAt: "2024-12-14T16:45:00Z", 
      canEdit: false,
      response: "Estimado usuario, hemos revisado su caso y implementado mejoras en el flujo de atención. Se ha contactado con usted para ofrecer una disculpa formal y reprogramar su cita.",
    },
    {
      id: "PQRS-2024-003",
      type: "Sugerencia",
      title: "Mejora en sistema de recordatorios",
      description: "Sugiero implementar recordatorios por WhatsApp además del SMS para las citas médicas, ya que sería más efectivo y económico.",
      category: "Otros",
      status: "Radicada",
      priority: "Baja",
      createdAt: "2024-12-10T15:22:00Z",
      updatedAt: "2024-12-10T15:22:00Z",
      canEdit: true,
    },
    {
      id: "PQRS-2024-004",
      type: "Reclamo",
      title: "Error en facturación de procedimiento",
      description: "Se me está cobrando un procedimiento que no se realizó según mi historia clínica. El valor facturado no corresponde al servicio recibido.",
      category: "Facturación",
      status: "En proceso",
      priority: "Alta",
      createdAt: "2024-12-08T11:10:00Z",
      updatedAt: "2024-12-12T09:30:00Z",
      canEdit: true,
    },
    {
      id: "PQRS-2024-005",
      type: "Petición",
      title: "Solicitud de historia clínica",
      description: "Necesito copia de mi historia clínica completa para segunda opinión médica. Adjunto autorización firmada.",
      category: "Otros",
      status: "Resuelta",
      priority: "Normal",
      createdAt: "2024-12-05T13:45:00Z",
      updatedAt: "2024-12-07T10:15:00Z",
      canEdit: false,
      attachment: "Autorizacion_firmada.pdf",
      response: "Su historia clínica ha sido enviada por correo certificado a la dirección registrada. Número de radicado: HC-2024-789.",
    },
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Radicada":
        return { 
          variant: "outline" as const, 
          icon: Clock, 
          color: "text-warning" 
        };
      case "En proceso":
        return { 
          variant: "secondary" as const, 
          icon: AlertCircle, 
          color: "text-primary" 
        };
      case "Resuelta":
        return { 
          variant: "default" as const, 
          icon: CheckCircle, 
          color: "text-success" 
        };
      default:
        return { 
          variant: "outline" as const, 
          icon: Clock, 
          color: "text-muted-foreground" 
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "text-destructive";
      case "Normal":
        return "text-warning";
      case "Baja":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredPQRS = pqrsData.filter(pqrs => {
    const matchesSearch = pqrs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pqrs.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || pqrs.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (pqrs: any) => {
    setSelectedPQRS(pqrs);
    setShowDetails(true);
  };

  const handleEdit = (pqrs: any) => {
    if (pqrs.canEdit) {
      navigate(`/pqrs/edit/${pqrs.id}`, { state: { pqrs } });
    }
  };

  return (
    <MedicalLayout
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gestión de PQRS
          </h1>
          <p className="text-muted-foreground">
            Consulte y gestione todas sus peticiones, quejas, reclamos y sugerencias
          </p>
        </div>

        {/* Filtros */}
        <MedicalCard>
          <MedicalCardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por título o número de PQRS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="Radicada">Radicada</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MedicalCard variant="gradient">
            <MedicalCardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {pqrsData.length}
              </p>
              <p className="text-sm text-muted-foreground">Total PQRS</p>
            </MedicalCardContent>
          </MedicalCard>
          
          <MedicalCard>
            <MedicalCardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">
                {pqrsData.filter(p => p.status === "Radicada").length}
              </p>
              <p className="text-sm text-muted-foreground">Radicadas</p>
            </MedicalCardContent>
          </MedicalCard>
          
          <MedicalCard>
            <MedicalCardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {pqrsData.filter(p => p.status === "En proceso").length}
              </p>
              <p className="text-sm text-muted-foreground">En proceso</p>
            </MedicalCardContent>
          </MedicalCard>
          
          <MedicalCard>
            <MedicalCardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">
                {pqrsData.filter(p => p.status === "Resuelta").length}
              </p>
              <p className="text-sm text-muted-foreground">Resueltas</p>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        {/* Lista de PQRS */}
        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>
              Mis Solicitudes ({filteredPQRS.length})
            </MedicalCardTitle>
            <MedicalCardDescription>
              Lista de todas sus PQRS registradas en el sistema
            </MedicalCardDescription>
          </MedicalCardHeader>

          <MedicalCardContent>
            {filteredPQRS.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "No se found PQRS que coincidan con los filtros aplicados"
                    : "No tiene PQRS registradas en el sistema"
                  }
                </p>
                <MedicalButton
                  variant="medical"
                  className="mt-4"
                  onClick={() => navigate("/pqrs/create")}
                >
                  Crear primera PQRS
                </MedicalButton>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPQRS.map((pqrs) => {
                  const statusInfo = getStatusInfo(pqrs.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <div
                      key={pqrs.id}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          {/* Header con ID y tipo */}
                          <div className="flex items-center space-x-3">
                            <h3 className="font-bold text-foreground">{pqrs.id}</h3>
                            <Badge variant="outline" className="text-xs">
                              {pqrs.type}
                            </Badge>
                            <Badge variant={statusInfo.variant} className="text-xs">
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {pqrs.status}
                            </Badge>
                          </div>
                          
                          {/* Título */}
                          <h4 className="text-lg font-medium text-foreground hover:text-primary cursor-pointer"
                              onClick={() => handleViewDetails(pqrs)}>
                            {pqrs.title}
                          </h4>
                          
                          {/* Metadatos */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              Creado: {formatDate(pqrs.createdAt)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              Actualizado: {formatDate(pqrs.updatedAt)}
                            </div>
                            <div className={`font-medium ${getPriorityColor(pqrs.priority)}`}>
                              Prioridad: {pqrs.priority}
                            </div>
                          </div>
                        </div>
                        
                        {/* Acciones */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <MedicalButton variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </MedicalButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(pqrs)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalles
                            </DropdownMenuItem>
                            {pqrs.canEdit && (
                              <DropdownMenuItem onClick={() => handleEdit(pqrs)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" disabled>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </MedicalCardContent>
        </MedicalCard>

        {/* Modal de detalles */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Detalles de PQRS</span>
              </DialogTitle>
              <DialogDescription>
                Información completa de la solicitud seleccionada
              </DialogDescription>
            </DialogHeader>
            
            {selectedPQRS && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Número</p>
                    <p className="font-semibold">{selectedPQRS.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                    <p className="font-semibold">{selectedPQRS.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Estado</p>
                    <Badge variant={getStatusInfo(selectedPQRS.status).variant}>
                      {selectedPQRS.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Prioridad</p>
                    <p className={`font-semibold ${getPriorityColor(selectedPQRS.priority)}`}>
                      {selectedPQRS.priority}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Título</p>
                  <p className="font-semibold">{selectedPQRS.title}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Descripción</p>
                  <p className="text-sm leading-relaxed">{selectedPQRS.description}</p>
                </div>
                
                {selectedPQRS.attachment && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Archivo adjunto</p>
                    <p className="text-sm text-primary">{selectedPQRS.attachment}</p>
                  </div>
                )}
                
                {selectedPQRS.response && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-sm font-medium text-success mb-2">Respuesta</p>
                    <p className="text-sm leading-relaxed">{selectedPQRS.response}</p>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-xs text-muted-foreground">
                    <p>Creado: {formatDate(selectedPQRS.createdAt)}</p>
                    <p>Actualizado: {formatDate(selectedPQRS.updatedAt)}</p>
                  </div>
                  
                  {selectedPQRS.canEdit && (
                    <MedicalButton
                      variant="medical"
                      size="sm"
                      onClick={() => {
                        setShowDetails(false);
                        handleEdit(selectedPQRS);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </MedicalButton>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MedicalLayout>
  );
};

export default ManagePQRS;
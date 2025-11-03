// src/pages/ManagePQRS.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  FileText,
  Calendar,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import { MedicalLayout } from "../components/layout/medical-layout";
import {
  MedicalCard,
  MedicalCardContent,
  MedicalCardDescription,
  MedicalCardHeader,
  MedicalCardTitle,
} from "../components/ui/medical-card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { MedicalButton } from "../components/ui/medical-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { getPQRSByUser, getUsuarioByUsername } from "../services/pqrsService";
import { getCurrentUser } from "../services/authService";

const ManagePQRS: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pqrsList, setPqrsList] = useState<any[]>([]);
  const [selectedPQRS, setSelectedPQRS] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Cargar PQRS del usuario
  // -----------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser?.username) throw new Error("Usuario no autenticado.");

        const usuario = await getUsuarioByUsername(currentUser.username);
        const data = await getPQRSByUser(usuario.idUsuario);
        setPqrsList(data);
      } catch (error) {
        console.error("Error al cargar PQRS:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // -----------------------------
  // Filtros y conteos
  // -----------------------------
  const filteredPQRS = pqrsList.filter((pqrs) => {
    const matchesSearch =
      pqrs.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pqrs.radicado.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || pqrs.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 🔹 Cálculo correcto de los totales
  const totalActivas = pqrsList.filter(
    (p) => p.estado === "Pendiente" || p.estado === "En proceso"
  ).length;

  const totalResueltas = pqrsList.filter(
    (p) => p.estado === "Resuelta" || p.estado === "Cerrada"
  ).length;

  const totalAnuladas = pqrsList.filter((p) => p.estado === "Anulada").length;

  // 🔹 Mapeo de tipo de PQRS
  const tipoPQRSMap: Record<number, string> = {
    1: "Queja",
    2: "Reclamo",
    3: "Sugerencia",
    4: "Petición",
    5: "Felicitación",
  };

  // 🔹 Color dinámico del estado
  const getEstadoColor = (estado: string): string => {
    if (estado === "Pendiente" || estado === "En proceso") return "text-blue-600";
    if (estado === "Resuelta" || estado === "Cerrada") return "text-green-600";
    if (estado === "Anulada") return "text-red-600";
    return "text-muted-foreground";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleViewDetails = (pqrs: any) => {
    setSelectedPQRS(pqrs);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <MedicalLayout>
        <div className="flex justify-center items-center h-full">
          <p className="text-muted-foreground">Cargando PQRS...</p>
        </div>
      </MedicalLayout>
    );
  }

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
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descripción o radicado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En proceso">En proceso</SelectItem>
                    <SelectItem value="Resuelta">Resuelta</SelectItem>
                    <SelectItem value="Cerrada">Cerrada</SelectItem>
                    <SelectItem value="Anulada">Anulada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Cuadros de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MedicalCard>
            <MedicalCardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{totalActivas}</p>
              <p className="text-sm text-muted-foreground">PQRS Activas</p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard>
            <MedicalCardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{totalResueltas}</p>
              <p className="text-sm text-muted-foreground">Resueltas / Cerradas</p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard>
            <MedicalCardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{totalAnuladas}</p>
              <p className="text-sm text-muted-foreground">Anuladas</p>
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
                    ? "No se encontraron PQRS que coincidan con los filtros aplicados"
                    : "No tiene PQRS registradas en el sistema"}
                </p>
                <MedicalButton
                  variant="medical"
                  className="mt-4"
                  onClick={() => navigate("/pqrs/create")}
                >
                  Crear PQRS
                </MedicalButton>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPQRS.map((pqrs) => (
                  <div
                    key={pqrs.idPqrs}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-foreground">
                            {pqrs.radicado}
                          </h3>
                          <Badge
                            variant="outline"
                            className={`text-xs font-medium ${getEstadoColor(pqrs.estado)}`}
                          >
                            {pqrs.estado}
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <Calendar className="inline mr-1 h-3 w-3" />
                          Creado: {formatDate(pqrs.fechaDeGeneracion)}
                        </div>

                        <p className="text-sm font-medium text-foreground">
                          Tipo de PQRS:{" "}
                          <span className="text-muted-foreground">
                            {tipoPQRSMap[pqrs.idTipo] || "Desconocido"}
                          </span>
                        </p>
                      </div>

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
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </MedicalCardContent>
        </MedicalCard>

        {/* Modal de detalles */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles de PQRS</DialogTitle>
              <DialogDescription>
                Información completa de la solicitud seleccionada
              </DialogDescription>
            </DialogHeader>
            {selectedPQRS && (
              <div className="space-y-4">
                <p><strong>Radicado:</strong> {selectedPQRS.radicado}</p>
                <p><strong>Estado:</strong> {selectedPQRS.estado}</p>
                <p><strong>Tipo:</strong> {tipoPQRSMap[selectedPQRS.idTipo] || "Desconocido"}</p>
                <p><strong>Fecha de creación:</strong> {formatDate(selectedPQRS.fechaDeGeneracion)}</p>
                <p><strong>Descripción:</strong> {selectedPQRS.descripcion}</p>
                {selectedPQRS.respuesta && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-sm font-medium text-success mb-2">
                      Respuesta
                    </p>
                    <p className="text-sm leading-relaxed">
                      {selectedPQRS.respuesta}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MedicalLayout>
  );
};

export default ManagePQRS;

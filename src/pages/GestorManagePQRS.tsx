import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GestorLayout } from "@/components/layout/gestor-layout";
import {
  MedicalCard,
  MedicalCardContent,
  MedicalCardHeader,
  MedicalCardTitle,
} from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare } from "lucide-react";
import { getAllPQRS, updatePQRS, PQRSItem } from "@/services/pqrsService";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const GestorManagePQRS = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [pqrsList, setPqrsList] = useState<PQRSItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPQRS, setSelectedPQRS] = useState<PQRSItem | null>(null);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [modalGestion, setModalGestion] = useState(false);

  const [nuevoEstado, setNuevoEstado] = useState<string>("");
  const [respuesta, setRespuesta] = useState<string>("");

  const estados = {
    1: "Pendiente",
    2: "En proceso",
    3: "Resuelta",
    4: "Cerrada",
    5: "Anulada",
  };

  const getEstadoColor = (estado: string): string => {
    if (estado === "Pendiente" || estado === "En proceso")
      return "!text-blue-700 !bg-blue-100";
    if (estado === "Resuelta" || estado === "Cerrada")
      return "!text-green-700 !bg-green-100";
    if (estado === "Anulada")
      return "!text-red-700 !bg-red-100";

    return "!text-gray-700 !bg-gray-100";
  };

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getAllPQRS();
        setPqrsList(data);
      } catch (error) {
        console.error("Error cargando PQRS:", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleAbrirDetalle = (item: PQRSItem) => {
    setSelectedPQRS(item);
    setModalDetalle(true);
  };

  const handleAbrirGestion = (item: PQRSItem) => {
    setSelectedPQRS(item);
    setNuevoEstado(item.estado.idEstado.toString());
    setRespuesta(item.respuesta ?? "");
    setModalGestion(true);
  };

  const handleGuardar = async () => {
    if (!selectedPQRS) return;

    const idEstadoNuevo = Number(nuevoEstado);

    const updated: PQRSItem = {
      ...selectedPQRS,
      estado: {
        idEstado: idEstadoNuevo,
        descripcion: estados[idEstadoNuevo],
      },
      respuesta,
      fechaDeRespuesta:
        respuesta !== ""
          ? new Date().toISOString().split("T")[0]
          : selectedPQRS.fechaDeRespuesta,
    };

    try {
      await updatePQRS(selectedPQRS.idPqrs, updated);
      setModalGestion(false);
      window.location.reload();
    } catch (e) {
      console.error("Error al actualizar PQRS", e);
    }
  };

  return (
    <GestorLayout showSidebar sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestión de PQRS</h1>
          <MedicalButton variant="outline" onClick={() => navigate("/gestor")}>
            Volver al Inicio
          </MedicalButton>
        </div>

        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle>Listado de PQRS</MedicalCardTitle>
          </MedicalCardHeader>

          <MedicalCardContent>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Radicado</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {pqrsList.map((p) => (
                    <TableRow key={p.idPqrs}>
                      <TableCell>{p.radicado}</TableCell>
                      <TableCell>{p.tipo.descripcion}</TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`font-semibold px-2 py-1 rounded ${getEstadoColor(p.estado.descripcion)}`}
                        >
                          {p.estado.descripcion}
                        </Badge>
                      </TableCell>

                      <TableCell>{p.fechaDeGeneracion}</TableCell>

                      <TableCell className="text-right flex gap-2 justify-end">
                        <MedicalButton variant="outline" size="sm" onClick={() => handleAbrirDetalle(p)}>
                          <Eye className="w-4 h-4" />
                        </MedicalButton>

                        <MedicalButton variant="outline" size="sm" onClick={() => handleAbrirGestion(p)}>
                          <MessageSquare className="w-4 h-4" />
                        </MedicalButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </MedicalCardContent>
        </MedicalCard>
      </div>

      {/* MODAL DETALLE */}
      <Dialog open={modalDetalle} onOpenChange={setModalDetalle}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalle PQRS</DialogTitle>
          </DialogHeader>

          {selectedPQRS && (
            <div className="space-y-2">
              <p><b>Radicado:</b> {selectedPQRS.radicado}</p>
              <p><b>Tipo:</b> {selectedPQRS.tipo.descripcion}</p>
              <p><b>Estado:</b> {selectedPQRS.estado.descripcion}</p>
              <p><b>Generada:</b> {selectedPQRS.fechaDeGeneracion}</p>
              <p><b>Descripción:</b> {selectedPQRS.descripcion}</p>
              <p><b>Respuesta:</b> {selectedPQRS.respuesta ?? "Sin respuesta"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL GESTION */}
      <Dialog open={modalGestion} onOpenChange={setModalGestion}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gestionar PQRS</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <Select value={nuevoEstado} onValueChange={setNuevoEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Pendiente</SelectItem>
                <SelectItem value="2">En proceso</SelectItem>
                <SelectItem value="3">Resuelta</SelectItem>
                <SelectItem value="4">Cerrada</SelectItem>
                <SelectItem value="5">Anulada</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Escribe la respuesta..."
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />
          </div>

          <DialogFooter>
            <MedicalButton onClick={handleGuardar}>Guardar Cambios</MedicalButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </GestorLayout>
  );
};

export default GestorManagePQRS;

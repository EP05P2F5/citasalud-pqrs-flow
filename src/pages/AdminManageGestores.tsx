import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Gestor {
  id: number;
  nombre: string;
  tipoIdentificacion: string;
  numeroDocumento: string;
  correo: string;
  estado: string;
  fechaRegistro: string;
  fechaModificacion?: string;
}

const AdminManageGestores: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gestorToDelete, setGestorToDelete] = useState<Gestor | null>(null);
  
  // Cargar gestores desde localStorage o usar datos iniciales
  const [gestores, setGestores] = useState<Gestor[]>(() => {
    const stored = localStorage.getItem('gestores');
    if (stored) {
      return JSON.parse(stored);
    }
    const initialGestores = [
      {
        id: 1,
        nombre: "Carlos Andrés Gómez",
        tipoIdentificacion: "Cédula de Ciudadanía",
        numeroDocumento: "1023456789",
        correo: "carlos.gomez@citasalud.com",
        estado: "Activo",
        fechaRegistro: "2024-01-15",
      },
      {
        id: 2,
        nombre: "María Fernanda López",
        tipoIdentificacion: "Cédula de Ciudadanía",
        numeroDocumento: "1034567890",
        correo: "maria.lopez@citasalud.com",
        estado: "Activo",
        fechaRegistro: "2024-02-20",
      },
      {
        id: 3,
        nombre: "Juan Pablo Martínez",
        tipoIdentificacion: "Cédula de Ciudadanía",
        numeroDocumento: "1045678901",
        correo: "juan.martinez@citasalud.com",
        estado: "Inactivo",
        fechaRegistro: "2024-03-10",
        fechaModificacion: "2024-11-15",
      },
    ];
    localStorage.setItem('gestores', JSON.stringify(initialGestores));
    return initialGestores;
  });

  // Guardar en localStorage cada vez que cambian los gestores
  React.useEffect(() => {
    localStorage.setItem('gestores', JSON.stringify(gestores));
  }, [gestores]);

  const handleDelete = (gestor: Gestor) => {
    setGestorToDelete(gestor);
  };

  const confirmDelete = () => {
    if (gestorToDelete) {
      setGestores((prev) =>
        prev.map((g) =>
          g.id === gestorToDelete.id
            ? { ...g, estado: "Inactivo", fechaModificacion: new Date().toISOString().split("T")[0] }
            : g
        )
      );
      toast({
        title: "Gestor eliminado",
        description: `El gestor ${gestorToDelete.nombre} ha sido marcado como inactivo.`,
      });
      setGestorToDelete(null);
    }
  };

  return (
    <AdminLayout
      showSidebar={true}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestión de Gestores PQRS
            </h1>
            <p className="text-muted-foreground mt-2">
              Administra los gestores del sistema PQRS
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/gestores/create")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Registrar Gestor
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo ID</TableHead>
                <TableHead>N° Documento</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gestores
                .filter((g) => g.estado !== "Inactivo")
                .map((gestor) => (
                  <TableRow key={gestor.id}>
                    <TableCell className="font-medium">{gestor.nombre}</TableCell>
                    <TableCell>{gestor.tipoIdentificacion}</TableCell>
                    <TableCell>{gestor.numeroDocumento}</TableCell>
                    <TableCell>{gestor.correo}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          gestor.estado === "Activo"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {gestor.estado}
                      </span>
                    </TableCell>
                    <TableCell>{gestor.fechaRegistro}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/admin/gestores/edit/${gestor.id}`)}
                          aria-label="Editar gestor"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(gestor)}
                          aria-label="Eliminar gestor"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!gestorToDelete} onOpenChange={() => setGestorToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de eliminar al gestor {gestorToDelete?.nombre}? Esta acción marcará
              al gestor como inactivo en el sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminManageGestores;

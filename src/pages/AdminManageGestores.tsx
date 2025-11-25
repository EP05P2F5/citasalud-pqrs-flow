import React, { useEffect, useState } from "react";
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
import {
  getAllGestores,
  GestorUsuario,
} from "@/services/usuariosService";

const AdminManageGestores: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gestores, setGestores] = useState<GestorUsuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [gestorToDelete, setGestorToDelete] =
    useState<GestorUsuario | null>(null);

  // ----------------------------
  // Cargar gestores reales
  // ----------------------------
  useEffect(() => {
    const cargarGestores = async () => {
      try {
        const data = await getAllGestores();
        setGestores(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los gestores",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    cargarGestores();
  }, []);

  const handleDelete = (gestor: GestorUsuario) => {
    setGestorToDelete(gestor);
  };

  const confirmDelete = () => {
    // ⚠️ Aún no hay endpoint para esto → solo simulamos por ahora.
    if (gestorToDelete) {
      toast({
        title: "Funcionalidad no disponible",
        description:
          "La eliminación de gestores aún no está implementada en el backend.",
      });
      setGestorToDelete(null);
    }
  };

  return (
    <AdminLayout
      showSidebar
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Administración de Gestores PQRS
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

        {/* Tabla */}
        <div className="bg-card rounded-lg shadow border border-border">
          {loading ? (
            <p className="p-4">Cargando gestores...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre completo</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Nickname</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gestores.map((gestor) => (
                  <TableRow key={gestor.idUsuario}>
                    <TableCell className="font-medium">
                      {gestor.idUsuario}
                    </TableCell>

                    <TableCell>
                      {gestor.nombre} {gestor.apellido}
                    </TableCell>

                    <TableCell>{gestor.email}</TableCell>

                    <TableCell>{gestor.nickname}</TableCell>

                    <TableCell>{gestor.rol.descripcion}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            navigate(`/admin/gestores/edit/${gestor.idUsuario}`)
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(gestor)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Modal eliminar */}
      <AlertDialog
        open={!!gestorToDelete}
        onOpenChange={() => setGestorToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que desea eliminar al gestor{" "}
              {gestorToDelete?.nombre} {gestorToDelete?.apellido}?  
              (Aún no habilitado en backend)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminManageGestores;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminEditGestor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Simulación de datos cargados
  const [formData, setFormData] = useState({
    nombre: "Carlos Andrés Gómez",
    tipoIdentificacion: "Cédula de Ciudadanía",
    numeroDocumento: "1023456789",
    correo: "carlos.gomez@citasalud.com",
    estado: "Activo",
    contrasena: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    // Simulación de actualización
    const currentDate = new Date().toISOString().split("T")[0];
    const currentUser = localStorage.getItem("username") || "Administrador";

    toast({
      title: "Gestor actualizado",
      description: `El gestor ${formData.nombre} ha sido actualizado exitosamente. Modificado por ${currentUser} el ${currentDate}.`,
    });

    setTimeout(() => {
      navigate("/admin/gestores");
    }, 1500);
  };

  return (
    <AdminLayout
      showSidebar={true}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/gestores")}
            aria-label="Volver a gestores"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Editar Gestor PQRS
            </h1>
            <p className="text-muted-foreground mt-2">
              Actualice la información del gestor
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow border border-border p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre Completo *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                placeholder="Ej: Carlos Andrés Gómez"
                required
              />
            </div>

            <div>
              <Label htmlFor="tipoIdentificacion">Tipo de Identificación</Label>
              <Input
                id="tipoIdentificacion"
                value={formData.tipoIdentificacion}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Este campo no puede ser modificado
              </p>
            </div>

            <div>
              <Label htmlFor="numeroDocumento">Número de Documento</Label>
              <Input
                id="numeroDocumento"
                value={formData.numeroDocumento}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Este campo no puede ser modificado
              </p>
            </div>

            <div>
              <Label htmlFor="correo">Correo Electrónico *</Label>
              <Input
                id="correo"
                type="email"
                value={formData.correo}
                onChange={(e) => handleChange("correo", e.target.value)}
                placeholder="Ej: gestor@citasalud.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="contrasena">Nueva Contraseña (opcional)</Label>
              <div className="relative">
                <Input
                  id="contrasena"
                  type={showPassword ? "text" : "password"}
                  value={formData.contrasena}
                  onChange={(e) => handleChange("contrasena", e.target.value)}
                  placeholder="Dejar en blanco para mantener la actual"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="estado">Estado *</Label>
              <Select
                value={formData.estado}
                onValueChange={(value) => handleChange("estado", value)}
              >
                <SelectTrigger id="estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Guardar Cambios
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/gestores")}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminEditGestor;

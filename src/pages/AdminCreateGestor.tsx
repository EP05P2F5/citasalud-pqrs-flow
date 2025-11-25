import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createGestor } from "@/services/usuariosService";

const AdminCreateGestor: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    fechaDeNacimiento: "",
    direccion: "",
    telefono: "",
    nickname: "",
    password: "",
    email: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        ...formData,
        rol: { idRol: 2 }, // 🔥 rol gestor por defecto
      };

      const created = await createGestor(body);

      toast({
        title: "Gestor creado",
        description: `El gestor ${created.nombre} fue registrado exitosamente.`,
      });

      navigate("/admin/gestores");
    } catch (error: any) {
      toast({
        title: "Error al crear gestor",
        description: error.message || "No se pudo completar la acción.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout
      showSidebar={true}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="space-y-6 max-w-3xl">
        
        {/* Encabezado */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/gestores")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Registrar Gestor PQRS</h1>
            <p className="text-muted-foreground mt-2">
              Complete el formulario
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow border p-6 space-y-6">

          <div className="space-y-4">

            {/* Nombre */}
            <div>
              <Label>Nombre *</Label>
              <Input
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                required
              />
            </div>

            {/* Apellido */}
            <div>
              <Label>Apellido *</Label>
              <Input
                value={formData.apellido}
                onChange={(e) => handleChange("apellido", e.target.value)}
                required
              />
            </div>

            {/* Fecha nacimiento */}
            <div>
              <Label>Fecha de Nacimiento *</Label>
              <Input
                type="date"
                value={formData.fechaDeNacimiento}
                onChange={(e) => handleChange("fechaDeNacimiento", e.target.value)}
                required
              />
            </div>

            {/* Dirección */}
            <div>
              <Label>Dirección *</Label>
              <Input
                value={formData.direccion}
                onChange={(e) => handleChange("direccion", e.target.value)}
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <Label>Teléfono *</Label>
              <Input
                value={formData.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                required
              />
            </div>

            {/* Nickname */}
            <div>
              <Label>Nickname *</Label>
              <Input
                value={formData.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label>Contraseña *</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">Registrar Gestor</Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/admin/gestores")}
            >
              Cancelar
            </Button>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateGestor;

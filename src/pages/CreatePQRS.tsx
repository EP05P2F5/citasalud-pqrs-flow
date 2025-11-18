// src/pages/CreatePQRS.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowLeft, AlertCircle } from "lucide-react";
import { MedicalLayout } from "../components/layout/medical-layout";
import { MedicalButton } from "../components/ui/medical-button";
import {
  MedicalCard,
  MedicalCardContent,
  MedicalCardDescription,
  MedicalCardHeader,
  MedicalCardTitle,
} from "../components/ui/medical-card";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useToast } from "../hooks/use-toast";
import {
  crearPQRS,
  generarRadicado,
  PQRSRequest,
} from "../services/pqrsService";

const CreatePQRS: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tipoId, setTipoId] = useState<number>(0);
  const [descripcion, setDescripcion] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const session = localStorage.getItem("user");
    if (!session) navigate("/");
  }, [navigate]);

  const validateForm = () => {
    if (!tipoId || !descripcion.trim()) {
      setError("Todos los campos marcados con * son obligatorios.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const radicado = generarRadicado();
    const fechaDeGeneracion = new Date().toISOString();
    
    const pqrs: PQRSRequest = {
      tipoId,
      estadoId: 1, // "Radicada" por defecto
      descripcion,
      fechaDeGeneracion,
      radicado,
    };

    try {
      setIsLoading(true);
      const session = localStorage.getItem("user");
      const token = session ? JSON.parse(session).token : "";
      const userId = session ? JSON.parse(session).id : "";

      // Intentar crear en el backend
      try {
        await crearPQRS(pqrs, token);
      } catch (backendError) {
        console.log("Backend no disponible, guardando localmente");
      }

      // Guardar en localStorage independientemente del backend
      const existingPQRS = localStorage.getItem("userPQRS");
      const pqrsList = existingPQRS ? JSON.parse(existingPQRS) : [];
      
      const newPQRS = {
        id: pqrsList.length + 1,
        radicado,
        tipo: tipos.find(t => t.id === tipoId)?.label || "Desconocido",
        estado: "Radicada",
        fechaCreacion: fechaDeGeneracion,
        descripcion,
        usuarioId: userId,
      };
      
      pqrsList.push(newPQRS);
      localStorage.setItem("userPQRS", JSON.stringify(pqrsList));

      toast({
        title: "✅ PQRS radicada correctamente",
        description: (
          <div className="space-y-1">
            <p>Su solicitud ha sido registrada exitosamente.</p>
            <p className="font-semibold text-foreground mt-1">
              📄 Radicado:{" "}
              <span className="text-primary">{radicado}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Estado: <span className="text-success">Radicada</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Fecha: {new Date(fechaDeGeneracion).toLocaleDateString("es-CO")}
            </p>
          </div>
        ),
        variant: "default",
      });

      setDescripcion("");
      setTipoId(0);

      setTimeout(() => navigate("/dashboard"), 2500);
    } catch (err: any) {
      setError(err.message || "Error al radicar la PQRS.");
    } finally {
      setIsLoading(false);
    }
  };

  const tipos = [
    { id: 4, label: "Petición" },
    { id: 1, label: "Queja" },
    { id: 2, label: "Reclamo" },
    { id: 3, label: "Sugerencia" },
    { id: 5, label: "Felicitación" },
  ];

  return (
    <MedicalLayout
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="flex items-center space-x-4">
          <MedicalButton
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al inicio</span>
          </MedicalButton>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Radicar PQRS
          </h1>
          <p className="text-muted-foreground">
            Diligencie la información para radicar su petición, queja, reclamo o sugerencia.
          </p>
        </div>

        {/* Formulario */}
        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Formulario de PQRS</span>
            </MedicalCardTitle>
            <MedicalCardDescription>
              Todos los campos marcados con * son obligatorios
            </MedicalCardDescription>
          </MedicalCardHeader>

          <MedicalCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo */}
              <div className="space-y-2">
                <Label htmlFor="tipoId">Tipo de PQRS *</Label>
                <Select
                  value={tipoId ? tipoId.toString() : ""}
                  onValueChange={(value) => setTipoId(Number(value))}
                >
                  <SelectTrigger id="tipoId">
                    <SelectValue placeholder="Seleccione el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipos.map((t) => (
                      <SelectItem key={t.id} value={t.id.toString()}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción *</Label>
                <Textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describa su solicitud de manera clara y detallada..."
                  className="min-h-32"
                />
              </div>

              {error && (
                <Alert variant="destructive" role="alert">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <MedicalButton
                  type="submit"
                  variant="medical"
                  size="lg"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Radicando..." : "Radicar PQRS"}
                </MedicalButton>

                <MedicalButton
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none"
                >
                  Cancelar
                </MedicalButton>
              </div>
            </form>
          </MedicalCardContent>
        </MedicalCard>
      </div>
    </MedicalLayout>
  );
};

export default CreatePQRS;

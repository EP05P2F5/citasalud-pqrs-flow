// src/pages/CreatePQRS.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useToast } from "../hooks/use-toast";
import {
  crearPQRS,
  generarRadicado,
  getUsuarioByUsername,
  PQRSRequest,
} from "../services/pqrsService";

const CreatePQRS: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [tipoId, setTipoId] = useState<number>(0);
  const [descripcion, setDescripcion] = useState<string>("");
  const [error, setError] = useState<string>("");

  // 🔹 Verificar sesión y cargar usuario
  useEffect(() => {
    const session = localStorage.getItem("user");
    if (!session) {
      navigate("/");
      return;
    }

    const user = JSON.parse(session);
    const username = user?.username;

    if (!username) {
      setError("No se encontró el usuario actual.");
      return;
    }

    getUsuarioByUsername(username)
      .then((data) => setUsuarioId(data.idUsuario))
      .catch(() =>
        setError("Error al obtener la información del usuario desde el servidor.")
      );
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

    if (!usuarioId) {
      setError("No se pudo obtener el ID del usuario.");
      return;
    }

    if (!validateForm()) return;

    const pqrs: PQRSRequest = {
      usuarioId,
      tipoId,
      estadoId: 1,
      estadoTexto: "Pendiente",
      descripcion,
      fechaDeGeneracion: new Date().toISOString(),
      radicado: generarRadicado(),
      fechaDeRespuesta: null,
      respuesta: null,
    };

    try {
      setIsLoading(true);
      const session = localStorage.getItem("user");
      const token = session ? JSON.parse(session).token : "";

      const response = await crearPQRS(pqrs, token);

      toast({
        title: "✅ PQRS enviada correctamente",
        description: (
          <div className="space-y-1">
            <p>Su solicitud ha sido registrada exitosamente.</p>
            <p className="font-semibold text-foreground mt-1">
              📄 Radicado: <span className="text-primary">{response.radicado}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Conserve este número para consultar el estado de su PQRS.
            </p>
          </div>
        ),
        variant: "default",
      });

      setDescripcion("");
      setTipoId(0);

      // Redirige o muestra mensaje temporal
      setTimeout(() => navigate("/dashboard"), 2500);
    } catch (err: any) {
      setError(err.message || "Error al enviar la PQRS.");
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
            Registrar PQRS
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
              {/* Tipo de PQRS */}
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
                  {isLoading ? "Enviando..." : "Enviar PQRS"}
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

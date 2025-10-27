import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FileText, Upload, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { MedicalLayout } from "../components/layout/medical-layout";
import { MedicalButton } from "../components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from "../components/ui/medical-card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useToast } from "../hooks/use-toast";

const EditPQRS: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Obtener datos de PQRS del state de navegación
  const pqrsData = location.state?.pqrs;

  const [formData, setFormData] = useState({
    id: "",
    type: "",
    title: "",
    description: "",
    category: "",
    priority: "normal",
    attachment: null as File | null,
    status: "",
    createdAt: "",
  });

  const pqrsTypes = [
    { value: "Petición", label: "Petición" },
    { value: "Queja", label: "Queja" },
    { value: "Reclamo", label: "Reclamo" },
    { value: "Sugerencia", label: "Sugerencia" },
  ];

  const categories = [
    { value: "Citas Médicas", label: "Citas Médicas" },
    { value: "Atención al Usuario", label: "Atención al Usuario" },
    { value: "Facturación", label: "Facturación" },
    { value: "Autorizaciones", label: "Autorizaciones" },
    { value: "Medicamentos", label: "Medicamentos" },
    { value: "Otros", label: "Otros" },
  ];

  // Verificar sesión
  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (pqrsData) {
      setFormData({
        id: pqrsData.id,
        type: pqrsData.type,
        title: pqrsData.title,
        description: pqrsData.description,
        category: pqrsData.category,
        priority: pqrsData.priority || "normal",
        attachment: null, // No precargamos archivos existentes
        status: pqrsData.status,
        createdAt: pqrsData.createdAt,
      });
    } else {
      // Si no hay datos, redirigir a gestión de PQRS
      navigate("/pqrs/manage");
    }
  }, [pqrsData, navigate]);

  const handleInputChange = (field: string, value: string) => {
    // Solo permitir editar ciertos campos
    if (field === "type" || field === "description" || field === "attachment") {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      
      // Limpiar error cuando el usuario empiece a escribir
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ""
        }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño del archivo (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          attachment: "El archivo debe ser menor a 10MB"
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        attachment: file
      }));
      
      if (errors.attachment) {
        setErrors(prev => ({
          ...prev,
          attachment: ""
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.type.trim()) {
      newErrors.type = "Debe seleccionar el tipo de PQRS";
    }
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular actualización de PQRS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
    } catch (error) {
      toast({
        title: "Error al actualizar PQRS", 
        description: "Ocurrió un error al procesar su solicitud. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/dashboard");
  };

  const hasErrors = Object.keys(errors).length > 0;

  // Mostrar pantalla de éxito
  if (showSuccess) {
    return (
      <MedicalLayout
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <MedicalCard variant="elevated" className="text-center">
            <MedicalCardContent className="p-8">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-success">
                    Datos actualizados exitosamente
                  </h1>
                  <p className="text-muted-foreground">
                    Su PQRS {formData.id} ha sido actualizada correctamente
                  </p>
                </div>

                <MedicalButton
                  variant="medical"
                  size="lg"
                  onClick={handleBackToHome}
                  className="min-w-48"
                >
                  Volver al inicio
                </MedicalButton>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </MedicalLayout>
    );
  }

  // Verificar si la PQRS puede ser editada
  const canEdit = pqrsData?.canEdit && (pqrsData?.status === "Radicada" || pqrsData?.status === "En proceso");

  if (!canEdit) {
    return (
      <MedicalLayout
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <MedicalCard variant="elevated">
            <MedicalCardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
              <h1 className="text-xl font-bold text-foreground mb-2">
                PQRS no editable
              </h1>
              <p className="text-muted-foreground mb-6">
                Solo es posible editar PQRS en estado "Radicada" o "En proceso"
              </p>
              <MedicalButton
                variant="medical"
                onClick={() => navigate("/pqrs/manage")}
              >
                Volver a mis solicitudes
              </MedicalButton>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </MedicalLayout>
    );
  }

  return (
    <MedicalLayout
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <MedicalButton
            variant="ghost"
            size="sm"
            onClick={() => navigate("/pqrs/manage")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a mis solicitudes</span>
          </MedicalButton>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Editar PQRS
          </h1>
          <p className="text-muted-foreground">
            Modifique los campos permitidos de su solicitud {formData.id}
          </p>
        </div>

        {/* Formulario */}
        <MedicalCard variant="elevated">
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Información de la PQRS</span>
            </MedicalCardTitle>
            <MedicalCardDescription>
              Solo puede editar tipo, descripción y archivo adjunto
            </MedicalCardDescription>
          </MedicalCardHeader>

          <MedicalCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Número de PQRS (solo lectura) */}
                <div className="space-y-2">
                  <Label htmlFor="id">Número de PQRS</Label>
                  <Input
                    id="id"
                    value={formData.id}
                    disabled
                    className="bg-muted text-muted-foreground"
                  />
                </div>

                {/* Estado (solo lectura) */}
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Input
                    id="status"
                    value={formData.status}
                    disabled
                    className="bg-muted text-muted-foreground"
                  />
                </div>
              </div>

              {/* Título (solo lectura) */}
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  disabled
                  className="bg-muted text-muted-foreground"
                />
              </div>

              {/* Tipo de PQRS (editable) */}
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de PQRS *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger id="type" className={errors.type ? "border-destructive" : ""}>
                    <SelectValue placeholder="Seleccione el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {pqrsTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-destructive" role="alert">{errors.type}</p>
                )}
              </div>

              {/* Categoría (solo lectura) */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  value={formData.category}
                  disabled
                  className="bg-muted text-muted-foreground"
                />
              </div>

              {/* Descripción (editable) */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción detallada *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describa detalladamente su petición, queja, reclamo o sugerencia"
                  className={`min-h-32 ${errors.description ? "border-destructive" : ""}`}
                  maxLength={2000}
                />
                {errors.description && (
                  <p className="text-sm text-destructive" role="alert">{errors.description}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {formData.description.length}/2000 caracteres
                </p>
              </div>

              {/* Archivo adjunto (editable) */}
              <div className="space-y-2">
                <Label htmlFor="attachment">Nuevo archivo adjunto (opcional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <div className="space-y-2">
                    <input
                      id="attachment"
                      name="attachment"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    />
                    <label
                      htmlFor="attachment"
                      className="cursor-pointer text-sm text-primary hover:text-primary-hover font-medium"
                    >
                      Haga clic para seleccionar un archivo
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Formatos permitidos: PDF, DOC, DOCX, JPG, PNG, TXT (máx. 10MB)
                    </p>
                    {formData.attachment && (
                      <p className="text-sm text-foreground">
                        Archivo seleccionado: {formData.attachment.name}
                      </p>
                    )}
                  </div>
                </div>
                {errors.attachment && (
                  <p className="text-sm text-destructive" role="alert">{errors.attachment}</p>
                )}
              </div>

              {/* Mensaje de errores generales */}
              {hasErrors && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No es posible actualizar la PQRS - Complete todos los campos requeridos correctamente
                  </AlertDescription>
                </Alert>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <MedicalButton
                  type="submit"
                  variant="medical"
                  size="lg"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Guardando cambios..." : "Guardar cambios"}
                </MedicalButton>
                
                <MedicalButton
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/pqrs/manage")}
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

export default EditPQRS;
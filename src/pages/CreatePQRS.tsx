import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, ArrowLeft, AlertCircle } from "lucide-react";
import { MedicalLayout } from "../components/layout/medical-layout";
import { MedicalButton } from "../components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from "../components/ui/medical-card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useToast } from "../hooks/use-toast";

const CreatePQRS: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Verificar sesión
  useEffect(() => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    navigate('/');
  }
}, [navigate]);

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    category: "",
    priority: "normal",
    attachment: null as File | null,
  });

  const pqrsTypes = [
    { value: "peticion", label: "Petición" },
    { value: "queja", label: "Queja" },
    { value: "reclamo", label: "Reclamo" },
    { value: "sugerencia", label: "Sugerencia" },
  ];

  const categories = [
    { value: "citas", label: "Citas Médicas" },
    { value: "atencion", label: "Atención al Usuario" },
    { value: "facturacion", label: "Facturación" },
    { value: "autorizaciones", label: "Autorizaciones" },
    { value: "medicamentos", label: "Medicamentos" },
    { value: "otros", label: "Otros" },
  ];

  const priorities = [
    { value: "baja", label: "Baja" },
    { value: "normal", label: "Normal" },
    { value: "alta", label: "Alta" },
  ];

  const handleInputChange = (field: string, value: string) => {
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
    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio";
    }
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Debe seleccionar una categoría";
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
      // Simular envío de PQRS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pqrsId = `PQRS-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
      
      toast({
        title: "PQRS enviada exitosamente",
        description: `Su solicitud ${pqrsId} ha sido radicada correctamente`,
        variant: "default",
      });

      // Redirigir a página de confirmación
      navigate("/pqrs/confirmation", { 
        state: { 
          pqrsId,
          type: formData.type,
          title: formData.title 
        }
      });
      
    } catch (error) {
      toast({
        title: "Error al enviar PQRS", 
        description: "Ocurrió un error al procesar su solicitud. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

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
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al inicio</span>
          </MedicalButton>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Solicitar PQRS
          </h1>
          <p className="text-muted-foreground">
            Complete el formulario para radicar su petición, queja, reclamo o sugerencia
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
              Todos los campos marcados con (*) son obligatorios
            </MedicalCardDescription>
          </MedicalCardHeader>

          <MedicalCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tipo de PQRS */}
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

                {/* Categoría */}
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccione la categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive" role="alert">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Título */}
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Ingrese un título descriptivo para su PQRS"
                  className={errors.title ? "border-destructive" : ""}
                  maxLength={200}
                />
                {errors.title && (
                  <p className="text-sm text-destructive" role="alert">{errors.title}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  {formData.title.length}/200 caracteres
                </p>
              </div>

              {/* Descripción */}
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

              {/* Prioridad */}
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Archivo adjunto */}
              <div className="space-y-2">
                <Label htmlFor="attachment">Archivo adjunto (opcional)</Label>
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
                    No es posible enviar la PQRS - Complete todos los campos requeridos correctamente
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
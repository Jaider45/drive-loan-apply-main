import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Upload, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

/**
 * FORMULARIO MODULAR - FÁCIL DE REEMPLAZAR
 * 
 * Para reemplazar este formulario:
 * 1. Con iframe (GoHighLevel): Reemplaza todo el contenido de CardContent con:
 *    <iframe src="TU_URL_GOHIGHLEVEL" className="w-full min-h-[800px]" />
 * 
 * 2. Con formulario POST: Cambia el <form> y añade:
 *    <form action="TU_WEBHOOK_URL" method="POST">
 *    Mantén los campos name="" para cada input
 */

const CreditApplicationForm = () => {
  const [monthlyIncome, setMonthlyIncome] = useState([10000]);
  const [downPayment, setDownPayment] = useState([5000]);
  const navigate = useNavigate();

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [referrer, setReferrer] = useState<string | null>(null);
  const [idPhotoFiles, setIdPhotoFiles] = useState<File[]>([]);
  const [bankStatementFiles, setBankStatementFiles] = useState<File[]>([]);
  const [ssnFiles, setSsnFiles] = useState<File[]>([]);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const r = params.get("ref") || params.get("referrer") || params.get("utm_source") || params.get("agent") || params.get("source");
      if (r) setReferrer(r);
    } catch (err) {
      // no-op in non-browser environments
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (referrer) {
      formData.append("referrer", referrer);
    }

    try {
      setSubmitting(true);
      // Use relative URL; Vite dev server proxies `/api` to the backend (see `vite.config.ts`).
      const res = await fetch(`/api/applications`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
        throw new Error(error.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      toast({ title: "Enviado", description: "Tu aplicación fue enviada correctamente." });
      form.reset();
      setMonthlyIncome([10000]);
      setDownPayment([5000]);
      navigate('/success');
    } catch (error: any) {
      const msg = String(error.message || error || "Error de red");
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("ECONNRESET") || msg.includes("connect")) {
        toast({
          title: "Error de conexión",
          description: "No se pudo conectar al backend. Asegúrate de ejecutar el servidor (ej. `npm run server` o `npm run server:dev`).",
        });
      } else {
        toast({ title: "Error al enviar", description: msg });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="aplicacion" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto card-shadow-lg">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
              Tu Aplicación de Crédito Vehicular
            </CardTitle>
            <CardDescription className="text-lg">
              Completa los siguientes datos para que podamos evaluar tu perfil
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* INICIO DEL FORMULARIO - SECCIÓN REEMPLAZABLE */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Información Personal */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nombre y apellidos *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Juan Pérez"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      defaultValue="+1"
                      className="w-16 md:w-20"
                      disabled
                    />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+123456789"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección personal *</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Nunca vamos a compartir tu información personal con más nadie.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan.perez@ejemplo.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    Nunca vamos a compartir tu información personal con más nadie.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idPhoto">Foto de ID o Pasaporte *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 md:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="idPhoto"
                      name="idPhoto"
                      accept="image/*,application/pdf"
                      multiple
                      required
                      className="sr-only"
                      onChange={(e) => setIdPhotoFiles(Array.from(e.target.files || []))}
                    />
                    <label htmlFor="idPhoto" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Haga clic para elegir archivo(s) o suéltelo(s) aquí
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tamaño límite: 10MB por archivo
                      </p>
                    </label>

                    {idPhotoFiles.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <div className="text-left text-sm font-semibold">Vista previa:</div>
                        <div className="flex flex-wrap gap-4 justify-center">
                          {idPhotoFiles.map((f, i) => (
                            <div key={i} className="relative group">
                              <img
                                src={URL.createObjectURL(f)}
                                alt={`Preview ${i}`}
                                className="h-32 w-auto object-contain rounded-md border border-border shadow-sm"
                                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                              />
                              <div className="text-xs text-muted-foreground mt-1 text-center max-w-[150px] truncate">
                                {f.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Formatos aceptados: JPG, PNG, PDF. Puede subir hasta 2 archivos si es necesario.
                  </p>
                </div>
              </div>

              {/* Información de Empleo */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentInfo">Información de empleo</Label>
                  <Input
                    id="employmentInfo"
                    name="employmentInfo"
                    type="text"
                    placeholder="(Compañía) (Puesto que ocupa) (Tiempo en el puesto)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Especifique nombre de la compañía para la que trabaja, puesto que ocupa y tiempo que lleva en el puesto.
                  </p>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="monthlyIncome">Ingreso mensual total</Label>
                  <div className="pt-2">
                    <Slider
                      id="monthlyIncome"
                      name="monthlyIncome"
                      min={0}
                      max={20000}
                      step={100}
                      value={monthlyIncome}
                      onValueChange={setMonthlyIncome}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0</span>
                      <span className="font-semibold text-foreground">${monthlyIncome[0].toLocaleString()}</span>
                      <span>20000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del Vehículo */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idealCar">Carro ideal</Label>
                  <Input
                    id="idealCar"
                    name="idealCar"
                    type="text"
                  />
                  <p className="text-xs text-muted-foreground">
                    Describa marca y modelo específico o estilo del carro que desea.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankStatements">Últimos 3 estados de cuenta</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 md:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="bankStatements"
                      name="bankStatements"
                      accept=".pdf,image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => setBankStatementFiles(Array.from(e.target.files || []))}
                    />
                    <label htmlFor="bankStatements" className="cursor-pointer flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Haga clic para elegir archivo(s) o suéltelo(s) aquí
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tamaño límite: 10MB por archivo
                      </p>
                    </label>

                    {bankStatementFiles.length > 0 && (
                      <div className="mt-3 text-left text-sm">
                        <div className="font-semibold">Archivos seleccionados:</div>
                        <ul className="list-disc pl-5 mt-1">
                          {bankStatementFiles.map((f, i) => (
                            <li key={i}>{f.name} — {(f.size / 1024).toFixed(0)} KB</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Intente descargarlos desde la aplicación de su banco o tome una captura de pantalla de la primera página de cada uno. Formatos aceptados: PDF, JPG, PNG.
                  </p>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="downPayment">Down payment deseado *</Label>
                  <div className="pt-2">
                    <Slider
                      id="downPayment"
                      name="downPayment"
                      min={0}
                      max={10000}
                      step={100}
                      value={downPayment}
                      onValueChange={setDownPayment}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0</span>
                      <span className="font-semibold text-foreground">${downPayment[0].toLocaleString()}</span>
                      <span>10000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notas Importantes */}
              <div className="space-y-2">
                <Label htmlFor="importantNotes">Notas importantes</Label>
                <Textarea
                  id="importantNotes"
                  name="importantNotes"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Coloque acá cualquier tipo de información importante o aclaración que desee dejarnos saber.
                </p>
              </div>

              {/* Social Security */}
              <div className="space-y-2">
                <Label htmlFor="ssnPhoto">Foto de Social Security Number o ITIN</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 md:p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="ssnPhoto"
                    name="ssnPhoto"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => setSsnFiles(Array.from(e.target.files || []))}
                  />
                  <label htmlFor="ssnPhoto" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Haga clic para elegir archivo(s) o suéltelo(s) aquí
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tamaño límite: 10MB por archivo
                    </p>
                  </label>

                  {ssnFiles.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div className="text-left text-sm font-semibold">Vista previa:</div>
                      <div className="flex flex-wrap gap-4 justify-center">
                        {ssnFiles.map((f, i) => (
                          <div key={i} className="relative group">
                            <img
                              src={URL.createObjectURL(f)}
                              alt={`Preview ${i}`}
                              className="h-32 w-auto object-contain rounded-md border border-border shadow-sm"
                              onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                            />
                            <div className="text-xs text-muted-foreground mt-1 text-center max-w-[150px] truncate">
                              {f.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Formatos aceptados: JPG, PNG, PDF.
                </p>
              </div>

              {/* Botón de Envío */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </div>
            </form>
            {/* FIN DEL FORMULARIO - SECCIÓN REEMPLAZABLE */}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CreditApplicationForm;

import { Clock, FileCheck, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Clock,
      title: "Rápido & Sin Complicaciones",
      description: "Completa tu aplicación en menos de 5 minutos. Sin papeleo interminable."
    },
    {
      icon: FileCheck,
      title: "Evaluación Inmediata",
      description: "Revisamos tu perfil y te damos una respuesta preliminar en minutos."
    },
    {
      icon: Shield,
      title: "Sin Afectar tu Puntaje",
      description: "La evaluación inicial no impacta tu historial crediticio."
    },
    {
      icon: CheckCircle,
      title: "Transparencia Total",
      description: "Conoce todas las opciones disponibles y elige la mejor para ti."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Así es como funciona tu evaluación
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple, transparente y diseñado para ti
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="card-shadow hover:card-shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

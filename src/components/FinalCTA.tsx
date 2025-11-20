import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('aplicacion');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-r from-hero-gradient-start to-hero-gradient-end">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          ¿Listo para dar el siguiente paso?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Tu futuro vehicular te espera. Comienza tu aplicación ahora.
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 shadow-xl"
          onClick={scrollToForm}
        >
          Aplicar Ahora
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;

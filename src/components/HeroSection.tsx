import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-auto-two.jpg";

const HeroSection = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('aplicacion');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-75"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Descubre tu Potencial de<br />
          <span className="text-primary">Crédito Vehicular</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
          Evaluación rápida, sencilla y sin costo.<br />
          ¡Tu próximo vehículo está más cerca!
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg hover:shadow-xl transition-all"
          onClick={scrollToForm}
        >
          Comenzar mi Aplicación
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;

import { Lock, Shield, Building2 } from "lucide-react";

const TrustSection = () => {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">100% Seguro</p>
              <p className="text-sm text-muted-foreground">Conexión cifrada</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Datos Encriptados</p>
              <p className="text-sm text-muted-foreground">Privacidad garantizada</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Bancos Aliados</p>
              <p className="text-sm text-muted-foreground">Red de confianza</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

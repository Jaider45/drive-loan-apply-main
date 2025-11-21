const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">
            Financiera <span className="text-primary">AutoCredit</span>
          </div>
          <p className="text-background/80">
            Tu socio de confianza para el financiamiento vehicular
          </p>
          <div className="flex justify-center gap-4 md:gap-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Términos y Condiciones
            </a>
          </div>
          <div className="text-sm text-background/60 pt-4 border-t border-background/20">
            © {currentYear} Financiera AutoCredit. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

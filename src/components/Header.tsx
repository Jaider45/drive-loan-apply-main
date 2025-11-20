import logo from "@/assets/toyota-logo-hollywood.png";

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <div className="flex items-center">
          <img src={logo} alt="Toyota of Hollywood" className="h-20 w-auto" />
        </div>
      </div>
    </header>
  );
};

export default Header;

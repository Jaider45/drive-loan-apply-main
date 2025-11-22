import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CreditApplicationForm from "@/components/CreditApplicationForm";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <HowItWorks />
        <CreditApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

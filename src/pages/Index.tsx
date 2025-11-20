import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CreditApplicationForm from "@/components/CreditApplicationForm";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import FinalCTA from "@/components/FinalCTA";
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
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

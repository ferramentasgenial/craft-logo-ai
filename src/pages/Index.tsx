
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProcessSteps from "@/components/ProcessSteps";
import PlansPreview from "@/components/PlansPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProcessSteps />
      <PlansPreview />
      <Footer />
    </div>
  );
};

export default Index;

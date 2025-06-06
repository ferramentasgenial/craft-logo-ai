
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Crie logos profissionais com
            <span className="text-primary"> Inteligência Artificial</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transforme sua ideia em uma marca visual impressionante. 
            Simples, rápido e acessível para empreendedores e pequenas empresas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/briefing">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
                Criar Meu Logo Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-gray-300">
              Ver Exemplos
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            ✅ Gratuito para começar • ✅ Download imediato • ✅ Qualidade profissional
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

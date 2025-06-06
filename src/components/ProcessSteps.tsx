
import { FileText, Sparkles, Download } from "lucide-react";

const ProcessSteps = () => {
  const steps = [
    {
      icon: FileText,
      title: "1. Preencha",
      description: "Nos conte sobre sua marca, estilo preferido e suas preferências de cores"
    },
    {
      icon: Sparkles,
      title: "2. Gere",
      description: "Nossa IA cria logos únicos e profissionais baseados nas suas informações"
    },
    {
      icon: Download,
      title: "3. Baixe",
      description: "Baixe seus logos em alta qualidade nos formatos PNG e SVG"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Criar seu logo profissional é mais simples do que você imagina
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Plano Gratuito",
      price: "R$ 0",
      period: "",
      description: "Perfeito para testar nossa plataforma",
      features: [
        "1 logo simples",
        "Download em PNG (resolução padrão)",
        "Processo guiado por IA",
        "Suporte por email",
        "Acesso à galeria de inspirações"
      ],
      limitations: [
        "Apenas 1 logo por conta",
        "Sem variações de design",
        "Sem download em SVG",
        "Marca d'água opcional"
      ],
      cta: "Começar Grátis",
      popular: false,
      highlight: false
    },
    {
      name: "Plano Premium",
      price: "R$ 29",
      period: "pagamento único",
      description: "Ideal para marcas que querem se destacar",
      features: [
        "Logo principal + 3 variações únicas",
        "Downloads em PNG e SVG (alta resolução)",
        "Versão em cores e monocromática",
        "Versão escura para fundos claros",
        "Favicon otimizado (16x16 e 32x32)",
        "Kit de identidade visual básico",
        "Suporte prioritário",
        "Garantia de satisfação de 7 dias"
      ],
      limitations: [],
      cta: "Escolher Premium",
      popular: true,
      highlight: true
    }
  ];

  const faqs = [
    {
      question: "Posso usar o logo para fins comerciais?",
      answer: "Sim! Todos os logos criados podem ser usados comercialmente sem restrições."
    },
    {
      question: "Quanto tempo leva para gerar um logo?",
      answer: "Nosso processo de IA gera logos em poucos minutos após o preenchimento do briefing."
    },
    {
      question: "Posso solicitar alterações no logo?",
      answer: "O plano Premium inclui 3 variações automáticas. Para mudanças específicas, você pode criar um novo briefing."
    },
    {
      question: "Qual a diferença entre PNG e SVG?",
      answer: "PNG é ideal para web e redes sociais. SVG é vetorial, perfeito para impressão e redimensionamento sem perda de qualidade."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planos e Preços
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades. Comece gratuitamente 
            ou desbloqueie todo o potencial com o Premium.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.highlight ? 'border-primary border-2 shadow-xl' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Mais Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Inclui:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitações:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-gray-600 text-sm">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Link to="/briefing" className="block">
                    <Button 
                      className={`w-full mt-6 ${plan.highlight ? 'bg-primary hover:bg-primary/90' : 'bg-gray-900 hover:bg-gray-800'}`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;

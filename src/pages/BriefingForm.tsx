
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BriefingForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    brandName: "",
    slogan: "",
    industry: "",
    colors: [] as string[],
    style: "",
    symbols: "",
    notes: ""
  });

  const colorOptions = [
    { name: "Azul", value: "blue", color: "bg-blue-500" },
    { name: "Verde", value: "green", color: "bg-green-500" },
    { name: "Vermelho", value: "red", color: "bg-red-500" },
    { name: "Roxo", value: "purple", color: "bg-purple-500" },
    { name: "Laranja", value: "orange", color: "bg-orange-500" },
    { name: "Rosa", value: "pink", color: "bg-pink-500" },
    { name: "Preto", value: "black", color: "bg-black" },
    { name: "Cinza", value: "gray", color: "bg-gray-500" }
  ];

  const styleOptions = [
    "Moderno",
    "Minimalista", 
    "Vintage",
    "Tecnológico",
    "Divertido",
    "Elegante",
    "Corporativo",
    "Criativo"
  ];

  const industryOptions = [
    "Tecnologia",
    "Saúde",
    "Educação",
    "Alimentação",
    "Moda",
    "Consultoria",
    "E-commerce",
    "Serviços",
    "Outro"
  ];

  const handleColorToggle = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.brandName.trim()) {
      toast({
        title: "Erro",
        description: "O nome da marca é obrigatório",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    console.log("Enviando dados do briefing:", formData);

    try {
      const response = await fetch("https://testen8n1.app.n8n.cloud/webhook-test/teste-logo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandName: formData.brandName,
          slogan: formData.slogan,
          industry: formData.industry,
          colors: formData.colors,
          style: formData.style,
          symbols: formData.symbols,
          notes: formData.notes,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        // Check if response is an image
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.startsWith("image/")) {
          // Handle binary image response
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          
          // Save logo data to localStorage for now (in a real app, this would go to a database)
          const logoData = {
            id: Date.now(),
            brandName: formData.brandName,
            createdAt: new Date().toISOString(),
            status: "completed",
            imageUrl: imageUrl,
            briefingData: formData
          };
          
          const existingLogos = JSON.parse(localStorage.getItem('userLogos') || '[]');
          existingLogos.push(logoData);
          localStorage.setItem('userLogos', JSON.stringify(existingLogos));
          
          toast({
            title: "Logo criado com sucesso!",
            description: "Seu logo foi gerado. Redirecionando para visualização...",
          });
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          // Handle JSON response (workflow started message)
          toast({
            title: "Briefing enviado!",
            description: "Estamos gerando seu logo. Isso pode levar alguns minutos.",
          });
        }
        
        // Reset form after successful submission
        setFormData({
          brandName: "",
          slogan: "",
          industry: "",
          colors: [],
          style: "",
          symbols: "",
          notes: ""
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar os dados. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </div>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary mr-2" />
                Conte-nos sobre sua marca
              </CardTitle>
              <p className="text-gray-600">
                Preencha as informações abaixo para criarmos o logo perfeito para você
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="brandName" className="text-sm font-medium text-gray-700">
                    Nome da Marca *
                  </Label>
                  <Input
                    id="brandName"
                    value={formData.brandName}
                    onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                    placeholder="Digite o nome da sua marca"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slogan" className="text-sm font-medium text-gray-700">
                    Slogan (opcional)
                  </Label>
                  <Input
                    id="slogan"
                    value={formData.slogan}
                    onChange={(e) => setFormData(prev => ({ ...prev, slogan: e.target.value }))}
                    placeholder="Slogan ou frase marcante"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Área de Atuação
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {industryOptions.map((industry) => (
                      <Button
                        key={industry}
                        type="button"
                        variant={formData.industry === industry ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, industry }))}
                        className="text-xs"
                      >
                        {industry}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Paleta de Cores (selecione até 3)
                  </Label>
                  <div className="grid grid-cols-4 gap-3 mt-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => handleColorToggle(color.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.colors.includes(color.value) 
                            ? 'border-primary shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        disabled={!formData.colors.includes(color.value) && formData.colors.length >= 3}
                      >
                        <div className={`w-6 h-6 rounded-full ${color.color} mx-auto mb-1`}></div>
                        <span className="text-xs text-gray-700">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Estilo Visual
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {styleOptions.map((style) => (
                      <Badge
                        key={style}
                        variant={formData.style === style ? "default" : "outline"}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => setFormData(prev => ({ ...prev, style }))}
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="symbols" className="text-sm font-medium text-gray-700">
                    Ícones ou Símbolos Desejados (opcional)
                  </Label>
                  <Input
                    id="symbols"
                    value={formData.symbols}
                    onChange={(e) => setFormData(prev => ({ ...prev, symbols: e.target.value }))}
                    placeholder="Ex: estrela, folha, engrenagem..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                    Outras Observações (opcional)
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Alguma preferência específica, inspiração ou informação adicional..."
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-3"
                  disabled={isLoading}
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  {isLoading ? "Enviando..." : "Gerar Meu Logo"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BriefingForm;


import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Plus, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserLogo {
  id: number;
  brandName: string;
  createdAt: string;
  status: string;
  imageUrl: string;
  briefingData?: any;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [userLogos, setUserLogos] = useState<UserLogo[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<UserLogo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Load logos from localStorage
    const savedLogos = JSON.parse(localStorage.getItem('userLogos') || '[]');
    setUserLogos(savedLogos);
  }, []);

  const handleDownload = (logo: UserLogo) => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = logo.imageUrl;
    link.download = `${logo.brandName}-logo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado",
      description: "Seu logo está sendo baixado.",
    });
  };

  const handleRequestChanges = (logo: UserLogo) => {
    toast({
      title: "Solicitação enviada",
      description: "Suas alterações foram solicitadas e serão processadas em breve.",
    });
    // In a real app, this would send the request to the backend
  };

  const handleDeleteLogo = (logoId: number) => {
    const updatedLogos = userLogos.filter(logo => logo.id !== logoId);
    setUserLogos(updatedLogos);
    localStorage.setItem('userLogos', JSON.stringify(updatedLogos));
    setIsDialogOpen(false);
    
    toast({
      title: "Logo removido",
      description: "O logo foi removido com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meu Dashboard</h1>
              <p className="text-gray-600 mt-1">Gerencie seus logos e acompanhe seus projetos</p>
            </div>
            
            <Link to="/briefing">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Logo
              </Button>
            </Link>
          </div>

          {/* Current Plan */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Plano Atual</span>
                <Badge variant="secondary">
                  Gratuito
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    Você pode criar logos profissionais gratuitamente
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Acesso completo a todas as funcionalidades da plataforma
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logos Grid */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Meus Logos</h2>
            
            {userLogos.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-gray-400 mb-4">
                    <Plus className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum logo criado ainda
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comece criando seu primeiro logo profissional
                  </p>
                  <Link to="/briefing">
                    <Button className="bg-primary hover:bg-primary/90">
                      Criar Meu Primeiro Logo
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userLogos.map((logo) => (
                  <Card key={logo.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img 
                          src={logo.imageUrl} 
                          alt={`Logo ${logo.brandName}`}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <CardTitle className="text-lg">{logo.brandName}</CardTitle>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {new Date(logo.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                        <Badge variant="secondary">
                          Gratuito
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <Dialog open={isDialogOpen && selectedLogo?.id === logo.id} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => setSelectedLogo(logo)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Visualizar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center justify-between">
                                <span>Logo: {selectedLogo?.brandName}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => selectedLogo && handleDeleteLogo(selectedLogo.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Remover
                                </Button>
                              </DialogTitle>
                            </DialogHeader>
                            
                            {selectedLogo && (
                              <div className="space-y-6">
                                <div className="flex justify-center">
                                  <img 
                                    src={selectedLogo.imageUrl} 
                                    alt={`Logo ${selectedLogo.brandName}`}
                                    className="max-w-full max-h-96 object-contain"
                                  />
                                </div>
                                
                                <div className="flex gap-4 justify-center">
                                  <Button 
                                    onClick={() => handleDownload(selectedLogo)}
                                    className="bg-primary hover:bg-primary/90"
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Baixar Logo
                                  </Button>
                                  
                                  <Button 
                                    variant="outline"
                                    onClick={() => handleRequestChanges(selectedLogo)}
                                  >
                                    Solicitar Alterações
                                  </Button>
                                </div>
                                
                                {selectedLogo.briefingData && (
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Dados do Briefing:</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                      <p><strong>Área:</strong> {selectedLogo.briefingData.industry}</p>
                                      <p><strong>Cores:</strong> {selectedLogo.briefingData.colors.join(', ')}</p>
                                      <p><strong>Estilo:</strong> {selectedLogo.briefingData.style}</p>
                                      {selectedLogo.briefingData.symbols && (
                                        <p><strong>Símbolos:</strong> {selectedLogo.briefingData.symbols}</p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          size="sm" 
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => handleDownload(logo)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Baixar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

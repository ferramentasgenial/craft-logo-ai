
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";

type PlanType = "free" | "premium";

interface UserLogo {
  id: number;
  brandName: string;
  createdAt: string;
  status: string;
  plan: PlanType;
  thumbnail: string;
}

const Dashboard = () => {
  // Mock data - in real app this would come from API/database
  const userLogos: UserLogo[] = [
    {
      id: 1,
      brandName: "TechStart",
      createdAt: "2024-01-15",
      status: "completed",
      plan: "premium",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      brandName: "GreenLeaf Café",
      createdAt: "2024-01-10", 
      status: "completed",
      plan: "free",
      thumbnail: "/placeholder.svg"
    }
  ];

  const currentPlan: PlanType = "free"; // Explicitly type as PlanType

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
                <Badge variant={currentPlan === "premium" ? "default" : "secondary"}>
                  {currentPlan === "premium" ? "Premium" : "Gratuito"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    {currentPlan === "premium" 
                      ? "Você tem acesso completo a todos os recursos"
                      : "Você pode criar 1 logo simples gratuitamente"
                    }
                  </p>
                  {currentPlan === "free" && (
                    <p className="text-sm text-gray-500 mt-1">
                      Upgrade para Premium para desbloquear variações e downloads em SVG
                    </p>
                  )}
                </div>
                
                {currentPlan === "free" && (
                  <Link to="/pricing">
                    <Button variant="outline">
                      Fazer Upgrade
                    </Button>
                  </Link>
                )}
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
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <img 
                          src={logo.thumbnail} 
                          alt={`Logo ${logo.brandName}`}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                      <CardTitle className="text-lg">{logo.brandName}</CardTitle>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {new Date(logo.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                        <Badge variant={logo.plan === "premium" ? "default" : "secondary"}>
                          {logo.plan === "premium" ? "Premium" : "Gratuito"}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Visualizar
                        </Button>
                        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
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

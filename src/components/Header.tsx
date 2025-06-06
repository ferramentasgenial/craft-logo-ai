
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold text-gray-900">LogoCraft</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors">
            Preços
          </Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
            Dashboard
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-gray-600 hover:text-primary">
            Entrar
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Começar Grátis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

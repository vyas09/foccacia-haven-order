import { Button } from "@/components/ui/button";

interface HeaderProps {
  onScrollToSection: (section: string) => void;
}

export const Header = ({ onScrollToSection }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-sage/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-sage">🥖</div>
            <h1 className="text-xl font-bold text-earth-brown">Focaccia Haven</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onScrollToSection('menu')}
              className="text-earth-brown hover:text-sage transition-colors font-medium"
            >
              Menu
            </button>
            <button 
              onClick={() => onScrollToSection('about')}
              className="text-earth-brown hover:text-sage transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => onScrollToSection('contact')}
              className="text-earth-brown hover:text-sage transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          <Button 
            variant="sage" 
            onClick={() => onScrollToSection('menu')}
            className="hidden md:inline-flex"
          >
            Order Now
          </Button>
        </div>
      </div>
    </header>
  );
};
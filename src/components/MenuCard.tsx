import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToOrder: (id: string, quantity: number, name: string, price: number) => void;
}

export const MenuCard = ({ id, name, description, price, image, onAddToOrder }: MenuCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(0, newQuantity);
    setQuantity(validQuantity);
  };

  const handleAddToOrder = () => {
    if (quantity > 0) {
      onAddToOrder(id, quantity, name, price);
      setQuantity(0);
    }
  };

  return (
    <Card className="group hover-lift creative-border transition-all duration-500 bg-warm-white border-sage/20 overflow-hidden relative animate-slide-up">
      <div className="absolute inset-0 bg-gradient-floating opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-brown/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <CardContent className="p-6 relative z-10">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gradient mb-2 group-hover:animate-shimmer">{name}</h3>
            <p className="text-soft-gray text-sm leading-relaxed">{description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-sage group-hover:animate-pulse-glow">${price.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity === 0}
              className="h-8 w-8 rounded-full border-sage/30 hover:bg-sage-light hover:text-warm-white transition-all duration-300 hover:scale-110"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="text-lg font-semibold min-w-[2rem] text-center text-gradient animate-bounce-in">
              {quantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
              className="h-8 w-8 rounded-full border-sage/30 hover:bg-sage-light hover:text-warm-white transition-all duration-300 hover:scale-110"
            >
              <Plus className="h-4 w-4" />
            </Button>
            </div>

            <Button
              variant="sage"
              onClick={handleAddToOrder}
              disabled={quantity === 0}
              className="px-6 hover-lift relative overflow-hidden group"
            >
              <span className="relative z-10">Add to Order</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
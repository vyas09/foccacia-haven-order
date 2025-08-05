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
    <Card className="group hover:shadow-floating transition-all duration-300 bg-warm-white border-sage/20 overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-earth-brown mb-2">{name}</h3>
            <p className="text-soft-gray text-sm leading-relaxed">{description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-sage">${price.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity === 0}
                className="h-8 w-8 rounded-full border-sage/30 hover:bg-sage-light hover:text-warm-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="text-lg font-semibold min-w-[2rem] text-center text-earth-brown">
                {quantity}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-8 w-8 rounded-full border-sage/30 hover:bg-sage-light hover:text-warm-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="sage"
              onClick={handleAddToOrder}
              disabled={quantity === 0}
              className="px-6"
            >
              Add to Order
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
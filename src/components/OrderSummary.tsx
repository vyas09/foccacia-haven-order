import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, X } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  onRemoveItem: (id: string) => void;
  onPlaceOrder: () => void;
  isVisible: boolean;
}

export const OrderSummary = ({ items, onRemoveItem, onPlaceOrder, isVisible }: OrderSummaryProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isVisible || items.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-4 bg-warm-white border-sage/20 shadow-floating">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-earth-brown">
          <ShoppingBag className="h-5 w-5 text-sage" />
          Your Order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-sage/10">
              <div className="flex-1">
                <p className="font-medium text-earth-brown">{item.name}</p>
                <p className="text-sm text-soft-gray">
                  {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sage">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="h-8 w-8 text-soft-gray hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-sage/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-earth-brown">Total:</span>
            <span className="text-2xl font-bold text-sage">${total.toFixed(2)}</span>
          </div>
          
          <Button 
            variant="hero" 
            className="w-full"
            onClick={onPlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
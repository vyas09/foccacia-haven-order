import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuCard } from "@/components/MenuCard";
import { OrderSummary } from "@/components/OrderSummary";
import { Header } from "@/components/Header";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import heroImage from "@/assets/hero-focaccia.jpg";
import classicSandwich from "@/assets/sandwich-classic.jpg";
import mediterraneanSandwich from "@/assets/sandwich-mediterranean.jpg";
import salmonSandwich from "@/assets/sandwich-salmon.jpg";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const menuItems = [
  {
    id: "classic",
    name: "Classic Italian",
    description: "Prosciutto di Parma, fresh mozzarella, arugula, heirloom tomatoes, and basil pesto on house-made rosemary focaccia",
    price: 16.50,
    image: classicSandwich
  },
  {
    id: "mediterranean",
    name: "Mediterranean Garden",
    description: "Roasted eggplant, zucchini, bell peppers, hummus, feta cheese, and fresh herbs on olive focaccia",
    price: 14.75,
    image: mediterraneanSandwich
  },
  {
    id: "salmon",
    name: "Nordic Salmon",
    description: "House-cured salmon, cream cheese, capers, red onion, and fresh dill on everything focaccia",
    price: 18.25,
    image: salmonSandwich
  }
];

const Index = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const menuRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (section: string) => {
    const refs = {
      menu: menuRef,
      about: aboutRef,
      contact: contactRef
    };
    
    refs[section as keyof typeof refs]?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleAddToOrder = (id: string, quantity: number, name: string, price: number) => {
    setOrderItems(prev => {
      const existingItem = prev.find(item => item.id === id);
      if (existingItem) {
        return prev.map(item =>
          item.id === id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id, name, quantity, price }];
    });

    toast({
      title: "Added to order!",
      description: `${quantity} × ${name} added to your order.`,
    });
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your order.",
    });
  };

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) return;
    
    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    toast({
      title: "Order placed successfully!",
      description: `Your order for $${total.toFixed(2)} has been received. We'll contact you soon with pickup details.`,
    });
    
    setOrderItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white via-cream to-sage-light/10">
      <Header onScrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-earth-brown/60 via-transparent to-sage/40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-warm-white mb-6 drop-shadow-lg">
            Artisanal Focaccia
            <span className="block text-cream text-3xl md:text-5xl mt-2">
              Crafted with Love
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-warm-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Handcrafted focaccia sandwiches using locally sourced ingredients and traditional techniques
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => scrollToSection('menu')}
            className="text-lg px-12 py-4"
          >
            Explore Our Menu
          </Button>
        </div>
      </section>

      {/* Menu Section */}
      <section ref={menuRef} className="py-20 bg-warm-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-4">
              Our Signature Sandwiches
            </h2>
            <p className="text-lg text-soft-gray max-w-2xl mx-auto">
              Each sandwich is carefully crafted with fresh, premium ingredients on our house-made focaccia bread
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {menuItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    {...item}
                    onAddToOrder={handleAddToOrder}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary
                items={orderItems}
                onRemoveItem={handleRemoveItem}
                onPlaceOrder={handlePlaceOrder}
                isVisible={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-soft-gray leading-relaxed">
              <p>
                Born from a passion for authentic Italian cuisine and Scandinavian simplicity, 
                Focaccia Haven brings together the best of both worlds in the heart of the metropolitan area.
              </p>
              <p>
                Every morning, we hand-knead our focaccia dough using traditional techniques passed down 
                through generations. We source our ingredients locally, supporting our community while 
                ensuring the freshest flavors in every bite.
              </p>
              <p>
                Our cozy kitchen operates on the principle of hygge – finding joy in simple, 
                beautiful things. Each sandwich is not just a meal, but a moment of comfort and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 bg-warm-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-earth-brown mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-soft-gray">
              Ready to place an order or have questions? We'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="bg-cream border-sage/20 shadow-soft">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-earth-brown mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-sage" />
                    <span className="text-soft-gray">(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-sage" />
                    <span className="text-soft-gray">hello@focacciahaven.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-5 w-5 text-sage" />
                    <span className="text-soft-gray">Downtown Metropolitan Area</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-sage" />
                    <span className="text-soft-gray">Tue-Sun: 9AM-6PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-sage text-warm-white shadow-floating">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Order by Phone</h3>
                <p className="text-sage-light mb-6 leading-relaxed">
                  Call us directly to place your order or discuss custom catering options. 
                  We're here to make your focaccia dreams come true!
                </p>
                <Button 
                  variant="cream" 
                  size="lg" 
                  className="w-full"
                >
                  Call to Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-earth-brown text-cream">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🥖</span>
            <span className="text-xl font-bold">Focaccia Haven</span>
          </div>
          <p className="text-soft-gray">
            Handcrafted with love in the metropolitan area
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
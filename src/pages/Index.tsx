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
    <div className="min-h-screen bg-gradient-to-br from-warm-white via-cream to-sage-light/10 relative overflow-x-hidden">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-floating rounded-full animate-float opacity-30"></div>
        <div className="absolute top-96 right-20 w-24 h-24 bg-gradient-floating rounded-full animate-float opacity-20" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-96 left-1/4 w-40 h-40 bg-gradient-floating rounded-full animate-float opacity-25" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Header onScrollToSection={scrollToSection} />
      
      {/* Creative Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-earth-brown/60 via-transparent to-sage/40"></div>
          <div className="absolute inset-0 bg-creative-mesh opacity-10"></div>
        </div>
        
        {/* Floating bread icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 text-6xl animate-float opacity-20">🥖</div>
          <div className="absolute top-1/3 right-16 text-4xl animate-float opacity-15" style={{ animationDelay: '1s' }}>🍞</div>
          <div className="absolute bottom-1/4 left-1/4 text-5xl animate-float opacity-25" style={{ animationDelay: '3s' }}>🥐</div>
          <div className="absolute bottom-1/3 right-1/4 text-3xl animate-float opacity-20" style={{ animationDelay: '2s' }}>🌿</div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-slide-up">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-warm-white mb-4 drop-shadow-lg">
              <span className="inline-block animate-bounce-in">Artisanal</span>{" "}
              <span className="text-gradient bg-gradient-to-r from-cream to-sage-light inline-block animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                Focaccia
              </span>
            </h1>
            <div className="text-3xl md:text-5xl text-cream mt-2 animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <span className="relative">
                Crafted with Love
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cream to-transparent animate-shimmer"></div>
              </span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-warm-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up glass-effect p-6 rounded-2xl" style={{ animationDelay: '0.6s' }}>
            Handcrafted focaccia sandwiches using locally sourced ingredients and traditional techniques
          </p>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => scrollToSection('menu')}
              className="text-lg px-12 py-4 hover-lift animate-pulse-glow relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Our Menu</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Button>
          </div>
        </div>
      </section>

      {/* Creative Menu Section */}
      <section ref={menuRef} className="py-20 bg-warm-white relative">
        <div className="absolute inset-0 bg-creative-mesh opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block relative mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Our Signature Sandwiches
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-sage to-cream rounded-full"></div>
            </div>
            <p className="text-lg text-soft-gray max-w-2xl mx-auto glass-effect p-6 rounded-xl creative-border">
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

      {/* Creative About Section */}
      <section ref={aboutRef} className="py-20 bg-gradient-warm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-floating opacity-30"></div>
        <div className="absolute top-10 right-10 text-8xl opacity-10 animate-float">🍃</div>
        <div className="absolute bottom-20 left-10 text-6xl opacity-15 animate-float" style={{ animationDelay: '2s' }}>🌾</div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Our Story
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-sage to-earth-brown mx-auto rounded-full"></div>
            </div>
            <div className="glass-effect p-8 rounded-3xl creative-border animate-slide-up space-y-6 text-lg text-soft-gray leading-relaxed">
              <h3 className="text-2xl font-bold text-gradient flex items-center gap-3">
                <span className="animate-float">💝</span>
                One Dish. Endless Heart.
              </h3>
              <p className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Welcome to a place where less is truly more.
              </p>
              <p className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                At our restaurant, we serve just one dish—crafted with care, perfected with passion, and made to nourish both body and soul.
              </p>
              <p className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                What started as a break from the corporate grind has turned into a commitment:<br />
                <span className="text-sage font-medium">to serve warmth, simplicity, and sincerity—one plate at a time.</span>
              </p>
              <p className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                There's no menu, no fuss—just one honest dish we believe in.<br />
                <span className="text-gradient font-semibold">It's not just food. It's a feeling.</span>
              </p>
              <p className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                From the heart. For your health. Always hot. Always home.
              </p>
              <div className="animate-slide-up pt-4 border-t border-sage/20" style={{ animationDelay: '0.6s' }}>
                <p className="text-sage font-medium">
                  Cheers,<br />
                  <span className="text-2xl font-bold text-gradient">Vikki</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Contact Section */}
      <section ref={contactRef} className="py-20 bg-warm-white relative">
        <div className="absolute inset-0 bg-creative-mesh opacity-5"></div>
        <div className="absolute top-20 left-20 text-7xl opacity-10 animate-float">📞</div>
        <div className="absolute bottom-20 right-20 text-6xl opacity-15 animate-float" style={{ animationDelay: '1s' }}>✉️</div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Get in Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-sage to-cream mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-soft-gray glass-effect p-4 rounded-xl inline-block">
              Ready to place an order or have questions? We'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="bg-cream border-sage/20 shadow-soft hover-lift creative-border animate-slide-up">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gradient mb-6 flex items-center gap-3">
                  <span className="animate-float">📋</span>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-sage" />
                    <span className="text-soft-gray">00000000</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-sage" />
                    <span className="text-soft-gray">Wich@foccaciahaven.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-5 w-5 text-sage" />
                    <a 
                      href="https://maps.app.goo.gl/Yyk7R6Z15rwnrvnd7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-soft-gray hover:text-sage transition-colors underline"
                    >
                      View Location on Maps
                    </a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-sage" />
                    <span className="text-soft-gray">Tue-Sun: 9AM-6PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-sage text-warm-white shadow-floating hover-lift animate-pulse-glow animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                  <span className="animate-float">📱</span>
                  Order by Phone
                </h3>
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
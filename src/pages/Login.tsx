
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, LogIn, User } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(phoneNumber, password);
      
      if (success) {
        toast.success("Connexion réussie");
        navigate('/');
      } else {
        toast.error("Numéro de téléphone ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast.error("Une erreur s'est produite lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    setPhoneNumber(inputValue);
  };

  const washingMachineImages = [
    "/lovable-uploads/ac221dbd-5f09-4843-8e79-39caa60fc210.png",
    "/lovable-uploads/56d56d7c-353e-4e2f-a665-e8a7ccda8e44.png",
    "/lovable-uploads/632c6802-7abe-4a16-a47f-e91e41185952.png",
    "https://images.unsplash.com/photo-1626806787461-102c1a78d090?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&auto=format&fit=crop"
  ];

  if (isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/f6582c52-16f3-406c-87af-eae3b595a041.png" 
            alt="Laverie Moderne Forndi" 
            className="h-32 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/240x120?text=Laverie+Moderne+Forndi";
            }}
          />
        </div>

        <div className="w-full max-w-md mb-8 relative">
          <Carousel className="w-full">
            <CarouselContent>
              {washingMachineImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 h-48">
                    <img 
                      src={img} 
                      alt={`Machine à laver ${index + 1}`} 
                      className="w-full h-full object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/400x200?text=Image+non+disponible";
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-laundry-100 flex items-center justify-center">
                  <LogIn className="h-6 w-6 text-laundry-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Connexion</CardTitle>
              <CardDescription className="text-center">
                Entrez vos identifiants pour accéder à votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="phone" 
                      placeholder="" 
                      className="pl-10" 
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      type="tel"
                      maxLength={10}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="password" 
                      type="password" 
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-gray-500 text-center">
                Cette application est réservée au personnel de LAVERIE MODERNE FORNDI.
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, LogIn, User } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(phoneNumber, password);
    
    if (success) {
      toast.success("Connexion réussie");
      navigate('/');
    } else {
      toast.error("Numéro de téléphone ou mot de passe incorrect");
    }
  };

  const washingMachineImages = [
    "https://images.unsplash.com/photo-1626806787461-102c1a78d090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12">
        <div className="mb-8">
          <img 
            src="https://via.placeholder.com/240x120?text=Laverie+Moderne+Forndi" 
            alt="Laverie Moderne Forndi" 
            className="h-24 object-contain"
          />
        </div>

        <div className="w-full max-w-md mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {washingMachineImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 h-48">
                    <img 
                      src={img} 
                      alt={`Machine à laver ${index + 1}`} 
                      className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
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
                      placeholder="0600000000" 
                      className="pl-10" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">Se connecter</Button>
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

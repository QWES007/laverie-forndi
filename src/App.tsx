
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import PressingService from "./pages/services/pressing";
import NouvelleCommande from "./pages/services/pressing/NouvelleCommande";
import ListeCommandes from "./pages/services/pressing/ListeCommandes";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/products" 
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute adminOnly>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/services/pressing" 
              element={
                <ProtectedRoute>
                  <PressingService />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/services/pressing/nouvelle-commande" 
              element={
                <ProtectedRoute>
                  <NouvelleCommande />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/services/pressing/commandes" 
              element={
                <ProtectedRoute>
                  <ListeCommandes />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

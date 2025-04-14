
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Package, ArrowLeft } from "lucide-react";

const ListeCommandes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tous");
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-4" 
            onClick={() => navigate("/services/pressing")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-laundry-700">Commandes de pressing</h1>
            <p className="text-gray-600 mt-1">Consultez et gérez toutes vos commandes</p>
          </div>
        </div>
        
        <Tabs defaultValue="tous" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-4 h-auto space-x-1 bg-muted/20 p-1">
            <TabsTrigger value="tous" className="data-[state=active]:bg-white">
              Toutes
            </TabsTrigger>
            <TabsTrigger value="en_cours" className="data-[state=active]:bg-white">
              En cours
            </TabsTrigger>
            <TabsTrigger value="pret" className="data-[state=active]:bg-white">
              Prêtes
            </TabsTrigger>
            <TabsTrigger value="livre" className="data-[state=active]:bg-white">
              Livrées
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tous" className="mt-6">
            <EmptyOrdersState navigate={navigate} />
          </TabsContent>
          
          <TabsContent value="en_cours" className="mt-6">
            <EmptyOrdersState navigate={navigate} />
          </TabsContent>
          
          <TabsContent value="pret" className="mt-6">
            <EmptyOrdersState navigate={navigate} />
          </TabsContent>
          
          <TabsContent value="livre" className="mt-6">
            <EmptyOrdersState navigate={navigate} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const EmptyOrdersState = ({ navigate }) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg border">
      <Package className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune commande</h3>
      <p className="mt-2 text-gray-500">Il n'y a aucune commande correspondant à vos critères</p>
      <Button 
        className="mt-6" 
        onClick={() => navigate("/services/pressing/nouvelle-commande")}
      >
        Créer une nouvelle commande
      </Button>
    </div>
  );
};

export default ListeCommandes;

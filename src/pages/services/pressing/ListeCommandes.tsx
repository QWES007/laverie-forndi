import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Clock, Package, Eye } from "lucide-react";
import OrderDetail from "./components/OrderDetail";

const commandesData = [
  {
    id: "CMD-230422-0045",
    client: "Martin Dupont",
    date: new Date(2023, 3, 22),
    retrait: new Date(2023, 3, 24),
    statut: "en_cours",
    montant: 2500,
    articles: 3
  },
  {
    id: "CMD-230421-0089",
    client: "Sophie Martin",
    date: new Date(2023, 3, 21),
    retrait: new Date(2023, 3, 23),
    statut: "pret",
    montant: 1800,
    articles: 2
  },
  {
    id: "CMD-230420-0032",
    client: "Jean Lefebvre",
    date: new Date(2023, 3, 20),
    retrait: new Date(2023, 3, 22),
    statut: "livre",
    montant: 3200,
    articles: 4
  },
  {
    id: "CMD-230422-0046",
    client: "Camille Dubois",
    date: new Date(2023, 3, 22),
    retrait: new Date(2023, 3, 25),
    statut: "en_cours",
    montant: 4500,
    articles: 5
  },
  {
    id: "CMD-230419-0021",
    client: "Thomas Moreau",
    date: new Date(2023, 3, 19),
    retrait: new Date(2023, 3, 21),
    statut: "livre",
    montant: 1200,
    articles: 1
  }
];

const groupCommandesByDate = (commandes) => {
  const grouped = {};
  
  commandes.forEach(cmd => {
    const dateKey = format(cmd.date, 'yyyy-MM-dd');
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(cmd);
  });
  
  return Object.entries(grouped)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()) // Sort by date (newest first)
    .map(([dateStr, cmds]) => ({
      date: new Date(dateStr),
      commandes: cmds
    }));
};

const getStatusIcon = (statut) => {
  switch (statut) {
    case "en_cours":
      return <Clock className="h-4 w-4" />;
    case "pret":
      return <Package className="h-4 w-4" />;
    case "livre":
      return <Check className="h-4 w-4" />;
    default:
      return null;
  }
};

const getStatusBadge = (statut) => {
  switch (statut) {
    case "en_cours":
      return (
        <Badge variant="outline" className="bg-laundry-100 text-laundry-600 border-laundry-200">
          {getStatusIcon(statut)} <span className="ml-1">En cours</span>
        </Badge>
      );
    case "pret":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200">
          {getStatusIcon(statut)} <span className="ml-1">Prêt</span>
        </Badge>
      );
    case "livre":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200">
          {getStatusIcon(statut)} <span className="ml-1">Livré</span>
        </Badge>
      );
    default:
      return null;
  }
};

const ListeCommandes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tous");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  
  const filteredCommandes = commandesData.filter(cmd => {
    if (activeTab === "tous") return true;
    return cmd.statut === activeTab;
  });
  
  const groupedCommandes = groupCommandesByDate(filteredCommandes);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setOrderDetailOpen(true);
  };

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
            <OrdersContent groupedCommandes={groupedCommandes} navigate={navigate} onOrderClick={handleOrderClick} />
          </TabsContent>
          
          <TabsContent value="en_cours" className="mt-6">
            <OrdersContent groupedCommandes={groupedCommandes} navigate={navigate} onOrderClick={handleOrderClick} />
          </TabsContent>
          
          <TabsContent value="pret" className="mt-6">
            <OrdersContent groupedCommandes={groupedCommandes} navigate={navigate} onOrderClick={handleOrderClick} />
          </TabsContent>
          
          <TabsContent value="livre" className="mt-6">
            <OrdersContent groupedCommandes={groupedCommandes} navigate={navigate} onOrderClick={handleOrderClick} />
          </TabsContent>
        </Tabs>

        <OrderDetail
          open={orderDetailOpen}
          onOpenChange={setOrderDetailOpen}
          order={selectedOrder}
        />
      </div>
    </Layout>
  );
};

const OrdersContent = ({ groupedCommandes, navigate, onOrderClick }) => {
  return groupedCommandes.length > 0 ? (
    <div className="space-y-8">
      {groupedCommandes.map((group, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border">
          <div className="bg-gray-50 px-4 py-3 rounded-t-lg border-b">
            <h3 className="font-medium text-gray-700">
              {format(group.date, 'EEEE dd MMMM yyyy', { locale: fr })}
            </h3>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Retrait prévu</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.commandes.map((commande) => (
                <TableRow key={commande.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">{commande.id}</TableCell>
                  <TableCell>{commande.client}</TableCell>
                  <TableCell>{format(commande.retrait, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{commande.articles}</TableCell>
                  <TableCell>{commande.montant} FCFA</TableCell>
                  <TableCell>{getStatusBadge(commande.statut)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => onOrderClick(commande)}
                    >
                      <span className="sr-only">Voir les détails</span>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ) : (
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

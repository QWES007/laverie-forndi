
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shirt, Plus, Minus, ArrowRight, Trash2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { initialClothingItems, availableColors, availablePatterns, formatPrice } from "@/components/settings/clothing/types";
import CommandeReceipt from "./components/CommandeReceipt";

type Vetement = {
  id: string;
  type: string;
  prix: number;
  quantite: number;
  total: number;
  couleur?: string;
  motif?: string;
  notes?: string;
};

type Client = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
};

const NouvelleCommande = () => {
  const [panier, setPanier] = useState<Vetement[]>([]);
  const [dateRetrait, setDateRetrait] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [clientData, setClientData] = useState<Client | null>(null);
  const navigate = useNavigate();

  const form = useForm<Client>({
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
    },
  });

  useEffect(() => {
    // Générer un numéro de commande aléatoire
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    setOrderId(`CMD-${date}-${random}`);

    // Définir la date de retrait par défaut (aujourd'hui + 2 jours)
    const today = new Date();
    today.setDate(today.getDate() + 2);
    setDateRetrait(today.toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    // Calculer le total du panier
    const nouveauTotal = panier.reduce((acc, item) => acc + item.total, 0);
    setTotal(nouveauTotal);
  }, [panier]);

  const ajouterVetement = (id: string) => {
    const vetement = initialClothingItems.find(v => v.id === id);
    if (!vetement) return;

    const existant = panier.find(item => item.id === id);
    if (existant) {
      setPanier(panier.map(item => {
        if (item.id === id) {
          const newQuantite = item.quantite + 1;
          return { ...item, quantite: newQuantite, total: item.prix * newQuantite };
        }
        return item;
      }));
    } else {
      setPanier([...panier, { 
        id: vetement.id, 
        type: vetement.name,
        prix: vetement.price, // Changed from "prix" to "price" to match the property in ClothingItem
        quantite: 1, 
        total: vetement.price, // Changed from "prix" to "price" to match the property in ClothingItem
        couleur: vetement.colors[0] || "Blanc", // Première couleur disponible ou Blanc par défaut
        motif: vetement.patterns[0] || "Uni", // Premier motif disponible ou Uni par défaut
        notes: ""
      }]);
    }
  };

  const diminuerVetement = (id: string) => {
    const existant = panier.find(item => item.id === id);
    if (!existant) return;

    if (existant.quantite === 1) {
      setPanier(panier.filter(item => item.id !== id));
    } else {
      setPanier(panier.map(item => {
        if (item.id === id) {
          const newQuantite = item.quantite - 1;
          return { ...item, quantite: newQuantite, total: item.prix * newQuantite };
        }
        return item;
      }));
    }
  };

  const supprimerVetement = (id: string) => {
    setPanier(panier.filter(item => item.id !== id));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRetrait(e.target.value);
  };

  const modifierCouleur = (id: string, couleur: string) => {
    setPanier(panier.map(item => {
      if (item.id === id) {
        return { ...item, couleur };
      }
      return item;
    }));
  };

  const modifierMotif = (id: string, motif: string) => {
    setPanier(panier.map(item => {
      if (item.id === id) {
        return { ...item, motif };
      }
      return item;
    }));
  };

  const modifierNotes = (id: string, notes: string) => {
    setPanier(panier.map(item => {
      if (item.id === id) {
        return { ...item, notes };
      }
      return item;
    }));
  };

  const onSubmit = (data: Client) => {
    if (panier.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter au moins un vêtement",
        variant: "destructive"
      });
      return;
    }

    const commande = {
      client: data,
      panier,
      total,
      dateCommande: new Date().toISOString(),
      dateRetrait,
      orderId,
    };

    console.log("Commande enregistrée:", commande);
    toast({
      title: "Succès",
      description: "Commande enregistrée avec succès!",
    });

    // Afficher le reçu
    setClientData(data);
    setShowReceipt(true);
  };

  if (showReceipt && clientData) {
    return (
      <CommandeReceipt
        client={clientData}
        panier={panier}
        total={total}
        dateRetrait={dateRetrait}
        orderId={orderId}
        onClose={() => {
          setShowReceipt(false);
          navigate("/services/pressing");
        }}
      />
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-laundry-700 mb-8">Nouvelle Commande - Pressing</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Colonne de gauche: Informations client */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-laundry-600">Informations Client</CardTitle>
                <CardDescription>N° Commande: {orderId}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...form.register("nom")} placeholder="Nom du client" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...form.register("prenom")} placeholder="Prénom du client" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input {...form.register("telephone")} placeholder="Numéro de téléphone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...form.register("email")} placeholder="Adresse email" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Date de retrait</FormLabel>
                      <FormControl>
                        <Input type="date" value={dateRetrait} onChange={handleDateChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-laundry-600">Types de Vêtements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {initialClothingItems.map((vetement) => (
                    <Button
                      key={vetement.id}
                      variant="outline"
                      className="flex flex-col h-auto py-3 hover:bg-laundry-50"
                      onClick={() => ajouterVetement(vetement.id)}
                    >
                      <Shirt className="mb-1 h-5 w-5 text-laundry-600" />
                      <span className="text-sm">{vetement.name}</span>
                      <span className="text-xs text-gray-500 mt-1">{formatPrice(vetement.price)}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne de droite: Panier */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-laundry-600">Détails de la Commande</CardTitle>
                <CardDescription>Articles sélectionnés</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead className="text-center">Prix</TableHead>
                      <TableHead className="text-center">Qté</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Détails</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {panier.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                          Aucun article ajouté
                        </TableCell>
                      </TableRow>
                    ) : (
                      panier.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.type}</TableCell>
                          <TableCell className="text-center">{formatPrice(item.prix)}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => diminuerVetement(item.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantite}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => ajouterVetement(item.id)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatPrice(item.total)}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 text-xs">
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Couleur:</span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                      {item.couleur}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48">
                                    {availableColors.map((couleur) => (
                                      <DropdownMenuItem 
                                        key={couleur} 
                                        onClick={() => modifierCouleur(item.id, couleur)}
                                      >
                                        {couleur}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">Motif:</span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                      {item.motif}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48">
                                    {availablePatterns.map((motif) => (
                                      <DropdownMenuItem 
                                        key={motif} 
                                        onClick={() => modifierMotif(item.id, motif)}
                                      >
                                        {motif}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <div className="mt-1">
                                <Input 
                                  placeholder="Notes supplémentaires" 
                                  value={item.notes} 
                                  onChange={(e) => modifierNotes(item.id, e.target.value)}
                                  className="h-6 text-xs"
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-500"
                              onClick={() => supprimerVetement(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-laundry-700">{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/services/pressing")}>
                  Annuler
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)}>
                  Enregistrer la commande <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NouvelleCommande;

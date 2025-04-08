import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shirt, Plus, Minus, ArrowRight, Trash2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

// Types de vêtements et leurs prix
const vetements = [
  { id: 1, type: "Chemise", prix: 6.50, icon: Shirt },
  { id: 2, type: "Pantalon", prix: 8.00, icon: Shirt },
  { id: 3, type: "Costume 2 pièces", prix: 15.00, icon: Shirt },
  { id: 4, type: "Costume 3 pièces", prix: 22.00, icon: Shirt },
  { id: 5, type: "Robe", prix: 12.00, icon: Shirt },
  { id: 6, type: "Jupe", prix: 7.50, icon: Shirt },
  { id: 7, type: "Manteau", prix: 14.00, icon: Shirt },
  { id: 8, type: "Blouson", prix: 12.00, icon: Shirt },
  { id: 9, type: "Imperméable", prix: 13.50, icon: Shirt },
  { id: 10, type: "Pull", prix: 7.00, icon: Shirt },
  { id: 11, type: "Gilet", prix: 6.00, icon: Shirt },
  { id: 12, type: "Cravate", prix: 4.50, icon: Shirt },
  { id: 13, type: "Écharpe", prix: 5.00, icon: Shirt },
  { id: 14, type: "Couette", prix: 25.00, icon: Shirt },
  { id: 15, type: "Couverture", prix: 18.00, icon: Shirt },
];

type Vetement = {
  id: number;
  type: string;
  prix: number;
  quantite: number;
  total: number;
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

  const ajouterVetement = (id: number) => {
    const vetement = vetements.find(v => v.id === id);
    if (!vetement) return;

    const existant = panier.find(item => item.id === id);
    if (existant) {
      setPanier(panier.map(item => {
        if (item.id === id) {
          const newQuantite = item.quantite + 1;
          return { ...item, quantite: newQuantite, total: vetement.prix * newQuantite };
        }
        return item;
      }));
    } else {
      setPanier([...panier, { ...vetement, quantite: 1, total: vetement.prix }]);
    }
  };

  const diminuerVetement = (id: number) => {
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

  const supprimerVetement = (id: number) => {
    setPanier(panier.filter(item => item.id !== id));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRetrait(e.target.value);
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

    // Redirection vers la page de confirmation (à créer)
    setTimeout(() => {
      navigate("/services/pressing");
    }, 2000);
  };

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
                  {vetements.map((vetement) => (
                    <Button
                      key={vetement.id}
                      variant="outline"
                      className="flex flex-col h-auto py-3 hover:bg-laundry-50"
                      onClick={() => ajouterVetement(vetement.id)}
                    >
                      <Shirt className="mb-1 h-5 w-5 text-laundry-600" />
                      <span className="text-sm">{vetement.type}</span>
                      <span className="text-xs text-gray-500 mt-1">{vetement.prix.toFixed(2)} €</span>
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
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {panier.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                          Aucun article ajouté
                        </TableCell>
                      </TableRow>
                    ) : (
                      panier.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.type}</TableCell>
                          <TableCell className="text-center">{item.prix.toFixed(2)} €</TableCell>
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
                            {item.total.toFixed(2)} €
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
                    <span className="text-laundry-700">{total.toFixed(2)} €</span>
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

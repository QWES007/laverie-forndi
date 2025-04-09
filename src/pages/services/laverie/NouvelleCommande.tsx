
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Plus, Minus, Shirt, Trash2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/components/settings/clothing/types";

type FormulaireBundle = {
  id: number;
  quantite: number;
  prix: number;
  description: string;
};

type Client = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
};

// Définir les prix pour les différents lots
const bundlePrices: FormulaireBundle[] = [
  { id: 1, quantite: 5, prix: 1500, description: "5 HABITS" },
  { id: 2, quantite: 10, prix: 2500, description: "10 HABITS" },
  { id: 3, quantite: 15, prix: 3000, description: "15 HABITS" },
  { id: 4, quantite: 20, prix: 4000, description: "20 HABITS" },
  { id: 5, quantite: 25, prix: 4500, description: "25 HABITS" },
  { id: 6, quantite: 30, prix: 5000, description: "30 HABITS" },
];

const NouvelleCommandeLaverie = () => {
  const [bundleSelectionne, setBundleSelectionne] = useState<FormulaireBundle | null>(null);
  const [dateRetrait, setDateRetrait] = useState<string>("");
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
    setOrderId(`LAV-${date}-${random}`);

    // Définir la date de retrait par défaut (aujourd'hui + 1 jour)
    const today = new Date();
    today.setDate(today.getDate() + 1);
    setDateRetrait(today.toISOString().slice(0, 10));
  }, []);

  const selectionnerBundle = (bundle: FormulaireBundle) => {
    setBundleSelectionne(bundle);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRetrait(e.target.value);
  };

  const onSubmit = (data: Client) => {
    if (!bundleSelectionne) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un forfait",
        variant: "destructive"
      });
      return;
    }

    const commande = {
      client: data,
      bundle: bundleSelectionne,
      dateCommande: new Date().toISOString(),
      dateRetrait,
      orderId,
    };

    console.log("Commande laverie enregistrée:", commande);
    toast({
      title: "Succès",
      description: "Commande laverie enregistrée avec succès!",
    });

    // Redirection vers la page de laverie
    setTimeout(() => {
      navigate("/services/laverie");
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-laundry-700 mb-8">Nouvelle Commande - Service Laverie</h1>
        
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
                <CardTitle className="text-laundry-600">Forfaits Disponibles</CardTitle>
                <CardDescription>Sélectionnez un forfait pour votre commande</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bundlePrices.map((bundle) => (
                    <Button
                      key={bundle.id}
                      variant={bundleSelectionne?.id === bundle.id ? "default" : "outline"}
                      className="flex flex-col h-auto py-3 hover:bg-laundry-50"
                      onClick={() => selectionnerBundle(bundle)}
                    >
                      <Shirt className="mb-1 h-5 w-5 text-laundry-600" />
                      <span className="text-sm font-medium">{bundle.description}</span>
                      <span className="text-xs mt-1">{formatPrice(bundle.prix)}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne de droite: Récapitulatif */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-laundry-600">Récapitulatif de la Commande</CardTitle>
                <CardDescription>Détails de votre sélection</CardDescription>
              </CardHeader>
              <CardContent>
                {bundleSelectionne ? (
                  <div className="space-y-6">
                    <div className="bg-laundry-50 p-4 rounded-md">
                      <h3 className="font-medium text-lg text-laundry-700 mb-3">Forfait sélectionné</h3>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{bundleSelectionne.description}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Quantité d'habits:</span>
                        <span className="font-medium">{bundleSelectionne.quantite}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Prix:</span>
                        <span className="font-medium">{formatPrice(bundleSelectionne.prix)}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-4">
                        <p>- Ce forfait concerne uniquement les vêtements</p>
                        <p>- Ne sont pas concernés: couettes, draps, etc.</p>
                        <p>- Retrait prévu: {new Date(dateRetrait).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-laundry-700">{formatPrice(bundleSelectionne.prix)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Shirt className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                    <p>Aucun forfait sélectionné</p>
                    <p className="text-sm mt-2">Veuillez choisir un forfait dans la liste</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/services/laverie")}>
                  Annuler
                </Button>
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={!bundleSelectionne}
                >
                  Enregistrer la commande <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-laundry-600">Informations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-center">
                    <span className="bg-laundry-100 p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3 text-laundry-600" />
                    </span>
                    Les tarifs s'appliquent exclusivement aux vêtements
                  </p>
                  <p className="flex items-center">
                    <span className="bg-laundry-100 p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3 text-laundry-600" />
                    </span>
                    Couettes, draps et linge de maison non concernés
                  </p>
                  <p className="flex items-center">
                    <span className="bg-laundry-100 p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3 text-laundry-600" />
                    </span>
                    Délai de traitement standard: 24h
                  </p>
                  <p className="flex items-center">
                    <span className="bg-laundry-100 p-1 rounded-full mr-2">
                      <ArrowRight className="h-3 w-3 text-laundry-600" />
                    </span>
                    Service express disponible avec supplément
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NouvelleCommandeLaverie;

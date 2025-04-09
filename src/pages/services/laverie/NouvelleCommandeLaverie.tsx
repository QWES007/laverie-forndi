
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Plus, Minus, Shirt, Trash2, WashingMachine } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/components/settings/clothing/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { initialClothingItems, availableColors, availablePatterns } from "@/components/settings/clothing/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FormulaireBundle = {
  id: number;
  quantite: number;
  prix: number;
  description: string;
};

type VetementSelectionne = {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
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

// Définir les prix pour les différents lots
const bundlePrices: FormulaireBundle[] = [
  { id: 1, quantite: 5, prix: 1500, description: "5 HABITS" },
  { id: 2, quantite: 10, prix: 2500, description: "10 HABITS" },
  { id: 3, quantite: 15, prix: 3000, description: "15 HABITS" },
  { id: 4, quantite: 20, prix: 4000, description: "20 HABITS" },
  { id: 5, quantite: 25, prix: 4500, description: "25 HABITS" },
  { id: 6, quantite: 30, prix: 5000, description: "30 HABITS" },
];

// Liste des vêtements exclus
const vetementExclusList = ["COUETTE", "DRAP"];

const NouvelleCommandeLaverie = () => {
  const [bundleSelectionne, setBundleSelectionne] = useState<FormulaireBundle | null>(null);
  const [dateRetrait, setDateRetrait] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [vetementSelectionnes, setVetementSelectionnes] = useState<VetementSelectionne[]>([]);
  const [totalVetementsSelectionnes, setTotalVetementsSelectionnes] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
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

  useEffect(() => {
    // Calculer le nombre total de vêtements sélectionnés
    const total = vetementSelectionnes.reduce((sum, item) => sum + item.quantite, 0);
    setTotalVetementsSelectionnes(total);
  }, [vetementSelectionnes]);

  const selectionnerBundle = (bundle: FormulaireBundle) => {
    setBundleSelectionne(bundle);
    // Si on change de bundle, on réinitialise la sélection de vêtements
    if (bundleSelectionne?.id !== bundle.id) {
      setVetementSelectionnes([]);
    }
    // Ouvrir le dialogue de sélection de vêtements
    setDialogOpen(true);
  };

  const ajouterVetement = (id: string) => {
    if (!bundleSelectionne) return;
    
    const vetement = initialClothingItems.find(v => v.id === id);
    if (!vetement) return;

    // Vérifier si ce vêtement est exclu
    if (vetementExclusList.includes(vetement.name)) {
      toast({
        title: "Vêtement non autorisé",
        description: `${vetement.name} n'est pas autorisé dans le service laverie`,
        variant: "destructive"
      });
      return;
    }

    const existant = vetementSelectionnes.find(item => item.id === id);
    
    // Vérifier si on ne dépasse pas la quantité maximale du bundle
    if (totalVetementsSelectionnes >= bundleSelectionne.quantite && !existant) {
      toast({
        title: "Quantité maximale atteinte",
        description: `Le forfait ${bundleSelectionne.description} est limité à ${bundleSelectionne.quantite} habits`,
        variant: "destructive"
      });
      return;
    }

    if (existant) {
      // Vérifier si on ne dépasse pas la quantité maximale du bundle
      if (totalVetementsSelectionnes >= bundleSelectionne.quantite) {
        toast({
          title: "Quantité maximale atteinte",
          description: `Le forfait ${bundleSelectionne.description} est limité à ${bundleSelectionne.quantite} habits`,
          variant: "destructive"
        });
        return;
      }
      
      setVetementSelectionnes(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, quantite: item.quantite + 1 };
        }
        return item;
      }));
    } else {
      setVetementSelectionnes(prev => [...prev, {
        id: vetement.id,
        nom: vetement.name,
        prix: 0, // Dans le service laverie, le prix est par forfait, pas par vêtement
        quantite: 1,
        couleur: vetement.colors[0] || "Blanc",
        motif: vetement.patterns[0] || "Uni",
        notes: ""
      }]);
    }
  };

  const diminuerVetement = (id: string) => {
    const existant = vetementSelectionnes.find(item => item.id === id);
    if (!existant) return;

    if (existant.quantite === 1) {
      setVetementSelectionnes(prev => prev.filter(item => item.id !== id));
    } else {
      setVetementSelectionnes(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, quantite: item.quantite - 1 };
        }
        return item;
      }));
    }
  };

  const supprimerVetement = (id: string) => {
    setVetementSelectionnes(prev => prev.filter(item => item.id !== id));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRetrait(e.target.value);
  };

  const modifierCouleur = (id: string, couleur: string) => {
    setVetementSelectionnes(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, couleur };
      }
      return item;
    }));
  };

  const modifierMotif = (id: string, motif: string) => {
    setVetementSelectionnes(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, motif };
      }
      return item;
    }));
  };

  const modifierNotes = (id: string, notes: string) => {
    setVetementSelectionnes(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, notes };
      }
      return item;
    }));
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

    if (vetementSelectionnes.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins un vêtement",
        variant: "destructive"
      });
      return;
    }

    if (totalVetementsSelectionnes > bundleSelectionne.quantite) {
      toast({
        title: "Erreur",
        description: `Le forfait ${bundleSelectionne.description} est limité à ${bundleSelectionne.quantite} habits`,
        variant: "destructive"
      });
      return;
    }

    const commande = {
      client: data,
      bundle: bundleSelectionne,
      vetements: vetementSelectionnes,
      totalVetements: totalVetementsSelectionnes,
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
                        <span className="font-medium">{totalVetementsSelectionnes} / {bundleSelectionne.quantite}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Prix:</span>
                        <span className="font-medium">{formatPrice(bundleSelectionne.prix)}</span>
                      </div>
                      
                      {vetementSelectionnes.length > 0 && (
                        <div className="mt-4 border-t pt-4">
                          <h4 className="font-medium mb-2">Vêtements sélectionnés:</h4>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {vetementSelectionnes.map((vetement) => (
                              <div key={vetement.id} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                                <div className="flex items-center gap-2">
                                  <Shirt className="h-4 w-4 text-laundry-500" />
                                  <span>{vetement.nom}</span>
                                  <span className="text-gray-500">({vetement.quantite})</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => supprimerVetement(vetement.id)}
                                  >
                                    <Trash2 className="h-3 w-3 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            className="mt-3 w-full text-sm"
                            onClick={() => setDialogOpen(true)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Modifier la sélection
                          </Button>
                        </div>
                      )}
                      
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
                  disabled={!bundleSelectionne || vetementSelectionnes.length === 0}
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

      {/* Dialog pour la sélection détaillée des vêtements */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sélection des vêtements</DialogTitle>
            <DialogDescription>
              Sélectionnez les vêtements pour votre lot de laverie. 
              {bundleSelectionne && (
                <span className="font-medium"> Maximum: {bundleSelectionne.quantite} vêtements.</span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Vêtements sélectionnés:</span> {totalVetementsSelectionnes} 
              {bundleSelectionne && <span> / {bundleSelectionne.quantite}</span>}
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              {initialClothingItems
                .filter(item => !vetementExclusList.includes(item.name))
                .map((vetement) => {
                  const isSelected = vetementSelectionnes.some(v => v.id === vetement.id);
                  const selected = vetementSelectionnes.find(v => v.id === vetement.id);
                  
                  return (
                    <AccordionItem key={vetement.id} value={vetement.id}>
                      <AccordionTrigger className="px-4 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center">
                            <Shirt className="mr-2 h-5 w-5 text-laundry-600" />
                            <span>{vetement.name}</span>
                          </div>
                          {isSelected && (
                            <span className="text-sm bg-laundry-100 text-laundry-700 px-2 py-0.5 rounded-full">
                              {selected?.quantite}
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Quantité:</span>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => diminuerVetement(vetement.id)}
                                disabled={!isSelected}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{isSelected ? selected?.quantite : 0}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => ajouterVetement(vetement.id)}
                                disabled={bundleSelectionne && totalVetementsSelectionnes >= bundleSelectionne.quantite && !isSelected}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {isSelected && (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Couleur:</span>
                                <Select 
                                  value={selected?.couleur}
                                  onValueChange={(value) => modifierCouleur(vetement.id, value)}
                                >
                                  <SelectTrigger className="w-[180px] h-8 text-sm">
                                    <SelectValue placeholder="Sélectionner une couleur" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableColors.map((couleur) => (
                                      <SelectItem key={couleur} value={couleur}>
                                        {couleur}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Motif:</span>
                                <Select 
                                  value={selected?.motif}
                                  onValueChange={(value) => modifierMotif(vetement.id, value)}
                                >
                                  <SelectTrigger className="w-[180px] h-8 text-sm">
                                    <SelectValue placeholder="Sélectionner un motif" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availablePatterns.map((motif) => (
                                      <SelectItem key={motif} value={motif}>
                                        {motif}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="flex flex-col gap-1">
                                <span className="text-sm">Notes:</span>
                                <Input 
                                  value={selected?.notes} 
                                  onChange={(e) => modifierNotes(vetement.id, e.target.value)}
                                  placeholder="Notes supplémentaires"
                                  className="h-8 text-sm"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
            </Accordion>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>
              Valider la sélection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default NouvelleCommandeLaverie;

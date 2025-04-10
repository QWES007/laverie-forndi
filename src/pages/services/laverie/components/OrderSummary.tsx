
import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shirt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/components/settings/clothing/types";
import { FormulaireBundle, VetementSelection } from "../types";
import { UseFormReturn } from "react-hook-form";
import { Client } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CommandeReceipt from "./CommandeReceipt";

interface OrderSummaryProps {
  bundleSelectionne: FormulaireBundle | null;
  dateRetrait: string;
  form: UseFormReturn<Client>;
  onSubmit: (data: Client) => void;
  vetements: VetementSelection[];
  setVetements: React.Dispatch<React.SetStateAction<VetementSelection[]>>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  bundleSelectionne,
  dateRetrait,
  form,
  onSubmit,
  vetements,
  setVetements,
}) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [showReceipt, setShowReceipt] = React.useState(false);
  const [clientData, setClientData] = React.useState<Client | null>(null);
  const [nouvelItem, setNouvelItem] = React.useState<VetementSelection>({
    id: "",
    nom: "",
    quantite: 1,
    couleur: "",
    motif: "",
    notes: "",
  });

  const ajouterVetement = () => {
    if (nouvelItem.nom.trim() === "") return;
    
    const newId = Date.now().toString();
    setVetements((prev) => [...prev, { ...nouvelItem, id: newId }]);
    
    // Réinitialiser le formulaire
    setNouvelItem({
      id: "",
      nom: "",
      quantite: 1,
      couleur: "",
      motif: "",
      notes: "",
    });
    
    setDialogOpen(false);
  };

  const supprimerVetement = (id: string) => {
    setVetements((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = vetements.reduce((acc, item) => acc + item.quantite, 0);
  
  const handleSubmit = (data: Client) => {
    setClientData(data);
    setShowReceipt(true);
    onSubmit(data);
  };

  if (showReceipt && bundleSelectionne && clientData) {
    return (
      <CommandeReceipt 
        client={clientData}
        bundle={bundleSelectionne}
        dateRetrait={dateRetrait}
        vetements={vetements}
        onClose={() => {
          setShowReceipt(false);
          navigate("/services/laverie");
        }}
      />
    );
  }
  
  return (
    <>
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

                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Vêtements ({totalItems}/{bundleSelectionne.quantite})</h4>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-xs" disabled={totalItems >= bundleSelectionne.quantite}>
                          Ajouter un vêtement
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter un vêtement</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="nom">Nom du vêtement *</Label>
                            <Input
                              id="nom"
                              value={nouvelItem.nom}
                              onChange={(e) => setNouvelItem({ ...nouvelItem, nom: e.target.value })}
                              placeholder="Ex: Chemise, Pantalon, etc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="quantite">Quantité</Label>
                            <Input
                              id="quantite"
                              type="number"
                              min="1"
                              max={bundleSelectionne.quantite - totalItems}
                              value={nouvelItem.quantite}
                              onChange={(e) => setNouvelItem({ ...nouvelItem, quantite: parseInt(e.target.value) || 1 })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="couleur">Couleur</Label>
                            <Input
                              id="couleur"
                              value={nouvelItem.couleur}
                              onChange={(e) => setNouvelItem({ ...nouvelItem, couleur: e.target.value })}
                              placeholder="Ex: Bleu, Rouge, etc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="motif">Motif</Label>
                            <Input
                              id="motif"
                              value={nouvelItem.motif}
                              onChange={(e) => setNouvelItem({ ...nouvelItem, motif: e.target.value })}
                              placeholder="Ex: Uni, Rayé, etc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                              id="notes"
                              value={nouvelItem.notes}
                              onChange={(e) => setNouvelItem({ ...nouvelItem, notes: e.target.value })}
                              placeholder="Instructions spéciales..."
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={ajouterVetement}>Ajouter</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {vetements.length > 0 ? (
                    <div className="mt-2 space-y-2">
                      {vetements.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border">
                          <div>
                            <span className="font-medium">{item.nom}</span>
                            <div className="text-xs text-gray-500">
                              {item.quantite > 1 && <span className="mr-2">x{item.quantite}</span>}
                              {item.couleur && <span className="mr-2">Couleur: {item.couleur}</span>}
                              {item.motif && <span className="mr-2">Motif: {item.motif}</span>}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => supprimerVetement(item.id)}
                          >
                            <span className="sr-only">Supprimer</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-2 text-sm">
                      Aucun vêtement ajouté
                    </div>
                  )}
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
            onClick={form.handleSubmit(handleSubmit)}
            disabled={!bundleSelectionne || totalItems === 0}
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
    </>
  );
};

export default OrderSummary;

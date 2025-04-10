
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shirt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/components/settings/clothing/types";
import { FormulaireBundle, VetementSelection } from "../types";
import { UseFormReturn } from "react-hook-form";
import { Client } from "../types";
import { Dialog } from "@/components/ui/dialog";
import CommandeReceipt from "./CommandeReceipt";
import BundleInfo from "./BundleInfo";
import VetementList from "./VetementList";
import VetementForm from "./VetementForm";
import InfoCard from "./InfoCard";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [nouvelItem, setNouvelItem] = useState<VetementSelection>({
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
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <BundleInfo 
                  bundleSelectionne={bundleSelectionne} 
                  totalItems={totalItems} 
                  dateRetrait={dateRetrait} 
                />
                
                <VetementList 
                  vetements={vetements} 
                  supprimerVetement={supprimerVetement} 
                />
                
                <VetementForm 
                  open={dialogOpen}
                  onOpenChange={setDialogOpen}
                  nouvelItem={nouvelItem}
                  setNouvelItem={setNouvelItem}
                  ajouterVetement={ajouterVetement}
                  bundleSelectionne={bundleSelectionne}
                  totalItems={totalItems}
                />
              </Dialog>

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

      <InfoCard />
    </>
  );
};

export default OrderSummary;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

// Import types
import { FormulaireBundle, Client, VetementSelection, bundlePrices } from "./types";

// Import components
import ClientForm from "./components/ClientForm";
import BundleSelection from "./components/BundleSelection";
import OrderSummary from "./components/OrderSummary";

const NouvelleCommandeLaverie = () => {
  const [bundleSelectionne, setBundleSelectionne] = useState<FormulaireBundle | null>(null);
  const [dateRetrait, setDateRetrait] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [vetements, setVetements] = useState<VetementSelection[]>([]);
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
    // Réinitialiser la liste des vêtements quand on change de forfait
    setVetements([]);
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

    if (vetements.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez ajouter au moins un vêtement",
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
      vetements,
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
          {/* Colonne de gauche: Informations client et sélection du forfait */}
          <div>
            <ClientForm 
              form={form} 
              orderId={orderId} 
              dateRetrait={dateRetrait} 
              handleDateChange={handleDateChange} 
            />
            
            <BundleSelection 
              bundlePrices={bundlePrices} 
              bundleSelectionne={bundleSelectionne} 
              selectionnerBundle={selectionnerBundle} 
            />
          </div>

          {/* Colonne de droite: Récapitulatif */}
          <div>
            <OrderSummary 
              bundleSelectionne={bundleSelectionne} 
              dateRetrait={dateRetrait} 
              form={form} 
              onSubmit={onSubmit} 
              vetements={vetements}
              setVetements={setVetements}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NouvelleCommandeLaverie;

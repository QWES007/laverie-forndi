
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import ClientForm from "./components/ClientForm";
import ClothingSelection from "./components/ClothingSelection";
import CartList from "./components/CartList";
import CommandeReceipt from "./components/CommandeReceipt";
import { useOrderManagement } from "./hooks/useOrderManagement";
import { Client } from "./types";

const NouvelleCommande = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [clientData, setClientData] = useState<Client | null>(null);
  const navigate = useNavigate();

  const {
    panier,
    dateRetrait,
    total,
    orderId,
    setDateRetrait,
    ajouterVetement,
    diminuerVetement,
    supprimerVetement,
    modifierCouleur,
    modifierMotif,
    modifierNotes
  } = useOrderManagement();

  const form = useForm<Client>({
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
    },
  });

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
            <ClientForm
              orderId={orderId}
              dateRetrait={dateRetrait}
              setDateRetrait={setDateRetrait}
              formMethods={form}
              onSubmit={onSubmit}
            />

            <ClothingSelection onAddItem={ajouterVetement} />
          </div>

          {/* Colonne de droite: Panier */}
          <div>
            <CartList
              items={panier}
              total={total}
              onIncrease={ajouterVetement}
              onDecrease={diminuerVetement}
              onRemove={supprimerVetement}
              onColorChange={modifierCouleur}
              onPatternChange={modifierMotif}
              onNotesChange={modifierNotes}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NouvelleCommande;

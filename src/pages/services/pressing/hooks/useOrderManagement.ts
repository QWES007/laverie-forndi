
import { useState, useEffect } from "react";
import { initialClothingItems } from "@/components/settings/clothing/types";
import { Vetement } from "../types";

export function useOrderManagement() {
  const [panier, setPanier] = useState<Vetement[]>([]);
  const [dateRetrait, setDateRetrait] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>("");

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
        prix: vetement.price,
        quantite: 1, 
        total: vetement.price,
        couleur: vetement.colors[0] || "Blanc",
        motif: vetement.patterns[0] || "Uni",
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

  return {
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
  };
}

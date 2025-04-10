
export type FormulaireBundle = {
  id: number;
  quantite: number;
  prix: number;
  description: string;
};

export type Client = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
};

export type VetementSelection = {
  id: string;
  nom: string;
  quantite: number;
  couleur?: string;
  motif?: string;
  notes?: string;
};

export type ReceiptData = {
  client: Client;
  bundle: FormulaireBundle;
  dateRetrait: string;
  vetements: VetementSelection[];
  numeroCommande: string;
};

// Définir les prix pour les différents lots
export const bundlePrices: FormulaireBundle[] = [
  { id: 1, quantite: 5, prix: 1500, description: "5 HABITS" },
  { id: 2, quantite: 10, prix: 2500, description: "10 HABITS" },
  { id: 3, quantite: 15, prix: 3000, description: "15 HABITS" },
  { id: 4, quantite: 20, prix: 4000, description: "20 HABITS" },
  { id: 5, quantite: 25, prix: 4500, description: "25 HABITS" },
  { id: 6, quantite: 30, prix: 5000, description: "30 HABITS" },
];

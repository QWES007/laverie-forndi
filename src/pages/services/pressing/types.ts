
export type Vetement = {
  id: string;
  type: string;
  prix: number;
  quantite: number;
  total: number;
  couleur?: string;
  motif?: string;
  notes?: string;
};

export type Client = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
};

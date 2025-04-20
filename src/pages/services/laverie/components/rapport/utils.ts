
import { TrendingUp, Users, Calendar, Receipt, Shirt, LucideIcon } from "lucide-react";

// Définition des types pour les données
export interface Commande {
  id: string;
  date: string;
  client: string;
  montant: number;
  statut: string;
  articles: number;
  forfait: string;
}

export interface KPI {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  positive: boolean;
}

// Formatage du prix en FCFA
export const formatPrice = (value: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF', // XOF est le code pour le FCFA
    minimumFractionDigits: 0,
  }).format(value);
};

// Calculer les données pour les graphiques à partir des commandes
export const calculerDonneesGraphiques = (commandes: Commande[]) => {
  // Structure de jours de la semaine
  const joursOrdre = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const dailyRevenue = joursOrdre.map(jour => ({
    jour,
    montant: Math.floor(Math.random() * 25000) + 8000 // Pour la démo, valeurs aléatoires entre 8000 et 33000 FCFA
  }));

  // Données hebdomadaires
  const weeklyRevenue = [
    { semaine: "Semaine 1", montant: 155000 },
    { semaine: "Semaine 2", montant: 172000 },
    { semaine: "Semaine 3", montant: 145000 },
    { semaine: "Semaine 4", montant: 188000 },
  ];

  // Données mensuelles
  const monthlyRevenue = [
    { mois: "Janvier", montant: 620000 },
    { mois: "Février", montant: 585000 },
    { mois: "Mars", montant: 648000 },
    { mois: "Avril", montant: 684000 },
  ];

  // Répartition des clients
  const clientsData = [
    { type: "Réguliers", valeur: 70 },
    { type: "Occasionnels", valeur: 20 },
    { type: "Nouveaux", valeur: 10 },
  ];

  // Données annuelles
  const annualData = [
    { mois: "Jan", montant: 620000 },
    { mois: "Fév", montant: 585000 },
    { mois: "Mar", montant: 648000 },
    { mois: "Avr", montant: 684000 },
    { mois: "Mai", montant: 710000 },
    { mois: "Juin", montant: 753000 },
    { mois: "Juil", montant: 780000 },
    { mois: "Août", montant: 695000 },
    { mois: "Sept", montant: 665000 },
    { mois: "Oct", montant: 718000 },
    { mois: "Nov", montant: 742000 },
    { mois: "Déc", montant: 795000 },
  ];

  // Évolution des clients
  const clientsEvolution = [
    { mois: "Jan", clients: 220 },
    { mois: "Fév", clients: 235 },
    { mois: "Mar", clients: 250 },
    { mois: "Avr", clients: 275 },
  ];

  // Comportement des clients
  const clientsComportement = [
    { mois: "Jan", reguliers: 150, occasionnels: 50, nouveaux: 20 },
    { mois: "Fév", reguliers: 160, occasionnels: 50, nouveaux: 25 },
    { mois: "Mar", reguliers: 170, occasionnels: 55, nouveaux: 25 },
    { mois: "Avr", reguliers: 185, occasionnels: 60, nouveaux: 30 },
  ];

  // Forfaits les plus demandés
  const forfaitsData = [
    { forfait: "Premium", commandes: 150 },
    { forfait: "Standard", commandes: 220 },
    { forfait: "Eco", commandes: 105 },
    { forfait: "Express", commandes: 75 },
    { forfait: "Famille", commandes: 95 },
  ];

  // Efficacité opérationnelle
  const efficaciteData = [
    { semaine: "Sem 1", efficacite: 82 },
    { semaine: "Sem 2", efficacite: 85 },
    { semaine: "Sem 3", efficacite: 88 },
    { semaine: "Sem 4", efficacite: 92 },
  ];

  // Quantité de linge
  const quantiteLinge = [
    { semaine: "Sem 1", quantite: 320 },
    { semaine: "Sem 2", quantite: 355 },
    { semaine: "Sem 3", quantite: 315 },
    { semaine: "Sem 4", quantite: 380 },
  ];

  return { 
    dailyRevenue, 
    weeklyRevenue, 
    monthlyRevenue, 
    clientsData, 
    annualData, 
    clientsEvolution, 
    clientsComportement, 
    forfaitsData, 
    efficaciteData,
    quantiteLinge 
  };
};

// Calculer les KPIs à partir des commandes
export const calculerKPIs = (commandes: Commande[]) => {
  const totalCommandes = commandes.length;
  const recetteTotal = commandes.reduce((total, cmd) => total + cmd.montant, 0);
  const recetteJournaliere = Math.round(recetteTotal / 7); // En supposant 7 jours
  const totalArticles = commandes.reduce((total, cmd) => total + cmd.articles, 0);
  const commandesEncours = commandes.filter(cmd => cmd.statut === "en_cours").length;
  
  return [
    {
      title: "Recette journalière moyenne",
      value: formatPrice(recetteJournaliere),
      icon: Receipt,
      change: "+15.2%",
      positive: true
    },
    {
      title: "Recette hebdomadaire",
      value: formatPrice(recetteTotal),
      icon: TrendingUp,
      change: "+10.5%",
      positive: true
    },
    {
      title: "Nombre de clients",
      value: totalCommandes.toString(),
      icon: Users,
      change: "+8.3%",
      positive: true
    },
    {
      title: "Nombre d'articles",
      value: totalArticles.toString(),
      icon: Shirt,
      change: "+12.1%",
      positive: true
    }
  ];
};

// Définition des couleurs pour les graphiques
export const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981'];

// Données des commandes fictives pour simuler des données réelles
export const commandes: Commande[] = [
  { id: "LAV-230422-0045", date: "2023-04-22", client: "Marie Dubois", montant: 3500, statut: "en_cours", articles: 15, forfait: "Standard" },
  { id: "LAV-230421-0089", date: "2023-04-21", client: "Jean Kouassi", montant: 5500, statut: "pret", articles: 25, forfait: "Premium" },
  { id: "LAV-230420-0032", date: "2023-04-20", client: "Sophie Diallo", montant: 2800, statut: "livre", articles: 12, forfait: "Eco" },
  { id: "LAV-230419-0056", date: "2023-04-19", client: "Pierre Traoré", montant: 4200, statut: "livre", articles: 18, forfait: "Standard" },
  { id: "LAV-230418-0077", date: "2023-04-18", client: "Fatou Bamba", montant: 6800, statut: "livre", articles: 30, forfait: "Premium" },
  { id: "LAV-230417-0091", date: "2023-04-17", client: "Jacques Koné", montant: 3200, statut: "livre", articles: 14, forfait: "Standard" },
  { id: "LAV-230416-0102", date: "2023-04-16", client: "Aminata Touré", montant: 5000, statut: "livre", articles: 22, forfait: "Premium" },
];

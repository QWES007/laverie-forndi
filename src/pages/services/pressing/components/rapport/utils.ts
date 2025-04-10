
import { TrendingUp, Users, Calendar, Receipt, LucideIcon } from "lucide-react";

// Définition des types pour les données
export interface Commande {
  id: string;
  date: string;
  client: string;
  montant: number;
  statut: string;
  articles: number;
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
    montant: Math.floor(Math.random() * 20000) + 5000 // Pour la démo, valeurs aléatoires entre 5000 et 25000 FCFA
  }));

  // Données hebdomadaires
  const weeklyRevenue = [
    { semaine: "Semaine 1", montant: 85000 },
    { semaine: "Semaine 2", montant: 92000 },
    { semaine: "Semaine 3", montant: 78000 },
    { semaine: "Semaine 4", montant: 105000 },
  ];

  // Données mensuelles
  const monthlyRevenue = [
    { mois: "Janvier", montant: 320000 },
    { mois: "Février", montant: 295000 },
    { mois: "Mars", montant: 348000 },
    { mois: "Avril", montant: 384000 },
  ];

  // Répartition des clients
  const clientsData = [
    { type: "Réguliers", valeur: 65 },
    { type: "Occasionnels", valeur: 25 },
    { type: "Nouveaux", valeur: 10 },
  ];

  // Données annuelles
  const annualData = [
    { mois: "Jan", montant: 320000 },
    { mois: "Fév", montant: 295000 },
    { mois: "Mar", montant: 348000 },
    { mois: "Avr", montant: 384000 },
    { mois: "Mai", montant: 421000 },
    { mois: "Juin", montant: 453000 },
    { mois: "Juil", montant: 475000 },
    { mois: "Août", montant: 390000 },
    { mois: "Sept", montant: 365000 },
    { mois: "Oct", montant: 418000 },
    { mois: "Nov", montant: 442000 },
    { mois: "Déc", montant: 495000 },
  ];

  // Évolution des clients
  const clientsEvolution = [
    { mois: "Jan", clients: 180 },
    { mois: "Fév", clients: 195 },
    { mois: "Mar", clients: 210 },
    { mois: "Avr", clients: 245 },
  ];

  // Comportement des clients
  const clientsComportement = [
    { mois: "Jan", reguliers: 120, occasionnels: 40, nouveaux: 20 },
    { mois: "Fév", reguliers: 125, occasionnels: 45, nouveaux: 25 },
    { mois: "Mar", reguliers: 135, occasionnels: 50, nouveaux: 25 },
    { mois: "Avr", reguliers: 150, occasionnels: 65, nouveaux: 30 },
  ];

  // Services les plus demandés
  const servicesData = [
    { service: "Nettoyage à sec", commandes: 120 },
    { service: "Repassage", commandes: 95 },
    { service: "Lavage", commandes: 85 },
    { service: "Détachage", commandes: 45 },
    { service: "Textiles délicats", commandes: 35 },
  ];

  // Efficacité opérationnelle
  const efficaciteData = [
    { semaine: "Sem 1", efficacite: 78 },
    { semaine: "Sem 2", efficacite: 82 },
    { semaine: "Sem 3", efficacite: 85 },
    { semaine: "Sem 4", efficacite: 91 },
  ];

  return { 
    dailyRevenue, 
    weeklyRevenue, 
    monthlyRevenue, 
    clientsData, 
    annualData, 
    clientsEvolution, 
    clientsComportement, 
    servicesData, 
    efficaciteData 
  };
};

// Calculer les KPIs à partir des commandes
export const calculerKPIs = (commandes: Commande[]) => {
  const totalCommandes = commandes.length;
  const recetteTotal = commandes.reduce((total, cmd) => total + cmd.montant, 0);
  const recetteJournaliere = Math.round(recetteTotal / 7); // En supposant 7 jours
  const commandesEncours = commandes.filter(cmd => cmd.statut === "en_cours").length;
  
  return [
    {
      title: "Recette journalière moyenne",
      value: formatPrice(recetteJournaliere),
      icon: Receipt,
      change: "+12.5%",
      positive: true
    },
    {
      title: "Recette hebdomadaire",
      value: formatPrice(recetteTotal),
      icon: TrendingUp,
      change: "+8.2%",
      positive: true
    },
    {
      title: "Nombre de clients",
      value: totalCommandes.toString(),
      icon: Users,
      change: "+5.1%",
      positive: true
    },
    {
      title: "Commandes en cours",
      value: commandesEncours.toString(),
      icon: Calendar,
      change: "-2.3%",
      positive: false
    }
  ];
};

// Définition des couleurs pour les graphiques
export const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];

// Données des commandes fictives pour simuler des données réelles
export const commandes: Commande[] = [
  { id: "CMD-230422-0045", date: "2023-04-22", client: "Martin Dupont", montant: 12500, statut: "en_cours", articles: 3 },
  { id: "CMD-230421-0089", date: "2023-04-21", client: "Sophie Martin", montant: 8500, statut: "pret", articles: 2 },
  { id: "CMD-230420-0023", date: "2023-04-20", client: "Jean Konan", montant: 15000, statut: "livre", articles: 4 },
  { id: "CMD-230419-0056", date: "2023-04-19", client: "Marie Kouassi", montant: 9000, statut: "livre", articles: 2 },
  { id: "CMD-230418-0077", date: "2023-04-18", client: "Claude Diallo", montant: 18500, statut: "livre", articles: 5 },
  { id: "CMD-230417-0091", date: "2023-04-17", client: "Amina Bamba", montant: 7500, statut: "livre", articles: 2 },
  { id: "CMD-230416-0102", date: "2023-04-16", client: "Pierre Kouamé", montant: 14000, statut: "livre", articles: 3 },
];

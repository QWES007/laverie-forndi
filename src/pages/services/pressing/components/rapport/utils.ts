
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
    montant: 0 // Réinitialisé à 0
  }));

  // Données hebdomadaires
  const weeklyRevenue = [
    { semaine: "Semaine 1", montant: 0 },
    { semaine: "Semaine 2", montant: 0 },
    { semaine: "Semaine 3", montant: 0 },
    { semaine: "Semaine 4", montant: 0 },
  ];

  // Données mensuelles
  const monthlyRevenue = [
    { mois: "Janvier", montant: 0 },
    { mois: "Février", montant: 0 },
    { mois: "Mars", montant: 0 },
    { mois: "Avril", montant: 0 },
  ];

  // Répartition des clients
  const clientsData = [
    { type: "Réguliers", valeur: 0 },
    { type: "Occasionnels", valeur: 0 },
    { type: "Nouveaux", valeur: 0 },
  ];

  // Données annuelles
  const annualData = [
    { mois: "Jan", montant: 0 },
    { mois: "Fév", montant: 0 },
    { mois: "Mar", montant: 0 },
    { mois: "Avr", montant: 0 },
    { mois: "Mai", montant: 0 },
    { mois: "Juin", montant: 0 },
    { mois: "Juil", montant: 0 },
    { mois: "Août", montant: 0 },
    { mois: "Sept", montant: 0 },
    { mois: "Oct", montant: 0 },
    { mois: "Nov", montant: 0 },
    { mois: "Déc", montant: 0 },
  ];

  // Évolution des clients
  const clientsEvolution = [
    { mois: "Jan", clients: 0 },
    { mois: "Fév", clients: 0 },
    { mois: "Mar", clients: 0 },
    { mois: "Avr", clients: 0 },
  ];

  // Comportement des clients
  const clientsComportement = [
    { mois: "Jan", reguliers: 0, occasionnels: 0, nouveaux: 0 },
    { mois: "Fév", reguliers: 0, occasionnels: 0, nouveaux: 0 },
    { mois: "Mar", reguliers: 0, occasionnels: 0, nouveaux: 0 },
    { mois: "Avr", reguliers: 0, occasionnels: 0, nouveaux: 0 },
  ];

  // Services les plus demandés
  const servicesData = [
    { service: "Nettoyage à sec", commandes: 0 },
    { service: "Repassage", commandes: 0 },
    { service: "Lavage", commandes: 0 },
    { service: "Détachage", commandes: 0 },
    { service: "Textiles délicats", commandes: 0 },
  ];

  // Efficacité opérationnelle
  const efficaciteData = [
    { semaine: "Sem 1", efficacite: 0 },
    { semaine: "Sem 2", efficacite: 0 },
    { semaine: "Sem 3", efficacite: 0 },
    { semaine: "Sem 4", efficacite: 0 },
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
  return [
    {
      title: "Recette journalière moyenne",
      value: formatPrice(0),
      icon: Receipt,
      change: "0%",
      positive: true
    },
    {
      title: "Recette hebdomadaire",
      value: formatPrice(0),
      icon: TrendingUp,
      change: "0%",
      positive: true
    },
    {
      title: "Nombre de clients",
      value: "0",
      icon: Users,
      change: "0%",
      positive: true
    },
    {
      title: "Commandes en cours",
      value: "0",
      icon: Calendar,
      change: "0%",
      positive: true
    }
  ];
};

// Définition des couleurs pour les graphiques
export const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];

// Tableau vide de commandes pour réinitialiser les données
export const commandes: Commande[] = [];

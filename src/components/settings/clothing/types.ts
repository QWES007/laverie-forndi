
import * as z from "zod";

// Define form schema with zod
export const clothingFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  price: z.coerce.number().min(0, "Le prix doit être positif"),
  colors: z.boolean().array().optional(),
  patterns: z.boolean().array().optional(),
});

export type ClothingForm = z.infer<typeof clothingFormSchema>;

// Type definition for clothing item
export interface ClothingItem {
  id: string;
  name: string;
  price: number;
  colors: string[];
  patterns: string[];
}

// Available colors and patterns
export const availableColors = [
  "Blanc", "Noir", "Bleu", "Rouge", "Vert", "Jaune", "Orange", "Violet", "Rose", "Gris", "Beige", "Marron"
];

export const availablePatterns = [
  "Uni", "Rayé", "À carreaux", "À pois", "Floral", "Géométrique", "Imprimé", "Autre"
];

// Updated initial clothing items with the provided list and prices
export const initialClothingItems: ClothingItem[] = [
  { id: "1", name: "CHEMISE", price: 500, colors: ["Blanc", "Bleu", "Rose"], patterns: ["Uni", "Rayé"] },
  { id: "2", name: "PANTALON", price: 500, colors: ["Noir", "Bleu", "Gris", "Beige"], patterns: ["Uni"] },
  { id: "3", name: "JUPE", price: 500, colors: ["Noir", "Rouge", "Bleu"], patterns: ["Uni", "Floral"] },
  { id: "4", name: "ROBE LONGUE", price: 1000, colors: ["Noir", "Rouge", "Bleu"], patterns: ["Uni", "Floral"] },
  { id: "5", name: "ROBE COURTE", price: 500, colors: ["Noir", "Rouge", "Bleu"], patterns: ["Uni", "Floral"] },
  { id: "6", name: "COSTUME 2 PIECES", price: 1500, colors: ["Noir", "Bleu", "Gris"], patterns: ["Uni"] },
  { id: "7", name: "COSTUME 3 PIECES", price: 2000, colors: ["Noir", "Bleu", "Gris"], patterns: ["Uni"] },
  { id: "8", name: "BLOUSON", price: 1000, colors: ["Noir", "Bleu", "Marron"], patterns: ["Uni"] },
  { id: "9", name: "PULL", price: 500, colors: ["Blanc", "Noir", "Bleu", "Rouge"], patterns: ["Uni"] },
  { id: "10", name: "GILET", price: 500, colors: ["Blanc", "Noir", "Bleu", "Gris"], patterns: ["Uni"] },
  { id: "11", name: "ECHARPE", price: 500, colors: ["Blanc", "Noir", "Rouge", "Bleu"], patterns: ["Uni", "Imprimé"] },
  { id: "12", name: "COUETTE", price: 1500, colors: ["Blanc", "Beige"], patterns: ["Uni", "Imprimé"] },
  { id: "13", name: "DRAP", price: 1000, colors: ["Blanc", "Beige", "Bleu"], patterns: ["Uni", "Imprimé"] },
  { id: "14", name: "ENSEMBLE TUNIQUE 2 PIECES", price: 1500, colors: ["Blanc", "Noir", "Bleu"], patterns: ["Uni", "Imprimé"] },
  { id: "15", name: "ENSEMBLE TUNIQUE 3 PIECES", price: 2000, colors: ["Blanc", "Noir", "Bleu"], patterns: ["Uni", "Imprimé"] },
  { id: "16", name: "JEAN", price: 500, colors: ["Bleu", "Noir"], patterns: ["Uni"] },
];

export const formatPrice = (price: number) => {
  return `${price.toLocaleString()} FCFA`;
};


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

// Sample initial clothing items
export const initialClothingItems: ClothingItem[] = [
  { id: "1", name: "Chemise", price: 1500, colors: ["Blanc", "Bleu", "Rose"], patterns: ["Uni", "Rayé"] },
  { id: "2", name: "Pantalon", price: 2000, colors: ["Noir", "Bleu", "Gris", "Beige"], patterns: ["Uni"] },
  { id: "3", name: "Robe", price: 3000, colors: ["Noir", "Rouge", "Bleu"], patterns: ["Uni", "Floral"] },
];

export const formatPrice = (price: number) => {
  return `${price.toLocaleString()} FCFA`;
};

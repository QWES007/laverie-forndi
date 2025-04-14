
import * as z from "zod";

// Define form schema with zod
export const userFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().length(10, "Le numéro de téléphone doit contenir 10 chiffres").regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres"),
  password: z.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .or(z.string().length(0))
    .optional()
    .transform(val => val === "" ? undefined : val),
  role: z.enum(["admin", "receptionniste", "gerant"], {
    required_error: "Veuillez sélectionner un rôle",
  }),
});

export type UserForm = z.infer<typeof userFormSchema>;

export const roleNames = {
  admin: "Administrateur",
  receptionniste: "Réceptionniste",
  gerant: "Gérant",
};

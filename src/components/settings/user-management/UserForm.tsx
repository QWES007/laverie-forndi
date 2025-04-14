
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/contexts/AuthContext";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { userFormSchema, UserForm, roleNames } from "./UserFormSchema";
import { useEffect } from "react";

interface UserFormProps {
  onSubmit: (data: UserForm) => void;
  editingUser: User | null;
}

const UserFormComponent = ({ onSubmit, editingUser }: UserFormProps) => {
  const form = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: editingUser?.name || "",
      phone: editingUser?.phone || "",
      password: "", // Vide par défaut, même en édition
      role: editingUser?.role || "receptionniste",
    },
    // Permettre une validation conditionnelle du mot de passe
    context: { isEditing: !!editingUser }
  });

  // Mettre à jour les valeurs de formulaire lorsque editingUser change
  useEffect(() => {
    if (editingUser) {
      form.reset({
        name: editingUser.name,
        phone: editingUser.phone,
        password: "",
        role: editingUser.role,
      });
    } else {
      form.reset({
        name: "",
        phone: "",
        password: "",
        role: "receptionniste",
      });
    }
  }, [editingUser, form]);

  const handleSubmit = (data: UserForm) => {
    try {
      // Ajout du mot de passe au localStorage pour l'authentification
      if (data.password) {
        const storedPwd = localStorage.getItem('adminPwd') || '{}';
        const passwords = JSON.parse(storedPwd);
        passwords[data.phone] = data.password;
        localStorage.setItem('adminPwd', JSON.stringify(passwords));
      }
      
      onSubmit(data);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom complet" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="0600000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{editingUser ? "Nouveau mot de passe" : "Mot de passe"}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••" {...field} />
              </FormControl>
              {editingUser && (
                <p className="text-xs text-muted-foreground">
                  Laissez vide pour conserver le mot de passe actuel
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rôle</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle">
                      {field.value ? roleNames[field.value as keyof typeof roleNames] : "Sélectionner un rôle"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="receptionniste">Réceptionniste</SelectItem>
                  <SelectItem value="gerant">Gérant</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button type="button" variant="outline">Annuler</Button>
          </SheetClose>
          <Button type="submit">
            {editingUser ? "Mettre à jour" : "Ajouter"}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default UserFormComponent;

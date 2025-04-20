
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/contexts/AuthContext";
import { SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { userFormSchema, UserForm } from "./UserFormSchema";

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
      password: "",
      role: editingUser?.role || "receptionniste",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
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
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
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

        <SheetFooter>
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

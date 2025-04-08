
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Define form schema with zod
const userFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(["admin", "receptionniste", "gerant"], {
    required_error: "Veuillez sélectionner un rôle",
  }),
});

type UserForm = z.infer<typeof userFormSchema>;

// Sample initial users
const initialUsers = [
  { id: "1", name: "Admin Système", email: "admin@laverie.com", role: "admin" },
  { id: "2", name: "Jean Réceptionniste", email: "jean@laverie.com", role: "receptionniste" },
  { id: "3", name: "Marie Gérante", email: "marie@laverie.com", role: "gerant" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserForm | null>(null);

  const form = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "receptionniste",
    },
  });

  const onSubmit = (data: UserForm) => {
    if (editingUser?.id) {
      // Update existing user
      setUsers(users.map(user => (user.id === editingUser.id ? { ...data, id: user.id } : user)));
      toast.success("Utilisateur mis à jour avec succès");
    } else {
      // Add new user
      const newUser = { ...data, id: Math.random().toString(36).substring(2, 9) };
      setUsers([...users, newUser]);
      toast.success("Nouvel utilisateur ajouté avec succès");
    }
    setIsSheetOpen(false);
    form.reset();
  };

  const openAddUserForm = () => {
    form.reset({
      name: "",
      email: "",
      password: "",
      role: "receptionniste",
    });
    setEditingUser(null);
    setIsSheetOpen(true);
  };

  const openEditUserForm = (user: UserForm) => {
    form.reset({
      id: user.id,
      name: user.name,
      email: user.email,
      password: "", // Don't show the password when editing
      role: user.role as "admin" | "receptionniste" | "gerant",
    });
    setEditingUser(user);
    setIsSheetOpen(true);
  };

  const deleteUser = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(users.filter(user => user.id !== id));
      toast.success("Utilisateur supprimé avec succès");
    }
  };

  const roleNames = {
    admin: "Administrateur",
    receptionniste: "Réceptionniste",
    gerant: "Gérant",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Liste des utilisateurs</h3>
        <Button onClick={openAddUserForm}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{roleNames[user.role as keyof typeof roleNames]}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditUserForm(user)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteUser(user.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</SheetTitle>
          </SheetHeader>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserManagement;

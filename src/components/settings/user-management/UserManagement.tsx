
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/contexts/AuthContext";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import UserTable from "./UserTable";
import UserFormSheet from "./UserFormSheet";
import { UserForm } from "./UserFormSchema";

// Sample initial users
const initialUsers: User[] = [
  { id: "1", name: "Admin Système", phone: "0600000000", role: "admin" },
  { id: "2", name: "Jean Réceptionniste", phone: "0611111111", role: "receptionniste" },
  { id: "3", name: "Marie Gérante", phone: "0622222222", role: "gerant" },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const onSubmit = (data: UserForm) => {
    if (editingUser?.id) {
      // Update existing user - ensure all required properties are present
      const updatedUser: User = {
        id: editingUser.id,
        name: data.name,
        phone: data.phone,
        role: data.role
      };
      setUsers(users.map(user => (user.id === editingUser.id ? updatedUser : user)));
      toast.success("Utilisateur mis à jour avec succès");
    } else {
      // Add new user - ensure all required properties are present
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: data.name,
        phone: data.phone,
        role: data.role
      };
      setUsers([...users, newUser]);
      toast.success("Nouvel utilisateur ajouté avec succès");
    }
    setIsSheetOpen(false);
  };

  const openAddUserForm = () => {
    setEditingUser(null);
    setIsSheetOpen(true);
  };

  const openEditUserForm = (user: User) => {
    setEditingUser(user);
    setIsSheetOpen(true);
  };

  const deleteUser = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(users.filter(user => user.id !== id));
      toast.success("Utilisateur supprimé avec succès");
    }
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

      <UserTable 
        users={users} 
        onEdit={openEditUserForm} 
        onDelete={deleteUser} 
      />

      <UserFormSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSubmit={onSubmit}
        editingUser={editingUser}
      />
    </div>
  );
};

export default UserManagement;

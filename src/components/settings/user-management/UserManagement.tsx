
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/contexts/AuthContext";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import UserTable from "./UserTable";
import UserFormSheet from "./UserFormSheet";
import { UserForm } from "./UserFormSchema";

// Utilisateurs initiaux, utilisés seulement si aucun utilisateur n'existe dans le localStorage
const defaultUsers: User[] = [
  { id: "1", name: "Admin Système", phone: "0709177296", role: "admin" },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Charger les utilisateurs depuis le localStorage au chargement du composant
  useEffect(() => {
    const storedUsers = localStorage.getItem('appUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Si aucun utilisateur n'est stocké, utiliser uniquement l'utilisateur admin par défaut
      setUsers([defaultUsers[0]]);
      localStorage.setItem('appUsers', JSON.stringify([defaultUsers[0]]));
    }
  }, []);

  // Mettre à jour le localStorage lorsque les utilisateurs changent
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('appUsers', JSON.stringify(users));
    }
  }, [users]);

  const onSubmit = (data: UserForm) => {
    try {
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
      
      // Fermer la sheet après la soumission
      handleCloseSheet();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const openAddUserForm = () => {
    setEditingUser(null);
    setIsSheetOpen(true);
  };

  const openEditUserForm = (user: User) => {
    setEditingUser(user);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    // Attendre que l'animation de fermeture soit terminée avant de réinitialiser l'état
    setTimeout(() => {
      setEditingUser(null);
    }, 300); // Généralement, les animations durent environ 300ms
  };

  const deleteUser = (id: string) => {
    // Empêcher la suppression du dernier administrateur
    const isLastAdmin = users.filter(user => user.role === "admin").length === 1 && 
                        users.find(user => user.id === id)?.role === "admin";
    
    if (isLastAdmin) {
      toast.error("Impossible de supprimer le dernier administrateur");
      return;
    }
    
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
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

      {/* Conditionnellement rendre la Sheet */}
      {isSheetOpen && (
        <UserFormSheet
          isOpen={isSheetOpen}
          onOpenChange={(open) => {
            if (!open) handleCloseSheet();
            else setIsSheetOpen(true);
          }}
          onSubmit={onSubmit}
          editingUser={editingUser}
        />
      )}
    </div>
  );
};

export default UserManagement;

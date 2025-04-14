
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { User } from "@/contexts/AuthContext";
import UserFormComponent from "./UserForm";
import { UserForm } from "./UserFormSchema";
import { useEffect } from "react";

interface UserFormSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserForm) => void;
  editingUser: User | null;
}

const UserFormSheet = ({ isOpen, onOpenChange, onSubmit, editingUser }: UserFormSheetProps) => {
  // Nettoyer correctement lors du démontage du composant
  useEffect(() => {
    return () => {
      // Ne pas essayer de fermer la feuille si le composant est démonté
      // car cela pourrait déclencher des opérations sur des nœuds DOM qui n'existent plus
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{editingUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</SheetTitle>
        </SheetHeader>
        <UserFormComponent 
          onSubmit={onSubmit} 
          editingUser={editingUser} 
        />
      </SheetContent>
    </Sheet>
  );
};

export default UserFormSheet;

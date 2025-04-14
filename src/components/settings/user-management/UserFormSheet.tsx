
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
  // Assurez-vous que le dialogue se ferme correctement avant de nettoyer
  useEffect(() => {
    return () => {
      if (isOpen) {
        onOpenChange(false);
      }
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
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

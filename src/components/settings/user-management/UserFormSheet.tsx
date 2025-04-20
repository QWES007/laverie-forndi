
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { User } from "@/contexts/AuthContext";
import UserFormComponent from "./UserForm";
import { UserForm } from "./UserFormSchema";

interface UserFormSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserForm) => void;
  editingUser: User | null;
}

const UserFormSheet = ({ isOpen, onOpenChange, onSubmit, editingUser }: UserFormSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
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

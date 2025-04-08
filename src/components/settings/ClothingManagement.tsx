
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { ClothingItem, ClothingForm as ClothingFormType, initialClothingItems } from "./clothing/types";
import ClothingTable from "./clothing/ClothingTable";
import ClothingForm from "./clothing/ClothingForm";

const ClothingManagement = () => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(initialClothingItems);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);

  const handleSubmit = (data: ClothingFormType, selectedColors: string[], selectedPatterns: string[]) => {
    const formattedItem: ClothingItem = {
      ...data,
      name: data.name, 
      price: data.price || 0,
      colors: selectedColors,
      patterns: selectedPatterns,
      id: editingItem?.id || Math.random().toString(36).substring(2, 9)
    };

    if (editingItem?.id) {
      // Update existing item
      setClothingItems(clothingItems.map(item => 
        item.id === editingItem.id ? formattedItem : item
      ));
      toast.success("Vêtement mis à jour avec succès");
    } else {
      // Add new item
      setClothingItems([...clothingItems, formattedItem]);
      toast.success("Nouveau vêtement ajouté avec succès");
    }
    setIsSheetOpen(false);
  };

  const openAddClothingForm = () => {
    setEditingItem(null);
    setIsSheetOpen(true);
  };

  const openEditClothingForm = (item: ClothingItem) => {
    setEditingItem(item);
    setIsSheetOpen(true);
  };

  const deleteClothingItem = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce vêtement ?")) {
      setClothingItems(clothingItems.filter(item => item.id !== id));
      toast.success("Vêtement supprimé avec succès");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Liste des vêtements et tarifs</h3>
        <Button onClick={openAddClothingForm}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un vêtement
        </Button>
      </div>

      <ClothingTable 
        clothingItems={clothingItems} 
        onEdit={openEditClothingForm} 
        onDelete={deleteClothingItem} 
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingItem ? "Modifier le vêtement" : "Ajouter un vêtement"}</SheetTitle>
          </SheetHeader>
          <ClothingForm 
            editingItem={editingItem} 
            onSubmit={handleSubmit} 
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClothingManagement;

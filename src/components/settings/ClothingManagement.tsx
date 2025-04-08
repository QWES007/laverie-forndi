
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Define form schema with zod
const clothingFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  price: z.coerce.number().min(0, "Le prix doit être positif"),
  colors: z.boolean().array().optional(),
  patterns: z.boolean().array().optional(),
});

type ClothingForm = z.infer<typeof clothingFormSchema>;

// Available colors and patterns
const availableColors = [
  "Blanc", "Noir", "Bleu", "Rouge", "Vert", "Jaune", "Orange", "Violet", "Rose", "Gris", "Beige", "Marron"
];

const availablePatterns = [
  "Uni", "Rayé", "À carreaux", "À pois", "Floral", "Géométrique", "Imprimé", "Autre"
];

// Sample initial clothing items
const initialClothingItems = [
  { id: "1", name: "Chemise", price: 1500, colors: ["Blanc", "Bleu", "Rose"], patterns: ["Uni", "Rayé"] },
  { id: "2", name: "Pantalon", price: 2000, colors: ["Noir", "Bleu", "Gris", "Beige"], patterns: ["Uni"] },
  { id: "3", name: "Robe", price: 3000, colors: ["Noir", "Rouge", "Bleu"], patterns: ["Uni", "Floral"] },
];

const ClothingManagement = () => {
  const [clothingItems, setClothingItems] = useState(initialClothingItems);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);

  const form = useForm<ClothingForm>({
    resolver: zodResolver(clothingFormSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const onSubmit = (data: ClothingForm) => {
    const formattedItem = {
      ...data,
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
    form.reset();
    setSelectedColors([]);
    setSelectedPatterns([]);
  };

  const openAddClothingForm = () => {
    form.reset({
      name: "",
      price: 0,
    });
    setSelectedColors([]);
    setSelectedPatterns([]);
    setEditingItem(null);
    setIsSheetOpen(true);
  };

  const openEditClothingForm = (item: any) => {
    form.reset({
      id: item.id,
      name: item.name,
      price: item.price,
    });
    setSelectedColors(item.colors || []);
    setSelectedPatterns(item.patterns || []);
    setEditingItem(item);
    setIsSheetOpen(true);
  };

  const deleteClothingItem = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce vêtement ?")) {
      setClothingItems(clothingItems.filter(item => item.id !== id));
      toast.success("Vêtement supprimé avec succès");
    }
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  const togglePattern = (pattern: string) => {
    setSelectedPatterns(prev => 
      prev.includes(pattern) 
        ? prev.filter(p => p !== pattern) 
        : [...prev, pattern]
    );
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} FCFA`;
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vêtement</TableHead>
            <TableHead>Tarif</TableHead>
            <TableHead>Couleurs disponibles</TableHead>
            <TableHead>Motifs disponibles</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clothingItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{formatPrice(item.price)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.colors.map(color => (
                    <span key={color} className="px-2 py-1 text-xs rounded-full bg-gray-100">{color}</span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {item.patterns.map(pattern => (
                    <span key={pattern} className="px-2 py-1 text-xs rounded-full bg-gray-100">{pattern}</span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditClothingForm(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteClothingItem(item.id)}
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
            <SheetTitle>{editingItem ? "Modifier le vêtement" : "Ajouter un vêtement"}</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du vêtement</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Chemise, Pantalon, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tarif (FCFA)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>Couleurs disponibles</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {availableColors.map(color => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`color-${color}`} 
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => toggleColor(color)}
                      />
                      <label 
                        htmlFor={`color-${color}`}
                        className="text-sm cursor-pointer"
                      >
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <FormLabel>Motifs disponibles</FormLabel>
                <div className="grid grid-cols-2 gap-2">
                  {availablePatterns.map(pattern => (
                    <div key={pattern} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`pattern-${pattern}`} 
                        checked={selectedPatterns.includes(pattern)}
                        onCheckedChange={() => togglePattern(pattern)}
                      />
                      <label 
                        htmlFor={`pattern-${pattern}`}
                        className="text-sm cursor-pointer"
                      >
                        {pattern}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" variant="outline">Annuler</Button>
                </SheetClose>
                <Button type="submit">
                  {editingItem ? "Mettre à jour" : "Ajouter"}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClothingManagement;

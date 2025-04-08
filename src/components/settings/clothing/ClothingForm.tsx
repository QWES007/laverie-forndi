
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { ClothingItem, ClothingForm as ClothingFormType, clothingFormSchema, availableColors, availablePatterns } from "./types";

interface ClothingFormProps {
  editingItem: ClothingItem | null;
  onSubmit: (data: ClothingFormType, selectedColors: string[], selectedPatterns: string[]) => void;
}

const ClothingForm = ({ editingItem, onSubmit }: ClothingFormProps) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  
  const form = useForm<ClothingFormType>({
    resolver: zodResolver(clothingFormSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  // Update form when editing item changes
  useEffect(() => {
    if (editingItem) {
      form.reset({
        id: editingItem.id,
        name: editingItem.name,
        price: editingItem.price,
      });
      setSelectedColors(editingItem.colors || []);
      setSelectedPatterns(editingItem.patterns || []);
    } else {
      form.reset({
        name: "",
        price: 0,
      });
      setSelectedColors([]);
      setSelectedPatterns([]);
    }
  }, [editingItem, form]);

  const handleFormSubmit = (data: ClothingFormType) => {
    onSubmit(data, selectedColors, selectedPatterns);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 py-6">
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

        <SheetFooter className="flex justify-between pt-4">
          <SheetClose asChild>
            <Button type="button" variant="outline">Annuler</Button>
          </SheetClose>
          <Button type="submit">
            {editingItem ? "Mettre à jour" : "Ajouter"}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default ClothingForm;

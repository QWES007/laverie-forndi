
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { VetementSelection, FormulaireBundle } from "../types";

interface VetementFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nouvelItem: VetementSelection;
  setNouvelItem: React.Dispatch<React.SetStateAction<VetementSelection>>;
  ajouterVetement: () => void;
  bundleSelectionne: FormulaireBundle;
  totalItems: number;
}

const VetementForm: React.FC<VetementFormProps> = ({
  open,
  onOpenChange,
  nouvelItem,
  setNouvelItem,
  ajouterVetement,
  bundleSelectionne,
  totalItems,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un vêtement</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom du vêtement *</Label>
            <Input
              id="nom"
              value={nouvelItem.nom}
              onChange={(e) => setNouvelItem({ ...nouvelItem, nom: e.target.value })}
              placeholder="Ex: Chemise, Pantalon, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantite">Quantité</Label>
            <Input
              id="quantite"
              type="number"
              min="1"
              max={bundleSelectionne.quantite - totalItems}
              value={nouvelItem.quantite}
              onChange={(e) => setNouvelItem({ ...nouvelItem, quantite: parseInt(e.target.value) || 1 })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="couleur">Couleur</Label>
            <Input
              id="couleur"
              value={nouvelItem.couleur}
              onChange={(e) => setNouvelItem({ ...nouvelItem, couleur: e.target.value })}
              placeholder="Ex: Bleu, Rouge, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="motif">Motif</Label>
            <Input
              id="motif"
              value={nouvelItem.motif}
              onChange={(e) => setNouvelItem({ ...nouvelItem, motif: e.target.value })}
              placeholder="Ex: Uni, Rayé, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={nouvelItem.notes}
              onChange={(e) => setNouvelItem({ ...nouvelItem, notes: e.target.value })}
              placeholder="Instructions spéciales..."
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={ajouterVetement}>Ajouter</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VetementForm;

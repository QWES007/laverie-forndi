
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { VetementSelection } from "../types";

interface VetementListProps {
  vetements: VetementSelection[];
  supprimerVetement: (id: string) => void;
}

const VetementList: React.FC<VetementListProps> = ({ vetements, supprimerVetement }) => {
  if (vetements.length === 0) {
    return (
      <div className="text-center text-gray-500 py-2 text-sm">
        Aucun vêtement ajouté
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-2">
      {vetements.map((item) => (
        <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border">
          <div>
            <span className="font-medium">{item.nom}</span>
            <div className="text-xs text-gray-500">
              {item.quantite > 1 && <span className="mr-2">x{item.quantite}</span>}
              {item.couleur && <span className="mr-2">Couleur: {item.couleur}</span>}
              {item.motif && <span className="mr-2">Motif: {item.motif}</span>}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => supprimerVetement(item.id)}
          >
            <span className="sr-only">Supprimer</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default VetementList;

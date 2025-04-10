
import React from "react";
import { formatPrice } from "@/components/settings/clothing/types";
import { FormulaireBundle } from "../types";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BundleInfoProps {
  bundleSelectionne: FormulaireBundle;
  totalItems: number;
  dateRetrait: string;
}

const BundleInfo: React.FC<BundleInfoProps> = ({ bundleSelectionne, totalItems, dateRetrait }) => {
  return (
    <div className="bg-laundry-50 p-4 rounded-md">
      <h3 className="font-medium text-lg text-laundry-700 mb-3">Forfait sélectionné</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Type:</span>
        <span className="font-medium">{bundleSelectionne.description}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Quantité d'habits:</span>
        <span className="font-medium">{bundleSelectionne.quantite}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Prix:</span>
        <span className="font-medium">{formatPrice(bundleSelectionne.prix)}</span>
      </div>

      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Vêtements ({totalItems}/{bundleSelectionne.quantite})</h4>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs" disabled={totalItems >= bundleSelectionne.quantite}>
              Ajouter un vêtement
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <p>- Ce forfait concerne uniquement les vêtements</p>
        <p>- Ne sont pas concernés: couettes, draps, etc.</p>
        <p>- Retrait prévu: {new Date(dateRetrait).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BundleInfo;

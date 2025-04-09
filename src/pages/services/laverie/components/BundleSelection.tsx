
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shirt } from "lucide-react";
import { FormulaireBundle } from "../types";
import { formatPrice } from "@/components/settings/clothing/types";

interface BundleSelectionProps {
  bundlePrices: FormulaireBundle[];
  bundleSelectionne: FormulaireBundle | null;
  selectionnerBundle: (bundle: FormulaireBundle) => void;
}

const BundleSelection: React.FC<BundleSelectionProps> = ({
  bundlePrices,
  bundleSelectionne,
  selectionnerBundle,
}) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-laundry-600">Forfaits Disponibles</CardTitle>
        <CardDescription>Sélectionnez un forfait pour votre commande</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {bundlePrices.map((bundle) => (
            <Button
              key={bundle.id}
              variant={bundleSelectionne?.id === bundle.id ? "default" : "outline"}
              className="flex flex-col h-auto py-3 hover:bg-laundry-50"
              onClick={() => selectionnerBundle(bundle)}
            >
              <Shirt className="mb-1 h-5 w-5 text-laundry-600" />
              <span className="text-sm font-medium">{bundle.description}</span>
              <span className="text-xs mt-1">{formatPrice(bundle.prix)}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BundleSelection;


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt } from "lucide-react";
import { initialClothingItems, formatPrice } from "@/components/settings/clothing/types";

interface ClothingSelectionProps {
  onAddItem: (id: string) => void;
}

const ClothingSelection: React.FC<ClothingSelectionProps> = ({ onAddItem }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-laundry-600">Types de Vêtements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {initialClothingItems.map((vetement) => (
            <Button
              key={vetement.id}
              variant="outline"
              className="flex flex-col h-auto py-3 hover:bg-laundry-50"
              onClick={() => onAddItem(vetement.id)}
            >
              <Shirt className="mb-1 h-5 w-5 text-laundry-600" />
              <span className="text-sm">{vetement.name}</span>
              <span className="text-xs text-gray-500 mt-1">{formatPrice(vetement.price)}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClothingSelection;

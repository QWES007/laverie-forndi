
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/components/settings/clothing/types";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { Vetement } from "../types";

interface CartListProps {
  items: Vetement[];
  total: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
  onPatternChange: (id: string, pattern: string) => void;
  onNotesChange: (id: string, notes: string) => void;
  onSubmit: () => void;
}

const CartList: React.FC<CartListProps> = ({
  items,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onColorChange,
  onPatternChange,
  onNotesChange,
  onSubmit
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-laundry-600">Détails de la Commande</CardTitle>
        <CardDescription>Articles sélectionnés</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Article</TableHead>
              <TableHead className="text-center">Prix</TableHead>
              <TableHead className="text-center">Qté</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                  Aucun article ajouté
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                  onColorChange={onColorChange}
                  onPatternChange={onPatternChange}
                  onNotesChange={onNotesChange}
                />
              ))
            )}
          </TableBody>
        </Table>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span className="text-laundry-700">{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/services/pressing")}>
          Annuler
        </Button>
        <Button onClick={onSubmit}>
          Enregistrer la commande <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartList;

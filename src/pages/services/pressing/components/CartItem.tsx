
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Plus, Minus, Trash2 } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { availableColors, availablePatterns, formatPrice } from "@/components/settings/clothing/types";
import { Vetement } from "../types";

interface CartItemProps {
  item: Vetement;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
  onPatternChange: (id: string, pattern: string) => void;
  onNotesChange: (id: string, notes: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onColorChange,
  onPatternChange,
  onNotesChange
}) => {
  return (
    <TableRow>
      <TableCell>{item.type}</TableCell>
      <TableCell className="text-center">{formatPrice(item.prix)}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onDecrease(item.id)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center">{item.quantite}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onIncrease(item.id)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="text-right font-medium">
        {formatPrice(item.total)}
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-1">
            <span className="font-medium">Couleur:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  {item.couleur}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {availableColors.map((couleur) => (
                  <DropdownMenuItem 
                    key={couleur} 
                    onClick={() => onColorChange(item.id, couleur)}
                  >
                    {couleur}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Motif:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  {item.motif}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {availablePatterns.map((motif) => (
                  <DropdownMenuItem 
                    key={motif} 
                    onClick={() => onPatternChange(item.id, motif)}
                  >
                    {motif}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-1">
            <Input 
              placeholder="Notes supplémentaires" 
              value={item.notes} 
              onChange={(e) => onNotesChange(item.id, e.target.value)}
              className="h-6 text-xs"
            />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-red-500"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;

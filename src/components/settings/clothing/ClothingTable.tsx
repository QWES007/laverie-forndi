
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { ClothingItem, formatPrice } from "./types";

interface ClothingTableProps {
  clothingItems: ClothingItem[];
  onEdit: (item: ClothingItem) => void;
  onDelete: (id: string) => void;
}

const ClothingTable = ({ clothingItems, onEdit, onDelete }: ClothingTableProps) => {
  return (
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
                onClick={() => onEdit(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClothingTable;


import React from "react";
import { formatPrice } from "@/components/settings/clothing/types";
import { Vetement } from "../types";

interface ReceiptVetementTableProps {
  panier: Vetement[];
  total: number;
  copyId?: string;
}

const ReceiptVetementTable: React.FC<ReceiptVetementTableProps> = ({ panier, total, copyId = "" }) => {
  return (
    <>
      <table className="w-full text-sm receipt-table">
        <thead>
          <tr>
            <th className="py-2 px-2 text-left">Article</th>
            <th className="py-2 px-2 text-center">Qté</th>
            <th className="py-2 px-2 text-center">Prix</th>
            <th className="py-2 px-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {panier.map((item) => (
            <tr key={`${copyId}${item.id}`} className="border-b">
              <td className="py-2 px-2">
                {item.type}
                {(item.couleur || item.motif) && (
                  <div className="text-xs text-gray-500">
                    {item.couleur && <span>Couleur: {item.couleur}</span>}
                    {item.couleur && item.motif && <span> · </span>}
                    {item.motif && <span>Motif: {item.motif}</span>}
                  </div>
                )}
              </td>
              <td className="py-2 px-2 text-center">{item.quantite}</td>
              <td className="py-2 px-2 text-center">{formatPrice(item.prix)}</td>
              <td className="py-2 px-2 text-right">{formatPrice(item.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td colSpan={3} className="py-3 text-right pr-2">Total</td>
            <td className="py-3 text-right">{formatPrice(total)}</td>
          </tr>
        </tfoot>
      </table>
      
      {panier.some(item => item.notes) && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Notes spécifiques:</p>
          {panier.filter(item => item.notes).map(item => (
            <div key={`${copyId}note-${item.id}`} className="text-sm mb-1">
              <span className="font-medium">{item.type}:</span> {item.notes}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReceiptVetementTable;

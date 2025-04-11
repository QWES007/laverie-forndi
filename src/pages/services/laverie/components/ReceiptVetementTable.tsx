
import React from "react";
import { VetementSelection } from "../types";

interface ReceiptVetementTableProps {
  vetements: VetementSelection[];
  copyId?: string;
}

const ReceiptVetementTable: React.FC<ReceiptVetementTableProps> = ({ vetements, copyId = "" }) => {
  return (
    <>
      <p className="text-sm text-gray-600 mb-2">Vêtements:</p>
      <table className="w-full text-sm receipt-table">
        <thead>
          <tr>
            <th className="py-2 px-2 text-left">Description</th>
            <th className="py-2 px-2 text-center">Qté</th>
            <th className="py-2 px-2 text-left">Couleur</th>
            <th className="py-2 px-2 text-left">Motif</th>
          </tr>
        </thead>
        <tbody>
          {vetements.map((item) => (
            <tr key={`${copyId}${item.id}`} className="border-b">
              <td className="py-2 px-2">{item.nom}</td>
              <td className="py-2 px-2 text-center">{item.quantite}</td>
              <td className="py-2 px-2">{item.couleur || "-"}</td>
              <td className="py-2 px-2">{item.motif || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {vetements.some(item => item.notes) && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Notes spécifiques:</p>
          {vetements.filter(item => item.notes).map(item => (
            <div key={`${copyId}note-${item.id}`} className="text-sm mb-1">
              <span className="font-medium">{item.nom}:</span> {item.notes}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReceiptVetementTable;

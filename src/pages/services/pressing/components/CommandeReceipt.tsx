
import React, { useEffect, useRef } from "react";
import { formatPrice } from "@/components/settings/clothing/types";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./receipt-print.css";

interface Client {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
}

interface Vetement {
  id: string;
  type: string;
  prix: number;
  quantite: number;
  total: number;
  couleur?: string;
  motif?: string;
  notes?: string;
}

interface CommandeReceiptProps {
  client: Client;
  panier: Vetement[];
  total: number;
  dateRetrait: string;
  orderId: string;
  onClose: () => void;
}

const CommandeReceipt: React.FC<CommandeReceiptProps> = ({
  client,
  panier,
  total,
  dateRetrait,
  orderId,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Imprimer automatiquement quand le composant est monté
    const timeoutId = setTimeout(() => {
      window.print();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const today = new Date().toLocaleDateString();

  return (
    <>
      <div className="p-4 bg-white print:hidden">
        <Button variant="outline" onClick={onClose} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <Button onClick={() => window.print()} className="ml-2">
          <FileText className="mr-2 h-4 w-4" /> Imprimer
        </Button>
      </div>
      
      <div 
        ref={printRef} 
        className="max-w-2xl mx-auto bg-white p-8 shadow-sm print:shadow-none print:p-0 print-container"
      >
        <div className="text-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-laundry-700">PRESSING MODERNE FORNDI</h1>
          <p className="text-sm text-gray-500">Reçu de commande - Service Pressing</p>
        </div>
        
        <div className="mb-6 flex justify-between">
          <div>
            <p className="text-sm text-gray-600">Numéro de commande:</p>
            <p className="font-bold">{orderId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date:</p>
            <p>{today}</p>
          </div>
        </div>
        
        <div className="mb-6 border-t border-b py-4">
          <h2 className="font-semibold mb-2">Informations client</h2>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-600">Nom:</p>
              <p>{client.nom}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Prénom:</p>
              <p>{client.prenom}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Téléphone:</p>
              <p>{client.telephone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email:</p>
              <p>{client.email || "-"}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Détails de la commande</h2>
          
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-2 text-left">Article</th>
                <th className="py-2 px-2 text-center">Qté</th>
                <th className="py-2 px-2 text-center">Prix</th>
                <th className="py-2 px-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {panier.map((item) => (
                <tr key={item.id} className="border-b">
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
                <div key={`note-${item.id}`} className="text-sm mb-1">
                  <span className="font-medium">{item.type}:</span> {item.notes}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Informations de retrait</h2>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Date de retrait prévue:</p>
            <p className="font-medium">{new Date(dateRetrait).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center text-lg font-bold mb-6">
            <span>Montant total</span>
            <span className="text-laundry-700">{formatPrice(total)}</span>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-xs text-gray-500 space-y-2 italic">
          <p>- Le client est prié de vérifier l'état des vêtements au moment du retrait. Aucune réclamation ne sera acceptée après départ du pressing.</p>
          <p>- Les articles fragiles (soie, cuir, perles, etc.) sont traités avec soin, mais le pressing décline toute responsabilité en cas d'usure préexistante.</p>
          <p>- Les taches tenaces peuvent ne pas disparaître complètement malgré notre meilleur effort.</p>
          <p>- Conformément aux usages et au droit civil ivoirien, tout article non réclamé dans un délai de 30 jours après notification sera soumis à des frais de stockage (50 FCFA/jour). Passé 60 jours, les vêtements seront considérés comme abandonnés et pourront être vendus pour couvrir les frais dus. Le client est réputé accepter ces conditions dès dépôt.</p>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Merci de votre confiance !</p>
        </div>
      </div>
    </>
  );
};

export default CommandeReceipt;

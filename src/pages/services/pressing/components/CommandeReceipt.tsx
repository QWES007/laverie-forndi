
import React, { useEffect, useRef } from "react";
import { Client, Vetement } from "../types";
import ReceiptLayout from "../../shared/receipt/ReceiptLayout";
import ReceiptCopy from "../../shared/receipt/ReceiptCopy";
import ReceiptHeader from "../../shared/receipt/ReceiptHeader";
import ReceiptOrderInfo from "../../shared/receipt/ReceiptOrderInfo";
import ReceiptClientInfo from "../../shared/receipt/ReceiptClientInfo";
import ReceiptPickupInfo from "../../shared/receipt/ReceiptPickupInfo";
import ReceiptFooter from "../../shared/receipt/ReceiptFooter";
import ReceiptVetementTable from "./ReceiptVetementTable";
import "./receipt-print.css";

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
    <ReceiptLayout onClose={onClose}>
      <ReceiptCopy ref={printRef}>
        <ReceiptHeader 
          title="PRESSING MODERNE FORNDI" 
          subtitle="Reçu de commande - Service Pressing" 
        />
        
        <ReceiptOrderInfo 
          orderNumber={orderId} 
          date={today} 
        />
        
        <ReceiptClientInfo 
          nom={client.nom}
          prenom={client.prenom}
          telephone={client.telephone}
          email={client.email}
        />
        
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Détails de la commande</h2>
          <ReceiptVetementTable panier={panier} total={total} />
        </div>
        
        <ReceiptPickupInfo dateRetrait={dateRetrait} />
        
        <div className="mt-6 border-t pt-4 total-section">
          <div className="flex justify-between items-center text-lg font-bold mb-6">
            <span>Montant total</span>
            <span className="text-laundry-700">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(total)}</span>
          </div>
        </div>
        
        <ReceiptFooter />
      </ReceiptCopy>
    </ReceiptLayout>
  );
};

export default CommandeReceipt;

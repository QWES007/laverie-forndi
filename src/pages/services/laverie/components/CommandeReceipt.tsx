
import React, { useEffect, useRef } from "react";
import { Client, FormulaireBundle, VetementSelection } from "../types";
import ReceiptLayout from "../../shared/receipt/ReceiptLayout";
import ReceiptCopy from "../../shared/receipt/ReceiptCopy";
import ReceiptHeader from "../../shared/receipt/ReceiptHeader";
import ReceiptOrderInfo from "../../shared/receipt/ReceiptOrderInfo";
import ReceiptClientInfo from "../../shared/receipt/ReceiptClientInfo";
import ReceiptPickupInfo from "../../shared/receipt/ReceiptPickupInfo";
import ReceiptTotal from "../../shared/receipt/ReceiptTotal";
import ReceiptFooter from "../../shared/receipt/ReceiptFooter";
import ReceiptBundleInfo from "./ReceiptBundleInfo";
import ReceiptVetementTable from "./ReceiptVetementTable";
import "./receipt-print.css";

interface CommandeReceiptProps {
  client: Client;
  bundle: FormulaireBundle;
  dateRetrait: string;
  vetements: VetementSelection[];
  onClose: () => void;
}

const CommandeReceipt: React.FC<CommandeReceiptProps> = ({
  client,
  bundle,
  dateRetrait,
  vetements,
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
  const numeroCommande = `LAV-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 9000) + 1000}`;

  return (
    <ReceiptLayout onClose={onClose}>
      <ReceiptCopy ref={printRef}>
        <ReceiptHeader 
          title="LAVERIE MODERNE FORNDI" 
          subtitle="Reçu de commande - Service Laverie" 
        />
        
        <ReceiptOrderInfo 
          orderNumber={numeroCommande} 
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
          <ReceiptBundleInfo bundle={bundle} />
          <ReceiptVetementTable vetements={vetements} />
        </div>
        
        <ReceiptPickupInfo dateRetrait={dateRetrait} />
        
        <ReceiptTotal total={bundle.prix} />
        
        <ReceiptFooter />
      </ReceiptCopy>
    </ReceiptLayout>
  );
};

export default CommandeReceipt;

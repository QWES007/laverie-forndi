
import React, { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import "./receipt-print.css";

interface ReceiptLayoutProps {
  children: ReactNode;
  onClose: () => void;
}

const ReceiptLayout: React.FC<ReceiptLayoutProps> = ({ children, onClose }) => {
  useEffect(() => {
    // Ajouter une classe au body pour les styles d'impression
    document.body.classList.add("printing-receipt");
    
    // Mettre à jour la mise en page après le rendu
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => {
      // Nettoyer en enlevant la classe quand le composant est démonté
      document.body.classList.remove("printing-receipt");
    };
  }, []);
  
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
      
      <div className="print-container">
        <div className="print-layout">
          {children}
        </div>
      </div>
    </>
  );
};

export default ReceiptLayout;

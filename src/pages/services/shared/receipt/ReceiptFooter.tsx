
import React from "react";

const ReceiptFooter: React.FC = () => {
  return (
    <>
      <div className="mt-4 pt-4 border-t text-xs text-gray-500 space-y-1 italic receipt-footer">
        <p>1- Les retraits en détails ne sont pas autorisés</p>
        <p>2- La laverie n'est pas responsable des boutons et fermetures.</p>
        <p>3- En cas de perte de votre ticket, se présenter avec la CNI.</p>
        <p>4- Passé 3 mois vous payerez 150f/J pour la conservation.</p>
        <p>5- Passer 6 mois les habits ne sont plus garantis et serviras de chiffons</p>
        <p>6- Nous déclinons toutes responsabilités des défauts non signalé</p>
        <p>7- En cas de dommage causé aux effets la responsabilité du pressing est limitée à 10 fois la valeur de nettoyage de l'article.</p>
        <p>8- Après le retrait, le détail de revendication est de 48h, après ce délai la maison n'est plus responsable</p>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-400 signature-section">
        <p>Merci de votre confiance !</p>
      </div>
    </>
  );
};

export default ReceiptFooter;


import React from "react";

interface ClientInfoProps {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
}

const ReceiptClientInfo: React.FC<ClientInfoProps> = ({ nom, prenom, telephone, email }) => {
  return (
    <div className="mb-6 border-t border-b py-4 client-info">
      <h2 className="font-semibold mb-2">Informations client</h2>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-gray-600">Nom:</p>
          <p>{nom}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Prénom:</p>
          <p>{prenom}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Téléphone:</p>
          <p>{telephone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Email:</p>
          <p>{email || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptClientInfo;

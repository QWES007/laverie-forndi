
import React from "react";

interface ReceiptOrderInfoProps {
  orderNumber: string;
  date: string;
}

const ReceiptOrderInfo: React.FC<ReceiptOrderInfoProps> = ({ orderNumber, date }) => {
  return (
    <div className="mb-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-600">Numéro de commande:</p>
        <p className="font-bold receipt-number">{orderNumber}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Date:</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default ReceiptOrderInfo;

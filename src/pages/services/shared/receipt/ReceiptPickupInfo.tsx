
import React from "react";

interface ReceiptPickupInfoProps {
  dateRetrait: string;
}

const ReceiptPickupInfo: React.FC<ReceiptPickupInfoProps> = ({ dateRetrait }) => {
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">Informations de retrait</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Date de retrait prévue:</p>
        <p className="font-medium">{new Date(dateRetrait).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ReceiptPickupInfo;

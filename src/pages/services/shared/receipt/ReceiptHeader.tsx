
import React from "react";

interface ReceiptHeaderProps {
  title: string;
  subtitle: string;
}

const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-3 border-b pb-2 receipt-header">
      <h1 className="text-xl font-bold text-laundry-700 receipt-title">{title}</h1>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
};

export default ReceiptHeader;

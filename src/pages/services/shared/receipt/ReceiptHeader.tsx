
import React from "react";

interface ReceiptHeaderProps {
  title: string;
  subtitle: string;
}

const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-6 border-b pb-4 receipt-header">
      <h1 className="text-2xl font-bold text-laundry-700 receipt-title">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default ReceiptHeader;

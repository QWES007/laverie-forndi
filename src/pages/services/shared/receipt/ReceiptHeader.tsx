
import React from "react";

interface ReceiptHeaderProps {
  title: string;
  subtitle: string;
}

const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-6 border-b pb-4 receipt-header">
      <img 
        src="/lovable-uploads/065903ba-7499-4012-b4fb-fcb0561d5a88.png" 
        alt="Laverie Forndi Logo" 
        className="receipt-logo mx-auto mb-3"
      />
      <h1 className="text-xl font-bold text-laundry-700 receipt-title">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default ReceiptHeader;

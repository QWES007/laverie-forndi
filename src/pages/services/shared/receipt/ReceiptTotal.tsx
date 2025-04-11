
import React from "react";
import { formatPrice } from "@/components/settings/clothing/types";

interface ReceiptTotalProps {
  total: number;
  label?: string;
}

const ReceiptTotal: React.FC<ReceiptTotalProps> = ({ total, label = "Total" }) => {
  return (
    <div className="mt-6 border-t pt-4 total-section">
      <div className="flex justify-between items-center text-lg font-bold mb-6">
        <span>{label}</span>
        <span className="text-laundry-700">{formatPrice(total)}</span>
      </div>
    </div>
  );
};

export default ReceiptTotal;

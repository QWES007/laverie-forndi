
import React from "react";
import { formatPrice } from "@/components/settings/clothing/types";
import { FormulaireBundle } from "../types";

interface ReceiptBundleInfoProps {
  bundle: FormulaireBundle;
}

const ReceiptBundleInfo: React.FC<ReceiptBundleInfoProps> = ({ bundle }) => {
  return (
    <div className="mb-4 bg-gray-50 p-3 rounded-md">
      <p className="text-sm text-gray-600">Forfait:</p>
      <p className="font-medium">{bundle.description} - {formatPrice(bundle.prix)}</p>
    </div>
  );
};

export default ReceiptBundleInfo;

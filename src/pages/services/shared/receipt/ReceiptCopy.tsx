
import React, { ReactNode, forwardRef } from "react";

interface ReceiptCopyProps {
  children: ReactNode;
}

const ReceiptCopy = forwardRef<HTMLDivElement, ReceiptCopyProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="receipt-copy max-w-2xl mx-auto bg-white p-4 shadow-sm print:shadow-none print:p-2"
      >
        {children}
      </div>
    );
  }
);

ReceiptCopy.displayName = "ReceiptCopy";

export default ReceiptCopy;

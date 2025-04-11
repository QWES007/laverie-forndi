
import React, { ReactNode, forwardRef } from "react";

interface ReceiptCopyProps {
  children: ReactNode;
}

const ReceiptCopy = forwardRef<HTMLDivElement, ReceiptCopyProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="receipt-copy max-w-4xl mx-auto bg-white p-8 shadow-md print:shadow-none print:p-0 my-8"
      >
        {children}
      </div>
    );
  }
);

ReceiptCopy.displayName = "ReceiptCopy";

export default ReceiptCopy;

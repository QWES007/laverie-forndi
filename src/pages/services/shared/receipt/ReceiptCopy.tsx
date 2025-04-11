
import React, { ReactNode, forwardRef } from "react";

interface ReceiptCopyProps {
  children: ReactNode;
}

const ReceiptCopy = forwardRef<HTMLDivElement, ReceiptCopyProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="receipt-copy max-w-[21cm] mx-auto bg-white p-6 shadow-md print:shadow-none print:p-2 my-6 print:my-0"
      >
        {children}
      </div>
    );
  }
);

ReceiptCopy.displayName = "ReceiptCopy";

export default ReceiptCopy;

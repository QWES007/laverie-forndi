
import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, X } from "lucide-react";
import { formatPrice } from "@/components/settings/clothing/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface OrderDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any; // Using any for simplicity in this example
}

const OrderDetail: React.FC<OrderDetailProps> = ({ open, onOpenChange, order }) => {
  const isMobile = useIsMobile();
  
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'max-w-[95%] p-4' : 'max-w-3xl'}`}>
        <DialogHeader>
          <DialogTitle>Détails de la commande {order.id}</DialogTitle>
          <DialogDescription>
            Commande passée le {new Date(order.date).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-4'}`}>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Informations client</h3>
              <p className="mt-1 text-sm">{order.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date de retrait</h3>
              <p className="mt-1 text-sm">{new Date(order.retrait).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Articles</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead className="text-center">Quantité</TableHead>
                  <TableHead className={`${isMobile ? 'hidden' : 'text-center'}`}>Prix unitaire</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Nous simulons des articles car les données mock n'en contiennent pas */}
                <TableRow>
                  <TableCell>Chemise homme - Blanc</TableCell>
                  <TableCell className="text-center">2</TableCell>
                  <TableCell className={`${isMobile ? 'hidden' : 'text-center'}`}>{formatPrice(order.montant / order.articles / 2)}</TableCell>
                  <TableCell className="text-right">{formatPrice(order.montant / order.articles)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Pantalon - Beige</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className={`${isMobile ? 'hidden' : 'text-center'}`}>{formatPrice(order.montant / order.articles)}</TableCell>
                  <TableCell className="text-right">{formatPrice(order.montant / order.articles)}</TableCell>
                </TableRow>
                {order.articles > 2 && (
                  <TableRow>
                    <TableCell>Veste - Bleu marine</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className={`${isMobile ? 'hidden' : 'text-center'}`}>{formatPrice(order.montant / order.articles)}</TableCell>
                    <TableCell className="text-right">{formatPrice(order.montant / order.articles)}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className={`${isMobile ? 'space-y-3' : 'flex justify-between'}`}>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Statut actuel</h3>
              <p className="mt-1 text-sm">
                {order.statut === "en_cours" ? "En cours de traitement" : 
                 order.statut === "pret" ? "Prêt pour le retrait" : "Livré"}
              </p>
            </div>
            <div className={`${isMobile ? '' : 'text-right'}`}>
              <h3 className="text-sm font-medium text-gray-500">Total</h3>
              <p className="mt-1 text-sm font-semibold">{formatPrice(order.montant)}</p>
            </div>
          </div>
        </div>

        <DialogFooter className={`${isMobile ? 'flex-col gap-2' : ''}`}>
          <Button variant="outline" onClick={() => onOpenChange(false)} className={`${isMobile ? 'w-full' : ''}`}>
            <X className="mr-2 h-4 w-4" /> Fermer
          </Button>
          <Button onClick={handlePrint} className={`${isMobile ? 'w-full' : ''}`}>
            <Printer className="mr-2 h-4 w-4" /> Imprimer le reçu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;


import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const InfoCard = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-laundry-600">Informations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex items-center">
            <span className="bg-laundry-100 p-1 rounded-full mr-2">
              <ArrowRight className="h-3 w-3 text-laundry-600" />
            </span>
            Les tarifs s'appliquent exclusivement aux vêtements
          </p>
          <p className="flex items-center">
            <span className="bg-laundry-100 p-1 rounded-full mr-2">
              <ArrowRight className="h-3 w-3 text-laundry-600" />
            </span>
            Couettes, draps et linge de maison non concernés
          </p>
          <p className="flex items-center">
            <span className="bg-laundry-100 p-1 rounded-full mr-2">
              <ArrowRight className="h-3 w-3 text-laundry-600" />
            </span>
            Délai de traitement standard: 24h
          </p>
          <p className="flex items-center">
            <span className="bg-laundry-100 p-1 rounded-full mr-2">
              <ArrowRight className="h-3 w-3 text-laundry-600" />
            </span>
            Service express disponible avec supplément
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;

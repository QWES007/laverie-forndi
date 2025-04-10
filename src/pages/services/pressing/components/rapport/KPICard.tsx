
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  positive: boolean;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  positive,
  color,
}) => {
  return (
    <Card className="border-t-4" style={{ borderTopColor: color }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div
          className={`text-sm mt-1 ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {change} par rapport à la période précédente
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;

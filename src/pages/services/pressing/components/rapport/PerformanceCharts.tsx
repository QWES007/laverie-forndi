
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";

interface PerformanceData {
  servicesData: Array<{ service: string; commandes: number }>;
  efficaciteData: Array<{ semaine: string; efficacite: number }>;
}

interface PerformanceChartsProps {
  data: PerformanceData;
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ data }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Services les plus demandés */}
      <Card>
        <CardHeader>
          <CardTitle>Services les plus demandés</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            className="h-full" 
            config={{
              service: {
                theme: {
                  light: "#8B5CF6",
                  dark: "#8B5CF6",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data.servicesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 100,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="service" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="commandes" name="Nombre de commandes" fill="var(--color-service)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Efficacité opérationnelle */}
      <Card>
        <CardHeader>
          <CardTitle>Efficacité opérationnelle</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            className="h-full"
            config={{
              efficiency: {
                theme: {
                  light: "#F97316",
                  dark: "#F97316",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.efficaciteData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semaine" />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value}%`}
                    />
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="efficacite" 
                  name="Efficacité" 
                  stroke="var(--color-efficiency)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;

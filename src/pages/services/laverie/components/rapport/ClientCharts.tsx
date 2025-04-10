
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
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";

interface ClientData {
  clientsData: Array<{ type: string; valeur: number }>;
  clientsEvolution: Array<{ mois: string; clients: number }>;
  clientsComportement: Array<{ 
    mois: string; 
    reguliers: number; 
    occasionnels: number; 
    nouveaux: number; 
  }>;
}

interface ClientChartsProps {
  data: ClientData;
  colors: string[];
}

const ClientCharts: React.FC<ClientChartsProps> = ({ data, colors }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Graphique répartition des clients */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des clients</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.clientsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valeur"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.clientsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graphique évolution nombre de clients */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution du nombre de clients</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            className="h-full"
            config={{
              clients: {
                theme: {
                  light: "#D946EF",
                  dark: "#D946EF",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.clientsEvolution}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="clients" 
                  name="Clients" 
                  stroke="var(--color-clients)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Comportement des clients */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Comportement des clients</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            className="h-full"
            config={{
              reguliers: {
                theme: {
                  light: "#8B5CF6",
                  dark: "#8B5CF6",
                },
              },
              occasionnels: {
                theme: {
                  light: "#D946EF",
                  dark: "#D946EF",
                },
              },
              nouveaux: {
                theme: {
                  light: "#F97316",
                  dark: "#F97316",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.clientsComportement}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="reguliers" name="Clients réguliers" fill="var(--color-reguliers)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="occasionnels" name="Clients occasionnels" fill="var(--color-occasionnels)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nouveaux" name="Nouveaux clients" fill="var(--color-nouveaux)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientCharts;

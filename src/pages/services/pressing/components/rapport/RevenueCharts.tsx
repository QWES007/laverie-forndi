
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

interface RevenueData {
  dailyRevenue: Array<{ jour: string; montant: number }>;
  weeklyRevenue: Array<{ semaine: string; montant: number }>;
  monthlyRevenue: Array<{ mois: string; montant: number }>;
  annualData: Array<{ mois: string; montant: number }>;
}

interface RevenueChartsProps {
  data: RevenueData;
}

const RevenueCharts: React.FC<RevenueChartsProps> = ({ data }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Graphique recettes journalières */}
      <Card>
        <CardHeader>
          <CardTitle>Recettes journalières</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            className="h-full"
            config={{
              day: {
                theme: {
                  light: "#8B5CF6",
                  dark: "#8B5CF6",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.dailyRevenue}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jour" />
                <YAxis tickFormatter={(value) => `${value} FCFA`} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value} FCFA`}
                    />
                  }
                />
                <Bar dataKey="montant" name="Montant" fill="var(--color-day)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Graphique recettes hebdomadaires */}
      <Card>
        <CardHeader>
          <CardTitle>Recettes hebdomadaires</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            className="h-full"
            config={{
              week: {
                theme: {
                  light: "#D946EF",
                  dark: "#D946EF",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.weeklyRevenue}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semaine" />
                <YAxis tickFormatter={(value) => `${value} FCFA`} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value} FCFA`}
                    />
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="montant" 
                  name="Montant" 
                  stroke="var(--color-week)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Graphique recettes mensuelles */}
      <Card>
        <CardHeader>
          <CardTitle>Recettes mensuelles</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            className="h-full"
            config={{
              month: {
                theme: {
                  light: "#F97316",
                  dark: "#F97316",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.monthlyRevenue}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis tickFormatter={(value) => `${value} FCFA`} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value} FCFA`}
                    />
                  }
                />
                <Bar dataKey="montant" name="Montant" fill="var(--color-month)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Tendance des recettes */}
      <Card>
        <CardHeader>
          <CardTitle>Tendance annuelle</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ChartContainer
            className="h-full"
            config={{
              annual: {
                theme: {
                  light: "#0EA5E9",
                  dark: "#0EA5E9",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.annualData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis tickFormatter={(value) => `${value} FCFA`} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => `${value} FCFA`}
                    />
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="montant" 
                  name="Montant" 
                  stroke="var(--color-annual)" 
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

export default RevenueCharts;

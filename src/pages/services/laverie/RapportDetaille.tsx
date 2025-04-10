
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Importation des composants
import KPICard from "./components/rapport/KPICard";
import RevenueCharts from "./components/rapport/RevenueCharts";
import ClientCharts from "./components/rapport/ClientCharts";
import PerformanceCharts from "./components/rapport/PerformanceCharts";

// Importation des utilitaires et données
import {
  commandes,
  calculerKPIs,
  calculerDonneesGraphiques,
  COLORS,
} from "./components/rapport/utils";

const RapportDetaille = () => {
  const navigate = useNavigate();
  const kpiData = calculerKPIs(commandes);
  const {
    dailyRevenue,
    weeklyRevenue,
    monthlyRevenue,
    clientsData,
    annualData,
    clientsEvolution,
    clientsComportement,
    forfaitsData,
    efficaciteData,
    quantiteLinge
  } = calculerDonneesGraphiques(commandes);

  const revenueData = {
    dailyRevenue,
    weeklyRevenue,
    monthlyRevenue,
    annualData,
  };

  const clientData = {
    clientsData,
    clientsEvolution,
    clientsComportement,
  };

  const performanceData = {
    forfaitsData,
    efficaciteData,
    quantiteLinge
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/services/laverie")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-laundry-700">
                Rapport Détaillé
              </h1>
              <p className="text-gray-600 mt-1">
                Statistiques complètes du service de laverie (en FCFA)
              </p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              change={kpi.change}
              positive={kpi.positive}
              color={COLORS[index % COLORS.length]}
            />
          ))}
        </div>

        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="revenue">Recettes</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <RevenueCharts data={revenueData} />
          </TabsContent>

          <TabsContent value="clients">
            <ClientCharts data={clientData} colors={COLORS} />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceCharts data={performanceData} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RapportDetaille;

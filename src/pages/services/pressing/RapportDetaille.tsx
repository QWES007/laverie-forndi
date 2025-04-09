
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Users, Calendar, CreditCard } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Données fictives pour les graphiques
const dailyRevenue = [
  { jour: "Lundi", montant: 1250 },
  { jour: "Mardi", montant: 980 },
  { jour: "Mercredi", montant: 1430 },
  { jour: "Jeudi", montant: 1180 },
  { jour: "Vendredi", montant: 1650 },
  { jour: "Samedi", montant: 2100 },
  { jour: "Dimanche", montant: 450 },
];

const weeklyRevenue = [
  { semaine: "Semaine 1", montant: 8500 },
  { semaine: "Semaine 2", montant: 9200 },
  { semaine: "Semaine 3", montant: 7800 },
  { semaine: "Semaine 4", montant: 10500 },
];

const monthlyRevenue = [
  { mois: "Janvier", montant: 32000 },
  { mois: "Février", montant: 29500 },
  { mois: "Mars", montant: 34800 },
  { mois: "Avril", montant: 38400 },
];

const clientsData = [
  { type: "Réguliers", valeur: 65 },
  { type: "Occasionnels", valeur: 25 },
  { type: "Nouveaux", valeur: 10 },
];

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(value);
};

const kpiData = [
  {
    title: "Recette journalière moyenne",
    value: formatPrice(1290),
    icon: CreditCard,
    change: "+12.5%",
    positive: true
  },
  {
    title: "Recette hebdomadaire",
    value: formatPrice(9000),
    icon: TrendingUp,
    change: "+8.2%",
    positive: true
  },
  {
    title: "Nombre de clients",
    value: "245",
    icon: Users,
    change: "+5.1%",
    positive: true
  },
  {
    title: "Commandes en cours",
    value: "38",
    icon: Calendar,
    change: "-2.3%",
    positive: false
  }
];

const RapportDetaille = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/services/pressing')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-laundry-700">Rapport Détaillé</h1>
              <p className="text-gray-600 mt-1">Statistiques complètes du service de pressing</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="border-t-4" style={{ borderTopColor: COLORS[index % COLORS.length] }}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">{kpi.title}</CardTitle>
                  <kpi.icon className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className={`text-sm mt-1 ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change} par rapport à la période précédente
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="revenue">Recettes</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue">
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
                        data={dailyRevenue}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 30,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="jour" />
                        <YAxis tickFormatter={(value) => `${value}€`} />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value) => `${value}€`}
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
                        data={weeklyRevenue}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 30,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="semaine" />
                        <YAxis tickFormatter={(value) => `${value}€`} />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value) => `${value}€`}
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
                        data={monthlyRevenue}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 30,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mois" />
                        <YAxis tickFormatter={(value) => `${value}€`} />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value) => `${value}€`}
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
                        data={[
                          { mois: "Jan", montant: 32000 },
                          { mois: "Fév", montant: 29500 },
                          { mois: "Mar", montant: 34800 },
                          { mois: "Avr", montant: 38400 },
                          { mois: "Mai", montant: 42100 },
                          { mois: "Juin", montant: 45300 },
                          { mois: "Juil", montant: 47500 },
                          { mois: "Août", montant: 39000 },
                          { mois: "Sept", montant: 36500 },
                          { mois: "Oct", montant: 41800 },
                          { mois: "Nov", montant: 44200 },
                          { mois: "Déc", montant: 49500 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 30,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mois" />
                        <YAxis tickFormatter={(value) => `${value}€`} />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value) => `${value}€`}
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
          </TabsContent>

          <TabsContent value="clients">
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
                        data={clientsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="valeur"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {clientsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                        data={[
                          { mois: "Jan", clients: 180 },
                          { mois: "Fév", clients: 195 },
                          { mois: "Mar", clients: 210 },
                          { mois: "Avr", clients: 245 },
                        ]}
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
                        data={[
                          { mois: "Jan", reguliers: 120, occasionnels: 40, nouveaux: 20 },
                          { mois: "Fév", reguliers: 125, occasionnels: 45, nouveaux: 25 },
                          { mois: "Mar", reguliers: 135, occasionnels: 50, nouveaux: 25 },
                          { mois: "Avr", reguliers: 150, occasionnels: 65, nouveaux: 30 },
                        ]}
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
          </TabsContent>

          <TabsContent value="performance">
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
                        data={[
                          { service: "Nettoyage à sec", commandes: 120 },
                          { service: "Repassage", commandes: 95 },
                          { service: "Lavage", commandes: 85 },
                          { service: "Détachage", commandes: 45 },
                          { service: "Textiles délicats", commandes: 35 },
                        ]}
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
                        data={[
                          { semaine: "Sem 1", efficacite: 78 },
                          { semaine: "Sem 2", efficacite: 82 },
                          { semaine: "Sem 3", efficacite: 85 },
                          { semaine: "Sem 4", efficacite: 91 },
                        ]}
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RapportDetaille;

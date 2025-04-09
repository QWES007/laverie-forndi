
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, ArrowRight, WashingMachine, ClipboardList, BarChart } from "lucide-react";

const LaverieService = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-laundry-700">Service de Laverie</h1>
            <p className="text-gray-600 mt-2">Gérez vos commandes de lavage par lots</p>
          </div>
          <Link to="/services/laverie/nouvelle-commande">
            <Button size="lg" className="mt-4 md:mt-0">
              <WashingMachine className="mr-2 h-4 w-4" />
              Nouvelle Commande
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-laundry-600 flex items-center">
                <WashingMachine className="mr-2 h-5 w-5" />
                Forfaits
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-laundry-50">
                      <th className="py-2 px-2 text-left font-medium">Quantité</th>
                      <th className="py-2 px-2 text-right font-medium">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-2">5 HABITS</td>
                      <td className="py-2 px-2 text-right">1 500 FCFA</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2">10 HABITS</td>
                      <td className="py-2 px-2 text-right">2 500 FCFA</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2">15 HABITS</td>
                      <td className="py-2 px-2 text-right">3 000 FCFA</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2">20 HABITS</td>
                      <td className="py-2 px-2 text-right">4 000 FCFA</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-2">25 HABITS</td>
                      <td className="py-2 px-2 text-right">4 500 FCFA</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2">30 HABITS</td>
                      <td className="py-2 px-2 text-right">5 000 FCFA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                <p>* Exclusivement pour les vêtements (pas de couettes ou draps)</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/services/laverie/nouvelle-commande" className="w-full">
                <Button variant="outline" className="w-full">
                  Commander <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-laundry-600 flex items-center">
                <ClipboardList className="mr-2 h-5 w-5" />
                Commandes en cours
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-4">
                <div className="bg-laundry-50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">LAV-230422-0045</span>
                    <span className="text-sm text-laundry-600 bg-laundry-100 px-2 py-0.5 rounded">En cours</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Client: Julie Dubois</div>
                  <div className="text-sm text-gray-500">Retrait: 23/04/2023</div>
                  <div className="text-sm text-gray-500">Forfait: 15 HABITS</div>
                </div>
                <div className="bg-laundry-50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">LAV-230421-0089</span>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-0.5 rounded">Prêt</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Client: Paul Martin</div>
                  <div className="text-sm text-gray-500">Retrait: 22/04/2023</div>
                  <div className="text-sm text-gray-500">Forfait: 25 HABITS</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Voir toutes les commandes <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-laundry-600 flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Commandes aujourd'hui</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full">
                  <div className="h-1 bg-laundry-500 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cette semaine</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full">
                  <div className="h-1 bg-laundry-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ce mois</span>
                  <span className="font-medium">156</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full">
                  <div className="h-1 bg-laundry-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Rapport détaillé <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LaverieService;

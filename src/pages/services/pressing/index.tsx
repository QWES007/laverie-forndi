
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, ArrowRight, ClipboardList, BarChart } from "lucide-react";

const PressingService = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-laundry-700">Service de Pressing</h1>
            <p className="text-gray-600 mt-2">Gérez vos commandes de pressing et nettoyage à sec</p>
          </div>
          <Link to="/services/pressing/nouvelle-commande">
            <Button size="lg" className="mt-4 md:mt-0">
              <Shirt className="mr-2 h-4 w-4" />
              Nouvelle Commande
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-laundry-600 flex items-center">
                <Shirt className="mr-2 h-5 w-5" />
                Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="bg-laundry-100 p-1 rounded-full mr-2">
                    <ArrowRight className="h-3 w-3 text-laundry-600" />
                  </span>
                  Nettoyage à sec
                </li>
                <li className="flex items-center">
                  <span className="bg-laundry-100 p-1 rounded-full mr-2">
                    <ArrowRight className="h-3 w-3 text-laundry-600" />
                  </span>
                  Repassage
                </li>
                <li className="flex items-center">
                  <span className="bg-laundry-100 p-1 rounded-full mr-2">
                    <ArrowRight className="h-3 w-3 text-laundry-600" />
                  </span>
                  Lavage et séchage
                </li>
                <li className="flex items-center">
                  <span className="bg-laundry-100 p-1 rounded-full mr-2">
                    <ArrowRight className="h-3 w-3 text-laundry-600" />
                  </span>
                  Détachage
                </li>
                <li className="flex items-center">
                  <span className="bg-laundry-100 p-1 rounded-full mr-2">
                    <ArrowRight className="h-3 w-3 text-laundry-600" />
                  </span>
                  Traitement des textiles délicats
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Voir tous les services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
              <div className="text-center text-gray-500 py-8">
                <ClipboardList className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                <p>Aucune commande en cours</p>
                <p className="text-sm mt-2">Créez une nouvelle commande pour commencer</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/services/pressing/commandes" className="w-full">
                <Button variant="outline" className="w-full">
                  Voir toutes les commandes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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
                  <span className="font-medium">0</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full">
                  <div className="h-1 bg-laundry-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cette semaine</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full">
                  <div className="h-1 bg-laundry-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ce mois</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full">
                  <div className="h-1 bg-laundry-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/services/pressing/rapport-detaille" className="w-full">
                <Button variant="outline" className="w-full">
                  Rapport détaillé <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PressingService;

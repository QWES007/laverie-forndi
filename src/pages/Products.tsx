
import { Check, Package, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-laundry-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos produits et services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Des solutions adaptées à toutes les tailles d'entreprises, de la blanchisserie indépendante aux chaînes de pressing
          </p>
        </div>
      </section>

      {/* Product Offerings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Choisissez la solution adaptée à vos besoins</h2>
          
          <Tabs defaultValue="packages" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="packages">Forfaits</TabsTrigger>
              <TabsTrigger value="modules">Modules additionnels</TabsTrigger>
            </TabsList>
            <TabsContent value="packages">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-laundry-200 hover:border-laundry-300 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl">Essentiel</CardTitle>
                    <CardDescription>Pour les petites blanchisseries</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">49€</span>
                      <span className="text-gray-500">/mois</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">1 site</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">3 utilisateurs</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Gestion des commandes</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Facturation de base</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Support par email</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Choisir ce forfait</Button>
                  </CardFooter>
                </Card>

                <Card className="border-laundry-300 shadow-lg relative">
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 bg-laundry-600 text-white text-sm font-semibold rounded-full">
                    Le plus populaire
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">Professionnel</CardTitle>
                    <CardDescription>Pour les blanchisseries en croissance</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">99€</span>
                      <span className="text-gray-500">/mois</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">3 sites</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">10 utilisateurs</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Gestion complète des commandes</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Facturation avancée</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Rapports personnalisés</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Support prioritaire</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-laundry-600 hover:bg-laundry-700">Choisir ce forfait</Button>
                  </CardFooter>
                </Card>

                <Card className="border-laundry-200 hover:border-laundry-300 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl">Entreprise</CardTitle>
                    <CardDescription>Pour les réseaux de blanchisseries</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">249€</span>
                      <span className="text-gray-500">/mois</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Sites illimités</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Utilisateurs illimités</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Fonctionnalités complètes</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">API pour intégrations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Gestionnaire de compte dédié</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Support 24/7</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Choisir ce forfait</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="modules">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Package className="h-5 w-5 text-laundry-600" />
                      <CardTitle className="ml-2">Module Livraison</CardTitle>
                    </div>
                    <CardDescription>Optimisez vos livraisons et suivez-les en temps réel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Ajoutez des fonctionnalités de livraison avancées à votre solution :</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Planification des tournées</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Suivi GPS</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Notifications clients</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Ajouter à votre solution</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-laundry-600" />
                      <CardTitle className="ml-2">Module Fidélité</CardTitle>
                    </div>
                    <CardDescription>Fidélisez vos clients avec un programme de récompenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Créez et gérez votre programme de fidélité :</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Points de fidélité</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Promotions automatiques</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Cartes de fidélité numériques</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Ajouter à votre solution</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-laundry-600" />
                      <CardTitle className="ml-2">Module Sécurité Avancée</CardTitle>
                    </div>
                    <CardDescription>Renforcez la sécurité de vos données</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Protégez vos informations avec des fonctionnalités de sécurité supplémentaires :</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Authentification à deux facteurs</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Journalisation avancée</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-gray-600">Sauvegarde chiffrée</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Ajouter à votre solution</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Services complémentaires</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Formation et accompagnement</h3>
              <p className="text-gray-600 mb-6">
                Nous proposons des services de formation pour vous aider à tirer le meilleur parti de votre solution LAVERIE MODERNE FORNDI.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600">Formation initiale pour toute votre équipe</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600">Sessions de perfectionnement</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600">Accompagnement personnalisé</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600">Documentation complète</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">En savoir plus</Button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Intégration et personnalisation</h3>
              <p className="text-gray-600 mb-6">
                Adaptez notre solution à vos besoins spécifiques avec nos services d'intégration et de personnalisation.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600">Intégration avec vos systèmes existants</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600">Personnalisation de l'interface</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600">Développement de fonctionnalités sur mesure</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-laundry-600 flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-gray-600">Migration de données</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">En savoir plus</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Besoin d'une solution sur mesure ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contactez-nous pour discuter de vos besoins spécifiques et découvrir comment LAVERIE MODERNE FORNDI peut s'adapter à votre entreprise
          </p>
          <Button size="lg" className="bg-white text-laundry-600 hover:bg-laundry-50">
            Demander un devis personnalisé
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Products;


import { ArrowRight, FileText, HeadphonesIcon, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-laundry-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Support et assistance
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Nous sommes là pour vous aider à tirer le meilleur parti de LAVERIE MODERNE FORNDI
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Comment pouvons-nous vous aider ?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-laundry-600" />
                  <CardTitle>Documentation</CardTitle>
                </div>
                <CardDescription>Consultez notre documentation détaillée</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Accédez à des guides complets, des tutoriels et des ressources pour vous aider à utiliser toutes les fonctionnalités de notre plateforme.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Consulter la documentation
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <HeadphonesIcon className="h-6 w-6 text-laundry-600" />
                  <CardTitle>Support technique</CardTitle>
                </div>
                <CardDescription>Contactez notre équipe de support</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Notre équipe de support est disponible pour répondre à toutes vos questions et résoudre vos problèmes techniques.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Contacter le support
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6 text-laundry-600" />
                  <CardTitle>Formations</CardTitle>
                </div>
                <CardDescription>Participez à nos sessions de formation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Inscrivez-vous à nos webinaires et sessions de formation pour maîtriser toutes les fonctionnalités de LAVERIE MODERNE FORNDI.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Voir les formations
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Questions fréquemment posées</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  Comment créer un compte administrateur ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Pour créer un compte administrateur, connectez-vous à la plateforme avec vos identifiants, puis accédez à la section "Gestion des utilisateurs" dans les paramètres. Cliquez sur "Ajouter un utilisateur", remplissez le formulaire et sélectionnez le rôle "Administrateur" dans le menu déroulant.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  Comment configurer plusieurs sites ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  La configuration multi-sites est disponible dans les forfaits Professionnel et Entreprise. Dans le menu Administration, accédez à "Gestion des sites" et cliquez sur "Ajouter un site". Remplissez les informations requises et configurez les paramètres spécifiques à ce site.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  Comment générer des factures automatiquement ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Pour activer la facturation automatique, allez dans "Paramètres" puis "Facturation". Activez l'option "Facturation automatique" et configurez les règles selon vos besoins (périodicité, modèle de facture, méthode d'envoi). Les factures seront alors générées et envoyées automatiquement selon vos paramètres.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  Comment importer mes données existantes ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Nous proposons un service d'importation de données pour faciliter votre transition. Contactez notre support technique avec les détails de vos données actuelles, et nous vous guiderons à travers le processus d'importation. Nous prenons en charge l'import depuis Excel, CSV et plusieurs autres systèmes de gestion.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  Mes données sont-elles sécurisées ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Oui, la sécurité de vos données est notre priorité. Nous utilisons le chiffrement SSL pour toutes les communications, un stockage sécurisé avec chiffrement des données sensibles, et des sauvegardes régulières. Notre infrastructure est hébergée dans des centres de données certifiés et nous respectons toutes les réglementations en matière de protection des données.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8 text-center">
              <Link to="/faq">
                <Button variant="outline">
                  Voir toutes les FAQ <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Help Center */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <HelpCircle className="h-8 w-8 text-laundry-600" />
              <h3 className="ml-3 text-2xl font-semibold text-gray-900">Centre d'aide</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Besoin d'aide supplémentaire ? Notre centre d'aide est disponible 24/7 avec des ressources, des tutoriels vidéo et un système de tickets pour résoudre tous vos problèmes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button>Accéder au centre d'aide</Button>
              <Button variant="outline">Créer un ticket de support</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Besoin d'une assistance personnalisée ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Notre équipe d'experts est prête à vous aider avec vos besoins spécifiques
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-laundry-600 hover:bg-laundry-50">
              Contactez-nous
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Support;

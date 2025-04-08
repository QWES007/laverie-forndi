
import { ArrowRight, BarChart, Calendar, CreditCard, Database, FileText, Search, Settings, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";

const Features = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-laundry-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fonctionnalités complètes pour votre blanchisserie
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Découvrez toutes les fonctionnalités qui font de LAVERIE MODERNE FORNDI la solution idéale pour les professionnels du pressing
          </p>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Gestion complète de votre activité</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              icon={Database}
              title="Gestion multi-sites" 
              description="Centralisez la gestion de tous vos établissements dans une seule interface intuitive avec des tableaux de bord personnalisables."
            />
            <FeatureCard 
              icon={Users}
              title="Gestion des utilisateurs" 
              description="Créez des comptes pour vos employés avec différents niveaux d'accès et suivez leur activité en temps réel."
            />
            <FeatureCard 
              icon={Calendar}
              title="Planification" 
              description="Organisez les tâches, les plannings de vos employés et gérez efficacement les ressources de votre blanchisserie."
            />
            <FeatureCard 
              icon={CreditCard}
              title="Facturation automatique" 
              description="Générez et envoyez automatiquement les factures à vos clients et suivez les paiements en un clic."
            />
            <FeatureCard 
              icon={Truck}
              title="Suivi des livraisons" 
              description="Suivez en temps réel l'état des livraisons et informez vos clients de l'avancement de leur commande."
            />
            <FeatureCard 
              icon={Search}
              title="Recherche avancée" 
              description="Retrouvez instantanément les commandes, clients ou articles grâce à notre système de recherche intelligent."
            />
          </div>
        </div>
      </section>

      {/* Automation Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Automatisation des processus</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
            <div>
              <p className="text-gray-600 mb-6">
                Notre solution vous permet d'automatiser les tâches répétitives pour gagner du temps, réduire les erreurs et améliorer la satisfaction client.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Assemblage assisté</span> - Le système vous guide pour regrouper efficacement les commandes
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Notifications automatiques</span> - Informez vos clients par email ou SMS à chaque étape de leur commande
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Rapports automatisés</span> - Recevez des rapports périodiques sur les performances de votre entreprise
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Inventaire intelligent</span> - Gestion automatique des stocks avec alertes de réapprovisionnement
                  </p>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <Settings className="h-8 w-8 text-laundry-600" />
                <h3 className="ml-3 text-2xl font-semibold text-gray-900">Automatisation intelligente</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Notre système d'automatisation s'adapte à votre façon de travailler et évolue avec vos besoins. Vous pouvez personnaliser chaque processus automatisé selon vos préférences.
              </p>
              <Button className="w-full">
                En savoir plus sur l'automatisation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <BarChart className="h-8 w-8 text-laundry-600" />
                  <h3 className="ml-3 text-2xl font-semibold text-gray-900">Tableaux de bord et rapports</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Visualisez toutes vos données importantes en un coup d'œil grâce à nos tableaux de bord personnalisables et nos rapports détaillés.
                </p>
                <Button className="w-full">
                  Découvrir nos outils d'analyse
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="section-title">Analyses et statistiques</h2>
              <p className="text-gray-600 mb-6">
                Prenez des décisions éclairées grâce à nos outils d'analyse avancés qui vous fournissent des insights précieux sur votre activité.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Tableaux de bord personnalisables</span> - Créez des vues adaptées à vos besoins spécifiques
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Rapports détaillés</span> - Analysez vos performances par période, site ou service
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Prévisions</span> - Anticipez les tendances futures grâce à nos algorithmes de prédiction
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Export facile</span> - Exportez vos données au format Excel, PDF ou CSV en un clic
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Découvrez par vous-même</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Essayez LAVERIE MODERNE FORNDI gratuitement pendant 30 jours et transformez la gestion de votre blanchisserie
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-laundry-600 hover:bg-laundry-50">
              Démarrer l'essai gratuit
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Demander une démo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;

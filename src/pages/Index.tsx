
import { ArrowRight, BarChart, Calendar, Database, Settings, Users, Shirt, WashingMachine } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import { Link } from "react-router-dom";
const Index = () => {
  return <Layout>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            La solution moderne pour votre blanchisserie
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            Gérez efficacement votre pressing avec notre plateforme intuitive, accessible sur tous les appareils
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">NOS SERVICES</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Service Laverie */}
            <div className="feature-card p-8 flex flex-col items-center text-center">
              <div className="bg-laundry-100 p-6 rounded-full mb-6">
                <WashingMachine className="h-16 w-16 text-laundry-600" />
              </div>
              <h3 className="text-2xl font-bold text-laundry-600 mb-4">Service Laverie</h3>
              <p className="text-gray-600 mb-6">Solutions complètes pour vos besoins de lavage, avec des équipements modernes et des processus optimisés pour assurer une qualité exceptionnelle.</p>
              <Link to="/services/laverie">
                <Button className="mt-4">
                  Nouvelle commande <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Service Pressing */}
            <div className="feature-card p-8 flex flex-col items-center text-center">
              <div className="bg-laundry-100 p-6 rounded-full mb-6">
                <Shirt className="h-16 w-16 text-laundry-600" />
              </div>
              <h3 className="text-2xl font-bold text-laundry-600 mb-4">Service Pressing</h3>
              <p className="text-gray-600 mb-6">Service professionnel de nettoyage à sec et de repassage pour tous vos vêtements délicats, avec un soin particulier pour chaque type de tissu.</p>
              <Link to="/services/pressing">
                <Button className="mt-4">
                  Nouvelle commande <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Pourquoi choisir LAVERIE MODERNE FORNDI ?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Interface intuitive</span> - Facile à prendre en main pour tous vos employés
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Accessibilité</span> - Disponible sur tous les appareils (ordinateurs, tablettes, smartphones)
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Support réactif</span> - Notre équipe est disponible pour vous aider à tout moment
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-laundry-100 flex items-center justify-center mt-1">
                    <span className="text-laundry-600 font-bold">✓</span>
                  </div>
                  <p className="ml-3 text-gray-600">
                    <span className="font-semibold text-gray-900">Sécurité des données</span> - Protection optimale de toutes vos informations
                  </p>
                </li>
              </ul>
              <Button className="mt-8">
                Commencer maintenant
              </Button>
            </div>
            <div className="bg-laundry-100 p-8 rounded-lg">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Témoignage client</h3>
                <blockquote className="text-gray-600 italic">
                  "Depuis que nous utilisons LAVERIE MODERNE FORNDI, la gestion de notre réseau de pressings est devenue beaucoup plus simple. Nous avons gagné en efficacité et nos clients sont plus satisfaits."
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-laundry-200 flex items-center justify-center">
                    <span className="text-laundry-700 font-bold">JD</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Jean Dupont</p>
                    <p className="text-sm text-gray-500">Directeur, Réseau Clean Express</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre blanchisserie ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rejoignez les professionnels qui ont choisi LAVERIE MODERNE FORNDI pour optimiser leur gestion
          </p>
          <Button size="lg" className="bg-white text-laundry-600 hover:bg-laundry-50">
            Démarrer votre essai gratuit
          </Button>
        </div>
      </section>
    </Layout>;
};
export default Index;

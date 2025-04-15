
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-laundry-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Nous sommes à votre écoute pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-laundry-700 mb-6">Nos coordonnées</h2>
              <p className="text-gray-600 mb-8">
                N'hésitez pas à nous contacter directement pour toute question concernant nos produits, services ou pour demander une démo personnalisée.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-laundry-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-laundry-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600"></p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-laundry-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-laundry-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600"></p>
                    <p className="text-gray-600">Lundi au vendredi, 9h-18h</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-laundry-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-laundry-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600"></p>
                    <p className="text-gray-600"></p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-laundry-100 p-3 rounded-lg hover:bg-laundry-200 transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="bg-laundry-100 p-3 rounded-lg hover:bg-laundry-200 transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="bg-laundry-100 p-3 rounded-lg hover:bg-laundry-200 transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+33 6 12 34 56 78" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="information">Demande d'information</SelectItem>
                      <SelectItem value="demo">Demande de démonstration</SelectItem>
                      <SelectItem value="quote">Demande de devis</SelectItem>
                      <SelectItem value="support">Support technique</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Votre message" rows={5} />
                </div>
                
                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Venez nous rencontrer</h2>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-96 bg-laundry-100 rounded-lg flex items-center justify-center">
              <p className="text-laundry-600 font-semibold">Carte interactive ici</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Prêt à optimiser votre blanchisserie ?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Essayez LAVERIE MODERNE FORNDI gratuitement pendant 30 jours sans engagement
          </p>
          <Button size="lg" className="bg-white text-laundry-600 hover:bg-laundry-50">
            Démarrer l'essai gratuit
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

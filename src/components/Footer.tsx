
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-laundry-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">À Propos</h3>
            <p className="text-laundry-100 text-sm">Votre service de laverie et pressing de confiance, offrant des solutions de nettoyage professionnelles et rapides.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-laundry-100 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/features" className="text-laundry-100 hover:text-white transition-colors">Fonctionnalités</Link></li>
              <li><Link to="/products" className="text-laundry-100 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/services/pressing" className="text-laundry-100 hover:text-white transition-colors">Pressing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-laundry-100 hover:text-white transition-colors">Contactez-nous</Link></li>
              <li><Link to="/faq" className="text-laundry-100 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/documentation" className="text-laundry-100 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/support" className="text-laundry-100 hover:text-white transition-colors">Support Technique</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <address className="text-laundry-100 text-sm not-italic">
              <p>123 Rue de la Laverie</p>
              <p>75001 Paris, France</p>
            </address>
            <div className="mt-4 flex space-x-4">
              <a href="tel:+33123456789" className="text-laundry-100 hover:text-white transition-colors">📞 +33 1 23 45 67 89</a>
              <a href="mailto:contact@laverie.com" className="text-laundry-100 hover:text-white transition-colors">✉️ contact@laverie.com</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-laundry-700 text-center text-sm text-laundry-100">
          <p>© 2025 LaundryPro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

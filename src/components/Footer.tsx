import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-laundry-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <p className="text-laundry-100 text-sm">
              LAVERIE MODERNE FORNDI est une solution complète pour la gestion des pressings et blanchisseries, offrant des outils intuitifs pour le suivi en ligne et l'automatisation des processus métier.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-laundry-100 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-laundry-100 hover:text-white transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-laundry-100 hover:text-white transition-colors">
                  Produits et services
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-laundry-100 hover:text-white transition-colors">
                  Support et assistance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-laundry-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-laundry-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-laundry-100 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Téléphone: +225 01 03 788 294</h3>
            <address className="text-laundry-100 text-sm not-italic">
              <p>Email: gestionnaire@laveriemoderneforndi.com</p>
              <p>Téléphone: +33 1 23 45 67 89</p>
            </address>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-laundry-100 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-laundry-100 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-laundry-100 hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-laundry-700 text-center text-sm text-laundry-100">
          <p>&copy; {new Date().getFullYear()} LAVERIE MODERNE FORNDI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
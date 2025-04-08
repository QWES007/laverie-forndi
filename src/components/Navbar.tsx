import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-laundry-600 font-bold text-xl">LAVERIE MODERNE</span>
                <span className="ml-1 text-laundry-500 font-extrabold">FORNDI</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-laundry-500 hover:text-laundry-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Accueil
              </Link>
              <Link to="/features" className="border-transparent text-gray-500 hover:border-laundry-500 hover:text-laundry-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Fonctionnalités
              </Link>
              
              <Link to="/support" className="border-transparent text-gray-500 hover:border-laundry-500 hover:text-laundry-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Support
              </Link>
              <Link to="/contact" className="border-transparent text-gray-500 hover:border-laundry-500 hover:text-laundry-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="outline" className="mr-3">
              Se connecter
            </Button>
            <Button>Essai gratuit</Button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-laundry-500">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="bg-laundry-50 border-laundry-500 text-laundry-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Accueil
            </Link>
            <Link to="/features" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Fonctionnalités
            </Link>
            <Link to="/products" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Produits et services
            </Link>
            <Link to="/support" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Support
            </Link>
            <Link to="/contact" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-y-2 px-4">
            <Button variant="outline" className="w-full justify-center">
              Se connecter
            </Button>
            <Button className="w-full justify-center">
              Essai gratuit
            </Button>
          </div>
        </div>}
    </nav>;
};
export default Navbar;
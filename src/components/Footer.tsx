
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-laundry-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <p className="text-laundry-100 text-sm"></p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-laundry-100 hover:text-white transition-colors"></Link></li>
              <li><Link to="/features" className="text-laundry-100 hover:text-white transition-colors"></Link></li>
              <li><Link to="/products" className="text-laundry-100 hover:text-white transition-colors"></Link></li>
              <li><Link to="/support" className="text-laundry-100 hover:text-white transition-colors"></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-laundry-100 hover:text-white transition-colors"></Link></li>
              <li><Link to="/faq" className="text-laundry-100 hover:text-white transition-colors"></Link></li>
              <li><Link to="/documentation" className="text-laundry-100 hover:text-white transition-colors"></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4"></h3>
            <address className="text-laundry-100 text-sm not-italic">
              <p></p>
              <p></p>
            </address>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-laundry-100 hover:text-white transition-colors"></a>
              <a href="#" className="text-laundry-100 hover:text-white transition-colors"></a>
              <a href="#" className="text-laundry-100 hover:text-white transition-colors"></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-laundry-700 text-center text-sm text-laundry-100">
          <p></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

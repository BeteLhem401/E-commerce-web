import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary-600 tracking-tight">EcoShop</Link>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Premium quality products delivered to your doorstep. We specialize in sustainable and high-quality items for your everyday life.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Social links placeholder */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">Home</Link></li>
              <li><Link to="/cart" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">Cart</Link></li>
              <li><Link to="/login" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Customer Service</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-500">
                <MapPin size={18} className="text-primary-600 shrink-0" />
                <span>123 Commerce St, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-500">
                <Phone size={18} className="text-primary-600 shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-500">
                <Mail size={18} className="text-primary-600 shrink-0" />
                <span>support@ecoshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">
            © 2026 EcoShop. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 hover:opacity-100 transition-opacity" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50 hover:opacity-100 transition-opacity" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

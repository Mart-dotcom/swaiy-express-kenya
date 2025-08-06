
import React from "react";
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Swaiy</span>Express
            </h3>
            <p className="text-gray-300 mb-4">
              Fast and reliable parcel delivery service across Kenya. Send packages with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-swaiy-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-swaiy-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-swaiy-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-swaiy-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="text-gray-300 hover:text-swaiy-primary transition-colors">Features</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-swaiy-primary transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#tracking" className="text-gray-300 hover:text-swaiy-primary transition-colors">Track Package</a>
              </li>
              <li>
                <a href="#booking-form" className="text-gray-300 hover:text-swaiy-primary transition-colors">Book Delivery</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-swaiy-primary transition-colors">Same Day Delivery</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-swaiy-primary transition-colors">Express Delivery</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-swaiy-primary transition-colors">Standard Delivery</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-swaiy-primary transition-colors">Business Solutions</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-swaiy-primary transition-colors">International Shipping</a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-swaiy-primary mt-1" />
                <span className="text-gray-300">Westlands, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-swaiy-primary" />
                <span className="text-gray-300">+254712895991</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-swaiy-primary" />
                <span className="text-gray-300">info@swaiyexpress.co.ke</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Swaiy Express. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 text-sm hover:text-swaiy-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-swaiy-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-swaiy-primary transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

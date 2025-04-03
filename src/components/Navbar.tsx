
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, Menu } from "lucide-react";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold gradient-text">
              Swaiy<span className="text-swaiy-dark">Express</span>
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-8 text-gray-700">
              <li><a href="#" className="hover:text-swaiy-primary transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-swaiy-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-swaiy-primary transition-colors">How It Works</a></li>
              <li><a href="#tracking" className="hover:text-swaiy-primary transition-colors">Track</a></li>
            </ul>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-swaiy-primary text-swaiy-primary hover:text-swaiy-primary hover:bg-swaiy-light">
                  Login
                </Button>
              </DialogTrigger>
              <LoginModal />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-swaiy-primary text-white hover:bg-swaiy-primary/90">
                  Sign Up
                </Button>
              </DialogTrigger>
              <LoginModal signUp={true} />
            </Dialog>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container-custom py-4">
            <ul className="space-y-4 text-gray-700">
              <li><a href="#" onClick={toggleMenu} className="block py-2 hover:text-swaiy-primary">Home</a></li>
              <li><a href="#features" onClick={toggleMenu} className="block py-2 hover:text-swaiy-primary">Features</a></li>
              <li><a href="#how-it-works" onClick={toggleMenu} className="block py-2 hover:text-swaiy-primary">How It Works</a></li>
              <li><a href="#tracking" onClick={toggleMenu} className="block py-2 hover:text-swaiy-primary">Track</a></li>
            </ul>
            <div className="mt-4 flex flex-col space-y-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-swaiy-primary text-swaiy-primary hover:text-swaiy-primary hover:bg-swaiy-light">
                    Login
                  </Button>
                </DialogTrigger>
                <LoginModal />
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-swaiy-primary text-white hover:bg-swaiy-primary/90">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <LoginModal signUp={true} />
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Package, Bike, ArrowRight } from "lucide-react";
import LoginModal from "./LoginModal";
import RiderSignupModal from "./RiderSignupModal";

const SignupButtons = () => {
  const [customerSignupOpen, setCustomerSignupOpen] = useState(false);
  const [riderSignupOpen, setRiderSignupOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-swaiy-primary to-swaiy-dark py-16">
      <div className="container-custom text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Swaiy Express Today
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Whether you want to send packages or earn money delivering them, we've got you covered
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Customer Signup */}
            <div className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-swaiy-light p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Package className="w-8 h-8 text-swaiy-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Customers</h3>
                <p className="text-gray-600 mb-6">
                  Send packages quickly and securely across Kenya with real-time tracking
                </p>
                <ul className="text-left space-y-2 mb-6 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swaiy-primary rounded-full"></div>
                    Real-time package tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swaiy-primary rounded-full"></div>
                    Secure M-Pesa payments
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swaiy-primary rounded-full"></div>
                    24/7 customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swaiy-primary rounded-full"></div>
                    Insurance coverage
                  </li>
                </ul>
                <Dialog open={customerSignupOpen} onOpenChange={setCustomerSignupOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-swaiy-primary hover:bg-swaiy-primary/90 text-white py-3">
                      Sign Up as Customer
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <LoginModal signUp={true} onClose={() => setCustomerSignupOpen(false)} />
                </Dialog>
              </div>
            </div>

            {/* Rider Signup */}
            <div className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-swaiy-light p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Bike className="w-8 h-8 text-swaiy-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Riders</h3>
                <p className="text-gray-600 mb-6">
                  Earn money by delivering packages in your area with flexible working hours
                </p>
                <ul className="text-left space-y-2 mb-6 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swaiy-primary rounded-full"></div>
                    Flexible working hours
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swaiy-primary rounded-full"></div>
                    Competitive earnings
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swaiy-primary rounded-full"></div>
                    GPS navigation support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-swaiy-primary rounded-full"></div>
                    Weekly payments
                  </li>
                </ul>
                <Dialog open={riderSignupOpen} onOpenChange={setRiderSignupOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-swaiy-primary hover:bg-swaiy-primary/90 text-white py-3">
                      Apply as Rider
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <RiderSignupModal onClose={() => setRiderSignupOpen(false)} />
                </Dialog>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupButtons;
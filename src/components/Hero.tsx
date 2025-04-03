
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Shield, Clock } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-white to-swaiy-light py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Fast & Reliable <span className="gradient-text">Parcel Delivery</span> Across Kenya
            </h1>
            <p className="text-lg text-gray-600 md:pr-12">
              Send packages anywhere in Kenya with real-time tracking and secure M-Pesa payments. Experience the future of delivery today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-swaiy-primary hover:bg-swaiy-primary/90 text-white text-lg py-6 px-8"
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Send Package <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                className="border-swaiy-primary text-swaiy-primary hover:bg-swaiy-light text-lg py-6 px-8"
                onClick={() => document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Track Order
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Package className="text-swaiy-primary" size={24} />
                <span className="text-gray-700">Safe Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-swaiy-primary" size={24} />
                <span className="text-gray-700">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-swaiy-primary" size={24} />
                <span className="text-gray-700">Fast Service</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-md mx-auto">
              <img 
                src="https://img.freepik.com/free-vector/delivery-service-illustrated_23-2148505081.jpg?w=740&t=st=1712166242~exp=1712166842~hmac=7843d7f736c521bbf7a761f54123fa7ee76f49fbee64af7c98ea2a8f9d548a36" 
                alt="Delivery Illustration" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg border-l-4 border-swaiy-primary">
                <div className="flex items-center gap-3">
                  <div className="bg-swaiy-light p-2 rounded-full">
                    <Package className="text-swaiy-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold">Package Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

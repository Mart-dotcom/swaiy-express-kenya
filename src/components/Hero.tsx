
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Shield, Clock } from "lucide-react";
import africanRiderImage from "@/assets/african-rider-delivery.jpg";

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
            {/* Floating background elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-swaiy-primary/10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-swaiy-light/50 rounded-full animate-[pulse_3s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-swaiy-primary/20 to-transparent rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-md mx-auto transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-swaiy-primary/20 group">
              {/* Animated border glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-swaiy-primary/20 via-transparent to-swaiy-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
              
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={africanRiderImage}
                  alt="African Delivery Rider" 
                  className="w-full h-auto rounded-lg transform hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Animated overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-swaiy-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                
                {/* Moving speed lines */}
                <div className="absolute top-1/4 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-full bg-gradient-to-r from-transparent via-swaiy-primary to-transparent animate-[slide-in-right_1s_ease-out_infinite]"></div>
                </div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 opacity-0 group-hover:opacity-70 transition-opacity duration-300 delay-100">
                  <div className="h-full bg-gradient-to-r from-transparent via-swaiy-primary/60 to-transparent animate-[slide-in-right_1.2s_ease-out_infinite]"></div>
                </div>
                <div className="absolute top-3/4 left-0 w-full h-0.5 opacity-0 group-hover:opacity-50 transition-opacity duration-300 delay-200">
                  <div className="h-full bg-gradient-to-r from-transparent via-swaiy-primary/40 to-transparent animate-[slide-in-right_1.4s_ease-out_infinite]"></div>
                </div>
              </div>
              
              {/* Animated status card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg border-l-4 border-swaiy-primary transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="bg-swaiy-light p-2 rounded-full animate-[pulse_2s_ease-in-out_infinite]">
                    <Package className="text-swaiy-primary transform group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold bg-gradient-to-r from-swaiy-primary to-swaiy-primary/80 bg-clip-text text-transparent">Package Delivered</p>
                  </div>
                </div>
                
                {/* Success indicator */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              
              {/* Floating delivery icons */}
              <div className="absolute top-4 right-4 animate-[fade-in_2s_ease-out_infinite] opacity-60">
                <Clock className="w-6 h-6 text-swaiy-primary animate-[spin_8s_linear_infinite]" />
              </div>
              <div className="absolute bottom-16 right-8 animate-[fade-in_3s_ease-out_infinite] opacity-40">
                <Shield className="w-5 h-5 text-swaiy-primary animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

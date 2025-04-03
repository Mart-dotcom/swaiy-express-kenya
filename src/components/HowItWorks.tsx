
import React from "react";
import { MapPin, Package, Truck, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Package className="text-swaiy-primary" size={32} />,
      title: "Book Your Delivery",
      description: "Fill out our simple form with pickup and delivery details, parcel information and preferred timing."
    },
    {
      icon: <MapPin className="text-swaiy-primary" size={32} />,
      title: "Rider Pickup",
      description: "Our verified rider will arrive at your location to collect the package at your scheduled time."
    },
    {
      icon: <Truck className="text-swaiy-primary" size={32} />,
      title: "Package in Transit",
      description: "Track your package in real-time as our rider safely transports it to the destination."
    },
    {
      icon: <CheckCircle className="text-swaiy-primary" size={32} />,
      title: "Delivery Confirmation",
      description: "Receive confirmation once your package is delivered with proof of delivery and receipt."
    }
  ];

  return (
    <section id="how-it-works" className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">Swaiy Express</span> Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A simple and efficient delivery process designed to give you peace of mind
          </p>
        </div>
        
        <div className="relative">
          {/* Process steps */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-swaiy-light transform -translate-y-1/2">
            <div className="absolute top-0 left-0 h-full bg-swaiy-primary" style={{ width: "100%" }}></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full border-4 border-swaiy-light z-10 mb-4 shadow-md">
                    <div className="bg-swaiy-light p-2 rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center h-full">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute top-12 left-1/2 transform -translate-x-1/2 text-xl font-bold text-swaiy-primary bg-white px-3 rounded-full border-2 border-swaiy-light z-20">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, CheckCircle, Truck, Clock, User, MapPin } from "lucide-react";

const TrackingPreview = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  
  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      setIsTracking(true);
    }
  };
  
  const trackingSteps = [
    {
      icon: <Package size={24} className="text-swaiy-primary" />,
      status: "Order Received",
      time: "April 3, 2025 - 09:15 AM",
      isCompleted: true,
    },
    {
      icon: <User size={24} className="text-swaiy-primary" />,
      status: "Rider Assigned",
      time: "April 3, 2025 - 09:30 AM",
      isCompleted: true,
    },
    {
      icon: <CheckCircle size={24} className="text-swaiy-primary" />,
      status: "Package Picked Up",
      time: "April 3, 2025 - 10:05 AM",
      isCompleted: true,
    },
    {
      icon: <Truck size={24} className="text-swaiy-primary" />,
      status: "In Transit",
      time: "April 3, 2025 - 10:20 AM",
      isCompleted: true,
    },
    {
      icon: <MapPin size={24} className="text-swaiy-primary" />,
      status: "Out for Delivery",
      time: "April 3, 2025 - 11:45 AM",
      isCompleted: false,
    },
    {
      icon: <CheckCircle size={24} className="text-gray-400" />,
      status: "Delivered",
      time: "Pending",
      isCompleted: false,
    }
  ];

  return (
    <section id="tracking" className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Track Your <span className="gradient-text">Package</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your tracking number to see real-time updates on your delivery
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleTracking} className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              className="flex-1"
              placeholder="Enter your tracking number (e.g., SWY123456789)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="bg-swaiy-primary hover:bg-swaiy-primary/90"
            >
              Track Package
            </Button>
          </form>
          
          {isTracking && (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold">Package #SW{trackingNumber || 'Y123456789'}</h3>
                  <p className="text-gray-600">Nairobi to Mombasa</p>
                </div>
                <div className="text-right">
                  <span className="bg-swaiy-light text-swaiy-primary px-3 py-1 rounded-full text-sm font-medium">
                    In Transit
                  </span>
                  <p className="text-gray-600 text-sm mt-1">Estimated delivery: 1:30 PM</p>
                </div>
              </div>
              
              {/* Tracking timeline */}
              <div className="relative">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex mb-6 last:mb-0">
                    <div className="mr-4">
                      <div className={`p-2 rounded-full ${step.isCompleted ? 'bg-swaiy-light' : 'bg-gray-100'}`}>
                        {step.icon}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className={`h-full w-0.5 ml-3 mt-1 ${step.isCompleted ? 'bg-swaiy-primary' : 'bg-gray-200'}`} 
                             style={{ height: '30px' }}></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{step.status}</h4>
                      <p className="text-gray-500 text-sm">{step.time}</p>
                      {index === 3 && (
                        <div className="mt-2 bg-swaiy-light rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-swaiy-primary" />
                            <span className="text-sm text-gray-700">Your package is on the way to the destination</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-swaiy-light flex items-center justify-center mr-3">
                    <User size={20} className="text-swaiy-primary" />
                  </div>
                  <div>
                    <p className="font-medium">James Mwangi</p>
                    <p className="text-sm text-gray-600">Your Rider</p>
                  </div>
                </div>
                <Button variant="outline" className="border-swaiy-primary text-swaiy-primary hover:bg-swaiy-light">
                  Contact Rider
                </Button>
              </div>
            </div>
          )}
          
          {!isTracking && (
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-swaiy-light p-4 rounded-full">
                  <Package size={32} className="text-swaiy-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Tracking Number</h3>
              <p className="text-gray-600 mb-4">
                Track your package's journey from pickup to delivery with real-time updates
              </p>
              <div className="p-4 bg-swaiy-light rounded-lg inline-block">
                <p className="text-sm text-gray-700">Example tracking number: SWY123456789</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackingPreview;

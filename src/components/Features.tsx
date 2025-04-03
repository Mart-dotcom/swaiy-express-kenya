
import React from "react";
import { MapPin, CreditCard, Truck, Smartphone, Clock, User } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-swaiy-primary/20">
      <div className="bg-swaiy-light p-3 rounded-full w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <MapPin className="text-swaiy-primary" size={24} />,
      title: "Real-time Tracking",
      description: "Track your parcel's journey in real-time from pickup to delivery with accurate GPS location."
    },
    {
      icon: <CreditCard className="text-swaiy-primary" size={24} />,
      title: "M-Pesa Payments",
      description: "Secure and convenient payments through M-Pesa, Kenya's trusted mobile money platform."
    },
    {
      icon: <Truck className="text-swaiy-primary" size={24} />,
      title: "Nationwide Delivery",
      description: "Reliable delivery services covering all major cities and towns across Kenya."
    },
    {
      icon: <Smartphone className="text-swaiy-primary" size={24} />,
      title: "Mobile Notifications",
      description: "Get instant updates and alerts about your package status on your phone."
    },
    {
      icon: <Clock className="text-swaiy-primary" size={24} />,
      title: "Express Delivery",
      description: "Same-day and next-day delivery options for urgent packages and documents."
    },
    {
      icon: <User className="text-swaiy-primary" size={24} />,
      title: "Verified Riders",
      description: "All our delivery agents are thoroughly vetted and trained for professional service."
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart Features for <span className="gradient-text">Modern Delivery</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience seamless parcel delivery with our innovative features designed for speed, security, and convenience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

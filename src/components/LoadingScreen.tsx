import React, { useEffect, useState } from "react";
import { Package } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500); // Allow fade out animation to complete
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-swaiy-primary via-swaiy-light to-white z-50 flex items-center justify-center opacity-0 transition-opacity duration-500 pointer-events-none">
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-swaiy-primary via-swaiy-light to-white z-50 flex items-center justify-center overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Main rider animation */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Rider with parcel animation */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative animate-[slide-in-right_2s_ease-out_forwards] transform translate-x-full">
            {/* Rider silhouette */}
            <div className="flex items-center gap-4">
              {/* Bike */}
              <div className="relative">
                <svg width="80" height="60" viewBox="0 0 80 60" className="text-white drop-shadow-lg">
                  {/* Bike frame */}
                  <path d="M15 45 L35 25 L55 35 L45 45 Z" fill="currentColor" opacity="0.9"/>
                  {/* Wheels */}
                  <circle cx="15" cy="45" r="8" fill="currentColor" opacity="0.8"/>
                  <circle cx="55" cy="45" r="8" fill="currentColor" opacity="0.8"/>
                  {/* Handlebars */}
                  <path d="M35 25 L30 20" stroke="currentColor" strokeWidth="3" fill="none"/>
                </svg>
                
                {/* Speed lines */}
                <div className="absolute top-0 -left-16 w-12 h-1 bg-white/60 animate-[slide-in-right_0.3s_ease-out_infinite]"></div>
                <div className="absolute top-4 -left-20 w-8 h-0.5 bg-white/40 animate-[slide-in-right_0.4s_ease-out_infinite]"></div>
                <div className="absolute top-8 -left-14 w-6 h-0.5 bg-white/30 animate-[slide-in-right_0.5s_ease-out_infinite]"></div>
              </div>
              
              {/* Rider */}
              <div className="relative -ml-8">
                <svg width="40" height="50" viewBox="0 0 40 50" className="text-white drop-shadow-lg">
                  {/* Head */}
                  <circle cx="20" cy="15" r="8" fill="currentColor"/>
                  {/* Body */}
                  <rect x="15" y="20" width="10" height="20" fill="currentColor" rx="2"/>
                  {/* Arms */}
                  <rect x="8" y="25" width="6" height="2" fill="currentColor" rx="1"/>
                  <rect x="26" y="25" width="6" height="2" fill="currentColor" rx="1"/>
                  {/* Legs */}
                  <rect x="16" y="38" width="3" height="10" fill="currentColor" rx="1"/>
                  <rect x="21" y="38" width="3" height="10" fill="currentColor" rx="1"/>
                </svg>
              </div>
              
              {/* Parcel with Swaiy logo */}
              <div className="relative -ml-4 animate-bounce">
                <div className="bg-white rounded-lg p-3 shadow-lg border-2 border-swaiy-primary/30">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/lovable-uploads/7f636e18-f5cc-4cd1-810b-003746b7e506.png" 
                      alt="Swaiy Logo" 
                      className="w-6 h-6"
                    />
                    <Package className="w-4 h-4 text-swaiy-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text and logo */}
        <div className="absolute bottom-32 flex flex-col items-center gap-4">
          <img 
            src="/lovable-uploads/7f636e18-f5cc-4cd1-810b-003746b7e506.png" 
            alt="Swaiy Express Logo" 
            className="w-20 h-20 animate-pulse drop-shadow-lg"
          />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
              Swaiy<span className="text-swaiy-dark">Express</span>
            </h2>
            <p className="text-white/80 text-lg animate-pulse">
              Fast & Reliable Delivery Across Kenya
            </p>
          </div>
          
          {/* Loading dots */}
          <div className="flex gap-2 mt-4">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
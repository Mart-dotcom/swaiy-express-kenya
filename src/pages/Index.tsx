
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import SignupButtons from "@/components/SignupButtons";
import BookingForm from "@/components/BookingForm";
import TrackingPreview from "@/components/TrackingPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <SignupButtons />
        <BookingForm />
        <TrackingPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

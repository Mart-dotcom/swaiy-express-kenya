
import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginModalProps {
  signUp?: boolean;
}

const LoginModal = ({ signUp = false }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState(signUp ? "register" : "login");

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">
          Welcome to Swaiy Express
        </DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your.email@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-swaiy-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full bg-swaiy-primary hover:bg-swaiy-primary/90">
            Login
          </Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <button 
              className="text-swaiy-primary hover:underline" 
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="register" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="regEmail">Email</Label>
            <Input id="regEmail" type="email" placeholder="your.email@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="regPassword">Password</Label>
            <Input id="regPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button type="submit" className="w-full bg-swaiy-primary hover:bg-swaiy-primary/90">
            Create Account
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <button 
              className="text-swaiy-primary hover:underline" 
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default LoginModal;

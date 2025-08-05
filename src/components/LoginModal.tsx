
import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  signUp?: boolean;
  onClose?: () => void;
}

const LoginModal = ({ signUp = false, onClose }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState(signUp ? "register" : "login");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"customer" | "rider">("customer");
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      onClose?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: registerData.firstName,
            last_name: registerData.lastName,
            phone: registerData.phone,
            role: userType,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Account created! Please check your email to verify your account.",
      });
      onClose?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center">
          Welcome to Swaiy Express
        </DialogTitle>
        <DialogDescription className="text-center text-muted-foreground">
          Login to your account or create a new one to start booking deliveries
        </DialogDescription>
      </DialogHeader>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="space-y-4 mt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-swaiy-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-swaiy-primary hover:bg-swaiy-primary/90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Account Type</Label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    userType === "customer" 
                      ? "border-swaiy-primary bg-swaiy-light" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserType("customer")}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">📦</div>
                    <div className="font-semibold">Customer</div>
                    <div className="text-sm text-gray-600">Send packages</div>
                  </div>
                </div>
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    userType === "rider" 
                      ? "border-swaiy-primary bg-swaiy-light" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setUserType("rider")}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏍️</div>
                    <div className="font-semibold">Rider</div>
                    <div className="text-sm text-gray-600">Deliver packages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John"
                  value={registerData.firstName}
                  onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe"
                  value={registerData.lastName}
                  onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+254 7XX XXX XXX"
                value={registerData.phone}
                onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regEmail">Email</Label>
              <Input 
                id="regEmail" 
                type="email" 
                placeholder="your.email@example.com"
                value={registerData.email}
                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regPassword">Password</Label>
              <Input 
                id="regPassword" 
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-swaiy-primary hover:bg-swaiy-primary/90"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
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

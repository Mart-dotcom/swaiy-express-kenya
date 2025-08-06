
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X, Menu, User, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoginModal from "./LoginModal";
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Logged out successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/7f636e18-f5cc-4cd1-810b-003746b7e506.png" 
                alt="Swaiy Express Logo" 
                className="h-12 w-auto hover:scale-105 transition-transform duration-300"
              />
              <span className="text-2xl font-bold gradient-text hidden sm:block">
                Swaiy<span className="text-swaiy-dark">Express</span>
              </span>
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-8 text-gray-700">
              <li><a href="#" className="hover:text-swaiy-primary transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-swaiy-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-swaiy-primary transition-colors">How It Works</a></li>
              <li><a href="#tracking" className="hover:text-swaiy-primary transition-colors">Track</a></li>
            </ul>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-swaiy-primary text-swaiy-primary hover:text-swaiy-primary hover:bg-swaiy-light">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-swaiy-primary text-swaiy-primary hover:text-swaiy-primary hover:bg-swaiy-light">
                      Login
                    </Button>
                  </DialogTrigger>
                  <LoginModal onClose={() => setLoginOpen(false)} />
                </Dialog>
                <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-swaiy-primary text-white hover:bg-swaiy-primary/90">
                      Sign Up
                    </Button>
                  </DialogTrigger>
                  <LoginModal signUp={true} onClose={() => setSignUpOpen(false)} />
                </Dialog>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container-custom py-4">
            <ul className="space-y-4 text-gray-700">
              <li><a href="#" onClick={toggleMenu} className="block py-2 hover:text-swaiy-primary">Home</a></li>
              <li><a href="#features" onClick={toggleMenu} className="block py-2 hover:text-swaiy-primary">Features</a></li>
              <li><a href="#how-it-works" onClick={toggleMenu} className="block py-2 hover:text-swaiy-primary">How It Works</a></li>
              <li><a href="#tracking" onClick={toggleMenu} className="block py-2 hover:text-swaiy-primary">Track</a></li>
            </ul>
            <div className="mt-4 flex flex-col space-y-2">
              {user ? (
                <>
                  <Button variant="outline" className="w-full border-swaiy-primary text-swaiy-primary hover:text-swaiy-primary hover:bg-swaiy-light">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="w-full border-red-500 text-red-500 hover:text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full border-swaiy-primary text-swaiy-primary hover:text-swaiy-primary hover:bg-swaiy-light">
                        Login
                      </Button>
                    </DialogTrigger>
                    <LoginModal onClose={() => setLoginOpen(false)} />
                  </Dialog>
                  <Dialog open={signUpOpen} onOpenChange={setSignUpOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-swaiy-primary text-white hover:bg-swaiy-primary/90">
                        Sign Up
                      </Button>
                    </DialogTrigger>
                    <LoginModal signUp={true} onClose={() => setSignUpOpen(false)} />
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

const BookingForm = () => {
  const [date, setDate] = useState<Date>();
  const [deliveryType, setDeliveryType] = useState("standard");
  const [packageType, setPackageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    pickupName: "",
    pickupPhone: "",
    pickupLocation: "",
    pickupInstructions: "",
    recipientName: "",
    recipientPhone: "",
    deliveryLocation: "",
    deliveryInstructions: "",
    packageWeight: "",
  });

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const calculateCost = () => {
    const basePrice = deliveryType === "express" ? 500 : 200;
    const weight = parseFloat(formData.packageWeight) || 1;
    const weightMultiplier = weight > 5 ? 1.5 : weight > 3 ? 1.2 : 1;
    return Math.round(basePrice * weightMultiplier);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a delivery",
        variant: "destructive",
      });
      return;
    }

    if (!date || !packageType || !formData.pickupName || !formData.recipientName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const totalCost = calculateCost();
      
      // Create order in database
      const { data: order, error: orderError } = await (supabase as any)
        .from('orders')
        .insert({
          user_id: user.id,
          pickup_name: formData.pickupName,
          pickup_phone: formData.pickupPhone,
          pickup_location: formData.pickupLocation,
          pickup_instructions: formData.pickupInstructions,
          delivery_name: formData.recipientName,
          delivery_phone: formData.recipientPhone,
          delivery_location: formData.deliveryLocation,
          delivery_instructions: formData.deliveryInstructions,
          package_type: packageType,
          package_weight: parseFloat(formData.packageWeight) || 1,
          delivery_type: deliveryType,
          delivery_date: date.toISOString(),
          total_cost: totalCost,
          customer_phone: formData.pickupPhone,
          status: 'pending',
          payment_status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;
      if (!order) throw new Error('Order creation failed');

      // Initialize M-Pesa payment
      const { data: paymentResponse, error: paymentError } = await supabase.functions.invoke('mpesa-stk-push', {
        body: {
          phone: formData.pickupPhone.replace(/\D/g, ''), // Remove non-digits
          amount: totalCost,
          order_id: (order as any).tracking_number
        }
      });

      if (paymentError) throw paymentError;

      if (paymentResponse?.ResponseCode === '0') {
        toast({
          title: "Payment Initiated",
          description: `Payment request sent to ${formData.pickupPhone}. Please complete the payment on your phone.`,
        });
        
        // Reset form
        setFormData({
          pickupName: "",
          pickupPhone: "",
          pickupLocation: "",
          pickupInstructions: "",
          recipientName: "",
          recipientPhone: "",
          deliveryLocation: "",
          deliveryInstructions: "",
          packageWeight: "",
        });
        setDate(undefined);
        setPackageType("");
      } else {
        throw new Error(paymentResponse?.errorMessage || 'Payment initialization failed');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to book delivery",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking-form" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your <span className="gradient-text">Delivery</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below with your delivery details and we'll pick up your package
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Pickup Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="pickupName">Full Name *</Label>
                <Input 
                  id="pickupName" 
                  placeholder="John Doe"
                  value={formData.pickupName}
                  onChange={(e) => handleInputChange("pickupName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupPhone">Phone Number *</Label>
                <Input 
                  id="pickupPhone" 
                  placeholder="+254 7XX XXX XXX"
                  value={formData.pickupPhone}
                  onChange={(e) => handleInputChange("pickupPhone", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupLocation">Pickup Location *</Label>
                <Input 
                  id="pickupLocation" 
                  placeholder="e.g. Westlands, Nairobi"
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupInstructions">Special Instructions</Label>
                <Textarea 
                  id="pickupInstructions" 
                  placeholder="Any specific details about the pickup location or timing"
                  value={formData.pickupInstructions}
                  onChange={(e) => handleInputChange("pickupInstructions", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Delivery Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input 
                  id="recipientName" 
                  placeholder="Jane Doe"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange("recipientName", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Recipient Phone *</Label>
                <Input 
                  id="recipientPhone" 
                  placeholder="+254 7XX XXX XXX"
                  value={formData.recipientPhone}
                  onChange={(e) => handleInputChange("recipientPhone", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                <Input 
                  id="deliveryLocation" 
                  placeholder="e.g. Kilimani, Nairobi"
                  value={formData.deliveryLocation}
                  onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryInstructions">Delivery Instructions</Label>
                <Textarea 
                  id="deliveryInstructions" 
                  placeholder="Any specific details for the delivery"
                  value={formData.deliveryInstructions}
                  onChange={(e) => handleInputChange("deliveryInstructions", e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Package Details</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="packageType">Package Type *</Label>
                <Select value={packageType} onValueChange={setPackageType} required>
                  <SelectTrigger id="packageType">
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documents">Documents</SelectItem>
                    <SelectItem value="small">Small Package (less than 3kg)</SelectItem>
                    <SelectItem value="medium">Medium Package (3-10kg)</SelectItem>
                    <SelectItem value="large">Large Package (more than 10kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="packageWeight">Weight (kg) *</Label>
                <Input 
                  id="packageWeight" 
                  type="number" 
                  min="0" 
                  step="0.1" 
                  placeholder="Package weight in kg"
                  value={formData.packageWeight}
                  onChange={(e) => handleInputChange("packageWeight", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Delivery Type</Label>
                <RadioGroup defaultValue="standard" onValueChange={setDeliveryType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard (24-48 hrs)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express (Same day)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>Delivery Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => {
                        // Disable dates in the past
                        return date < new Date();
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="text-lg font-semibold">
                Estimated Cost: KES {calculateCost().toLocaleString()}
              </div>
              <Button 
                type="submit" 
                className="bg-swaiy-primary hover:bg-swaiy-primary/90 text-lg py-6 px-8"
                disabled={loading || !user}
              >
                {loading ? "Processing..." : user ? "Book & Pay with M-Pesa" : "Login to Book"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;

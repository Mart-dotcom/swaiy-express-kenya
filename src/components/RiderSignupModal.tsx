import React, { useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Bike, Car, Truck, Phone, Mail, MapPin, FileText, CreditCard } from "lucide-react";

interface RiderSignupModalProps {
  onClose?: () => void;
}

const RiderSignupModal = ({ onClose }: RiderSignupModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [riderData, setRiderData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    idNumber: "",
    licenseNumber: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleYear: "",
    plateNumber: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    bankAccount: "",
    bankName: "",
    experience: ""
  });

  const vehicleTypes = [
    { value: "motorcycle", label: "Motorcycle", icon: Bike },
    { value: "car", label: "Car", icon: Car },
    { value: "van", label: "Van/Truck", icon: Truck }
  ];

  const handleInputChange = (field: string, value: string) => {
    setRiderData(prev => ({ ...prev, [field]: value }));
  };

  const handleRiderSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (riderData.password !== riderData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!riderData.vehicleType || !riderData.licenseNumber || !riderData.idNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required rider information",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: riderData.email,
        password: riderData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: riderData.firstName,
            last_name: riderData.lastName,
            phone: riderData.phone,
            role: 'rider',
            id_number: riderData.idNumber,
            license_number: riderData.licenseNumber,
            vehicle_type: riderData.vehicleType,
            vehicle_model: riderData.vehicleModel,
            vehicle_year: riderData.vehicleYear,
            plate_number: riderData.plateNumber,
            address: riderData.address,
            emergency_contact: riderData.emergencyContact,
            emergency_phone: riderData.emergencyPhone,
            bank_account: riderData.bankAccount,
            bank_name: riderData.bankName,
            experience: riderData.experience
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Rider account created! Please check your email to verify your account. Our team will review your application.",
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
    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Bike className="w-6 h-6 text-swaiy-primary" />
          Join as a Rider
        </DialogTitle>
        <DialogDescription className="text-center text-muted-foreground">
          Start earning by delivering packages with Swaiy Express
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleRiderSignup} className="space-y-6 mt-4">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input 
                id="firstName" 
                placeholder="John"
                value={riderData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input 
                id="lastName" 
                placeholder="Doe"
                value={riderData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com"
                  className="pl-10"
                  value={riderData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+254 7XX XXX XXX"
                  className="pl-10"
                  value={riderData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input 
                id="password" 
                type="password"
                value={riderData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={riderData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Identification & Licensing */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Identification & Licensing
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">National ID Number *</Label>
              <Input 
                id="idNumber" 
                placeholder="12345678"
                value={riderData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Driving License Number *</Label>
              <Input 
                id="licenseNumber" 
                placeholder="License number"
                value={riderData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Vehicle Information</h3>
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type *</Label>
            <Select onValueChange={(value) => handleInputChange('vehicleType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map(type => {
                  const IconComponent = type.icon;
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <Input 
                id="vehicleModel" 
                placeholder="e.g., Honda CBR"
                value={riderData.vehicleModel}
                onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleYear">Year</Label>
              <Input 
                id="vehicleYear" 
                placeholder="2020"
                value={riderData.vehicleYear}
                onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plateNumber">Plate Number</Label>
              <Input 
                id="plateNumber" 
                placeholder="KAA 123A"
                value={riderData.plateNumber}
                onChange={(e) => handleInputChange('plateNumber', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Additional Information
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea 
                id="address" 
                placeholder="Your residential address"
                value={riderData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input 
                  id="emergencyContact" 
                  placeholder="Contact person name"
                  value={riderData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input 
                  id="emergencyPhone" 
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  value={riderData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Banking Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Banking Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input 
                id="bankName" 
                placeholder="e.g., Equity Bank"
                value={riderData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankAccount">Account Number</Label>
              <Input 
                id="bankAccount" 
                placeholder="Account number"
                value={riderData.bankAccount}
                onChange={(e) => handleInputChange('bankAccount', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Delivery Experience (Optional)</Label>
            <Textarea 
              id="experience" 
              placeholder="Tell us about your delivery or riding experience..."
              value={riderData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-swaiy-primary hover:bg-swaiy-primary/90 py-3"
          disabled={loading}
        >
          {loading ? "Creating Rider Account..." : "Apply as Rider"}
        </Button>
      </form>
    </DialogContent>
  );
};

export default RiderSignupModal;

import React, { useState } from "react";
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

const BookingForm = () => {
  const [date, setDate] = useState<Date>();
  const [deliveryType, setDeliveryType] = useState("standard");

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
        
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Pickup Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="pickupName">Full Name</Label>
                <Input id="pickupName" placeholder="John Doe" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupPhone">Phone Number</Label>
                <Input id="pickupPhone" placeholder="+254 7XX XXX XXX" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupLocation">Pickup Location</Label>
                <Input id="pickupLocation" placeholder="e.g. Westlands, Nairobi" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupInstructions">Special Instructions</Label>
                <Textarea id="pickupInstructions" placeholder="Any specific details about the pickup location or timing" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Delivery Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input id="recipientName" placeholder="Jane Doe" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Recipient Phone</Label>
                <Input id="recipientPhone" placeholder="+254 7XX XXX XXX" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryLocation">Delivery Location</Label>
                <Input id="deliveryLocation" placeholder="e.g. Kilimani, Nairobi" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryInstructions">Delivery Instructions</Label>
                <Textarea id="deliveryInstructions" placeholder="Any specific details for the delivery" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Package Details</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="packageType">Package Type</Label>
                <Select>
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
                <Label htmlFor="packageWeight">Weight (kg)</Label>
                <Input id="packageWeight" type="number" min="0" step="0.1" placeholder="Package weight in kg" />
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
            
            <div className="mt-6">
              <Button className="w-full md:w-auto bg-swaiy-primary hover:bg-swaiy-primary/90 text-lg py-6">
                Book Delivery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

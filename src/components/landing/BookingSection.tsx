import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Users, Heart, Clock, MapPin, MessageCircle } from "lucide-react";
import { WHATSAPP_BASE_URL, OCCASIONS, TIME_SLOTS, ADD_ONS, PRICING } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  location: string;
  addOns: string[];
  notes: string;
}

export function BookingSection() {
  const [booking, setBooking] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    occasion: "",
    location: "",
    addOns: [],
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = () => {
    let total = PRICING.luxuryPicnic;
    booking.addOns.forEach((addonId) => {
      const addon = ADD_ONS.find((a) => a.id === addonId);
      if (addon && addon.price > 0) {
        total += addon.price;
      }
    });
    return total;
  };

  const toggleAddOn = (addonId: string) => {
    setBooking((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addonId)
        ? prev.addOns.filter((id) => id !== addonId)
        : [...prev.addOns, addonId],
    }));
  };

  const buildWhatsAppLink = () => {
    const addOnsText = booking.addOns
      .map((id) => ADD_ONS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const message = `Hello The Epoch ✨

I'd like to book a Luxury Picnic.

👤 Name: ${booking.name}
📧 Email: ${booking.email}
📱 Phone: ${booking.phone}
📅 Date: ${booking.date}
🕒 Time: ${booking.time}
👥 Guests: ${booking.guests}
💍 Occasion: ${booking.occasion}
📍 Location: ${booking.location || "Not specified"}
🎁 Add-ons: ${addOnsText || "None"}
💰 Estimated Total: R${calculateTotal().toLocaleString()}

${booking.notes ? `📝 Notes: ${booking.notes}` : ""}

Please let me know availability.`;

    return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async () => {
    if (!booking.name || !booking.email || !booking.phone || !booking.date || !booking.time || !booking.occasion) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save booking to database
      const { error } = await supabase.from("bookings").insert({
        guest_name: booking.name,
        guest_email: booking.email,
        guest_phone: booking.phone,
        booking_date: booking.date,
        booking_time: booking.time,
        guests: booking.guests,
        occasion: booking.occasion,
        location: booking.location || null,
        add_ons: booking.addOns,
        total_amount: calculateTotal(),
        notes: booking.notes || null,
        whatsapp_sent: true,
      });

      if (error) throw error;

      // Open WhatsApp
      window.open(buildWhatsAppLink(), "_blank");
      toast.success("Booking request sent! We'll be in touch shortly.");

      // Reset form
      setBooking({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        occasion: "",
        location: "",
        addOns: [],
        notes: "",
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("There was an issue. Please try contacting us directly via WhatsApp.");
      window.open(buildWhatsAppLink(), "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-6 bg-epoch-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-epoch-gold font-body uppercase tracking-[0.2em] text-sm mb-4">
            Reserve
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Book Your Luxury Picnic
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground font-body">
            Complete the details below and book instantly via WhatsApp
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="rounded-3xl border-2 border-epoch-champagne shadow-elegant bg-card">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-epoch-gold" />
                    Your Name *
                  </Label>
                  <Input
                    placeholder="Full name"
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    className="input-luxury h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground">Email *</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={booking.email}
                    onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                    className="input-luxury h-12"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground">Phone Number *</Label>
                  <Input
                    type="tel"
                    placeholder="073 XXX XXXX"
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    className="input-luxury h-12"
                  />
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-epoch-gold" />
                    Number of Guests
                  </Label>
                  <Input
                    type="number"
                    min="2"
                    max="10"
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: parseInt(e.target.value) || 2 })}
                    className="input-luxury h-12"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-epoch-gold" />
                    Preferred Date *
                  </Label>
                  <Input
                    type="date"
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="input-luxury h-12"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-epoch-gold" />
                    Preferred Time *
                  </Label>
                  <Select
                    value={booking.time}
                    onValueChange={(value) => setBooking({ ...booking, time: value })}
                  >
                    <SelectTrigger className="input-luxury h-12">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Occasion */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground flex items-center gap-2">
                    <Heart className="w-4 h-4 text-epoch-gold" />
                    Occasion *
                  </Label>
                  <Select
                    value={booking.occasion}
                    onValueChange={(value) => setBooking({ ...booking, occasion: value })}
                  >
                    <SelectTrigger className="input-luxury h-12">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {OCCASIONS.map((occasion) => (
                        <SelectItem key={occasion} value={occasion}>
                          {occasion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="font-body text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-epoch-gold" />
                    Location (Optional)
                  </Label>
                  <Input
                    placeholder="Preferred venue or area"
                    value={booking.location}
                    onChange={(e) => setBooking({ ...booking, location: e.target.value })}
                    className="input-luxury h-12"
                  />
                </div>
              </div>

              {/* Add-ons */}
              <div className="mt-8">
                <Label className="font-body text-foreground mb-4 block">
                  Add-ons (Optional)
                </Label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ADD_ONS.map((addon) => (
                    <div
                      key={addon.id}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        booking.addOns.includes(addon.id)
                          ? "border-epoch-gold bg-epoch-gold/10"
                          : "border-epoch-champagne hover:border-epoch-gold/50"
                      }`}
                      onClick={() => toggleAddOn(addon.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={booking.addOns.includes(addon.id)}
                          className="border-epoch-gold data-[state=checked]:bg-epoch-gold"
                        />
                        <span className="font-body text-foreground">{addon.name}</span>
                      </div>
                      <span className="font-serif text-epoch-espresso font-medium">
                        {addon.priceLabel || `R${addon.price}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-8 space-y-2">
                <Label className="font-body text-foreground">
                  Special Requests (Optional)
                </Label>
                <Textarea
                  placeholder="Any special requests or dietary requirements..."
                  value={booking.notes}
                  onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                  className="input-luxury min-h-[100px]"
                />
              </div>

              {/* Total */}
              <div className="mt-8 p-6 bg-epoch-champagne/30 rounded-2xl flex items-center justify-between">
                <span className="font-body text-foreground text-lg">Estimated Total</span>
                <span className="text-3xl font-serif text-epoch-espresso">
                  R{calculateTotal().toLocaleString()}
                </span>
              </div>

              {/* Submit Button */}
              <Button
                variant="whatsapp"
                size="xl"
                className="w-full mt-8"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <MessageCircle className="w-5 h-5" />
                {isSubmitting ? "Processing..." : "Book Instantly on WhatsApp"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

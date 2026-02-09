import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, MapPin, Instagram, Facebook, Camera, User, Shield } from "lucide-react";
import { WHATSAPP_BASE_URL } from "@/lib/constants";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Footer() {
  const { user, isAdmin } = useAuth();

  return (
    <>
      {/* Floating WhatsApp Button - Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          variant="whatsapp"
          size="icon"
          className="w-14 h-14 rounded-full shadow-xl"
          onClick={() => window.open(WHATSAPP_BASE_URL, "_blank")}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-epoch-espresso text-epoch-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-serif mb-4">The Epoch</h3>
              <p className="font-script italic text-epoch-champagne text-lg mb-4">
                A state of great comfort & elegance
              </p>
              <p className="text-epoch-cream/70 font-body text-sm">
                Luxury Experiences crafted with love in Pretoria East.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-lg mb-4">Explore</h4>
              <div className="space-y-3 text-epoch-cream/80 font-body text-sm">
                <Link
                  to="/media"
                  className="flex items-center gap-3 hover:text-epoch-gold transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  Gallery & Reviews
                </Link>
                {user ? (
                  isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 hover:text-epoch-gold transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-3 hover:text-epoch-gold transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-lg mb-4">Contact</h4>
              <div className="space-y-3 text-epoch-cream/80 font-body text-sm">
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-epoch-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  073 715 7352
                </a>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  Pretoria East & Surrounding Areas
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-serif text-lg mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-epoch-cream/10 flex items-center justify-center hover:bg-epoch-gold transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-epoch-cream/10 flex items-center justify-center hover:bg-epoch-gold transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-epoch-cream/20 pt-8 text-center">
            <p className="text-epoch-cream/60 font-body text-sm">
              &copy; {new Date().getFullYear()} The Epoch Luxury Experiences. All rights reserved.
            </p>
            <p className="text-epoch-cream/40 font-body text-xs mt-2">
              www.theepoch.co.za
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}



import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "@/components/media/GalleryGrid";
import { Footer } from "@/components/landing/Footer";
import { Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PRICING } from "@/lib/constants";

export default function Media() {
  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="bg-epoch-espresso py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="text-epoch-cream hover:text-epoch-gold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-serif text-epoch-cream">The Epoch</h1>
          <Link to="/#booking">
            <Button variant="outline" className="border-epoch-gold text-epoch-gold hover:bg-epoch-gold hover:text-epoch-espresso">
              Book Now
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-epoch-espresso py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-epoch-gold font-body uppercase tracking-[0.2em] text-sm mb-4">
            Showcase
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-epoch-cream mb-4">
            The Epoch Gallery
          </h1>
          <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-epoch-gold to-epoch-gold-light mb-6" />
          <p className="text-epoch-cream/80 max-w-2xl mx-auto">
            Browse signature indoor and outdoor setups, explore the atmosphere of our luxury experiences, and head straight to booking when you are ready.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-epoch-gold uppercase tracking-[0.2em] text-sm mb-4">
              <Camera className="h-4 w-4" />
              Live Gallery
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
              Signature setups and styling details
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The look and feel stay front and center here: curated decor, romantic styling, and elegant spaces designed for unforgettable moments.
            </p>
          </div>

          <GalleryGrid />

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
              <p className="text-epoch-gold uppercase tracking-[0.2em] text-sm mb-3">
                Pricing
              </p>
              <h3 className="text-3xl font-serif text-foreground mb-3">
                From R{PRICING.luxuryExperience.toLocaleString()}
              </h3>
              <p className="text-muted-foreground">
                Luxury indoor and outdoor experiences crafted with The Epoch styling, decor, and signature finishing touches.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant flex flex-col justify-between">
              <div>
                <p className="text-epoch-gold uppercase tracking-[0.2em] text-sm mb-3">
                  Booking
                </p>
                <h3 className="text-3xl font-serif text-foreground mb-3">
                  Reserve your date
                </h3>
                <p className="text-muted-foreground">
                  Ready to book? Use the booking form on the homepage and continue directly to WhatsApp.
                </p>
              </div>
              <Link to="/#booking" className="mt-6 inline-flex">
                <Button variant="hero" size="lg">
                  Go to Booking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_BASE_URL } from "@/lib/constants";

import picnic1 from "@/assets/picnic-1.jpeg";
import picnic2 from "@/assets/picnic-2.jpeg";
import picnic3 from "@/assets/picnic-3.jpeg";
import picnic4 from "@/assets/picnic-4.jpeg";
import picnic5 from "@/assets/picnic-5.jpeg";

const heroImages = [picnic1, picnic2, picnic3, picnic4, picnic5];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Images with Ken Burns effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1.5 },
            scale: { duration: 20, ease: "linear" }
          }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentImage]}
            alt="Luxury experience setup"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-epoch-espresso/60 via-epoch-espresso/40 to-epoch-espresso/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-epoch-champagne font-body uppercase tracking-[0.3em] text-sm mb-6"
        >
          Introducing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl text-epoch-cream mb-4 text-shadow-hero font-serif"
        >
          Luxury Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl text-epoch-cream font-script italic mb-8"
        >
          By The Epoch
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg md:text-xl text-epoch-cream/90 max-w-2xl mb-10 font-body font-light"
        >
          Curated, elegant experiences for proposals, anniversaries and unforgettable memories in Pretoria East & surrounding areas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant="hero"
            size="xl"
            onClick={scrollToBooking}
          >
            Curate Your Experience
          </Button>
          <Button
            variant="whatsapp"
            size="xl"
            onClick={() => window.open(WHATSAPP_BASE_URL, "_blank")}
          >
            <MessageCircle className="w-5 h-5" />
            Book via WhatsApp
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-epoch-cream/50 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-epoch-cream rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-10 right-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImage 
                ? "bg-epoch-cream w-8" 
                : "bg-epoch-cream/50 hover:bg-epoch-cream/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

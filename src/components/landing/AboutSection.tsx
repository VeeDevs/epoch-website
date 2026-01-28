import { motion } from "framer-motion";
import picnic6 from "@/assets/picnic-6.jpeg";
import picnic7 from "@/assets/picnic-7.jpeg";
import { LiveGalleryBackground } from "./LiveGalleryBackground";

export function AboutSection() {
  return (
    <section className="relative">
      {/* Live Gallery Background Strip */}
      <LiveGalleryBackground className="h-48 md:h-64">
        <div className="h-full flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-epoch-cream text-center font-script text-2xl md:text-3xl italic px-6"
          >
            Real moments from our guests
          </motion.p>
        </div>
      </LiveGalleryBackground>

      {/* About Content */}
      <div className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-epoch-gold font-body uppercase tracking-[0.2em] text-sm mb-4">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
              By The Epoch
            </h2>
            <div className="section-divider mb-8" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={picnic6}
                  alt="Luxury picnic setup"
                  className="rounded-2xl shadow-elegant w-full h-64 object-cover"
                />
                <img
                  src={picnic7}
                  alt="Elegant outdoor dining"
                  className="rounded-2xl shadow-elegant w-full h-64 object-cover mt-8"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-epoch-gold rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg leading-relaxed text-muted-foreground mb-6 font-body">
                A luxury picnic experience that transforms the simple act of outdoor dining into an elegant and unforgettable affair. Blending sophistication with nature, we offer guests the opportunity to indulge in comfort, style, and curated hospitality in some of the most scenic settings.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-8 font-body">
                Each picnic is thoughtfully designed — from plush seating and ambient décor to gourmet grazing platters and premium beverages — creating an atmosphere of relaxation and refined pleasure...
              </p>
              <p className="text-2xl font-script italic text-epoch-espresso">
                "A state of great comfort & elegance"
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

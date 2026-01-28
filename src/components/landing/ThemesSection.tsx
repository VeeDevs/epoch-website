import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { THEMES } from "@/lib/constants";

import picnic1 from "@/assets/picnic-1.jpeg";
import picnic3 from "@/assets/picnic-3.jpeg";
import picnic5 from "@/assets/picnic-5.jpeg";

const themeImages = [picnic1, picnic3, picnic5];

export function ThemesSection() {
  return (
    <section className="py-24 px-6 bg-epoch-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-epoch-gold font-body uppercase tracking-[0.2em] text-sm mb-4">
            Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Our Signature Setups
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {THEMES.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group rounded-2xl overflow-hidden border-0 shadow-soft hover:shadow-elegant transition-all duration-500 card-elegant bg-card">
                <div className="relative overflow-hidden gallery-item">
                  <img
                    src={themeImages[index]}
                    alt={theme.name}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="gallery-overlay flex items-end justify-center pb-6">
                    <span className="text-epoch-cream font-medium font-body">
                      View Details
                    </span>
                  </div>
                </div>
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-serif mb-3 text-foreground">{theme.name}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {theme.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

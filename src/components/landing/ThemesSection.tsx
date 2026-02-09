import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import picnic1 from "@/assets/picnic-1.jpeg";
import picnic2 from "@/assets/picnic-2.jpeg";
import picnic3 from "@/assets/picnic-3.jpeg";
import picnic4 from "@/assets/picnic-4.jpeg";
import picnic5 from "@/assets/picnic-5.jpeg";
import indoor1 from "@/assets/indoor 1.jpeg";
import indoor2 from "@/assets/indoor 2.jpeg";
import indoor3 from "@/assets/indoor 3.jpeg";
import indoor3 from "@/assets/indoor 3.jpeg";

const outdoorExperiences = [
  {
    title: "Garden Romance",
    description: "Floral styling, soft seating, and sunset-ready tablescapes for proposals.",
    image: picnic1,
  },
  {
    title: "Lakeside Leisure",
    description: "Serene waterside settings with curated bites and elegant lounge accents.",
    image: picnic2,
  },
  {
    title: "Estate Brunch",
    description: "Daytime luxury with airy linens, greenery, and premium grazing boards.",
    image: picnic3,
  },
  {
    title: "Golden Hour",
    description: "Warm tones, candles, and plush textures for unforgettable twilight moments.",
    image: picnic5,
  },
];

const indoorExperiences = [
  {
    title: "Candlelit Lounge",
    description: "Intimate ambience with layered light, velvet textures, and refined decor.",
    image: indoor1,
  },
  {
    title: "Private Suite",
    description: "Elevated in-room setups for anniversaries, surprises, and special nights.",
    image: indoor2,
  },
  {
    title: "Gallery Soiree",
    description: "Statement florals, curated music, and a sleek, contemporary finish.",
    image: indoor3,
  },
];

const showcaseImages = [
  { src: indoor1, label: "Indoor Ambience" },
  { src: indoor2, label: "Indoor Suite" },
  { src: indoor3, label: "Indoor Soiree" },
];

const promoDetails = {
  title: "Celebrate The Month Of Love In Style",
  highlight: "Special 20% Off",
  deadline: "Until 28 February 2026",
  cta: "Book The Sale",
};

export function ThemesSection() {
  return (
    <section className="py-24 px-6 bg-epoch-white">
      <div className="max-w-6xl mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-epoch-gold font-body uppercase tracking-[0.2em] text-sm mb-4">
            Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Indoor & Outdoor Luxury
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div>
          <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-8">
            Outdoor Experiences
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outdoorExperiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group rounded-2xl overflow-hidden border-0 shadow-soft hover:shadow-elegant transition-all duration-500 bg-card">
                  <div className="relative overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-epoch-espresso/70 via-transparent to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-serif mb-2 text-foreground">
                      {experience.title}
                    </h4>
                    <p className="text-muted-foreground font-body leading-relaxed text-sm">
                      {experience.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-8">
            Indoor Experiences
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {indoorExperiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group rounded-2xl overflow-hidden border-0 shadow-soft hover:shadow-elegant transition-all duration-500 bg-card">
                  <div className="relative overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-epoch-espresso/70 via-transparent to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-serif mb-2 text-foreground">
                      {experience.title}
                    </h4>
                    <p className="text-muted-foreground font-body leading-relaxed text-sm">
                      {experience.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-epoch-gold/30 shadow-elegant bg-epoch-espresso"
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr] items-stretch">
            <div className="relative min-h-[320px] lg:min-h-[420px]">
              <img
                src={indoor3}
                alt="Indoor experience sale promotion"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <span className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-epoch-gold/90 px-4 py-2 text-xs font-body uppercase tracking-[0.2em] text-epoch-espresso">
                Limited Time Offer
              </span>
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center gap-6 text-epoch-cream">
              <div>
                <p className="text-epoch-gold font-body uppercase tracking-[0.25em] text-xs mb-3">
                  Indoor Promo
                </p>
                <h3 className="text-3xl md:text-4xl font-serif mb-3">
                  {promoDetails.title}
                </h3>
                <p className="text-2xl font-serif text-epoch-champagne">
                  {promoDetails.highlight}
                </p>
                <p className="mt-2 text-sm font-body text-epoch-cream/80">
                  {promoDetails.deadline}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {promoDetails.cta}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-epoch-champagne text-epoch-champagne hover:bg-epoch-champagne hover:text-epoch-espresso"
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4 text-center">
            Indoor Experience Showcase
          </h3>
          <p className="text-muted-foreground font-body text-center max-w-2xl mx-auto mb-10">
            A curated glimpse of our indoor settings designed for elegant, unforgettable moments.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {showcaseImages.map((item, index) => (
              <motion.div
                key={`${item.label}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl shadow-elegant"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="h-64 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-epoch-espresso/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-epoch-cream font-body text-sm uppercase tracking-[0.2em]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

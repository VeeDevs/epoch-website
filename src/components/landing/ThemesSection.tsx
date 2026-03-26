import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

import picnic1 from "@/assets/picnic-1.jpeg";
import picnic2 from "@/assets/picnic-2.jpeg";
import picnic3 from "@/assets/picnic-3.jpeg";
import picnic5 from "@/assets/picnic-5.jpeg";
import indoor1 from "@/assets/indoor 1.jpeg";
import indoor2 from "@/assets/indoor 2.jpeg";
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

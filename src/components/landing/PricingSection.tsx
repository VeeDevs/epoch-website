import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { PRICING, PACKAGE_FEATURES, ADD_ONS } from "@/lib/constants";

export function PricingSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-epoch-gold font-body uppercase tracking-[0.2em] text-sm mb-4">
            Packages
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Price List
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground font-body">
            Pretoria East & Surrounding Areas
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Main Package */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="rounded-3xl border-2 border-epoch-gold shadow-gold overflow-hidden bg-card">
              <div className="bg-gradient-to-r from-epoch-gold to-epoch-gold-light p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-epoch-espresso" />
                <h3 className="text-2xl font-serif text-epoch-espresso">
                  Luxury Experience
                </h3>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <span className="text-5xl font-serif text-epoch-espresso">
                    R{PRICING.luxuryExperience.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground font-body block mt-2">
                    per couple
                  </span>
                </div>

                <ul className="space-y-4">
                  {PACKAGE_FEATURES.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-epoch-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground font-body">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Add-ons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="rounded-3xl border-2 border-epoch-champagne shadow-soft bg-card h-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif text-foreground text-center mb-8">
                  Add-ons (Optional)
                </h3>

                <div className="space-y-6">
                  {ADD_ONS.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between pb-4 border-b border-epoch-champagne last:border-0"
                    >
                      <span className="text-foreground font-body">{addon.name}</span>
                      <span className="font-serif text-epoch-espresso font-medium">
                        {addon.priceLabel || `R${addon.price}`}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-epoch-sage-light rounded-2xl">
                  <p className="text-center text-epoch-sage font-body">
                    Drinks include wine, juice & champagne options.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

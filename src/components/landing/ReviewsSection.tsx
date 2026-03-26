import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  created_at: string;
}

// Default reviews to show if none exist in DB
const defaultReviews: Review[] = [
  {
    id: "1",
    author_name: "Sarah M.",
    rating: 5,
    content: "Absolutely magical experience! Every detail was perfect, from the beautiful setup to the delicious champagne. My fiancé said yes! ❤️",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    author_name: "Thabo K.",
    rating: 5,
    content: "Pure elegance and attention to detail. The team went above and beyond to make our anniversary special. Highly recommend!",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    author_name: "Linda & James",
    rating: 5,
    content: "The most romantic experience we've ever had. The sunset views and gourmet food made it unforgettable. Thank you, The Epoch!",
    created_at: new Date().toISOString(),
  },
];

export function ReviewsSection() {
  return (
    <section className="py-24 px-6 bg-epoch-espresso">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-epoch-gold font-body uppercase tracking-[0.2em] text-sm mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-epoch-cream mb-4">
            Client Reviews
          </h2>
          <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-epoch-gold to-epoch-gold-light" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="rounded-2xl bg-epoch-white border-0 shadow-elegant h-full">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-epoch-gold mb-4" />
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "fill-epoch-gold text-epoch-gold"
                            : "text-epoch-champagne"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-foreground font-body leading-relaxed mb-6">
                    "{review.content}"
                  </p>

                  <p className="text-epoch-espresso font-serif font-medium">
                    — {review.author_name}
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


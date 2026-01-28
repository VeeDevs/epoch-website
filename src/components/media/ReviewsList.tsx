import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  created_at: string;
}

export function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-48 bg-muted animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <Quote className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground text-lg">
          No reviews yet. Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full bg-card border-border shadow-elegant">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-epoch-gold mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-epoch-gold text-epoch-gold"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-4">
                "{review.content}"
              </p>

              <div className="flex justify-between items-center pt-4 border-t border-border">
                <p className="font-serif font-medium text-foreground">
                  — {review.author_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(review.created_at), "MMM d, yyyy")}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

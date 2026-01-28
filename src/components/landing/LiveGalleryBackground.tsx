import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

// Default images to show if no gallery images exist
import picnic1 from "@/assets/picnic-1.jpeg";
import picnic2 from "@/assets/picnic-2.jpeg";
import picnic3 from "@/assets/picnic-3.jpeg";
import picnic4 from "@/assets/picnic-4.jpeg";
import picnic5 from "@/assets/picnic-5.jpeg";
import picnic6 from "@/assets/picnic-6.jpeg";
import picnic7 from "@/assets/picnic-7.jpeg";

const defaultImages = [picnic1, picnic2, picnic3, picnic4, picnic5, picnic6, picnic7];

interface LiveGalleryBackgroundProps {
  className?: string;
  overlay?: boolean;
  children?: React.ReactNode;
}

export function LiveGalleryBackground({ 
  className = "", 
  overlay = true,
  children 
}: LiveGalleryBackgroundProps) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("image_url")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data && data.length > 0) {
      const galleryUrls = data.map((item) => item.image_url);
      // Combine with default images for variety
      setImages([...galleryUrls, ...defaultImages.slice(0, 3)]);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1.5 },
            scale: { duration: 8, ease: "linear" }
          }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex]}
            alt="Customer experience"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Optional overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-epoch-espresso/70 via-epoch-espresso/50 to-epoch-espresso/80" />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}

      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.slice(0, 7).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex % 7
                ? "bg-epoch-gold w-4"
                : "bg-epoch-cream/40 hover:bg-epoch-cream/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

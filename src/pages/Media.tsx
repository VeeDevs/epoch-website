import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GalleryUpload } from "@/components/media/GalleryUpload";
import { GalleryGrid } from "@/components/media/GalleryGrid";
import { ReviewForm } from "@/components/media/ReviewForm";
import { ReviewsList } from "@/components/media/ReviewsList";
import { Footer } from "@/components/landing/Footer";
import { Camera, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Media() {
  const [galleryKey, setGalleryKey] = useState(0);
  const [reviewsKey, setReviewsKey] = useState(0);

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
            Community
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-epoch-cream mb-4">
            Share Your Experience
          </h1>
          <div className="w-24 h-[2px] mx-auto bg-gradient-to-r from-epoch-gold to-epoch-gold-light mb-6" />
          <p className="text-epoch-cream/80 max-w-2xl mx-auto">
            Browse photos from our guests' luxury experiences and share your own magical moments with The Epoch community.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Photo Gallery
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-serif text-foreground mb-6">
                    Guest Gallery
                  </h2>
                  <GalleryGrid key={galleryKey} />
                </div>
                <div>
                  <GalleryUpload onUploadSuccess={() => setGalleryKey((k) => k + 1)} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-serif text-foreground mb-6">
                    Customer Reviews
                  </h2>
                  <ReviewsList key={reviewsKey} />
                </div>
                <div>
                  <ReviewForm onSubmitSuccess={() => setReviewsKey((k) => k + 1)} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}


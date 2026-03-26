import { motion } from "framer-motion";
import picnic1 from "@/assets/picnic-1.jpeg";
import picnic2 from "@/assets/picnic-2.jpeg";
import picnic3 from "@/assets/picnic-3.jpeg";
import picnic4 from "@/assets/picnic-4.jpeg";
import picnic5 from "@/assets/picnic-5.jpeg";
import picnic6 from "@/assets/picnic-6.jpeg";
import picnic7 from "@/assets/picnic-7.jpeg";
import indoor1 from "@/assets/indoor 1.jpeg";
import indoor2 from "@/assets/indoor 2.jpeg";
import indoor3 from "@/assets/indoor 3.jpeg";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
}

export function GalleryGrid() {
  const images: GalleryItem[] = [
    { id: "1", image_url: picnic1, caption: "Garden romance setup" },
    { id: "2", image_url: picnic2, caption: "Lakeside luxury details" },
    { id: "3", image_url: picnic3, caption: "Estate brunch styling" },
    { id: "4", image_url: picnic4, caption: "Golden hour tablescape" },
    { id: "5", image_url: picnic5, caption: "Outdoor celebration mood" },
    { id: "6", image_url: picnic6, caption: "Signature picnic staging" },
    { id: "7", image_url: picnic7, caption: "Elegant guest setting" },
    { id: "8", image_url: indoor1, caption: "Indoor candlelit lounge" },
    { id: "9", image_url: indoor2, caption: "Private suite styling" },
    { id: "10", image_url: indoor3, caption: "Indoor soiree showcase" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
        >
          <img
            src={item.image_url}
            alt={item.caption || "Luxury experience"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {item.caption && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm">{item.caption}</p>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}


import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ item, index }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass rounded-2xl overflow-hidden border border-white border-opacity-20 hover:border-opacity-40 transition-all duration-300"
      whileHover={{ scale: 1.08, y: -8 }}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden bg-dark-800">
        <img
          src={`${import.meta.env.VITE_API_URL}/${item.image_url}`}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23374151" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-size="14">Image</text></svg>';
          }}
        />
        
        {/* Like button */}
        <motion.button
          onClick={() => setLiked(!liked)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full backdrop-blur-sm transition-all duration-300"
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </motion.button>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center p-4 gap-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex-1 py-2 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Shop</span>
          </motion.button>
        </motion.div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-sm sm:text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors duration-300">{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-400 line-clamp-1 mb-3 font-medium">{item.brand}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg sm:text-xl font-black gradient-text">{item.price}</p>
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-semibold px-2 py-1 bg-primary bg-opacity-20 text-primary rounded-full"
          >
            Trending
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

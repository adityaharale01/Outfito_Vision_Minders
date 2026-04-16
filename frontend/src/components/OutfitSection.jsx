import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Plus } from "lucide-react";

export default function OutfitSection({ outfits }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
        <span>👕</span>
        Outfit Combos
      </h2>
      <p className="text-gray-400 mb-8">Perfectly matched combinations for your style</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-6 hover:shadow-glow transition-all duration-300"
            whileHover={{ y: -8 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Combo {index + 1}</h3>
              <span className="px-3 py-1 bg-primary bg-opacity-20 rounded-full text-xs font-semibold text-primary">Trending</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-1">
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Top</p>
                <ProductCard item={outfit.shirt} index={0} />
              </div>
              <div className="col-span-1">
                <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Bottom</p>
                <ProductCard item={outfit.pant} index={1} />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add to Wishlist
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

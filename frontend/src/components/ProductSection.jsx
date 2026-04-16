import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductSection({ title, icon, products }) {
  const descriptions = {
    "Facewash": "Keep your skin fresh and glowing",
    "Goggles": "Complete your look with style",
    "Outfit Combos": "Ready-to-wear combinations"
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-primary bg-opacity-10 rounded-full border border-primary border-opacity-30 mb-6"
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-widest">Collection</p>
        </motion.div>
        
        <h2 className="text-4xl sm:text-5xl font-black mb-4 flex items-center gap-4">
          <span className="text-5xl sm:text-6xl">{icon}</span>
          <span className="gradient-text">{title}</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl">{descriptions[title] || "Curated recommendations tailored for you"}</p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
      >
        {products.map((product, index) => (
          <ProductCard key={index} item={product} index={index} />
        ))}
      </motion.div>
    </motion.section>
  );
}

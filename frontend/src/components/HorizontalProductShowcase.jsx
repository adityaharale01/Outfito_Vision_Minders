import { motion } from "framer-motion";
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import { ShoppingBag } from "lucide-react";

export default function HorizontalProductShowcase({ outfits, goggles, facewash }) {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productType, setProductType] = useState(null);

  const handleProductClick = (product, type) => {
    setSelectedProduct(product);
    setProductType(type);
    setModalOpen(true);
  };

  const sections = [
    { id: "outfit", title: "👕 Outfit Combos", icon: "👕", products: outfits, type: "outfit" },
    { id: "goggles", title: "🕶️ Goggles", icon: "🕶️", products: goggles, type: "product" },
    { id: "facewash", title: "🧴 Facewash", icon: "🧴", products: facewash, type: "product" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary bg-opacity-10 rounded-full border border-primary border-opacity-30 mb-6"
        >
          <ShoppingBag className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">All Collections</span>
        </motion.div>

        <h2 className="text-4xl sm:text-5xl font-black mb-4 gradient-text">Your Complete Style Guide</h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Explore all recommended products across outfits, accessories, and skincare
        </p>
      </div>

      {/* Horizontal Showcase */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            variants={itemVariants}
            className="group"
            onHoverStart={() => setActiveTab(section.id)}
            onHoverEnd={() => setActiveTab(null)}
          >
            {/* Section Card Wrapper */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="h-full relative rounded-3xl overflow-hidden p-1 group"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative h-full bg-dark-800 rounded-2xl p-6 sm:p-8 border border-white border-opacity-20 group-hover:border-opacity-40 transition-all duration-300">
                {/* Section Title */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-10 rounded-full mb-3 border border-white border-opacity-20">
                    <span className="text-sm font-semibold">{section.icon}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-2">{section.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {section.type === "outfit"
                      ? "Complete outfit combinations"
                      : "Premium curated selection"}
                  </p>
                </motion.div>

                {/* Product Display */}
                {section.type === "outfit" ? (
                  // Outfit Display - Show combo
                  <motion.div
                    className="space-y-4 mb-6"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 },
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {section.products.slice(0, 2).map((outfit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="space-y-2 cursor-pointer group"
                        onClick={() => handleProductClick(outfit, "outfit")}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
                            {idx + 1}
                          </div>
                          <span className="text-sm font-semibold text-gray-300">Combo {idx + 1}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 group/combo">
                          <div className="relative rounded-lg overflow-hidden h-24 bg-dark-700 group/item group-hover:shadow-glow transition-all duration-300 cursor-pointer">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/${outfit.shirt.image_url}`}
                              alt="Top"
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23374151' width='100' height='100'/></svg>";
                              }}
                            />
                            <span className="absolute top-1 left-1 text-xs font-semibold bg-primary px-2 py-1 rounded text-white">
                              Top
                            </span>
                          </div>
                          <div className="relative rounded-lg overflow-hidden h-24 bg-dark-700 group/item group-hover:shadow-glow transition-all duration-300 cursor-pointer">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/${outfit.pant.image_url}`}
                              alt="Bottom"
                              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23374151' width='100' height='100'/></svg>";
                              }}
                            />
                            <span className="absolute top-1 left-1 text-xs font-semibold bg-secondary px-2 py-1 rounded text-white">
                              Bottom
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  // Product Grid Display
                  <motion.div
                    className="grid grid-cols-2 gap-2 mb-6"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.08 },
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {section.products.slice(0, 4).map((product, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        onClick={() => handleProductClick(product, "product")}
                        whileHover={{ scale: 1.05 }}
                        className="relative rounded-lg overflow-hidden h-20 bg-dark-700 group/item cursor-pointer"
                      >
                        <img
                          src={`${import.meta.env.VITE_API_URL}/${product.image_url}`}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23374151' width='100' height='100'/></svg>";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-1">
                          <span className="text-xs font-bold text-white px-2 py-1 bg-primary rounded-full">
                            {product.price}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Count Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-xl border border-white border-opacity-10"
                >
                  <div>
                    <p className="text-xs font-semibold text-gray-400">Total Items</p>
                    <p className="text-lg font-black gradient-text">{section.products.length}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gradient-primary rounded-full hover:shadow-glow transition-all duration-300"
                  >
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-gradient-primary text-white font-bold rounded-xl hover:shadow-glow transition-all duration-300 inline-flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Shop All Collections
        </motion.button>
      </motion.div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={productType}
      />
    </motion.section>
  );
}

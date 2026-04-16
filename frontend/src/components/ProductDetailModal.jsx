import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Heart, Star, Zap } from "lucide-react";
import { useState } from "react";

export default function ProductDetailModal({ product, isOpen, onClose, type = "product" }) {
  const [liked, setLiked] = useState(false);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
          />

          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-dark-900 border border-white border-opacity-20"
            >
              {/* Close Button */}
              <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full transition-all duration-300 z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 lg:p-12">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-dark-800 group">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${
                      type === "outfit" ? product.shirt?.image_url : product.image_url
                    }`}
                    alt={type === "outfit" ? "Outfit Top" : product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect fill='%23374151' width='300' height='300'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%239CA3AF' font-size='18'>Product Image</text></svg>";
                    }}
                  />
                  {/* Price Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-4 left-4 px-4 py-2 bg-gradient-primary rounded-full font-bold text-white shadow-glow"
                  >
                    {type === "outfit" ? product.shirt?.price : product.price}
                  </motion.div>
                </div>

                {/* Secondary Image for Outfit */}
                {type === "outfit" && product.pant && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="h-40 rounded-2xl overflow-hidden bg-dark-800 group"
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${product.pant.image_url}`}
                      alt="Outfit Bottom"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'><rect fill='%23374151' width='300' height='150'/></svg>";
                      }}
                    />
                    <span className="absolute top-2 left-2 text-xs font-bold bg-secondary px-3 py-1 rounded-full text-white">
                      Bottom
                    </span>
                  </motion.div>
                )}
              </motion.div>

              {/* Details Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col justify-between"
              >
                {/* Header */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">Premium Product</span>
                  </motion.div>

                  <h2 className="text-3xl sm:text-4xl font-black mb-2">
                    {type === "outfit" ? `Outfit Combo - ${product.shirt?.name}` : product.name}
                  </h2>

                  {/* Brand */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-gray-400 text-lg mb-4"
                  >
                    {type === "outfit" ? `Paired with ${product.pant?.name}` : product.brand}
                  </motion.p>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 mb-6"
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <Star
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                            key={i}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">(248 reviews)</span>
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="mb-6 p-4 rounded-xl bg-white bg-opacity-5 border border-white border-opacity-10"
                  >
                    <p className="text-gray-300 leading-relaxed">
                      {type === "outfit"
                        ? `Perfect combination for your style. ${product.shirt?.name} paired with ${product.pant?.name}. This combo has been carefully selected based on your profile.`
                        : "Premium quality product carefully selected for your style. High-quality materials with excellent durability."}
                    </p>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2 mb-6"
                  >
                    <div className="flex items-center gap-3 text-gray-300">
                      <Zap className="w-5 h-5 text-primary" />
                      <span className="text-sm">Trending now</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      <span className="text-sm">In stock - Ships within 2 days</span>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="space-y-3"
                >
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setLiked(!liked)}
                      className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                        liked
                          ? "border-red-500 bg-red-500 bg-opacity-20 text-red-400"
                          : "border-white border-opacity-20 hover:border-opacity-40 text-white"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
                      {liked ? "Liked" : "Add to Wishlist"}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-4 rounded-xl font-bold bg-gradient-primary text-white hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Buy Now
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-3 rounded-xl font-semibold border border-white border-opacity-20 hover:border-opacity-40 transition-all duration-300"
                  >
                    Close
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

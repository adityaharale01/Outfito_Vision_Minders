import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import AnalysisSection from "./components/AnalysisSection";
import HorizontalProductShowcase from "./components/HorizontalProductShowcase";
import AISuggestions from "./components/AISuggestions";
import Loading from "./components/Loading";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (file) => {
    setImage(file);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("gender", "male");
      formData.append("occasion", "party");
      formData.append("style", "formal");

      const res = await axios.post(`${API_URL}/recommend`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to get recommendations. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-x-hidden">
      {isLoading && <Loading />}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-4 right-4 sm:left-6 sm:right-6 z-40 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg text-red-200 backdrop-blur-xl"
        >
          {error}
        </motion.div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* Upload Section */}
      <UploadCard
        image={image}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            id="results-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12"
          >
            {/* Analysis Section */}
            <AnalysisSection analysis={result.analysis} />

            {/* Horizontal Product Showcase */}
            <HorizontalProductShowcase
              outfits={result.outfits}
              goggles={result.goggles}
              facewash={result.facewash}
            />

            {/* AI Suggestions Section */}
            <AISuggestions recommendation={result.recommendation} />

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden p-1 inline-block"
              >
                <div className="absolute inset-0 bg-gradient-primary blur opacity-75"></div>
                <div className="relative bg-dark-900 rounded-2xl px-8 sm:px-12 py-8 border border-primary border-opacity-30">
                  <h3 className="text-2xl sm:text-3xl font-black mb-2 gradient-text">Ready to transform your style?</h3>
                  <p className="text-gray-400 mb-6">Shop the recommendations and discover your best look</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setImage(null);
                      setResult(null);
                      document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:shadow-glow transition-all duration-300 inline-block"
                  >
                    Get New Recommendations
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-white border-opacity-10 mt-24 py-16 bg-gradient-to-b from-transparent to-dark-900 to-30%"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-lg mb-4 gradient-text">AI Stylist</h4>
              <p className="text-gray-400 text-sm">Your personal fashion AI assistant</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Product</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-primary transition">About</a></li>
                <li><a href="#" className="hover:text-primary transition">Features</a></li>
                <li><a href="#" className="hover:text-primary transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Company</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-primary transition">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 AI Fashion Stylist. All rights reserved. | Powered by cutting-edge AI technology</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
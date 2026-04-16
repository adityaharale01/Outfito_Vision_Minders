import { motion } from "framer-motion";
import { Sparkles, CheckCircle } from "lucide-react";

export default function AISuggestions({ recommendation }) {
  // Parse and clean the recommendation text
  const cleanSuggestions = recommendation
    .split(/\b(Outfit\s+\d+:|Tip\s+\d+:|Advice\s+\d+:|Point\s+\d+:)/i)
    .filter(line => line && !line.match(/^(Outfit\s+\d+:|Tip\s+\d+:|Advice\s+\d+:|Point\s+\d+:)$/i))
    .map(line => line.trim())
    .filter(line => line && line.length > 3)
    .slice(0, 4);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="relative rounded-3xl overflow-hidden">
        {/* Premium gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-30 blur-3xl"></div>
        <div className="absolute inset-0 glass"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 sm:p-12 lg:p-16"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="p-3 bg-gradient-primary rounded-full shadow-glow"
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-black gradient-text">AI Styling Recommendations</h2>
              <p className="text-gray-400 text-sm mt-1">Expert suggestions powered by advanced AI</p>
            </div>
          </div>

          {/* Intro text */}
          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
            {recommendation.split(/\n/)[0] || "Based on your unique profile, here are our top styling recommendations:"}
          </p>

          {/* Suggestions grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {cleanSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className="flex gap-4 items-start p-4 rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-300 border border-white border-opacity-10 hover:border-opacity-30"
              >
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0"
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed flex-1 mt-1">{suggestion}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-8 py-4 bg-gradient-primary text-white font-bold rounded-xl hover:shadow-glow transition-all duration-300 w-full sm:w-auto"
          >
            Shop These Recommendations Now
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}

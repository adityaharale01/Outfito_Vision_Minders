import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-dark-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block p-6 bg-gradient-primary rounded-full mb-6 shadow-glow"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        <h3 className="text-2xl font-bold mb-2">Analyzing Your Style</h3>
        <p className="text-gray-400 mb-8">Our AI is finding perfect recommendations...</p>

        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-primary rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

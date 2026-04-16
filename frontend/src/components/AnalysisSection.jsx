import { motion } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";

const badgeVariants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
};

export default function AnalysisSection({ analysis }) {
  const badges = [
    { label: "Face Shape", value: analysis.face_shape, color: "from-pink-500 to-rose-500", icon: "👤" },
    { label: "Skin Tone", value: analysis.skin_tone, color: "from-amber-500 to-orange-500", icon: "✨" },
    { label: "Skin Type", value: analysis.skin_type, color: "from-purple-500 to-indigo-500", icon: "💎" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary bg-opacity-10 rounded-full border border-primary border-opacity-30 mb-6"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">AI Analysis Complete</span>
        </motion.div>
        
        <h2 className="text-4xl sm:text-5xl font-black mb-4 gradient-text">Your Perfect Profile</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Discover your unique style characteristics and get personalized recommendations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            variants={badgeVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative group rounded-3xl overflow-hidden p-1`}
          >
            {/* Gradient border */}
            <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-60 blur group-hover:opacity-100 transition-all duration-300`}></div>
            
            {/* Content */}
            <div className="relative bg-dark-900 rounded-2xl p-8 text-center border border-white border-opacity-10">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-5xl mb-3"
              >
                {badge.icon}
              </motion.div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{badge.label}</p>
              <p className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${badge.color} bg-clip-text text-transparent capitalize`}>
                {badge.value}
              </p>
              <div className="mt-4 flex justify-center">
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${badge.color} bg-opacity-20 rounded-full`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs font-semibold">Perfect Match</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

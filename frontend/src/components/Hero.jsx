import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Award } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen pt-20 pb-10 overflow-hidden flex items-center justify-center">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [50, 0, 50] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 9, repeat: Infinity }}
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-10 border border-primary border-opacity-40 backdrop-blur-md hover:bg-opacity-20 transition-all duration-300 cursor-pointer group">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-semibold bg-gradient-primary bg-clip-text text-transparent">
                AI-Powered Fashion Intelligence
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="gradient-text">Your Personal</span>
            <br />
            <span className="gradient-text">AI Stylist</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Unlock your unique style with advanced AI analysis. Get personalized recommendations based on your face shape, skin tone, and preferences. Shop with confidence.
          </motion.p>

          {/* Features */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Instant AI Analysis</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Curated Products</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 font-bold text-white text-lg rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-primary group-hover:shadow-glow transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 font-bold text-primary text-lg rounded-xl border-2 border-primary hover:bg-primary hover:bg-opacity-10 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

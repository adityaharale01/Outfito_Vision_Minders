import { motion } from "framer-motion";
import { Upload, X, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function UploadCard({ image, onImageChange, onSubmit, isLoading }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="upload-section"
      className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-black mb-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Upload Your Photo
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Get AI-powered analysis with a clear photo. Takes just seconds!
        </p>
      </div>

      <div className="card-premium border-2 border-dashed border-primary border-opacity-50 hover:border-opacity-100 transition-all duration-300">
        {!image ? (
          <motion.div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`p-12 sm:p-16 text-center cursor-pointer transition-all duration-300 ${
              dragActive ? "bg-primary bg-opacity-20 scale-105" : "hover:bg-primary hover:bg-opacity-10"
            }`}
            whileHover={{ scale: 1.01 }}
          >
            <input
              type="file"
              onChange={(e) => onImageChange(e.target.files[0])}
              accept="image/*"
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="flex flex-col items-center gap-4 cursor-pointer">
              <motion.div
                animate={{ y: dragActive ? -5 : 0 }}
                className="p-5 rounded-full bg-gradient-primary bg-opacity-20"
              >
                <Upload className="w-10 h-10 text-primary" />
              </motion.div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">
                  Drag and drop your photo
                </p>
                <p className="text-gray-400 mt-2">
                  or <span className="text-primary font-semibold">click to browse</span>
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                PNG, JPG, WebP • Up to 10MB • Clear facial features recommended
              </p>
            </label>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-12"
          >
            <div className="relative mb-6 rounded-2xl overflow-hidden">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-80 object-cover"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onImageChange(null)}
                className="absolute top-4 right-4 p-3 bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
              {!isLoading && (
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Ready to analyze
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {image.name}
              </p>
              {!isLoading && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onImageChange(null)}
                  className="text-orange-600 dark:text-orange-400 text-sm font-semibold hover:underline"
                >
                  Change photo
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-12 pb-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSubmit}
              disabled={isLoading}
              className="w-full py-5 text-lg font-bold text-white bg-gradient-primary rounded-xl hover:shadow-glow transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                  Analyzing your photo...
                </>
              ) : (
                <>
                  Get Recommendations
                  <span className="text-lg">→</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

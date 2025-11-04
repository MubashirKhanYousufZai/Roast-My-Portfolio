"use client";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black">
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      >
        <div className="absolute w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-500 opacity-30 blur-xl"></div>
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </motion.div>
    </div>
  );
};

export default Loader;

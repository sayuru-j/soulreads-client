"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  // Animation variant
  const textVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex items-center py-6 md:py-8 lg:py-12 justify-center max-w-7xl mx-auto text-black border-b border-black/20 dark:text-white/80" >
      <div className="relative">
        <motion.h2
          className="text-5xl sm:text-6xl md:text-8xl lg:text-[125px] font-bold text-center"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          READING HEALS
        </motion.h2>
      </div>
    </div>
  );
};

export default Hero;

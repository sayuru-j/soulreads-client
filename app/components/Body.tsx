"use client";

import React from "react";
import { motion } from "framer-motion";
import card from "../assets/card.png";
import supergirl from "../assets/super-girl.png";
import shapes from "../assets/without-cage.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createUser } from "../services/user";

const Body = () => {
  const router = useRouter();

  // Variants for text animations
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  // Variants for image fade-in animations
  const imageFadeInVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1, // Fade-in duration
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center py-6 sm:py-8 md:py-10 justify-center max-w-7xl mx-auto text-black font-medium dark:text-white/80">
      <div className="flex flex-col md:flex-row w-full h-full py-4">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:mb-0 mb-6">
          <div className="flex gap-2 sm:gap-4 items-center">
            <motion.h2
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-lg sm:text-xl"
            >
              Gain knowledge
            </motion.h2>
            <motion.h2
              className="bg-[#ebb4c6] dark:bg-[#b8486d] py-1 px-4 sm:px-6 rounded-full font-bold text-base sm:text-lg"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              15m / day
            </motion.h2>
          </div>
          <motion.h2
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg sm:text-xl"
          >
            Heal starts here
            <span className="text-[#5D3FD3] text-[20px]">.</span>
          </motion.h2>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center sm:justify-end">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-center"
            >
              <h2 className="font-bold text-[#da4363] text-xl">95%</h2>
              <h2 className="text-lg">more reading</h2>
            </motion.div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              className="text-center"
            >
              <h2 className="font-bold text-[#da4363] text-xl">91%</h2>
              <h2 className="text-lg">better habits</h2>
            </motion.div>
          </div>
          <motion.div
            className="flex flex-col items-center md:items-end text-3xl sm:text-4xl md:text-5xl font-semibold z-50 hover:text-[#FFFFF] transition-all duration-500 ease-in-out"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={5}
          >
            <motion.h2
              className="cursor-default animate-pulse"
              variants={textVariants}
              custom={6} // Custom delay for staggered animation
            >
              Find Your
            </motion.h2>
            <motion.h2
              className="cursor-default animate-pulse"
              variants={textVariants}
              custom={7}
            >
              Perfect Read
            </motion.h2>
            <motion.h2
              className="cursor-default animate-pulse"
              variants={textVariants}
              custom={8}
            >
              In Few Minutes
            </motion.h2>

            <motion.button
              type="button"
              className="text-lg sm:text-xl text-white bg-[#da4363] px-8 sm:px-10 py-2 rounded-lg mt-6 md:mt-10 hover:scale-105 transition-all duration-500 ease-in-out"
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                createUser();
                router.push("/quiz");
              }}
            >
              Take the quiz
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Position the images with fade-in animations */}
      <div className="w-full h-auto relative">
        <motion.div
          className="absolute right-10 md:right-5 top-0 md:-top-56 sm:top-20 w-1/2 sm:w-1/4 p-4 z-0 grayscale hover:grayscale-0"
          initial="hidden"
          animate="visible"
          variants={imageFadeInVariants}
        >
          <Image
            src={card}
            alt="Card"
            layout="responsive"
            width={1000}
            height={1000}
            className="max-w-full max-h-full"
          />
        </motion.div>
        <motion.div
          className="absolute left-0 -top-60 hidden md:block w-1/2 p-4 z-0 hue-rotate-[300deg]"
          initial="hidden"
          animate="visible"
          variants={imageFadeInVariants}
        >
          <Image
            src={shapes}
            alt="Shapes"
            layout="responsive"
            width={1000}
            height={1000}
            className="max-w-full max-h-full"
          />
        </motion.div>
        <motion.div
          className="absolute right-5 sm:right-10 md:-top-56 -top-10 w-3/4 sm:w-1/2 p-4"
          initial="hidden"
          animate="visible"
          variants={imageFadeInVariants}
        >
          <Image
            src={supergirl}
            alt="Supergirl"
            layout="responsive"
            width={1000}
            height={1000}
            className="max-w-full max-h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Body;

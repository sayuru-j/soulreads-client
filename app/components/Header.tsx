"use client";

import { motion } from "framer-motion";
import { navItems as niList } from "../data";
import { NavigationItem } from "../@types";
import React from "react";
import { useRouter } from "next/navigation";

type HeaderProps = {
  logoOnly?: boolean;
  noPad?: boolean;
  noSeperator?: boolean;
};

const Header: React.FC<HeaderProps> = ({ logoOnly, noPad, noSeperator }) => {
  const navItems: NavigationItem[] = niList;
  const router = useRouter();

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Delay for staggered effect
      },
    }),
  };

  const logoVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <nav
      className={`flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto ${
        noSeperator ? "border-none" : "text-black border-b"
      } 
      ${noPad ? "p-0 md:mt-10" : "py-6"}
      border-black/20`}
    >
      {/* Left Navigation Items */}
      <motion.div
        id="left"
        className="flex items-center gap-4 md:gap-6 w-full md:w-1/3 font-semibold justify-center md:justify-start"
        initial="hidden"
        animate="visible"
      >
        {!logoOnly &&
          navItems
            .slice(0, Math.floor(navItems.length / 2))
            .map((ni, index) => (
              <motion.h2
                key={ni.id}
                variants={navItemVariants}
                custom={index}
                className="text-sm cursor-pointer"
                onClick={() => router.push(ni.url)}
              >
                {ni.name}
              </motion.h2>
            ))}
      </motion.div>

      {/* Center Logo */}
      <motion.div
        id="center"
        className="flex items-center justify-center w-full md:w-1/3 py-4 md:py-0"
        initial="hidden"
        animate="visible"
        variants={logoVariant}
        onClick={() => router.push("/")}
      >
        <h2 className="font-extrabold text-2xl md:text-3xl cursor-pointer">
          SOULREADS
        </h2>
      </motion.div>

      {/* Right Navigation Items */}
      <motion.div
        id="right"
        className="flex items-center gap-4 md:gap-6 w-full md:w-1/3 justify-center md:justify-end"
        initial="hidden"
        animate="visible"
      >
        {!logoOnly &&
          navItems.slice(Math.floor(navItems.length / 2)).map((ni, index) => (
            <motion.h2
              key={ni.id}
              variants={navItemVariants}
              custom={index + Math.floor(navItems.length / 2)} // Custom delay for staggered animation
              className="text-sm cursor-pointer"
              onClick={() => router.push(ni.url)}
            >
              {ni.name}
            </motion.h2>
          ))}
      </motion.div>
    </nav>
  );
};

export default Header;

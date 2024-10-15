"use client";

import { motion } from "framer-motion";
import { navItems as niList } from "../data";
import { NavigationItem, User } from "../@types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadUser } from "../services/user";
import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../utils/ls";

type HeaderProps = {
  logoOnly?: boolean;
  noPad?: boolean;
  noSeperator?: boolean;
};

const Header: React.FC<HeaderProps> = ({ logoOnly, noPad, noSeperator }) => {
  const navItems: NavigationItem[] = niList;
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const existingUser = loadUser();
    setUser(existingUser ? existingUser : undefined);
    const isDarkMode = loadFromLocalStorage("darkMode");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(isDarkMode);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);

    const htmlElement = document.documentElement;

    if (!isDarkMode) {
      htmlElement.classList.add("dark");
      saveToLocalStorage("darkMode", true);
    } else {
      removeFromLocalStorage("darkMode");
      htmlElement.classList.remove("dark");
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
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

  const sunVariants = {
    initial: { opacity: 0, scale: 0.5, rotate: -180 },
    animate: { opacity: 1, scale: 1.2, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: 180 },
  };

  const moonVariants = {
    initial: { opacity: 0, scale: 0.5, rotate: 180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: -180 },
  };

  return (
    <nav
      className={`flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto z-50 ${
        noSeperator ? "border-none" : "text-black border-b dark:text-white"
      } 
      ${noPad ? "p-0 md:mt-10" : "py-6"}
      border-black/20`}
    >
      <motion.div
        id="left"
        className="flex items-center gap-4 md:gap-6 w-full md:w-1/3 font-semibold justify-center md:justify-start"
        initial="hidden"
        animate="visible"
      >
        {!logoOnly &&
          navItems
            .slice(0, Math.floor(navItems.length / 2+1))
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

      <motion.div
        id="right"
        className="flex items-center gap-4 md:gap-6 w-full md:w-1/3 justify-center md:justify-end"
        initial="hidden"
        animate="visible"
      >
        {!logoOnly &&
          navItems.slice(Math.floor(navItems.length / 2 +1)).map((ni, index) => (
            <motion.h2
              key={ni.id}
              variants={navItemVariants}
              custom={index + Math.floor(navItems.length / 2)}
              className="text-sm cursor-pointer"
              onClick={() => router.push(ni.url)}
            >
              {ni.name}
            </motion.h2>
          ))}
        <motion.button
          className="bg-gray-200 rounded-full p-4"
          onClick={handleToggle}
          initial={{ opacity: 1 }}
          animate={{ scale: 1.1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <motion.div
            className="w-2 h-2 text-sm flex items-center justify-center"
            key={isDarkMode ? "sun" : "moon"}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={isDarkMode ? sunVariants : moonVariants}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "1rem" }}
          >
            {isDarkMode ? "🌞" : "🌙"}
          </motion.div>
        </motion.button>

        <motion.h2
          variants={navItemVariants}
          custom={2}
          className="text-sm cursor-pointer font-semibold"
          onClick={() => router.push("/profile")}
        >
          {user?.name}
        </motion.h2>
      </motion.div>
    </nav>
  );
};

export default Header;

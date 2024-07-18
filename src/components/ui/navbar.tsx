"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  
  const navbarBackground = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 1)"]
  );

  const navbarShadow = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 10px rgba(0,0,0,0.1)"]
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: navbarBackground,
        boxShadow: navbarShadow,
      }}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/images/sahara.jpg" alt="Live Tounsi Logo" width={50} height={50} className="mr-3" />
          <span className="font-bold text-xl text-green-600">Live Tounsi</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="#experiences" className="text-gray-700 hover:text-green-600">Experiences</Link>
          <Link href="#about" className="text-gray-700 hover:text-green-600">About</Link>
          <Link href="#contact" className="text-gray-700 hover:text-green-600">Contact</Link>
          <Link href="/login" className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">Sign In</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="pt-20" // Add padding top to account for fixed navbar
      >
        {children}
      </motion.div>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function MovingBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary Playful Blobs */}
      <motion.div
        animate={{
          x: [0, 150, 0],
          y: [0, 100, 0],
          scale: [1, 1.4, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[5%] -left-[5%] w-[45%] h-[45%] bg-blue-400/30 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[5%] -right-[5%] w-[40%] h-[40%] bg-purple-400/30 rounded-full blur-[100px]"
      />
      
      {/* Playful Accents (Warm colors) */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 150, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-orange-300/20 rounded-full blur-[90px]"
      />
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] left-[10%] w-[25%] h-[25%] bg-pink-300/20 rounded-full blur-[90px]"
      />

      {/* Floating Bubbles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -500],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          className="absolute w-8 h-8 bg-primary/20 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-10%",
          }}
        />
      ))}
    </div>
  );
}

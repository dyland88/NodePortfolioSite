"use client";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950">
      <motion.div
        className="bg-white w-20 h-20 rounded-full"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8, borderRadius: "100%" }}
        drag={true}
        dragConstraints={{ left: -0, right: 0, top: -0, bottom: 0 }}
        dragElastic={0.5}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        dragSnapToOrigin={true}
      />
    </main>
  );
}

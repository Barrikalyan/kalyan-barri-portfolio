"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorTrail() {
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 22, stiffness: 180, mass: 0.45 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const trail1X = useSpring(cursorX, { damping: 26, stiffness: 130, mass: 0.6 });
  const trail1Y = useSpring(cursorY, { damping: 26, stiffness: 130, mass: 0.6 });
  const trail2X = useSpring(cursorX, { damping: 28, stiffness: 105, mass: 0.65 });
  const trail2Y = useSpring(cursorY, { damping: 28, stiffness: 105, mass: 0.65 });
  const trail3X = useSpring(cursorX, { damping: 30, stiffness: 85, mass: 0.7 });
  const trail3Y = useSpring(cursorY, { damping: 30, stiffness: 85, mass: 0.7 });
  const trail4X = useSpring(cursorX, { damping: 32, stiffness: 70, mass: 0.75 });
  const trail4Y = useSpring(cursorY, { damping: 32, stiffness: 70, mass: 0.75 });
  const trail5X = useSpring(cursorX, { damping: 34, stiffness: 58, mass: 0.8 });
  const trail5Y = useSpring(cursorY, { damping: 34, stiffness: 58, mass: 0.8 });
  const tailDotX = useSpring(cursorX, { damping: 18, stiffness: 320, mass: 0.12 });
  const tailDotY = useSpring(cursorY, { damping: 18, stiffness: 320, mass: 0.12 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] h-7 w-7 rounded-full bg-cyan-400/45 blur-xl"
        style={{
          x: trail5X,
          y: trail5Y,
          opacity: isVisible ? 0.55 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] h-6 w-6 rounded-full bg-blue-400/45 blur-lg"
        style={{
          x: trail4X,
          y: trail4Y,
          opacity: isVisible ? 0.62 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] h-5 w-5 rounded-full bg-sky-300/50 blur-md"
        style={{
          x: trail3X,
          y: trail3Y,
          opacity: isVisible ? 0.7 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] h-4 w-4 rounded-full bg-cyan-300/60 blur-[3px]"
        style={{
          x: trail2X,
          y: trail2Y,
          opacity: isVisible ? 0.78 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99] h-3 w-3 rounded-full bg-cyan-200/70 blur-[2px]"
        style={{
          x: trail1X,
          y: trail1Y,
          opacity: isVisible ? 0.85 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      {/* Outer Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] h-10 w-10 rounded-full border border-cyan-300/85 bg-cyan-300/25 backdrop-blur-sm shadow-[0_0_36px_rgba(34,211,238,0.9)]"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[101] h-3 w-3 rounded-full bg-white shadow-[0_0_24px_rgba(34,211,238,1)]"
        style={{
          x: tailDotX,
          y: tailDotY,
          translateX: 14,
          translateY: 14,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
    </>
  );
}

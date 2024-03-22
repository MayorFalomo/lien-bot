"use client";
import { motion } from "framer-motion";

// const variants = {
//   hidden: { opacity: 0, x: -200, y: 0 },
//   enter: { opacity: 1, x: 0, y: 0 },
// };

export default function Template({ children }) {
  return (
    <motion.div
      // variants={variants}
      // initial="hidden"
      // animate="enter"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}

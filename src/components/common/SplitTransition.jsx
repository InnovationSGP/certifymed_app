"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const SplitTransition = ({ children }) => {
  return (
    <div>
      <AnimatePresence mode="wait">
        <div>
          <motion.div>{children}</motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default SplitTransition;

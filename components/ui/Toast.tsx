"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 rounded-xl border border-[#22D3EE]/30 bg-[#0E0E14]/90 backdrop-blur-md px-5 py-3 text-sm font-mono text-white shadow-2xl shadow-[#22D3EE]/10"
        >
          <CheckCircle2 className="h-5 w-5 text-[#22D3EE]" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import JobDetail from "../../../components/JobDetail";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function JobModal() {
  const { id } = useParams();
  const router = useRouter();

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={() => router.back()} // clicking outside closes
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="scroll bg-white rounded-2xl shadow-xl p-8 m-3 max-w-6xl w-full relative max-h-full"
          onClick={(e) => e.stopPropagation()} // prevent closing on inside click
        >
          <button
            onClick={() => router.back()}
            className="absolute right-4 top-4 text-[#888] hover:text-[#444] transition text-xl"
          >
            ✕
          </button>

          <JobDetail id={id as string} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

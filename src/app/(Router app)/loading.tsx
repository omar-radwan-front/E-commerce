"use client"
import { motion } from "framer-motion"
import React from "react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <motion.div
        className="relative flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Spinner */}
        <motion.div
          className="w-20 h-20 border-4 border-t-transparent border-sky-500 rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        {/* Text */}
        <motion.h1
          className="text-3xl font-bold text-sky-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Loading...
        </motion.h1>
      </motion.div>
    </div>
  )
}

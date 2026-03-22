import { motion } from "framer-motion";

export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.12]" />
      <motion.div
        animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "6%", "0%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-16 top-12 h-72 w-72 rounded-full bg-blue/26 blur-[88px]"
      />
      <motion.div
        animate={{ x: ["10%", "-12%", "10%"], y: ["0%", "-8%", "0%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-red/14 blur-[100px]"
      />
      <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[110px]" />
    </div>
  );
}

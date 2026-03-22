import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-canvas px-5 py-16 md:px-10">
      <motion.div
        animate={{ x: ["100%", "0%", "-100%"] }}
        transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1], repeat: Infinity, repeatDelay: 0.06 }}
        className="pointer-events-none absolute inset-0 bg-white/85 mix-blend-screen"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="space-y-5">
          <div className="loading-bar h-3 w-48 rounded-full" />
          <div className="loading-bar h-12 w-full max-w-[34rem] rounded-full md:h-16" />
          <div className="loading-bar h-12 w-[92%] max-w-[30rem] rounded-full md:h-16" />
          <div className="loading-bar h-5 w-full max-w-[28rem] rounded-full" />
          <div className="loading-bar h-5 w-[84%] max-w-[24rem] rounded-full" />
          <div className="flex gap-4 pt-4">
            <div className="loading-bar h-12 w-44 rounded-full" />
            <div className="loading-bar h-12 w-52 rounded-full" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="loading-bar h-[28rem] w-full rounded-[2rem] md:h-[42rem]" />
        </div>
      </div>
    </div>
  );
}

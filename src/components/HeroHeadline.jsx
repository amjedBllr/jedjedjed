import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export function HeroHeadline({ children, className = "" }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24, mass: 0.4 });
  const maskImage = useMotionTemplate`radial-gradient(circle 180px at ${smoothX}% ${smoothY}%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 32%, rgba(255,255,255,0) 68%)`;

  const handleMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    pointerX.set(Math.max(0, Math.min(100, x)));
    pointerY.set(Math.max(0, Math.min(100, y)));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative ${className}`}
    >
      <h1 className="relative z-10 max-w-[11.2ch] text-[3.4rem] font-black uppercase leading-[0.85] tracking-[-0.04em] text-white md:text-[7rem]">
        {children}
      </h1>
      <motion.h1
        aria-hidden
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0) 22%), url('/images/hero-back.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="pointer-events-none absolute inset-0 z-20 max-w-[11.2ch] text-[3.4rem] font-black uppercase leading-[0.85] tracking-[-0.04em] md:text-[7rem]"
      >
        {children}
      </motion.h1>
    </div>
  );
}

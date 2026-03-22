import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const trailX = useSpring(x, { stiffness: 170, damping: 24, mass: 0.42 });
  const trailY = useSpring(y, { stiffness: 170, damping: 24, mass: 0.42 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 769px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateEnabled = () => setEnabled(media.matches && !reducedMotion.matches);
    updateEnabled();

    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const enter = () => setHidden(false);
    const leave = () => setHidden(true);
    const hoverIn = (event) => {
      if (event.target.closest("a, button, input, textarea")) {
        setActive(true);
      }
    };
    const hoverOut = () => setActive(false);

    media.addEventListener("change", updateEnabled);
    reducedMotion.addEventListener("change", updateEnabled);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerenter", enter);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("mouseover", hoverIn);
    window.addEventListener("mouseout", hoverOut);

    return () => {
      media.removeEventListener("change", updateEnabled);
      reducedMotion.removeEventListener("change", updateEnabled);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("mouseover", hoverIn);
      window.removeEventListener("mouseout", hoverOut);
    };
  }, [x, y]);

  if (!enabled || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[220]">
      <motion.div
        animate={{ scale: hidden ? 0 : active ? 1.35 : 1, opacity: hidden ? 0 : 0.95 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white"
      />
      <motion.div
        animate={{ scale: hidden ? 0 : active ? 1.08 : 1, opacity: hidden ? 0 : active ? 0.55 : 0.32 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ x: trailX, y: trailY }}
        className="absolute -ml-3.5 -mt-3.5 h-7 w-7 rounded-full border border-white/55"
      />
    </div>,
    document.body,
  );
}

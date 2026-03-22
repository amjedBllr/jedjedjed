import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export function MagneticButton({ children, as: Component = "button", className = "", ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (event) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const strength = 0.18;
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      <Component
        className={`group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.02] px-5 py-3 text-xs uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white/38 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
        {...props}
      >
        <span>{children}</span>
        <span className="h-px w-8 bg-white/60 transition duration-300 group-hover:w-12 group-hover:bg-white" />
      </Component>
    </motion.div>
  );
}

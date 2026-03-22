import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { navItems } from "../data";

export function FloatingDock() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [engaged, setEngaged] = useState(false);
  const [location] = useLocation();
  const scale = useTransform(scrollY, [0, 240], [1, 0.94]);
  const expanded = visible || engaged;

  useEffect(() => {
    let timeoutId;
    const showDock = () => {
      setVisible(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setVisible(false);
      }, 6000);
    };

    const unsubscribe = scrollY.on("change", showDock);
    window.addEventListener("focusin", showDock);
    window.addEventListener("pointerdown", showDock, { passive: true });

    timeoutId = window.setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => {
      unsubscribe();
      window.removeEventListener("focusin", showDock);
      window.removeEventListener("pointerdown", showDock);
      window.clearTimeout(timeoutId);
    };
  }, [scrollY]);

  return (
    <motion.nav
      aria-label="Primary"
      animate={{
        y: visible ? 0 : 12,
      }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      style={{ scale }}
      className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-3"
    >
      <motion.div
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        onFocusCapture={() => setEngaged(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setEngaged(false);
          }
        }}
        animate={{
          width: expanded ? "auto" : "3.6rem",
          paddingLeft: expanded ? "0.75rem" : "0.65rem",
          paddingRight: expanded ? "0.75rem" : "0.65rem",
          borderColor: expanded ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.22)",
          backgroundColor: expanded ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)",
        }}
        transition={{
          width: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          paddingLeft: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          paddingRight: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          borderColor: { duration: 0.22, ease: "easeOut" },
          backgroundColor: { duration: 0.22, ease: "easeOut" },
        }}
        className="relative inline-flex h-[3.6rem] max-w-full items-center justify-center overflow-hidden rounded-full border py-2 shadow-dock backdrop-blur-xl"
      >
        <motion.div
          animate={{ opacity: expanded ? 0 : 1, scale: expanded ? 0.6 : 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
        </motion.div>
        <motion.div
          animate={{
            opacity: expanded ? 1 : 0,
            scale: expanded ? 1 : 0.92,
            filter: expanded ? "blur(0px)" : "blur(2px)",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="inline-flex items-center justify-center gap-1 md:gap-2 md:px-1"
        >
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className="group relative">
              {(() => {
                const isActive = location === item.path;

                return (
                  <motion.span
                    whileHover={{ y: -2, scale: 1.02 }}
                    className={`relative flex min-w-[4.75rem] items-center justify-center rounded-full px-3 py-3 text-[10px] uppercase tracking-[0.25em] transition focus-visible:outline-none md:min-w-[6.2rem] md:text-xs ${
                      isActive ? "text-canvas" : "text-white/68 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="dock-active-pill"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    ) : null}
                    <span className="relative z-10">{item.label}</span>
                  </motion.span>
                );
              })()}
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}

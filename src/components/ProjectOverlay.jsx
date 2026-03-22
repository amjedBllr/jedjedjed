import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MagneticButton } from "./MagneticButton";

export function ProjectOverlay({ project, onClose }) {
  const scrollRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, project]);

  useEffect(() => {
    if (!project) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [project]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          role="presentation"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-canvas px-4 py-6 md:px-6 md:py-8"
        >
          <motion.div
            ref={panelRef}
            initial={{ x: "10%", opacity: 0.85, scale: 0.98 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: "-10%", opacity: 0.85, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-title-${project.id}`}
            className="relative flex h-full max-h-[92vh] w-full max-w-[78rem] flex-col overflow-hidden rounded-[2.2rem] bg-[#05070c] shadow-panel"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%)]" />
            <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-white/10 bg-[#05070c]/92 px-6 py-6 backdrop-blur-xl md:px-10 md:py-7">
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-ultra text-white/45">
                  {project.category}
                </p>
                <h3
                  id={`project-title-${project.id}`}
                  className="max-w-4xl text-4xl font-black uppercase leading-[0.92] md:text-6xl"
                >
                  {project.title}
                </h3>
              </div>
              <MagneticButton onClick={onClose} aria-label={`Close ${project.title} project view`}>
                Close View
              </MagneticButton>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-10 md:py-9">
              <div className="grid gap-7 md:grid-cols-[1.18fr_0.82fr]">
                <div className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/[0.03] shadow-panel">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="eager"
                    className="h-[18rem] w-full object-cover md:h-[34rem]"
                  />
                </div>
                <div className="flex flex-col justify-between rounded-[1.9rem] border border-white/10 bg-white/[0.03] p-7 shadow-panel md:p-8">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Concept</p>
                    <p className="mt-4 text-xl leading-8 text-white/80">{project.details}</p>
                    <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Design reasoning
                    </p>
                    <p className="mt-4 text-base leading-8 text-white/68">{project.reasoning}</p>
                  </div>
                  <div className="mt-8">
                    <div className="mb-6 flex flex-wrap gap-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/62"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <MagneticButton as="a" href={project.links.live} target="_blank" rel="noreferrer">
                        Live Demo
                      </MagneticButton>
                      <MagneticButton
                        as="a"
                        href={project.links.source}
                        target="_blank"
                        rel="noreferrer"
                        className="border-white/10 text-white/70"
                      >
                        Source
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 rounded-[1.9rem] border border-white/10 bg-white/[0.03] p-7 md:p-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                    Project frame
                  </p>
                  <p className="mt-4 max-w-4xl text-base leading-8 text-white/60">
                    Entering a project should feel like entering a dedicated space. This view
                    keeps the information concentrated, readable, and cinematic without dropping
                    the overall restraint of the portfolio.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

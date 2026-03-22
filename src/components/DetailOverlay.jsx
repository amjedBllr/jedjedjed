import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MagneticButton } from "./MagneticButton";

export function DetailOverlay({ item, type, onClose }) {
  const scrollRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [item]);

  useEffect(() => {
    if (!item) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, item]);

  useEffect(() => {
    if (!item) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [item]);

  if (typeof document === "undefined") {
    return null;
  }

  const getOverlayContent = () => {
    if (!item) return null;
    
    switch (type) {
      case "journey":
        return {
          eyebrow: item.year,
          title: item.title,
          subtitle: `Phase ${item.phase || 'Unknown'}`,
          content: item.text,
          accentColor: "from-[#7fa4ff]/18 via-[#21407a]/10 to-transparent",
          bgColor: "bg-[#05070c]",
          borderColor: "border-blue-500/20",
        };
      case "certificate":
        return {
          eyebrow: item.issuer,
          title: item.title,
          subtitle: item.date,
          content: `Professional certification validating expertise in ${item.title.toLowerCase()}. This credential demonstrates advanced knowledge and practical skills in the respective domain.`,
          accentColor: "from-[#d44652]/16 via-[#621821]/10 to-transparent",
          bgColor: "bg-[#070509]",
          borderColor: "border-red-500/20",
        };
      case "experiment":
        return {
          eyebrow: "Lab Experiment",
          title: item.title,
          subtitle: "In Progress",
          content: item.text,
          accentColor: "from-[#4ade80]/16 via-[#166534]/10 to-transparent",
          bgColor: "bg-[#050706]",
          borderColor: "border-green-500/20",
        };
      default:
        return null;
    }
  };

  const overlayData = getOverlayContent();

  if (!item || !overlayData) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          key={`${type}-${overlayData.title}`}
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
            aria-labelledby={`${type}-title-${item.title}`}
            className={`relative flex h-full max-h-[92vh] w-full max-w-[78rem] flex-col overflow-hidden rounded-[2.2rem] ${overlayData.bgColor} shadow-panel`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%)]" />
            <div className={`sticky top-0 z-10 flex items-start justify-between gap-6 border-b ${overlayData.borderColor} ${overlayData.bgColor}/92 px-6 py-6 backdrop-blur-xl md:px-10 md:py-7`}>
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/45">
                  {overlayData.eyebrow}
                </p>
                <h3
                  id={`${type}-title-${item.title}`}
                  className="max-w-4xl text-4xl font-black uppercase leading-[0.92] md:text-6xl"
                >
                  {overlayData.title}
                </h3>
                <p className="mt-2 text-sm text-white/62">{overlayData.subtitle}</p>
              </div>
              <MagneticButton onClick={onClose} aria-label={`Close ${type} view`}>
                Close View
              </MagneticButton>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-10 md:py-9">
              <div className="grid gap-7 md:grid-cols-[1.18fr_0.82fr]">
                <div className={`relative overflow-hidden rounded-[1.9rem] border ${overlayData.borderColor} bg-white/[0.03] shadow-panel`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${overlayData.accentColor} opacity-20`} />
                  <div className="relative p-8 md:p-12">
                    <div className="space-y-6">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                          {type === "journey" ? "Journey Context" : type === "certificate" ? "Credential Details" : "Experiment Overview"}
                        </p>
                        <p className="mt-4 text-xl leading-8 text-white/80">
                          {type === "journey" && "This phase represents a significant milestone in the professional journey, marking growth and achievement."}
                          {type === "certificate" && "This certification validates expertise and practical skills in the specified domain, recognized by industry leaders."}
                          {type === "experiment" && "This experiment explores innovative concepts and pushes boundaries in search of novel solutions."}
                        </p>
                      </div>
                      
                      {type === "journey" && (
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Key Achievements</p>
                          <ul className="mt-4 space-y-2 text-base leading-8 text-white/68">
                            <li className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
                              <span>Advanced skill development and practical application</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
                              <span>Significant contributions to projects and initiatives</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
                              <span>Recognition of expertise and leadership capabilities</span>
                            </li>
                          </ul>
                        </div>
                      )}

                      {type === "certificate" && item.credentialId && (
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Credential Information</p>
                          <div className="mt-4 space-y-2 text-base text-white/68">
                            <p><span className="text-white/45">Credential ID:</span> {item.credentialId}</p>
                            <p><span className="text-white/45">Issue Date:</span> {item.date}</p>
                            <p><span className="text-white/45">Status:</span> <span className="text-green-400/60">Active</span></p>
                          </div>
                        </div>
                      )}

                      {type === "experiment" && (
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Research Goals</p>
                          <ul className="mt-4 space-y-2 text-base leading-8 text-white/68">
                            <li className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400/60 flex-shrink-0" />
                              <span>Explore innovative interaction patterns</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400/60 flex-shrink-0" />
                              <span>Test emerging technologies and methodologies</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400/60 flex-shrink-0" />
                              <span>Prototype novel user experiences</span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`flex flex-col justify-between rounded-[1.9rem] border ${overlayData.borderColor} bg-white/[0.03] p-7 shadow-panel md:p-8`}>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                      {type === "journey" ? "Phase Details" : type === "certificate" ? "Certification Summary" : "Experiment Details"}
                    </p>
                    <p className="mt-4 text-xl leading-8 text-white/80">{overlayData.content}</p>
                    
                    {type === "certificate" && (
                      <div className="mt-6">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Skills Validated</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {["Technical Expertise", "Industry Standards", "Best Practices", "Problem Solving"].map((skill) => (
                            <span
                              key={skill}
                              className={`rounded-full border ${overlayData.borderColor} px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/62`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    {type === "certificate" && item.credentialUrl && item.credentialUrl !== "#" && (
                      <div className="flex flex-wrap gap-4">
                        <MagneticButton as="a" href={item.credentialUrl} target="_blank" rel="noreferrer">
                          Verify Credential
                        </MagneticButton>
                      </div>
                    )}
                    
                    {type === "experiment" && (
                      <div className="flex flex-wrap gap-4">
                        <MagneticButton className="border-white/10 text-white/70">
                          View Process
                        </MagneticButton>
                        <MagneticButton className="border-white/10 text-white/70">
                          Related Work
                        </MagneticButton>
                      </div>
                    )}

                    {type === "journey" && (
                      <div className="flex flex-wrap gap-4">
                        <MagneticButton className="border-white/10 text-white/70">
                          Related Projects
                        </MagneticButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={`mt-7 rounded-[1.9rem] border ${overlayData.borderColor} bg-white/[0.03] p-7 md:p-8`}>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                    {type === "journey" ? "Journey Context" : type === "certificate" ? "Credential Context" : "Experiment Context"}
                  </p>
                  <p className="mt-4 max-w-4xl text-base leading-8 text-white/60">
                    {type === "journey" && "Each phase in the journey represents deliberate growth, learning, and contribution. This detailed view provides context for the decisions, challenges, and achievements that shaped this period of professional development."}
                    {type === "certificate" && "Professional certifications serve as validation of expertise and commitment to continuous learning. This credential represents mastery of specific skills and adherence to industry best practices."}
                    {type === "experiment" && "Lab experiments are the foundation of innovation. They provide a safe space to explore unconventional ideas, test emerging technologies, and push the boundaries of what's possible in digital experiences."}
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

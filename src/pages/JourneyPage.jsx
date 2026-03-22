import { motion } from "framer-motion";
import { useState } from "react";
import { SectionIntro } from "../components/SectionIntro";
import { DetailOverlay } from "../components/DetailOverlay";
import { journeyEntries, certificates } from "../data";

// Section Divider
function SectionDivider({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative my-24 h-px"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.6, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </motion.div>
  );
}

export function JourneyPage() {
  const [activeJourneyItem, setActiveJourneyItem] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <>
      <main className="relative z-10 px-5 pb-36 pt-12 md:px-10 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Journey"
            title="Learning, building, and moving forward."
            text="A focused path through education, technical growth, and practical work."
          />

          <div className="mt-16">
            <div className="space-y-7 md:space-y-8">
              {journeyEntries.map((item, index) => {
                const accentClass =
                  index % 2 === 0
                    ? "from-[#7fa4ff]/18 via-[#21407a]/10 to-transparent"
                    : "from-[#d44652]/16 via-[#621821]/10 to-transparent";

                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: index * 0.08 }}
                    className="grid gap-4 md:grid-cols-[1fr_9rem] md:gap-7"
                  >
                    <div 
                      className="relative overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.014))] px-5 py-5 md:px-6 md:py-6 cursor-pointer transition-all duration-300 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.036),rgba(255,255,255,0.018)]"
                      onClick={() => setActiveJourneyItem(item)}
                    >
                      <div
                        className={`pointer-events-none absolute inset-x-[18%] top-4 h-16 rounded-full bg-gradient-to-r ${accentClass} blur-3xl`}
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">
                            {item.year}
                          </p>
                          <h2 className="text-xl font-black uppercase text-white md:text-2xl">
                            {item.title}
                          </h2>
                          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62 md:text-base md:leading-8">
                            {item.text}
                          </p>
                        </div>
                        <span className="hidden text-[10px] uppercase tracking-[0.22em] text-white/26 md:inline-block">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2.5 md:text-right">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/28">
                        Phase {String(index + 1).padStart(2, "0")}
                      </p>
                      <div className="mt-3 flex items-center gap-3 md:flex-row-reverse">
                        <div className="text-3xl font-black uppercase text-white/24 md:text-4xl">
                          {item.year}
                        </div>
                        <div className={`h-px flex-1 bg-gradient-to-r ${accentClass} md:bg-gradient-to-l`} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section Divider */}
        <SectionDivider delay={0.3} />

        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Certifications"
            title="Professional credentials and expertise validation."
            text="Formal recognition of technical skills and domain knowledge from industry leaders."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {certificates.map((certificate, index) => {
              const accentClass =
                index % 2 === 0
                  ? "from-[#7fa4ff]/18 via-[#21407a]/10 to-transparent"
                  : "from-[#d44652]/16 via-[#621821]/10 to-transparent";

              return (
                <motion.div
                  key={certificate.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="group relative overflow-hidden rounded-[1.45rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.014))] p-6 transition-all duration-300 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.036),rgba(255,255,255,0.018)] cursor-pointer"
                  onClick={() => setActiveCertificate(certificate)}
                >
                  <div
                    className={`pointer-events-none absolute inset-x-[18%] top-4 h-16 rounded-full bg-gradient-to-r ${accentClass} blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">
                          {certificate.date}
                        </p>
                        <h3 className="mt-2 text-lg font-black uppercase text-white md:text-xl">
                          {certificate.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/62">
                          {certificate.issuer}
                        </p>
                        {certificate.credentialId && (
                          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/28">
                            ID: {certificate.credentialId}
                          </p>
                        )}
                      </div>
                      
                      {certificate.credentialUrl && certificate.credentialUrl !== "#" && (
                        <motion.a
                          href={certificate.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 rounded-full bg-white/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/68 transition-colors duration-200 hover:bg-white/12 hover:text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Verify
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <DetailOverlay 
        item={activeJourneyItem} 
        type="journey" 
        onClose={() => setActiveJourneyItem(null)} 
      />
      <DetailOverlay 
        item={activeCertificate} 
        type="certificate" 
        onClose={() => setActiveCertificate(null)} 
      />
    </>
  );
}

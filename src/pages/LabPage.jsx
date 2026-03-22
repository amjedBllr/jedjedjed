import { motion } from "framer-motion";
import { useState } from "react";
import { SectionIntro } from "../components/SectionIntro";
import { DetailOverlay } from "../components/DetailOverlay";
import { labExperiments } from "../data";

export function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState(null);

  return (
    <main className="relative z-10 px-5 pb-36 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Lab"
          title="A place for technical experiments and unfinished futures."
          text="This is where I test interface behaviors, prototype AI ideas, and pressure-test unusual product directions before they become polished work."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {labExperiments.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-7 shadow-panel transition-all duration-300 hover:border-white/18 cursor-pointer"
              onClick={() => setActiveExperiment(item)}
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              <p className="text-[11px] uppercase tracking-ultra text-white/42">Experiment {index + 1}</p>
              <h2 className="mt-6 text-3xl font-black uppercase leading-none">{item.title}</h2>
              <p className="mt-6 text-sm leading-8 text-white/60">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <DetailOverlay 
        item={activeExperiment} 
        type="experiment" 
        onClose={() => setActiveExperiment(null)} 
      />
    </main>
  );
}

import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectOverlay } from "../components/ProjectOverlay";
import { SectionIntro } from "../components/SectionIntro";
import { featuredProjects } from "../data";

const filters = ["All", "Web Development", "Artificial Intelligence", "UI/UX Design"];

export function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const projects = featuredProjects.filter(
    (project) => filter === "All" || project.category === filter,
  );

  return (
    <>
      <main className="relative z-10 px-5 pb-36 pt-12 md:px-10 md:pt-16">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Projects"
            title="Work shown with focus, not repetition."
            text="Projects across web systems, AI, and design — presented with clarity, scale, and deliberate rhythm."
          />
          <div className="mt-12 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={item === filter}
                className={`rounded-full border px-5 py-3 text-[11px] uppercase tracking-[0.24em] transition ${
                  item === filter
                    ? "border-white bg-white text-canvas"
                    : "border-white/12 text-white/60 hover:border-white/28 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none]">
            {projects.map((project) => (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => setActiveProject(project)}
                whileHover={{ y: -6 }}
                className="group min-w-[88vw] snap-center overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/[0.04] text-left shadow-panel transition-colors hover:border-white/20 md:min-w-[58rem]"
              >
                <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-[22rem] w-full object-cover transition duration-700 group-hover:scale-[1.05] md:h-[38rem]"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-7 md:p-10">
                    <div>
                      <p className="text-[11px] uppercase tracking-ultra text-white/42">
                        {project.category}
                      </p>
                      <h2 className="mt-5 text-4xl font-black uppercase leading-none md:text-6xl">
                        {project.title}
                      </h2>
                      <p className="mt-6 max-w-lg text-base leading-8 text-white/62">
                        {project.concept}
                      </p>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                      <div className="flex flex-wrap gap-4">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm uppercase tracking-[0.24em] text-white">Enter Project</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </main>
      <ProjectOverlay project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}

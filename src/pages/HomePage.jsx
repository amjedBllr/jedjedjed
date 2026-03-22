import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { lazy, Suspense, useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { HeroHeadline } from "../components/HeroHeadline";
import { MagneticButton } from "../components/MagneticButton";
import { ProjectOverlay } from "../components/ProjectOverlay";
import { SectionIntro } from "../components/SectionIntro";
import { capabilityColumns, featuredProjects } from "../data";

const HeroScene = lazy(() => import("../components/HeroScene").then((module) => ({ default: module.HeroScene })));

// Futuristic Section Divider with Parallax
function SectionDivider({ delay = 0 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const particlesY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <div ref={ref} className="relative my-32 h-px">
      {/* Floating particles */}
      <motion.div
        style={{ y: particlesY }}
        className="absolute left-1/4 top-0 h-2 w-2 rounded-full bg-blue-400/30 blur-sm"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute right-1/3 top-0 h-1 w-1 rounded-full bg-purple-400/40 blur-sm"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-70, 70]) }}
        className="absolute left-2/3 top-0 h-1.5 w-1.5 rounded-full bg-cyan-400/25 blur-sm"
      />

      {/* Main divider with futuristic glow */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-px"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <motion.div
          style={{ y: glowY, scale: glowScale }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent blur-xl"
        />
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1.6, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </motion.div>
    </div>
  );
}

// Who Am I Section with Futuristic Parallax
function WhoAmISection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const floatingOrbsY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const floatingOrbsRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const gridOffset = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section ref={sectionRef} className="relative px-5 py-28 md:px-10 overflow-hidden">
      {/* Futuristic floating orbs */}
      <motion.div
        style={{ y: floatingOrbsY, rotate: floatingOrbsRotate }}
        className="pointer-events-none absolute left-10 top-20 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/10 blur-2xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-60, 60]), rotate: useTransform(scrollYProgress, [0, 1], [0, -360]) }}
        className="pointer-events-none absolute right-20 top-40 h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-500/8 blur-xl"
      />

      {/* Animated grid background */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          y: gridOffset,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='0.5' opacity='0.1'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl md:grid md:grid-cols-[0.88fr_1.12fr] md:gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="opacity-0 -translate-x-8 animate-fade-in">
            <SectionIntro
              eyebrow="Who am I"
              title="A calm builder of complex things."
              text="My work sits between engineering discipline, interface sensitivity, and AI curiosity. I care about systems that perform with clarity, products that feel precise under the hand, and experiences that look like they know exactly why they exist."
            />
          </div>
        </div>
        <div className="relative md:-translate-y-6 md:translate-x-6 opacity-0 translate-y-8 animate-fade-in">
          <div className="mt-16 grid gap-6 md:mt-0 md:grid-cols-[1.15fr_0.85fr]">
            <p className="text-2xl leading-[1.45] text-white/82 md:text-4xl">
              I build with structure, but I design with instinct. The result is work that
              feels contemporary, technically grounded, and visually self-assured.
            </p>
            <div className="border-l border-white/10 pl-6 text-sm leading-8 text-white/58">
              I am interested in product experiences that carry atmosphere without losing
              utility, and in technical systems that reveal depth without demanding visual
              noise. That tension is where my best work begins.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Hero Section with Layered Parallax
function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen px-5 pt-10 md:px-10 md:pt-14">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-8 md:grid-cols-[1fr_1fr]">
        <motion.div
          style={{ y: textY, opacity }}
          className="max-w-[46rem]"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 text-[11px] uppercase tracking-[0.3em] text-white/45"
          >
            Full-Stack Developer · AI Graduate · UI/UX Designer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <HeroHeadline>
              Building digital systems with intelligence and taste.
            </HeroHeadline>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-8 max-w-xl text-base leading-8 text-white/65 md:text-lg"
          >
            Digital systems that combine structural clarity, interface precision, and intelligent behavior.
            Full-stack engineering meets applied AI to create products that serve users with technical excellence and visual calm.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton as={Link} to="/projects">
              View Projects
            </MagneticButton>
            <MagneticButton as={Link} to="/contact" className="border-white/10 text-white/68">
              Start a Conversation
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: sceneY, opacity }}
          className="relative md:-translate-y-6 md:translate-x-6"
        >
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent blur-3xl" />
          <Suspense
            fallback={
              <div className="mx-auto h-[28rem] w-full max-w-[42rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:h-[42rem] md:p-8">
                <div className="loading-bar h-full w-full rounded-[1.6rem]" />
              </div>
            }
          >
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection({ setActiveProject }) {
  const sectionRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      const start = rect.top <= 100;
      const end = rect.bottom <= 500;

      setIsFixed(start && !end);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative px-5 py-28 md:px-10">
      <div className="mx-auto max-w-7xl md:grid md:grid-cols-[0.84fr_1.16fr] md:gap-12">

        {/* Fixed Title */}
        <div className="hidden md:block relative min-h-[420px]">
          <div
            className={`w-[32rem] transition-all duration-300 ${isFixed ? "fixed top-24" : "absolute top-0"
              }`}
            style={{
              left: isFixed ? "max(2.5rem, calc((100vw - 80rem)/2))" : "0"
            }}
          >
            <SectionIntro
              eyebrow="Selected Projects"
              title="Large ideas, framed with restraint."
              text="A curated preview of work across artificial intelligence, full-stack product engineering, and interaction design."
            />
          </div>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden mb-12">
          <SectionIntro
            eyebrow="Selected Projects"
            title="Large ideas, framed with restraint."
            text="A curated preview of work across artificial intelligence, full-stack product engineering, and interaction design."
          />
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-40 md:col-start-2">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProject(project)}
              className="group relative grid grid-cols-[4fr_3fr] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.03] text-left transition-all duration-700 hover:border-white/16 md:rounded-[2rem] w-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-white/45">
                  {project.category}
                </p>

                <h3 className="mb-3 text-xl font-black uppercase leading-tight text-white md:text-2xl">
                  {project.title}
                </h3>

                <p className="mb-4 text-sm leading-6 text-white/60 line-clamp-3">
                  {project.concept}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

export function HomePage() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <main className="relative z-10 pb-36">
        {/* Hero Section */}
        <HeroSection />

        {/* Section Divider */}
        <SectionDivider delay={0.2} />

        {/* Who Am I Section */}
        <WhoAmISection />

        {/* Section Divider */}
        <SectionDivider delay={0.4} />

        <section className="relative px-5 py-28 md:px-10">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:gap-12">

            {/* Sticky Title */}
            <div className="md:w-[38%]">
              <div className="md:sticky md:top-24">
                <SectionIntro
                  eyebrow="Selected Projects"
                  title="Large ideas, framed with restraint."
                  text="A curated preview of work across artificial intelligence, full-stack product engineering, and interaction design."
                />
              </div>
            </div>

            {/* Projects */}
            <div className="md:w-[62%] mt-16 md:mt-0 flex flex-col gap-40">
              {featuredProjects.slice(0, 3).map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="group relative grid grid-cols-[4fr_3fr] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.03] text-left transition-all duration-700 hover:border-white/16 md:rounded-[2rem] w-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-white/45">
                      {project.category}
                    </p>

                    <h3 className="mb-3 text-xl font-black uppercase leading-tight text-white md:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mb-4 text-sm leading-6 text-white/60 line-clamp-3">
                      {project.concept}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Section Divider */}
        <SectionDivider delay={0.6} />

        {/* Capabilities Section */}
        <section className="relative px-5 py-28 md:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Section Title - Top Right */}
            <div className="mb-24 flex justify-end">
              <div className="max-w-2xl text-left">
                <SectionIntro
                  eyebrow="Capabilities"
                  title="What I bring to your projects."
                  text="Three core areas of expertise that work together to create complete digital experiences."
                />
              </div>
            </div>

            {/* Capability Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {capabilityColumns.map((column, index) => (
                <div
                  key={column.eyebrow}
                  className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-8 transition-all duration-700 hover:border-white/16 opacity-0 translate-y-10 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/45">
                    {column.eyebrow}
                  </p>
                  <h3 className="mb-6 text-2xl font-black uppercase leading-tight text-white md:text-3xl">
                    {column.title}
                  </h3>
                  <p className="text-sm leading-7 text-white/60">{column.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <SectionDivider delay={0.8} />

        {/* Contact Section */}
        <section className="px-5 pb-8 pt-10 md:px-10">
          <div className="mx-auto max-w-7xl rounded-[2.4rem] border border-white/10 bg-white/[0.04] px-6 py-12 shadow-panel md:px-12 md:py-16">
            <p className="text-[11px] uppercase tracking-ultra text-white/45">Call to Action</p>
            <div className="mt-6 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.92] md:text-6xl">
                If the brief is ambitious, we will get along.
              </h2>
              <MagneticButton as={Link} to="/contact">
                Reach Out
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      <ProjectOverlay
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

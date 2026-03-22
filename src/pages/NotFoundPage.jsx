import { motion } from "framer-motion";
import { Link } from "wouter";
import { MagneticButton } from "../components/MagneticButton";

export function NotFoundPage() {
  return (
    <main className="relative z-10 flex min-h-screen items-center px-5 pb-28 pt-20 md:px-10 md:pt-24">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div>
          <p className="mb-4 text-[11px] uppercase tracking-ultra text-white/42">404 | Lost Signal</p>
          <h1 className="max-w-[10ch] text-[3rem] font-black uppercase leading-[0.86] tracking-[-0.05em] text-white md:text-[5.8rem]">
            This page does not exist.
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/62 md:text-base">
            The route you opened is outside the current portfolio map. You can return to the
            main experience or jump straight into the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton as={Link} to="/">
              Return Home
            </MagneticButton>
            <MagneticButton as={Link} to="/projects" className="border-white/10 text-white/70">
              View Projects
            </MagneticButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-6 shadow-panel md:p-8"
        >
          <p className="text-[6rem] font-black leading-none tracking-[-0.08em] text-white/10 md:text-[9rem]">
            404
          </p>
          <div className="mt-6 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">Available Routes</p>
            <div className="space-y-2 text-base text-white/74 md:text-lg">
              <Link to="/" className="block">
                / home
              </Link>
              <Link to="/projects" className="block">
                / projects
              </Link>
              <Link to="/journey" className="block">
                / journey
              </Link>
              <Link to="/lab" className="block">
                / lab
              </Link>
              <Link to="/contact" className="block">
                / contact
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

import { motion } from "framer-motion";
import { MagneticButton } from "../components/MagneticButton";
import { SectionIntro } from "../components/SectionIntro";
import { socialLinks } from "../data";

export function ContactPage() {
  return (
    <main className="relative z-10 px-5 pb-36 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Contact"
          title="Available for focused collaborations and ambitious builds."
          text="If you are shaping something intelligent, visually refined, or technically demanding, I am interested."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-panel">
            <p className="text-[11px] uppercase tracking-ultra text-white/42">Direct Lines</p>
            <div className="mt-8 space-y-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block border-b border-white/10 pb-4 transition-colors hover:border-white/20"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">{link.label}</p>
                  <p className="mt-2 text-lg text-white/82">{link.value}</p>
                </a>
              ))}
            </div>
          </div>

          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-panel md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.24em] text-white/42">Name</span>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="mt-3 w-full border-b border-white/14 bg-transparent pb-4 text-white outline-none placeholder:text-white/25"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.24em] text-white/42">Email</span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="mt-3 w-full border-b border-white/14 bg-transparent pb-4 text-white outline-none placeholder:text-white/25"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-8 block">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/42">Project Type</span>
              <input
                id="project-type"
                type="text"
                className="mt-3 w-full border-b border-white/14 bg-transparent pb-4 text-white outline-none placeholder:text-white/25"
                placeholder="Product design, AI build, full-stack system..."
              />
            </label>
            <label className="mt-8 block">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/42">Message</span>
              <textarea
                id="message"
                rows="5"
                className="mt-3 w-full border-b border-white/14 bg-transparent pb-4 text-white outline-none placeholder:text-white/25"
                placeholder="Tell me what you are building and what kind of help you need."
              />
            </label>
            <div className="mt-10">
              <MagneticButton type="submit">Send Inquiry</MagneticButton>
            </div>
          </motion.form>
        </div>
      </div>
    </main>
  );
}

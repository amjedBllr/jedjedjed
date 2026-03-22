export function SectionIntro({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} opacity-0 translate-y-10 animate-fade-in`}>
      <p className="mb-5 text-[11px] uppercase tracking-ultra text-white/45">{eyebrow}</p>
      <h2 className="max-w-[14ch] text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-6 max-w-2xl text-sm leading-7 text-white/62 md:text-base">{text}</p>
    </div>
  );
}

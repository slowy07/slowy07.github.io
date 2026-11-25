import { PROFILE } from "../data/portfolio";

export default function Hero() {
  return (
    <section id="top" className="border-b-2 border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
          <div className="panel-cut p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="stamp">Portfolio / 2026</span>
              <span className="stamp">Cyber / Brutal</span>
            </div>
            <p className="label-mono mb-4 text-[var(--cyan)]">Software / Systems / Research</p>
            <h1 className="headline max-w-4xl text-[clamp(3rem,11vw,7.5rem)] text-[var(--fg)]">
              {PROFILE.name}
            </h1>
            <p className="mt-6 max-w-xl font-mono text-sm uppercase tracking-[0.2em] text-[var(--yellow)]">
              {PROFILE.role}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {PROFILE.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-[var(--cyan)] bg-[var(--cyan)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--bg)] shadow-[4px_4px_0_var(--line)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--line)] hover:bg-transparent hover:text-[var(--cyan)]"
              >
                GitHub
              </a>
              <a
                href={PROFILE.youtube}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-[var(--line)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--fg)] shadow-[4px_4px_0_var(--line)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--line)] hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
              >
                YouTube
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="panel p-5">
              <p className="label-mono mb-3">Status</p>
              <p className="text-2xl font-semibold tracking-tight text-[var(--green)]">{PROFILE.status}</p>
              <p className="mt-2 font-mono text-xs text-[var(--muted)]">Available for interesting work</p>
            </div>
            <div className="panel p-5">
              <p className="label-mono mb-3">Domain</p>
              <p className="text-lg font-medium text-[var(--fg)]">{PROFILE.domain}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Systems", "AI", "Quantum", "GIS"].map((tag, i) => {
                  const colors = ["var(--red)", "var(--blue)", "var(--magenta)", "var(--green)"];
                  return (
                    <span key={tag} className="border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em]" style={{ borderColor: colors[i], color: colors[i] }}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="panel p-5">
              <p className="label-mono mb-3">Coordinates</p>
              <p className="font-mono text-sm text-[var(--fg)]">@slowy07</p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">GitHub / Remote</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

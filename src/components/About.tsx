import { ABOUT } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="panel flex flex-col justify-between p-6">
            <div>
              <p className="label-mono mb-3 text-[var(--magenta)]">01 / Profile</p>
              <h2 id="about-heading" className="headline text-4xl text-[var(--fg)] sm:text-5xl">
                About
              </h2>
            </div>
            <p className="mt-8 font-mono text-xs leading-relaxed text-[var(--muted)]">
              Low-level systems, AI research, and the occasional quantum rabbit hole.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="panel-cut p-6 sm:p-8">
              <p className="label-mono mb-4">Field Notes</p>
              <p className="max-w-3xl text-lg leading-relaxed text-[var(--fg)] sm:text-xl">
                {ABOUT.paragraphs[0]}
              </p>
            </div>
            <div className="panel p-6">
              <p className="label-mono mb-4">Focus</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {ABOUT.focus.map((item, i) => {
                  const colors = ["var(--cyan)", "var(--green)", "var(--yellow)", "var(--red)"];
                  return (
                    <li
                      key={item}
                      className="flex items-center gap-3 border border-[var(--line)] px-4 py-3 font-mono text-xs uppercase tracking-[0.1em] text-[var(--fg)]"
                    >
                      <span style={{ color: colors[i % colors.length] }}>0{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

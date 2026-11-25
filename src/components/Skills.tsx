import { SKILL_GROUPS } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
          <div className="panel p-6 sm:p-8">
            <p className="label-mono mb-3 text-[var(--green)]">03 / Capability</p>
            <h2 id="skills-heading" className="headline text-4xl text-[var(--fg)] sm:text-5xl">
              Skills
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              Tools, languages, and domains currently in the stack. No meters, just what’s real.
            </p>
            <div className="mt-8 border-t border-[var(--line)] pt-4 font-mono text-xs text-[var(--muted)]">
              {SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0)} entries / {SKILL_GROUPS.length} groups
            </div>
          </div>

          <div className="grid gap-4">
            {SKILL_GROUPS.map((group, gi) => {
              const accent = ["var(--cyan)", "var(--yellow)", "var(--magenta)"][gi % 3];
              return (
                <div key={group.id} className="panel-cut p-6">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: accent }}>
                      {group.label}
                    </h3>
                    <span className="label-mono">{group.note}</span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="border border-[var(--line)] bg-[var(--bg)] px-3 py-2 font-mono text-xs text-[var(--fg)]"
                      >
                        {item.name}
                        {item.status !== "logged" && (
                          <span className="ml-2 text-[var(--muted)]">// {item.status}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { GEAR } from "../data/portfolio";

export default function Gear() {
  return (
    <section id="gear" aria-labelledby="gear-heading" className="border-b-2 border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border border-[var(--line)] bg-[var(--bg)] p-6">
          <div>
            <p className="label-mono mb-3 text-[var(--blue)]">05 / Setup</p>
            <h2 id="gear-heading" className="headline text-4xl text-[var(--fg)] sm:text-5xl">
              Gear / Specs
            </h2>
          </div>
          <p className="label-mono max-w-xs text-right">Hardware, software, daily drivers</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {GEAR.map((group, gi) => {
            const accent = ["var(--cyan)", "var(--yellow)", "var(--green)", "var(--magenta)", "var(--red)", "var(--blue)"][gi % 6];
            return (
              <div key={group.gear} className="panel p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: accent }}>
                  {group.gear}
                </p>
                <ul className="mt-4 grid gap-3">
                  {group.gearList.map((item) => (
                    <li key={item.item} className="border-t border-[var(--line)] pt-3">
                      <p className="text-sm font-medium text-[var(--fg)]">{item.item}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{item.desc}</p>
                      {item.type && item.type.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.type.map((t) => (
                            <span key={t} className="border border-[var(--line)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

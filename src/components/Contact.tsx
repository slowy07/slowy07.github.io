import { CHANNELS } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-b-2 border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="panel-cut overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            <div className="border-b-2 border-[var(--line)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <p className="label-mono mb-3 text-[var(--red)]">06 / Comms</p>
              <h2 id="contact-heading" className="headline text-4xl text-[var(--fg)] sm:text-6xl">
                Contact
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                Open channels. Pick one, send a signal.
              </p>
            </div>

            <div className="grid">
              {CHANNELS.map((channel, i) => {
                const accent = ["var(--cyan)", "var(--yellow)", "var(--green)"][i % 3];
                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group border-b-2 border-[var(--line)] p-5 last:border-b-0 hover:bg-[color-mix(in_srgb,var(--surface)_55%,var(--bg))] sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: accent }}>
                          {channel.label}
                        </p>
                        <p className="mt-2 text-base font-medium text-[var(--fg)] group-hover:text-[var(--cyan)]">
                          {channel.handle}
                        </p>
                      </div>
                      <span className="stamp">{channel.note}</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

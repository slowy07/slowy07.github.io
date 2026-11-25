import { REQUESTS, REQUESTS_TOTAL } from "../data/portfolio";

function rupiah(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default function Requests() {
  return (
    <section id="requests" aria-labelledby="requests-heading" className="border-b-2 border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <div className="panel p-6 sm:p-8">
            <p className="label-mono mb-3 text-[var(--green)]">05 / Support</p>
            <h2 id="requests-heading" className="headline text-4xl text-[var(--fg)] sm:text-5xl">
              Requests
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">
              Folks who chipped in or asked for support. Big thanks.
            </p>
            <div className="mt-8 border border-[var(--line)] p-4">
              <p className="label-mono mb-2">Total</p>
              <p className="font-mono text-lg text-[var(--yellow)]">{rupiah(REQUESTS_TOTAL)}</p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">{REQUESTS.length} entries</p>
            </div>
          </div>

          <div className="panel-cut p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4 border-b-2 border-[var(--line)] pb-4">
              <p className="label-mono">Support Log</p>
              <p className="label-mono">{REQUESTS.length} records</p>
            </div>
            <ul className="grid gap-2">
              {REQUESTS.map((req, i) => (
                <li
                  key={`${req.name}-${i}`}
                  className="grid grid-cols-[40px_1fr_auto] items-baseline gap-3 border border-[var(--line)] bg-[var(--bg)] px-4 py-3"
                >
                  <span className="font-mono text-xs text-[var(--muted)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-[var(--fg)]">{req.name}</span>
                  <span className="font-mono text-xs text-[var(--cyan)]">{rupiah(req.nominal)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

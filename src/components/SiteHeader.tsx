const links = [
  { href: "/", label: "Home" },
  { href: "/#/projects", label: "Projects" },
  { href: "/#/gear", label: "Gear" },
  { href: "/#/requests", label: "Requests" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-[var(--line)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="/#top" className="font-mono text-sm tracking-[0.18em] text-[var(--fg)]">
          ARFY/SLOWY
        </a>
        <nav aria-label="Primary" className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)] hover:text-[var(--cyan)]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

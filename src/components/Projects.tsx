import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { PROJECTS } from "../data/portfolio";

const publicProjects = PROJECTS.filter(
  (p) => p.visibleProject.toLowerCase() === "public",
).slice(0, 4);

const accents = ["var(--cyan)", "var(--yellow)", "var(--green)", "var(--magenta)"];

function imgSrc(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return src.replace(/^\.\.\/projects\//, "/projects/");
}

function readmeCandidates(link: string): string[] {
  try {
    const u = new URL(link);
    const parts = u.pathname.split("/").filter(Boolean);
    if (u.hostname === "github.com" && parts.length >= 2) {
      const [owner, repo] = parts;
      return [
        `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
        `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`,
        `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`,
      ];
    }
    if (u.hostname === "codeberg.org" && parts.length >= 2) {
      const [owner, repo] = parts;
      return [
        `https://codeberg.org/${owner}/${repo}/raw/branch/main/README.md`,
        `https://codeberg.org/${owner}/${repo}/raw/branch/master/README.md`,
      ];
    }
    if (u.hostname === "gitlab.com" && parts.length >= 2) {
      const [owner, repo] = parts;
      return [
        `https://gitlab.com/${owner}/${repo}/-/raw/main/README.md`,
        `https://gitlab.com/${owner}/${repo}/-/raw/master/README.md`,
      ];
    }
  } catch {}
  return [];
}

async function fetchReadme(link: string): Promise<string> {
  for (const url of readmeCandidates(link)) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        return text.trim().slice(0, 4000);
      }
    } catch {}
  }
  return "README tidak bisa diambil. Buka repo untuk detail.";
}

export default function Projects() {
  const [open, setOpen] = useState<string | null>(null);
  const [readmes, setReadmes] = useState<Record<string, { status: "loading" | "done"; text: string }>>({});

  const toggle = async (title: string, link: string) => {
    if (open === title) {
      setOpen(null);
      return;
    }
    setOpen(title);
    if (readmes[title]) return;
    setReadmes((r) => ({ ...r, [title]: { status: "loading", text: "" } }));
    const text = await fetchReadme(link);
    setReadmes((r) => ({ ...r, [title]: { status: "done", text } }));
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border border-[var(--line)] bg-[var(--bg)] p-6">
          <div>
            <p className="label-mono mb-3 text-[var(--yellow)]">02 / Work</p>
            <h2 id="projects-heading" className="headline text-4xl text-[var(--fg)] sm:text-5xl">
              Projects
            </h2>
          </div>
          <p className="label-mono max-w-xs text-right">Click panel to expand / README fetched live</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {publicProjects.map((project, i) => {
            const isOpen = open === project.title;
            const readme = readmes[project.title];
            return (
              <article
                key={project.title}
                className="panel overflow-hidden transition-colors"
                style={{ borderColor: isOpen ? accents[i % accents.length] : undefined }}
              >
                <button
                  type="button"
                  onClick={() => toggle(project.title, project.link)}
                  className="group w-full text-left"
                  aria-expanded={isOpen}
                >
                  <div className="relative h-44 overflow-hidden border-b border-[var(--line)] bg-[var(--surface)]">
                    <img
                      src={imgSrc(project.image)}
                      alt={`${project.title} banner`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      style={{ filter: "saturate(1.45) contrast(1.18) brightness(1.02)" }}
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(20,27,30,0.75), rgba(20,27,30,0.05) 55%), linear-gradient(135deg, rgba(103,176,232,0.12), rgba(196,127,213,0.08))",
                      }}
                    />
                    <span
                      className="absolute left-3 top-3 border bg-[rgba(20,27,30,0.75)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                      style={{ borderColor: accents[i % accents.length], color: accents[i % accents.length] }}
                    >
                      Panel {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute bottom-3 right-3 stamp bg-[rgba(20,27,30,0.8)]">
                      {isOpen ? "Close" : "Expand"}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <span className="stamp">{project.technology}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-[var(--fg)] group-hover:text-[var(--cyan)]">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
                      {project.description}
                    </p>
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[var(--line)] px-6 pb-6 pt-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <p className="label-mono" style={{ color: accents[i % accents.length] }}>README from repo</p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--cyan)] hover:text-[var(--fg)]"
                        >
                          Open Repo →
                        </a>
                      </div>
                      <div className="readme-prose max-h-72 overflow-auto border border-[var(--line)] bg-[var(--bg)] p-4">
                        {readme?.status === "loading" && (
                          <p className="font-mono text-xs text-[var(--muted)]">Loading README...</p>
                        )}
                        {readme?.status === "done" && <ReactMarkdown>{readme.text}</ReactMarkdown>}
                        {!readme && (
                          <p className="font-mono text-xs text-[var(--muted)]">Expand to load README.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

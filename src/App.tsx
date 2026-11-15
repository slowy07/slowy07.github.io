import { useEffect, useState } from "react";
import CockpitDashboard from "./cockpit/Dashboard";
import { SECTIONS, type SectionId } from "./data/portfolio";

const IDS = SECTIONS.map((section) => section.id);

function readHash(): SectionId {
  const raw = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  return IDS.includes(raw as SectionId) ? (raw as SectionId) : "home";
}

export default function App() {
  const [active, setActive] = useState<SectionId>(readHash);

  useEffect(() => {
    const sync = () => setActive(readHash());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const selectSection = (id: SectionId) => {
    if (id === active) return;
    window.history.pushState(null, "", `#/${id}`);
    setActive(id);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target =
        event.target instanceof HTMLElement ? event.target : null;
      if (
        target &&
        (target.isContentEditable ||
          /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      ) {
        return;
      }

      const inScreen = Boolean(target?.closest(".screen-body"));
      const current = IDS.indexOf(active);

      if (event.key === "ArrowRight") {
        if (inScreen) return;
        event.preventDefault();
        selectSection(IDS[(current + 1) % IDS.length]);
        return;
      }

      if (event.key === "ArrowLeft") {
        if (inScreen) return;
        event.preventDefault();
        selectSection(IDS[(current - 1 + IDS.length) % IDS.length]);
        return;
      }

      if (event.key === "Home") {
        if (inScreen) return;
        event.preventDefault();
        selectSection("home");
        return;
      }

      if (event.key === "End") {
        if (inScreen) return;
        event.preventDefault();
        selectSection("contact");
        return;
      }

      if (/^[1-5]$/.test(event.key)) {
        event.preventDefault();
        selectSection(IDS[Number(event.key) - 1]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return <CockpitDashboard active={active} onSelect={selectSection} />;
}

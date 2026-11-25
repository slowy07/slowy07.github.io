import { useEffect, useRef, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Gear from "./components/Gear";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Requests from "./components/Requests";
import SiteHeader from "./components/SiteHeader";
import Skills from "./components/Skills";

type Route = "main" | "projects" | "requests" | "gear";

function getRoute(hash: string): Route {
  if (hash === "#/requests" || hash === "#requests") return "requests";
  if (hash === "#/gear" || hash === "#gear") return "gear";
  if (hash === "#/projects" || hash === "#projects") return "projects";
  return "main";
}

const routeLabel: Record<Route, string> = {
  main: "Home",
  projects: "Projects",
  requests: "Requests",
  gear: "Gear",
};

export default function App() {
  const [route, setRoute] = useState<Route>(() => getRoute(window.location.hash));
  const [displayRoute, setDisplayRoute] = useState<Route>(() => getRoute(window.location.hash));
  const [wipe, setWipe] = useState<{ key: number; label: string } | null>(null);
  const prev = useRef<Route>(getRoute(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(getRoute(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (route === prev.current) return;
    const next = route;
    const label = routeLabel[next];
    prev.current = next;
    setWipe({ key: Date.now(), label });
    const swap = window.setTimeout(() => setDisplayRoute(next), 260);
    const end = window.setTimeout(() => setWipe(null), 650);
    return () => {
      window.clearTimeout(swap);
      window.clearTimeout(end);
    };
  }, [route]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {wipe && (
        <div key={wipe.key} className="route-wipe" aria-hidden="true">
          <div className="route-wipe-label">{wipe.label}</div>
        </div>
      )}
      <SiteHeader />
      <main>
        {displayRoute === "requests" ? (
          <Requests />
        ) : displayRoute === "gear" ? (
          <Gear />
        ) : displayRoute === "projects" ? (
          <Projects />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Contact />
          </>
        )}
      </main>
    </div>
  );
}

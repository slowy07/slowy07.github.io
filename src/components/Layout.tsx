/* eslint-disable jsx-a11y/anchor-is-valid */
import { Github } from "pixelarticons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { key: "/", label: "home", n: "01" },
  { key: "about-me", label: "profile", n: "02" },
  { key: "projects", label: "projects", n: "03" },
  { key: "guestbook", label: "guestbook", n: "04" },
];

const pad = (n: number) => String(n).padStart(2, "0");

type LayoutProps = {
  children: React.ReactNode;
  isNavbar: string;
  setIsNavbar: (v: string) => void;
};

export default function Layout({ children, setIsNavbar, isNavbar }: LayoutProps) {
  const [navbar, setNavbar] = useState(false);
  const boot = useRef(Date.now());
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const close = () => window.innerWidth >= 1024 && setNavbar(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const uptime = Math.floor((now.getTime() - boot.current) / 1000);
  const uptimeStr = `${pad(Math.floor(uptime / 3600))}:${pad(
    Math.floor((uptime % 3600) / 60)
  )}:${pad(uptime % 60)}`;

  const navBtn = (item: { key: string; label: string; n: string }) => (
    <button
      key={item.key}
      className={`btn-retro px-3 py-1 text-xs ${
        isNavbar === item.key ? "btn-retro-on" : ""
      }`}
      onClick={() => {
        setIsNavbar(item.key);
        setNavbar(false);
      }}
    >
      [{item.n}] {item.label}
    </button>
  );

  return (
    <div className="h-screen flex items-center justify-center bg-[#050505] flicker">
      <div className="bezel custom-size flex flex-col">
        <div className="flex flex-col h-full">
          <header className="title-bar">
            <div className="flex items-center justify-between px-3 py-1.5 text-xs">
              <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
                <span className="text-net-ink glow font-semibold">
                  NETLINK // SLOWY PORTFOLIO NETWORK
                </span>
                <span className="text-net-gray hidden sm:inline">
                  SYSTEM v1.4.83
                </span>
              </div>
              <div className="flex items-center gap-3 text-net-gray">
                <span className="hidden md:inline">
                  DATE: {pad(now.getDate())}-{pad(now.getMonth() + 1)}-
                  {pad(now.getFullYear() % 100)}
                </span>
                <span>
                  TIME: {pad(now.getHours())}:{pad(now.getMinutes())}:
                  {pad(now.getSeconds())}
                </span>
                <a
                  href="https://github.com/slowy07"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow me on github"
                  className="btn-retro px-2 py-0.5 flex items-center gap-1"
                >
                  <Github className="w-4 h-4" /> GH
                </a>
                <button
                  className="btn-retro px-2 py-0.5 lg:hidden"
                  onClick={() => setNavbar((v) => !v)}
                  aria-label="Toggle menu"
                >
                  {navbar ? "[X]" : "[MENU]"}
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 px-3 pb-2 text-xs">
              <span className="text-net-gray">STATUS:</span>
              <span className="text-net-ink glow">
                ONLINE<span className="cursor-blink">█</span>
              </span>
              <span className="text-net-gray">|</span>
              {NAV.map((item) => navBtn(item))}
              <span className="text-net-gray ml-auto">
                {isNavbar === "/" ? "HELLO" : isNavbar.toUpperCase()}.SYS
              </span>
            </div>
          </header>

          <AnimatePresence>
            {navbar ? (
              <motion.div
                className="lg:hidden sys-panel border-x-0 border-t-0 flex flex-col gap-2 p-3 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-net-gray">STATUS: ONLINE█</span>
                {NAV.map((item) => navBtn(item))}
              </motion.div>
            ) : (
              <motion.main
                className="h-full w-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {children}
              </motion.main>
            )}
          </AnimatePresence>

          <footer className="title-bar flex items-center justify-between px-3 py-1.5 text-xs text-net-gray">
            <span className="whitespace-nowrap overflow-hidden truncate">
              CONNECTED TO SLOWY PORTFOLIO NETWORK
            </span>
            <span className="flex items-center gap-4 whitespace-nowrap">
              <span className="hidden sm:inline">
                UPTIME: {uptimeStr}
              </span>
              <span className="text-net-ink glow">© {now.getFullYear()} SLOWY</span>
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

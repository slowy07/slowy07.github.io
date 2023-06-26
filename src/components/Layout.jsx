/* eslint-disable jsx-a11y/anchor-is-valid */
import { AiOutlineGithub } from "@react-icons/all-files/ai/AiOutlineGithub";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { SiVim } from "@react-icons/all-files/si/SiVim";
import { SiPython } from "@react-icons/all-files/si/SiPython";
import { BsGearFill } from "@react-icons/all-files/bs/BsGearFill";
import { DiGitBranch } from "@react-icons/all-files/di/DiGitBranch";
import { AiOutlineFolderOpen } from "@react-icons/all-files/ai/AiOutlineFolderOpen";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout({ children, setIsNavbar, isNavbar }) {
  // For toggle navbar on mobile
  const [navbar, setNavbar] = useState(false);

  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    if (windowDimension.winHeight > 768) {
      setNavbar(() => setNavbar(false));
    }

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);

  return (
    <div
      className="h-screen flex bg-[#010c15] items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url("black-hole.webp")` }}
    >
      <div className="custom-size bg-[#101419]/[99%] rounded-lg flex justify-between flex-col overflow-hidden">
        <header className="grid grid-cols-12  text-[#cbced3] items-center">
          <div className="lg:col-span-2 col-span-11 bg-[#101419] lg:border-r border-[#101419] py-4 pl-4">
            <span>Arfy Slowy</span>
          </div>

          {/* Navbar  Desktop*/}
          <div className="col-span-10 hidden lg:block">
            <nav className="flex items-center">
              <div>
                <button
                  className={`py-4 h-full transition-all hover:text-white ${
                    isNavbar === "/"
                      ? "border-b-2 border-[#ceac67] text-white"
                      : "border-b-transparent"
                  }`}
                  onClick={() => {
                    setIsNavbar("/");
                  }}
                >
                  _hello
                </button>
                <button
                  className={`px-5 py-4 border-r border-r-[#101419] border-b-2 h-full transition-all hover:text-white ${
                    isNavbar === "about-me"
                      ? "border-b-2 border-[#ceac67] text-white"
                      : "border-b-transparent"
                  }`}
                  onClick={() => {
                    setIsNavbar("about-me");
                  }}
                >
                  _about-me
                </button>
                <button
                  className={`px-5 py-4 border-r border-r-[#101419] border-b-2 h-full transition-all hover:text-white ${
                    isNavbar === "projects"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-transparent"
                  }`}
                  onClick={() => {
                    setIsNavbar("projects");
                  }}
                >
                  _projects
                </button>
              </div>

              <button
                id="border-b"
                className={`px-5 py-4 border-l border-l-[#101419] border-b-2 h-full transition-all hover:text-white ${
                  isNavbar === "contact-me"
                    ? "border-b-2 border-[#FEA55F] text-white"
                    : "border-b-transparent"
                }`}
                onClick={() => {
                  setIsNavbar("contact-me");
                }}
              >
                _contact-me
              </button>
            </nav>
          </div>

          {/* Navbar Mobile */}
          {navbar ? (
            <button
              className="justify-self-center text-xl block lg:hidden"
              onClick={() => setNavbar((setNavbar) => !setNavbar)}
            >
              <AiOutlineClose />
            </button>
          ) : (
            <button
              className="justify-self-center text-xl block lg:hidden"
              onClick={() => setNavbar((setNavbar) => !setNavbar)}
            >
              <FiMenu />
            </button>
          )}
        </header>

        {/* Navbar mobile */}
        <AnimatePresence>
          {navbar ? (
            <motion.div
              className="flex flex-col h-full"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <div className="flex flex-col h-full text-white">
                <button
                  className={`px-5 py-4 border-b  transition-all w-full text-left ${
                    isNavbar === "/"
                      ? "border-b-2 border-[#ceac67] text-white"
                      : "border-b-[#101419]"
                  }`}
                  onClick={() => {
                    setIsNavbar("/");
                    setNavbar(false);
                  }}
                >
                  _hello
                </button>
                <button
                  className={`px-5 py-4 border-b  transition-all w-full text-left ${
                    isNavbar === "about-me"
                      ? "border-b-2 border-[#ceac67] text-white"
                      : "border-b-[#101419]"
                  }`}
                  onClick={() => {
                    setIsNavbar("about-me");
                    setNavbar(false);
                  }}
                >
                  _about-me
                </button>
                <button
                  className={`px-5 py-4 border-b  transition-all w-full text-left ${
                    isNavbar === "projects"
                      ? "border-b-2 border-[#ceac67] text-white"
                      : "border-b-white"
                  }`}
                  onClick={() => {
                    setIsNavbar("projects");
                    setNavbar(false);
                  }}
                >
                  _projects
                </button>
                <button
                  className={`px-5 py-4 border-b  transition-all w-full text-left ${
                    isNavbar === "contact-me"
                      ? "border-b-2 border-[#FEA55F] text-white"
                      : "border-b-[#101419]"
                  }`}
                  onClick={() => {
                    setIsNavbar("contact-me");
                    setNavbar(false);
                  }}
                >
                  _contact-me
                </button>
              </div>

              <footer className="block lg:hidden">
                <div className="grid grid-cols-12 px-2 text-[#607B96] border-t border-[#101419]">
                  <div className="col-span-11 flex items-center"></div>
                  <div className="col-span-1 flex items-center justify-end">
                    <a
                      href="https://github.com/slowy07"
                      className="flex items-center justify-center gap-1.5 pl-4 border-l border-[#101419] py-1.5 hover:text-white transition-colors"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Follow me on github"
                    >
                      <span className="hidden">Slowy07</span>
                      <AiOutlineGithub className="text-xl" />
                    </a>
                  </div>
                </div>
              </footer>
            </motion.div>
          ) : (
            <main className="self-center h-full w-full overflow-hidden">
              {children}
            </main>
          )}
        </AnimatePresence>

        <footer className="lg:flex items-center justify-between text-[#607B96] hidden">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <SiVim className="w-[30px] h-[30px] p-2 bg-[#c24147] text-[#d0d3d8]" />
              <div className="flex items-center bg-[#1f2328] h-[30px]">
                <p className="px-2 font-light text-sm">Visual</p>
              </div>
            </div>
            <div className="flex items-center">
              <SiPython className="w-[30px] h-[30px] p-2 bg-[#4d82c8] text-[#d0d3d8]" />
              <div className=" flex items-center bg-[#1f2328] h-[30px]">
                <p className="px-2 font-light text-sm">{`${isNavbar === '/' ? 'hello' : isNavbar}.py`}</p>
              </div>
            </div>
            <div className="flex items-center">
              <DiGitBranch className="w-[20px] h-[20px] text-[#d0d3d8]/50" />
              <div className=" flex items-center">
                <p className="px-0.5 font-light text-xs">main</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-2">
            <p className="font-light text-sm">UTF-8</p>

            <div
              className="flex items-center bg-[#1f2328] h-[30px]"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow me on github"
            >
              <p className="px-2 font-light text-sm">ruff_lsp</p>
              <BsGearFill className="w-[30px] h-[30px] p-2 bg-[#69b373] text-[#d0d3d8]" />
            </div>
            <div
              className="flex items-center bg-[#1f2328] h-[30px]"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow me on github"
            >
              <p className="px-2 font-light text-sm">slowy07-site</p>
              <AiOutlineFolderOpen className="w-[30px] h-[30px] p-2 bg-[#cbced3] text-[#1f2328]" />
            </div>
            <a
              className="flex items-center bg-[#1f2328] h-[30px] hover:text-white transition-colors group"
              href="https://github.com/slowy07"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow me on github"
            >
              <p className="px-2 font-light text-sm">slowy-07</p>
              <AiOutlineGithub className="w-[30px] h-[30px] p-2 bg-[#c296eb] text-[#d0d3d8] group-hover:text-white transition-colors" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

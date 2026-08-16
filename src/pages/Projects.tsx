import { Dialog, Transition } from "@headlessui/react";
import { BsFiles } from "@react-icons/all-files/bs/BsFiles";
import { SiPython } from "@react-icons/all-files/si/SiPython";
import { SiC } from "@react-icons/all-files/si/SiC";
import { SiZig } from "react-icons/si";
import { FaCrown } from "react-icons/fa6";
import { FaGolang } from "react-icons/fa6";
import { SiAssemblyscript } from "react-icons/si";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import datas from "../data/ProjectData.json";

type Project = {
  title: string;
  description: string;
  technology: string;
  visibleProject: string;
  image: string;
  link: string;
};

const FILTERS = [
  { id: "all", label: "ALL", icon: <BsFiles /> },
  { id: "Python", label: "PYTHON", icon: <SiPython /> },
  { id: "C", label: "C", icon: <SiC /> },
  { id: "Zig", label: "ZIG", icon: <SiZig /> },
  { id: "Nim", label: "NIM", icon: <FaCrown /> },
  { id: "Golang", label: "GOLANG", icon: <FaGolang /> },
  { id: "Assembly", label: "ASSEMBLY", icon: <SiAssemblyscript /> },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const projects = datas as Project[];
  const shown =
    filter === "all"
      ? projects
      : projects.filter((p) => p.technology === filter);

  return (
    <motion.div
      className="h-full relative flex flex-col"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="sys-head px-3 py-1.5 flex items-center justify-between">
        <span className="text-net-ink">
          RECENT PROJECTS ({projects.length})
        </span>
        <span className="hidden md:inline">NODE: 03 · NETWORK ACTIVITY</span>
      </div>

      <div className="well p-2 md:p-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`btn-retro px-2.5 py-1 text-[10px] md:text-xs flex items-center gap-1.5 ${
              filter === f.id ? "btn-retro-on" : ""
            }`}
            onClick={() => setFilter(f.id)}
          >
            {f.icon}
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-3 md:p-4">
        {shown.length === 0 ? (
          <div className="h-full flex items-center justify-center text-net-gray text-sm">
            &gt; NO RECORDS FOUND. CHECK BACK LATER.
          </div>
        ) : (
          <div className="space-y-3">
            {shown.map((data, index) => (
              <Card data={data} key={index} index={index + 1} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Card({ data, index }: { data: Project; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.article
        className="sys-panel flex flex-col md:flex-row"
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="relative w-full md:w-48 h-36 md:h-auto shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-net-line group">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover grayscale contrast-125 group-hover:invert transition-[filter] duration-200"
          />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0_1px,transparent_1px_3px)] pointer-events-none" />
        </div>

        <div className="flex-1 p-3 text-xs md:text-sm space-y-1.5">
          <p className="text-net-gray">
            [{String(index).padStart(2, "0")}]{" "}
            <span className="text-net-ink font-semibold glow uppercase">
              {data.title}
            </span>
          </p>
          <p className="text-net-gray">
            STATUS: {data.visibleProject} · TYPE: {data.technology}
          </p>
          <p className="text-net-gray">
            DESCRIPTION: <span className="text-net-ink">{data.description}</span>
          </p>
          <button
            className="btn-retro px-2.5 py-1 text-[10px] mt-1"
            onClick={() => setIsOpen(true)}
          >
            [VIEW PROJECT] &gt;
          </button>
        </div>
      </motion.article>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-85" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="sys-panel w-full max-w-2xl">
                  <div className="sys-head px-3 py-1.5 flex items-center justify-between">
                    <span className="text-net-ink uppercase">
                      {data.title}.EXE
                    </span>
                    <button
                      className="btn-retro px-2 py-0.5 text-[10px]"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close"
                    >
                      [X]
                    </button>
                  </div>
                  <div className="relative h-56 m-3 overflow-hidden border border-net-line group">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:invert transition-[filter] duration-200"
                    />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0_1px,transparent_1px_3px)] pointer-events-none" />
                  </div>
                  <div className="p-3 pt-0 text-xs md:text-sm space-y-2">
                    <p className="text-net-ink">{data.description}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-net-gray">
                      <span>
                        TECH: [{data.technology}] · VIS: {data.visibleProject}
                      </span>
                      <a
                        href={data.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-retro px-2.5 py-1 text-[10px]"
                      >
                        {data.technology.includes("Other")
                          ? "[DOWNLOAD]"
                          : "[VIEW PROJECT]"}
                        &gt;
                      </a>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

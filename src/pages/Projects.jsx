import { Dialog, Transition } from "@headlessui/react";
import { BsFiles } from "@react-icons/all-files/bs/BsFiles";
import { GoTriangleDown } from "@react-icons/all-files/go/GoTriangleDown";
import { SiPython } from "@react-icons/all-files/si/SiPython";
import { SiC } from "@react-icons/all-files/si/SiC";
import { SiZig } from "react-icons/si";
import { FaCrown } from "react-icons/fa6";
import { FaGolang } from "react-icons/fa6";
import { SiAssemblyscript } from "react-icons/si";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import datas from "../data/ProjectData.json";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [project, setProject] = useState(true);
  return (
    <motion.div
      className="h-full relative"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="grid grid-cols-12">
        <button
          className="md:col-span-3 lg:col-span-2 col-span-full md:border-r border-b border-[#1E2D3D] text-white flex gap-2.5 items-center py-2.5 pl-4"
          onClick={() => setProject(!project)}
        >
          <GoTriangleDown
            className={`${project ? "" : "-rotate-90"} transition-all`}
          />
          <span>projects</span>
        </button>
        <div className="lg:col-span-10 md:col-span-9 col-span-full border-b border-[#1E2D3D] flex items-center justify-center text-white row-start-1 md:row-start-auto py-2.5 lg-py-0">
          {filter} projects
        </div>
      </div>

      <div className="grid grid-cols-12 h-full ">
        <div className="lg:col-span-2 col-span-full md:col-span-3 md:border-r border-[#1E2D3D] px-0 md:px-5 md:py-4 py-0 flex flex-col gap-4 overflow-hidden">
          <Transition
            show={project}
            enter="transition ease-in duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
            className="flex flex-col gap-4 overflow-hidden absolute md:static z-10 top-[6rem] md:top-0 py-2.5 md:py-0 px-4 md:px-0 w-full md:w-auto left-0 bg-[#011627] md:bg-transparent"
          >
            <div className="flex items-center gap-6 ">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full text-left ${
                  filter === "all" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("all")}
              >
                <BsFiles />
                <span>All Projects</span>
              </button>
            </div>
            <div className="flex items-center gap-6 ">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "Python" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("Python")}
              >
                <SiPython />
                <span>Python</span>
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "C" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("C")}
              >
                <SiC />
                <span>C</span>
              </button>
            </div>
             <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "Zig" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("Zig")}
              >
                <SiZig />
                <span>Zig</span>
              </button>
            </div>
             <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "Nim" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("Nim")}
              >
                <FaCrown />
                <span>Nim</span>
              </button>
            </div>
             <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "Golang" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("Golang")}
              >
                <FaGolang />
                <span>Golang</span>
              </button>
            </div>
            <div className="flex items-center gap-6">
              <button
                className={`flex items-center gap-2.5 cursor-pointer transition-colors hover:text-white w-full ${
                  filter === "Assembly" ? "text-white" : "text-[#607B96]"
                }`}
                onClick={() => setFilter("Assembly")}
              >
                <SiAssemblyscript />
                <span>Assembly</span>
              </button>
            </div>

          </Transition>
        </div>

        <div className="lg:col-span-10 md:col-span-9 col-span-full flex items-start justify-center lg:p-16 md:p-8 p-4 overflow-y-auto scrollbar-none">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 h-max w-full">
            {filter === "all"
              ? (
                datas.map((data, index) => {
                  return <Card data={data} key={index} />;
                })
              )
              : datas.filter((tech) => tech.technology === filter).length ===
                  0
              ? (
                <div className="w-full flex items-center justify-center col-span-4 h-full text-white">
                  Not yet, comeback again later!
                </div>
              )
              : (
                datas
                  .filter((tech) => tech.technology === filter)
                  .map((data, index) => {
                    return <Card data={data} key={index} />;
                  })
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Card = ({ data }) => {
  const technology = data.technology.split(/[, ]+/);
  const [isOpen, setIsOpen] = useState(false);

  function generateIcon(value) {
    if (value.includes("Python")) {
      return <SiPython />;
    }
    if (value.includes("C")) {
      return <SiC />;
    }
    if (value.includes("Golang")) {
      return <FaGolang/>;
    }
    if (value.includes("Assembly")) {
      return <SiAssemblyscript />;
    }
    if (value.includes("Zig")) {
      return <SiZig />;
    }
    if (value.includes("Nim")) {
      return <FaCrown />;
    }
  }

  return (
    <>
      <motion.div
        className="rounded-2xl border border-[#1E2D3D] bg-[#001221]/50 flex items-center flex-col overflow-hidden hover:shadow-sm hover:shadow-[#607B96] transition-colors h-[400px]"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="overflow-hidden h-[80%] w-full relative ">
          <img
            src={data.image}
            alt={data.title}
            className="object-cover h-full w-full"
          />

          <div>
            <div className="absolute top-5 right-5 text-lg rounded-[2px] flex gap-2.5">
              <div className="bg-[#86E1F9] p-1 rounded-md">
                {generateIcon(technology)}
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 px-8 text-[#607B96] w-full flex flex-col justify-between h-[80%]">
          <div>
            <h6 className="mb-2.5 text-white">{data.title}</h6>
            <p className="mb-5 line-clamp-2">{data.description}</p>
          </div>
          <motion.button
            className="bg-[#1b2b3a] text-white py-2.5 px-3.5 rounded-lg  w-max"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            view-project
          </motion.button>
        </div>
      </motion.div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 backdrop-blur-0"
            enterTo="opacity-100 backdrop-blur-sm"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 backdrop-blur-sm"
            leaveTo="opacity-0 backdrop-blur-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#1d2a3a] text-left align-middle shadow-xl transition-all">
                  <div className="h-96">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <article className="p-5 ">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 mb-2.5 text-white"
                    >
                      {data.title}
                    </Dialog.Title>
                    <p className="mb-2.5 text-white/80">{data.description}</p>
                    <div className="flex items-center justify-between">
                      {data.technology.includes("Other")
                        ? (
                          <a
                            href={data.link}
                            target="_blank"
                            className="text-white/80"
                            rel="noreferrer"
                          >
                            Download
                          </a>
                        )
                        : (
                          <a
                            href={data.link}
                            target="_blank"
                            className="text-white/80"
                            rel="noreferrer"
                          >
                            View Project
                          </a>
                        )}

                      <p className="text-white/80">
                        Tech Stack: {data.technology}
                      </p>
                      <p className="text-white/80">
                        Visibility: {data.visibleProject}
                      </p>
                    </div>
                  </article>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

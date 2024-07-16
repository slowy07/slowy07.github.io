import { Popover, Transition } from "@headlessui/react";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { GoTriangleDown } from "@react-icons/all-files/go/GoTriangleDown";
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";
import { RiFolder3Fill } from "@react-icons/all-files/ri/RiFolder3Fill";
import { SiMarkdown } from "@react-icons/all-files/si/SiMarkdown";
import { VscCollapseAll } from "@react-icons/all-files/vsc/VscCollapseAll";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import gearData from "../data/GearData.json";
import { IoLogoPython } from "@react-icons/all-files/io5/IoLogoPython";

export default function AboutMe() {
  const [render, setRender] = useState("my-bio");

  function Render(value) {
    if (value === "/") {
      return <Root />;
    } else if (value === "my-bio") {
      return <MyBio closeBio={setRender} />;
    } else if (value === "gear") {
      return <Gear closeGear={setRender} />;
    } else if (value === "work") {
      return <Work closeGear={setRender} />;
    }
  }

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="lg:grid grid-cols-12 h-full flex flex-col ">
        <div className="col-span-2 grid lg:grid-cols-6">
          <div className="col-span-6 lg:border-r lg:border-b-0 border-b border-[#101419] text-white gap-2.5 relative overflow-hidden">
            <PersonalInfo setRender={setRender} render={render} />
          </div>
        </div>
        <AnimatePresence initial={false}>{Render(render)}</AnimatePresence>
      </div>
    </motion.div>
  );
}

function Root() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center text-white col-span-10"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      Nothing here, click something
    </motion.div>
  );
}

function MyBio({ closeBio }) {
  return (
    <motion.div
      className="col-span-10 h-full flex  justify-center overflow-hidden flex-col"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      <div className="w-full">
        <div className="grid grid-cols-12 border-b border-[#101419]">
          <div className="lg:col-span-2 md:col-span-6 col-span-12  text-white py-2.5 relative px-4">
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => {
                closeBio("/");
              }}
            >
              <AiOutlineClose />
            </button>
            <p className="pr-5 truncate">personal.py</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-thin h-full">
        <SyntaxHighlighter
          language="python"
          style={atomOneDark}
          showLineNumbers
        >
          {`name: str = "arfy slowy"
hobbies: list = [
  "Coding",
  "Dota",
  "Film",
]

languages: list = [
  "Python",
  "C++",
  "C",
  "Assembly",
  "Rust",
  "Zig",
  "Golang"
]

currently_learning: dict = {
  "programming language": "nim",
  "other": ["quantum computing", "geospaital information system (GIS)"],
}

other: dict {
  "youtube": "youtube.com/@arfyslowy",
  "github": "slowy07",
  "wakatime": "@slowy07"
}

class Volunteering:
  def __init__(self, role: str) -> None:
      self.role = role
  
  def intel(self, start_year: int) -> str:
    return f"Volunteering on {start_year} and working as {self.role} for data flow facilicator for machine learning, "
            + "the project focudes to generate easy dataset, train and use machine learning models"

  def google_earth_community(self, start_year) -> str:
    return f"Volunteering on {start_year} and working as {self.role} for packackage interactive geospaital "
            + "analysis and visualization with Google Earth Engine"

  def microsoft(start_year: int) -> str:
    return f"Voluenteering on {start_year} and working as {self.role} for AI-oriented quantitative investment "
            + "of AI technologies in quantitative investment"  )

  def opengeos(start_year: int) -> str:
    return f"Volunteering on {start_year} and working as {self.role} for open-source geospatial software projects, "
            + "The projects are developed by a community of geospatial software developers and researchers"

if __name__ == "__main__":
  print(f"hello my name {name.capitalize()}")
  
  # not volunteer anymore
  intel_volunteers = Volunteering("Software Engineer").intel(2021)
  microsoft_volunteers = Volunteering("Software Engineer").intel(2023)
  
  # still volunteers
  google_earth_community_volunteers = Volunteering("Software engineer").google_earth_community(2021)
  opengeos_volunteers = Volunteering("Software engineer").opengeos(2024)
  
  # display it
  print(intel_volunteers)
  print(microsoft_volunteers)
  print(google_earth_community_volunteers)
  print(opengeos_volunteers)
            `}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
}

function Work({ closeWork }) {
  return (
    <motion.div
      className="col-span-10 h-full flex  justify-center overflow-hidden flex-col"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      <div className="w-full">
        <div className="grid grid-cols-12 border-b border-[#101419]">
          <div className="lg:col-span-2 md:col-span-6 col-span-12 text-white border-r border-[#101419] py-2.5 relative px-4">
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => {
                closeWork("/");
              }}
            >
              <AiOutlineClose />
            </button>
            <p className="pr-5 truncate">work.py</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-thin h-full">
        <SyntaxHighlighter
          language="python"
          style={atomOneDark}
          showLineNumbers
        >
          {`# work experience
def Google(start_year: int, role: str, end_year: int) -> str:
    return (
        f"start from {start_year} as {role} on google Brain, specially magenta, Tensorflow. "
        + f" in {end_year}, i made the difficult decision to leave Google and take a break "
        + "from the tech industry altogether. while I valued my time at Google and the "
        + "opportunities it provided, I recognized the importance of maintaining a healthy "
        + "work-life balance and taking time to recharge"
    )

print(Google(2021, "software engineer", 2023))

`}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
}

function Gear({ closeGear }) {
  function Content({ title, list }) {
    return (
      <div className="mb-10">
        <h1 className="text-2xl font-medium text-white mb-5">{title}</h1>
        <div className="pl-10">
          <ul className="list-disc text-white/80">
            {list.map((data, index) => {
              return (
                <div key={index}>
                  <li className="font-medium text-lg text-white/90">
                    {data.item}
                  </li>
                  <p className="mb-2.5">{data.desc}</p>
                  <div className="flex gap-2.5 mb-5">
                    {data.type?.map((data, index) => {
                      return (
                        <div
                          className="text-xs bg-[#101419] py-1 px-2 rounded-full flex items-center gap-1.5 w-max "
                          key={index}
                        >
                          <div className="w-1 h-1 rounded-full bg-white" />
                          <span>{data}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="col-span-10 h-full flex  justify-center overflow-hidden flex-col"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
    >
      <div className="w-full">
        <div className="grid grid-cols-12 border-b border-[#101419]">
          <div className="lg:col-span-3 md:col-span-6 col-span-12 text-white border-r border-[#101419] py-2.5 relative px-4">
            <button
              className="absolute top-1/2 -translate-y-1/2 right-4"
              onClick={() => closeGear("/")}
            >
              <AiOutlineClose />
            </button>
            <p>gear.md (preview)</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto scrollbar-thin h-full lg:p-16 md:p-8 p-4">
        {gearData.gearType.map((data, index) => {
          return <Content title={data.gear} key={index} list={data.gearList} />;
        })}
      </div>
    </motion.div>
  );
}

function PersonalInfo({ setRender, render }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenBio, setIsOpenBio] = useState(true);

  function openPopover() {
    setIsOpen(!isOpen);
  }

  function CollapseAll() {
    setIsOpenBio(false);
  }

  function openPopoverBio() {
    setIsOpenBio(!isOpenBio);
  }

  return (
    <Popover>
      <>
        <div className="relative">
          <Popover.Button
            className={`
                ${isOpen ? "text-white" : "text-white/50"}
               flex items-center gap-2.5 border-b border-[#101419] py-2.5 px-4 w-full`}
            onClick={openPopover}
          >
            <GoTriangleDown
              className={`${isOpen ? "" : "-rotate-90"} transition-all`}
            />
            <span className="text-left pr-5 truncate">personal info</span>
          </Popover.Button>
          <button
            onClick={CollapseAll}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          >
            <VscCollapseAll />
          </button>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-in duration-200"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-1"
        >
          <Popover.Panel className=" px-4 text-white py-4">
            <Popover.Group className={`flex flex-col gap-1.5`}>
              <Popover>
                <>
                  <Popover.Button
                    className={`
                ${isOpenBio ? "text-white" : "text-white/50"}
               flex items-center gap-2.5  w-full transition-colors`}
                    onClick={openPopoverBio}
                  >
                    <HiChevronRight
                      className={`${isOpenBio ? "rotate-90" : ""
                        } transition-all`}
                    />
                    <RiFolder3Fill
                      className={`${isOpenBio ? "text-[#E99287]" : "text-[#b36d64]"
                        } transition-colors`}
                    />
                    <span className="pr-5 truncate">bio</span>
                  </Popover.Button>

                  <Transition
                    show={isOpenBio}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-linear duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-1"
                    className="flex flex-col"
                  >
                    <Popover.Panel
                      className={`px-4 my-1 ml-2.5 inline-flex items-center gap-2.5 transition-colors ${render === "my-bio" ? "text-white" : "text-[#607B96]"
                        }`}
                      as="button"
                      onClick={() => setRender("my-bio")}
                    >
                      <IoLogoPython />
                      <span className="truncate">personal.py</span>
                    </Popover.Panel>
                    <Popover.Panel
                      className={`px-4 my-1 ml-2.5 inline-flex items-center gap-2.5 transition-colors ${render === "work" ? "text-white" : "text-[#607B96]"
                        }`}
                      as="button"
                      onClick={() => setRender("work")}
                    >
                      <IoLogoPython />
                      <span className="truncate">work.py</span>
                    </Popover.Panel>
                    <Popover.Panel
                      className={`px-4 my-1 ml-2.5 inline-flex items-center gap-2.5 transition-colors ${render === "gear" ? "text-white" : "text-[#607B96]"
                        }`}
                      as="button"
                      onClick={() => setRender("gear")}
                    >
                      <SiMarkdown />
                      <span className="truncate">gear.md</span>
                    </Popover.Panel>
                  </Transition>
                </>
              </Popover>
            </Popover.Group>
          </Popover.Panel>
        </Transition>
      </>
    </Popover>
  );
}

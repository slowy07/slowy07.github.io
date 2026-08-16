import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { GoTriangleDown } from "@react-icons/all-files/go/GoTriangleDown";
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";
import { VscCollapseAll } from "@react-icons/all-files/vsc/VscCollapseAll";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import gearData from "../data/GearData.json";
import { IoLogoPython } from "@react-icons/all-files/io5/IoLogoPython";
import { SiMarkdown } from "@react-icons/all-files/si/SiMarkdown";

type CloseFn = (v: string) => void;

const pageMotion = {
  initial: { x: -40, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 40, opacity: 0 },
};

const FILES = [
  { id: "my-bio", file: "personal.py", icon: <IoLogoPython /> },
  { id: "work", file: "work.py", icon: <IoLogoPython /> },
  { id: "gear", file: "gear.md", icon: <SiMarkdown /> },
];

export default function AboutMe() {
  const [render, setRender] = useState("my-bio");

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="lg:grid grid-cols-12 h-full flex flex-col gap-3 lg:gap-0 p-3 lg:p-4">
        <div className="lg:col-span-3 lg:pr-4">
          <PersonalInfo setRender={setRender} render={render} />
        </div>
        <div className="lg:col-span-9 h-full min-h-0">
          <AnimatePresence initial={false} mode="wait">
            {render === "my-bio" && <MyBio closeBio={setRender} />}
            {render === "work" && <Work closeWork={setRender} />}
            {render === "gear" && <Gear closeGear={setRender} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function FileWindow({
  title,
  close,
  children,
}: {
  title: string;
  close: CloseFn;
  children: React.ReactNode;
}) {
  return (
    <motion.div className="h-full flex flex-col" {...pageMotion}>
      <div className="sys-head px-3 py-1.5 flex items-center justify-between">
        <span className="text-net-ink">
          FILE: {title} <span className="text-net-gray">[VIEW]</span>
        </span>
        <button
          className="btn-retro px-2 py-0.5 text-[10px]"
          onClick={() => close("/")}
          aria-label={`Close ${title}`}
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="well flex-1 overflow-y-auto scrollbar-thin min-h-0 mono-code">
        {children}
      </div>
    </motion.div>
  );
}

function MyBio({ closeBio }: { closeBio: CloseFn }) {
  return (
    <FileWindow title="personal.py" close={closeBio}>
      <SyntaxHighlighter
        language="python"
        style={atomOneDark}
        showLineNumbers
        customStyle={{ background: "transparent", margin: 0, fontSize: "0.8rem" }}
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
    </FileWindow>
  );
}

function Work({ closeWork }: { closeWork: CloseFn }) {
  return (
    <FileWindow title="work.py" close={closeWork}>
      <SyntaxHighlighter
        language="python"
        style={atomOneDark}
        showLineNumbers
        customStyle={{ background: "transparent", margin: 0, fontSize: "0.8rem" }}
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
    </FileWindow>
  );
}

type GearItem = { item: string; desc: string; type?: string[] };
type GearType = { gear: string; gearList: GearItem[] };

function Gear({ closeGear }: { closeGear: CloseFn }) {
  return (
    <FileWindow title="gear.md" close={closeGear}>
      <div className="p-4 md:p-6 space-y-8 text-sm">
        {(gearData as { gearType: GearType[] }).gearType.map((data) => (
          <section key={data.gear}>
            <h1 className="text-net-gray font-semibold tracking-wider uppercase mb-3">
              {data.gear}
            </h1>
            <div className="space-y-3">
              {data.gearList.map((item, index) => (
                <div key={index} className="border border-net-line p-3">
                  <p className="text-net-ink font-semibold">{item.item}</p>
                  <p className="text-net-gray text-xs mt-1">{item.desc}</p>
                  {item.type && (
                    <p className="text-net-gray text-xs mt-1">
                      TAGS: [{item.type.join("][")}]
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </FileWindow>
  );
}

function PersonalInfo({
  setRender,
  render,
}: {
  setRender: (v: string) => void;
  render: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenBio, setIsOpenBio] = useState(true);

  return (
    <div className="sys-panel h-full">
      <div className="sys-head px-3 py-1.5 flex items-center justify-between">
        <span>DIRECTORY</span>
        <button
          onClick={() => setIsOpenBio(false)}
          className="text-net-gray hover:text-net-ink"
          aria-label="Collapse all"
        >
          <VscCollapseAll />
        </button>
      </div>

      <div className="p-3 text-xs space-y-1">
        <button
          className={`flex items-center gap-2 w-full ${isOpen ? "text-net-ink" : "text-net-gray"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <GoTriangleDown
            className={`${isOpen ? "" : "-rotate-90"} transition-all`}
          />
          personal info
        </button>

        {isOpen && (
          <div className="pl-5 pt-1 space-y-1">
            <button
              className={`flex items-center gap-2 w-full ${isOpenBio ? "text-net-ink" : "text-net-gray"}`}
              onClick={() => setIsOpenBio(!isOpenBio)}
            >
              <HiChevronRight
                className={`${isOpenBio ? "rotate-90" : ""} transition-all`}
              />
              bio/
            </button>
            {isOpenBio &&
              FILES.map((f) => (
                <button
                  key={f.id}
                  className={`flex items-center gap-2 pl-5 w-full ${
                    render === f.id
                      ? "text-net-paper font-semibold glow"
                      : "text-net-gray hover:text-net-ink"
                  }`}
                  onClick={() => setRender(f.id)}
                >
                  {f.icon}
                  <span>{f.file}</span>
                </button>
              ))}
          </div>
        )}

        <div className="border-t border-net-line pt-2 mt-3 text-net-gray space-y-1">
          <p>MEM: 64K</p>
          <p>NODE: 07</p>
          <p>NET_STATUS: ONLINE</p>
        </div>
      </div>
    </div>
  );
}

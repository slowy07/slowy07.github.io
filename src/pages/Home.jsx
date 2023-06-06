/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <motion.div
      className="w-full h-full bg-radial bg-no-repeat bg-right"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="flex items-center justify-center h-full max-w-7xl mx-auto">
        <div className="lg:w-1/2 w-full mx-10 lg:ml-10 flex flex-col justify-between h-[80%] lg:h-auto">
          <div className="mb-20">
            <p className="text-white text-lg">Wello, i am</p>
            <h1 className="text-white lg:text-6xl md:text-5xl text-5xl">
              Arfy Slowy
            </h1>

            <h2 className=" text-[#E99287] lg:text-3xl md:text-2xl text-xl flex items-center gap-3">
              <span className="animate-pulse">&#62;</span>
              <Typewriter
                options={{
                  loop: true,
                  wrapperClassName:
                    " text-[#E99287] lg:text-2xl md:text-2xl text-xl gap-3",
                  cursorClassName:
                    " text-[#E99287] lg:text-2xl md:text-2xl text-xl gap-3",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`print("Software Engineer")`)
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString(`Love about quantum computing`)
                    .pauseFor(500)
                    .deleteAll()
                    .typeString(`AI Researcher`)
                    .start();
                }}
              />
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="text-[#607B96]">
              # you can also see it on my Github page
            </p>
            <p>
              <span className="text-[#4D5BCE]">github_link</span>{" "}
              <span className="text-white">:</span>{" "}
              <span className="text-[#E99287]">str</span>{" "}
              <span className="text-white">=</span>{" "}
              <a
                href="https://github.com/slowy07"
                className="text-[#E99287]"
                target="_blank"
                rel="noreferrer"
              >
                "https://github.com/slowy07"
              </a>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

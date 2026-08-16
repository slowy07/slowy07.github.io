import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center p-4 md:p-8"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="sys-panel w-full max-w-3xl">
        <div className="sys-head px-3 py-1 flex items-center justify-between">
          <span>USER PROFILE</span>
          <span>SYS_01 · NET_STATUS: ONLINE</span>
        </div>

        <div className="p-5 md:p-8 space-y-5 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative w-28 h-28 shrink-0 border border-net-line group">
              <img
                src="foto_profile.png"
                alt="Portrait of Arfy Slowy"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:invert transition-[filter] duration-200"
              />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.25)_0_1px,transparent_1px_3px)] pointer-events-none" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl text-net-ink glow font-bold">
                ARFY SLOWY
              </h1>
              <p className="text-net-gray text-lg md:text-xl mt-1">
                ─────────────────────────────────
              </p>
              <p className="text-net-ink text-lg md:text-xl mt-1">
                SOFTWARE ENGINEER
              </p>
            </div>
          </div>

          <div className="well p-3 space-y-1 text-net-gray text-xs md:text-sm">
            <p>
              <span className="text-net-ink">USER ID</span> : SLOWY_001
            </p>
            <p>
              <span className="text-net-ink">STATUS</span> : ONLINE
            </p>
            <p>
              <span className="text-net-ink">DOMAIN</span> : SOFTWARE / DESIGN
            </p>
          </div>

          <div className="text-net-ink glow">
            <span className="text-net-gray">&gt; </span>
            <Typewriter
              options={{
                loop: true,
                wrapperClassName: "text-net-ink",
                cursorClassName: "text-net-ink cursor-blink",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(`print("Software Engineer")`)
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(`print("Love about quantum computing")`)
                  .pauseFor(500)
                  .deleteAll()
                  .typeString(`print("AI Researcher")`)
                  .start();
              }}
            />
          </div>

          <div className="well p-3 text-xs md:text-sm">
            <p className="text-net-gray mb-1">
              # you can also see it on my Github page
            </p>
            <p className="text-net-ink">
              <span className="text-net-gray"># &gt;</span> github_link
              <span className="text-net-gray"> = </span>
              <a
                href="https://github.com/slowy07"
                className="underline decoration-dotted hover:decoration-solid hover:text-net-paper"
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

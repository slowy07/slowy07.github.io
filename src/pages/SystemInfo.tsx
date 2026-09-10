import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SystemInfo() {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/system-info.txt")
      .then((r) => r.text())
      .then((t) => {
        setInfo(t);
        setLoading(false);
      })
      .catch(() => {
        setInfo("UNABLE TO FETCH SYSTEM INFO");
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="h-full flex flex-col p-3 lg:p-4">
        <div className="flex flex-col h-full max-w-2xl mx-auto w-full rounded-md overflow-hidden border border-[#223028] bg-[#101619] shadow-lg">
          {/* editor bar, same chrome as the sorting TUI */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#12181b] border-b border-[#223028]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4a3030]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4a4530]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2f4a38]" />
            <span className="ml-2 text-xs text-[#5c7570]">rxfetch</span>
          </div>

          {/* ascii output */}
          <div className="flex-1 overflow-y-auto min-h-0 p-4 md:p-6 scrollbar-thin">
            {loading ? (
              <p className="text-[#5c7570] text-xs animate-pulse">
                FETCHING<span className="cursor-blink">█</span>
              </p>
            ) : (
              <pre className="text-[#8ccf7e] text-xs md:text-sm leading-relaxed whitespace-pre">
                {info}
              </pre>
            )}
          </div>

          {/* branded footer */}
          <div className="px-5 py-4 border-t border-[#223028] text-center">
            <div className="text-sm font-semibold tracking-widest uppercase text-[#8ccf7e] glow">
              sysinfo
            </div>
            <div className="mt-1 text-xs text-[#5c7570]">
              youtube.com/@arfyslowy
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

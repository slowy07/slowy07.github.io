import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const N = 10;
const ROWS = 10;

/* 1-indexed lines; activeLine state points here */
const CODE = [
  "def bubble_sort(arr):",
  "    n = len(arr)",
  "    for i in range(n):",
  "        for j in range(n-i-1):",
  "            if arr[j] > arr[j+1]:",
  "                arr[j], arr[j+1] = arr[j+1], arr[j]  # swap",
  "    return arr",
];

type Step =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "uncompare" }
  | { type: "sorted"; i: number };

function randomArray(): number[] {
  return Array.from({ length: N }, () => Math.floor(Math.random() * 90) + 10);
}

/* mutates `a` in place; render from copies */
function* bubbleSortSteps(a: number[]): Generator<Step> {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: "compare", i: j, j: j + 1 };
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        yield { type: "swap", i: j, j: j + 1 };
      }
      yield { type: "uncompare" };
    }
    yield { type: "sorted", i: n - i - 1 };
  }
}

/* step type -> CODE line index */
const LINE_OF: Record<Step["type"], number> = {
  compare: 4,
  swap: 5,
  uncompare: 3,
  sorted: 2,
};

export default function Sorting() {
  const arrRef = useRef<number[]>(randomArray());
  const [snap, setSnap] = useState(() => ({
    arr: [...arrRef.current],
    done: Array<boolean>(N).fill(false),
    hi: [-1, -1],
  }));
  const [activeLine, setActiveLine] = useState(0);
  const [comp, setComp] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [status, setStatus] = useState("Ready");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);

  const genRef = useRef<Generator<Step> | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const delay = () => Math.max(620 - speedRef.current * 100, 80);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function finish() {
    setPlaying(false);
    setStatus("Sorted");
    setActiveLine(6);
    setSnap((s) => ({
      ...s,
      done: s.done.map(() => true),
      hi: [-1, -1],
      arr: [...arrRef.current],
    }));
  }

  function runStep() {
    const g = genRef.current;
    if (!g) return;
    const { value, done } = g.next();
    if (done) {
      finish();
      return;
    }
    setActiveLine(LINE_OF[value.type]);
    if (value.type === "compare") {
      setComp((c) => c + 1);
      setSnap((s) => ({ ...s, arr: [...arrRef.current], hi: [value.i, value.j] }));
    } else if (value.type === "swap") {
      setSwaps((w) => w + 1);
      setSnap((s) => ({ ...s, arr: [...arrRef.current], hi: [value.i, value.j] }));
    } else if (value.type === "uncompare") {
      setSnap((s) => ({ ...s, hi: [-1, -1] }));
    } else {
      setSnap((s) => {
        const d = [...s.done];
        d[value.i] = true;
        return { ...s, done: d, hi: [-1, -1] };
      });
    }
    timerRef.current = window.setTimeout(runStep, delay());
  }

  function toggle() {
    if (playing) {
      window.clearTimeout(timerRef.current);
      setPlaying(false);
      setStatus("Paused");
      return;
    }
    if (!genRef.current) genRef.current = bubbleSortSteps(arrRef.current);
    setPlaying(true);
    setStatus("Sorting…");
    runStep();
  }

  function reset() {
    window.clearTimeout(timerRef.current);
    genRef.current = null;
    setPlaying(false);
    setComp(0);
    setSwaps(0);
    setStatus("Ready");
    setActiveLine(0);
    arrRef.current = randomArray();
    setSnap({
      arr: [...arrRef.current],
      done: Array(N).fill(false),
      hi: [-1, -1],
    });
  }

  const btn =
    "border border-[#5a9950] text-[#8ccf7e] uppercase text-xs px-3 py-1.5 rounded-sm hover:bg-[#8ccf7e]/10 hover:border-[#8ccf7e] transition-colors";

  return (
    <motion.div
      className="w-full h-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <div className="h-full flex flex-col p-3 lg:p-4 overflow-y-auto scrollbar-thin">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
          {/* topbar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-[#8ccf7e] uppercase tracking-widest text-sm font-semibold">
              Bubble Sort
            </span>
            <div className="flex items-center gap-3 flex-wrap">
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[#5c7570]">
                Speed
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="accent-[#8ccf7e] w-24"
                />
              </label>
              <button className={btn} onClick={reset}>
                Shuffle
              </button>
              <button className={btn} onClick={toggle}>
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          </div>

          {/* ascii stage */}
          <div className="rounded-md border border-[#223028] bg-[#182126] p-4">
            <pre
              aria-hidden="true"
              className="m-0 p-1 font-mono text-xs md:text-sm leading-tight whitespace-pre overflow-x-auto"
            >
              {Array.from({ length: ROWS }, (_, k) => ROWS - k).map((r) => (
                <span key={r} className="block">
                  {snap.arr.map((v, i) => {
                    const color = snap.hi.includes(i)
                      ? "text-[#cf9a5a]"
                      : snap.done[i]
                        ? "text-[#8ccf7e]"
                        : "text-[#5a9950]";
                    return (
                      <b key={i} className={`font-normal ${color}`}>
                        {Math.round(v / 10) >= r ? "██ " : "   "}
                      </b>
                    );
                  })}
                </span>
              ))}
              {`└${"─".repeat(N * 3 - 2)}┘`}
            </pre>

            <div className="mt-3 pt-3 border-t border-[#223028] flex justify-between items-center flex-wrap gap-2 text-xs text-[#5c7570]">
              <span>
                Comparisons{" "}
                <b className="text-[#8ccf7e] font-semibold">{comp}</b>
              </span>
              <span>
                Swaps <b className="text-[#8ccf7e] font-semibold">{swaps}</b>
              </span>
              <span>{status}</span>
            </div>
          </div>

          {/* synced code panel */}
          <div className="rounded-md border border-[#223028] bg-[#101619] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#12181b] border-b border-[#223028]">
              <span className="w-2 h-2 rounded-full bg-[#4a3030]" />
              <span className="w-2 h-2 rounded-full bg-[#4a4530]" />
              <span className="w-2 h-2 rounded-full bg-[#2f4a38]" />
              <span className="ml-2 text-[11px] text-[#5c7570]">
                bubble_sort.py
              </span>
            </div>
            <pre className="m-0 py-2 font-mono text-xs md:text-[13px] leading-relaxed whitespace-pre overflow-x-auto">
              {CODE.map((src, idx) => (
                <span
                  key={idx}
                  className={`block px-4 ${
                    idx === activeLine
                      ? "bg-[#8ccf7e]/10 shadow-[inset_3px_0_0_#8ccf7e]"
                      : ""
                  }`}
                >
                  <span className="inline-block w-6 mr-3 text-right select-none text-[#3a4a45]">
                    {idx + 1}
                  </span>
                  {src}
                </span>
              ))}
            </pre>
            <div className="px-5 py-4 border-t border-[#223028] text-center">
              <div className="text-sm font-semibold tracking-widest uppercase text-[#8ccf7e] glow">
                sorting visualizer
              </div>
              <div className="mt-1 text-xs text-[#5c7570]">
                youtube.com/@arfyslowy
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

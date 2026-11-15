import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SECTIONS, type SectionId, type SectionMeta } from "../data/portfolio";
import { MonitorContent } from "./screens";

/* ------------------------------------------------------------- primitives */

export function Screws() {
  return (
    <span className="screws" aria-hidden="true">
      <i className="screw tl" />
      <i className="screw tr" />
      <i className="screw bl" />
      <i className="screw br" />
    </span>
  );
}

export type Tone = "green" | "cyan" | "amber" | "red";

export function Led({
  tone = "green",
  on = true,
  pulse = false,
}: {
  tone?: Tone;
  on?: boolean;
  pulse?: boolean;
}) {
  return (
    <i
      className={`led ${on ? "is-on" : ""} ${pulse ? "pulse" : ""}`}
      data-tone={tone}
      aria-hidden="true"
    />
  );
}

export function StatusIndicator({
  tone = "green",
  on = true,
  pulse = false,
  label,
}: {
  tone?: Tone;
  on?: boolean;
  pulse?: boolean;
  label?: string;
}) {
  return (
    <span className="status-ind">
      <Led tone={tone} on={on} pulse={pulse} />
      {label ? <span className="status-label">{label}</span> : null}
    </span>
  );
}

const pad = (value: number) => String(value).padStart(2, "0");

export function SystemClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(now)
    .toUpperCase();

  return (
    <div className="hcell clock-cell">
      <span className="hlabel">LOCAL TIME</span>
      <span className="hvalue time-value">
        {pad(now.getHours())}:{pad(now.getMinutes())}:
        {pad(now.getSeconds())}
      </span>
      <span className="hsub">{date}</span>
    </div>
  );
}

export function SessionUptime() {
  const start = useRef(Date.now());
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setSeconds(Math.floor((Date.now() - start.current) / 1000)),
      1000
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="tabular">
      {pad(Math.floor(seconds / 3600))}:{pad(Math.floor((seconds % 3600) / 60))}:
      {pad(seconds % 60)}
    </span>
  );
}

/* ------------------------------------------------------------------ header */

export function CockpitHeader({ active }: { active: SectionMeta }) {
  return (
    <header className="panel cockpit-header">
      <Screws />
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          S07
        </span>
        <div className="brand-text">
          <p className="brand-name">SLOWY</p>
          <p className="brand-sub">FLIGHT CONTROL SYSTEM</p>
        </div>
      </div>

      <div className="header-cells">
        <div className="hcell">
          <StatusIndicator tone="green" pulse label="SYSTEM ONLINE" />
        </div>
        <div className="hcell">
          <span className="hlabel">ACTIVE</span>
          <span className="hvalue">
            {active.code} {active.label}
          </span>
        </div>
        <SystemClock />
        <div className="hcell hide-sm">
          <span className="hlabel">SERIAL</span>
          <span className="hvalue">FCS-07-01</span>
        </div>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- instrument */

export function InstrumentPanel({
  title,
  code,
  span = false,
  children,
}: {
  title: string;
  code: string;
  span?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`panel instrument ${span ? "span-2" : ""}`}>
      <Screws />
      <header className="instrument-head">
        <span>{title}</span>
        <span className="dim">{code}</span>
      </header>
      <div className="instrument-body">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------- rotary knob */

let audio: AudioContext | null = null;

/* short filtered noise burst = mechanical detent click */
function detentClick() {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return;

  audio ??= new Ctx();
  if (audio.state === "suspended") void audio.resume();

  const rate = audio.sampleRate;
  const frames = Math.floor(rate * 0.018);
  const buffer = audio.createBuffer(1, frames, rate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frames) ** 3;
  }

  const source = audio.createBufferSource();
  source.buffer = buffer;

  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2200;
  filter.Q.value = 1.4;

  const gain = audio.createGain();
  gain.gain.value = 0.16;

  source.connect(filter).connect(gain).connect(audio.destination);
  source.start();
}

export function RotaryKnob({
  active,
  onSelect,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  const index = Math.max(
    0,
    SECTIONS.findIndex((section) => section.id === active)
  );
  const knob = useRef<HTMLButtonElement>(null);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const lastWheel = useRef(0);

  const step = (direction: number) => {
    detentClick();
    const next =
      (index + direction + SECTIONS.length) % SECTIONS.length;
    onSelect(SECTIONS[next].id);
  };

  useEffect(() => {
    const element = knob.current;
    if (!element) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 140) return;
      const delta = event.deltaY || event.deltaX;
      if (Math.abs(delta) < 2) return;
      lastWheel.current = now;
      step(delta > 0 ? 1 : -1);
    };

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  });

  return (
    <div className="knob-module">
      <span className="panel-label">ROTARY</span>
      <button
        ref={knob}
        type="button"
        className="knob-btn"
        aria-label={`Rotary selector — ${SECTIONS[index].code} ${SECTIONS[index].label}. Click, scroll or drag to change section.`}
        onPointerDown={(event) => {
          dragStart.current = event.clientX;
          dragged.current = false;
          event.currentTarget.setPointerCapture?.(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragStart.current === null) return;
          const delta = event.clientX - dragStart.current;
          if (Math.abs(delta) > 26) {
            dragged.current = true;
            step(delta > 0 ? 1 : -1);
            dragStart.current = event.clientX;
          }
        }}
        onPointerUp={() => {
          dragStart.current = null;
        }}
        onPointerCancel={() => {
          dragStart.current = null;
        }}
        onClick={() => {
          if (dragged.current) {
            dragged.current = false;
            return;
          }
          step(1);
        }}
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="#0d0b08"
            stroke="#8a7a4a"
            strokeWidth="1"
          />
          {Array.from({ length: 30 }, (_, knurl) => (
            <line
              key={`knurl-${knurl}`}
              x1="50"
              y1="3"
              x2="50"
              y2="6"
              stroke="#8a7a4a"
              strokeWidth="1"
              opacity="0.6"
              transform={`rotate(${knurl * 12} 50 50)`}
            />
          ))}

          {SECTIONS.map((section, tick) => (
            <line
              key={`tick-${section.id}`}
              x1="50"
              y1="7"
              x2="50"
              y2={tick === index ? "13" : "11"}
              stroke={tick === index ? "#e8d27a" : "#8a7a4a"}
              strokeWidth={tick === index ? 2 : 1}
              transform={`rotate(${tick * 72} 50 50)`}
            />
          ))}
          {SECTIONS.map((section, tick) => {
            const angle = ((tick * 72 - 90) * Math.PI) / 180;
            return (
              <text
                key={`num-${section.id}`}
                x={50 + Math.cos(angle) * 33}
                y={50 + Math.sin(angle) * 33 + 2.2}
                textAnchor="middle"
                fontSize="7"
                fill={tick === index ? "#e8d27a" : "#8a7a4a"}
              >
                {tick + 1}
              </text>
            );
          })}

          <circle
            cx="50"
            cy="50"
            r="27"
            fill="#14110d"
            stroke="#8a7a4a"
            strokeWidth="1.5"
          />
          {Array.from({ length: 24 }, (_, grip) => (
            <line
              key={`grip-${grip}`}
              x1="50"
              y1="23"
              x2="50"
              y2="26"
              stroke="#8a7a4a"
              strokeWidth="1"
              opacity="0.5"
              transform={`rotate(${grip * 15} 50 50)`}
            />
          ))}
          <circle
            cx="50"
            cy="50"
            r="21"
            fill="none"
            stroke="#8a7a4a"
            strokeWidth="0.75"
            opacity="0.65"
          />

          <g
            className="knob-notch"
            style={{
              transform: `rotate(${index * 72}deg)`,
              transformOrigin: "50px 50px",
            }}
          >
            <path d="M47 44L48.2 26H51.8L53 44Z" fill="#e8d27a" />
          </g>

          <circle
            cx="50"
            cy="50"
            r="6.5"
            fill="#e8d27a"
            stroke="#8a7a4a"
            strokeWidth="1"
          />
          <circle cx="50" cy="50" r="2.2" fill="#0d0b08" />
        </svg>
      </button>
      <span className="knob-readout">{SECTIONS[index].code} / 05</span>
    </div>
  );
}

/* ------------------------------------------------------------ section keys */

export function SectionKeys({
  active,
  onSelect,
}: {
  active: SectionId;
  onSelect: (id: SectionId) => void;
}) {
  return (
    <div className="section-keys" role="group" aria-label="Section select keyboard">
      {SECTIONS.map((section) => {
        const isActive = section.id === active;
        return (
          <button
            key={section.id}
            type="button"
            className={`sec-key ${isActive ? "is-active" : ""}`}
            aria-pressed={isActive}
            aria-label={`${section.code} ${section.label} — ${section.sub}`}
            onClick={() => onSelect(section.id)}
          >
            <span className="sec-key-led">
              <Led tone="green" on={isActive} />
            </span>
            <span className="sec-key-num">{section.code}</span>
            <span className="sec-key-label">{section.label}</span>
            <span className="sec-key-sub">{section.sub}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------- function panel */

export function FunctionPanel({
  soundOn,
  onToggleSound,
  onReboot,
  onPing,
}: {
  soundOn: boolean;
  onToggleSound: () => void;
  onReboot: () => void;
  onPing: (label: string) => void;
}) {
  return (
    <section className="panel fn-panel" aria-label="Function controls">
      <Screws />
      <div className="panel-title-row">
        <span className="panel-label">FUNCTION</span>
        <span className="dim">AUX-07</span>
      </div>
      <div className="fn-grid">
        <button
          type="button"
          className="fn-key"
          aria-pressed={soundOn}
          onClick={onToggleSound}
        >
          SOUND {soundOn ? "ON" : "OFF"}
        </button>
        <button type="button" className="fn-key" onClick={onReboot}>
          REBOOT
        </button>
        <button
          type="button"
          className="fn-key"
          onClick={() => onPing("MANUAL SCAN")}
        >
          SCAN
        </button>
        <button
          type="button"
          className="fn-key"
          onClick={() => onPing("SYSTEM CHECK")}
        >
          CHECK
        </button>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- monitor */

const BOOT_LOG: Array<[time: string, text: string, ok?: boolean]> = [
  ["0.000000", "INITIALIZING..."],
  ["0.000052", "fw: SLOWY FCS 2.0 · POST OK", true],
  ["0.000121", "platform: EndeavourOS · cachyos"],
  ["0.000188", "cpu: Intel Xeon W-11955M", true],
  ["0.000243", "mem: 64GB ECC online", true],
  ["0.000312", "pci 01:00.0: NVIDIA RTX A5000", true],
  ["0.000389", "nvme0: 2TB NVMe · / mounted", true],
  ["0.000451", "input: Ajazz AK820 V2 Pro"],
  ["0.000509", "input: Xtrfy M4 Wireless"],
  ["0.000566", "drm: Xiaomi G34WQI linked", true],
  ["0.000623", "acpi: thermal zones nominal", true],
  ["0.000684", "systemd: reached basic.target", true],
  ["0.000742", "systemd: started journald", true],
  ["0.000801", "dbus: session bus ready", true],
  ["0.000866", "udev: devices enumerated", true],
  ["0.000924", "network: cockpit link up", true],
  ["0.000987", "nav: 5 sections registered", true],
  ["0.001048", "bspwm: display server ready", true],
  ["0.001104", "audio: click bus idle"],
  ["0.001166", "crt: scanline generator 60 Hz", true],
  ["0.001227", "crt: phosphor warm-up 98%"],
  ["0.001288", "fs: portfolio manifest read", true],
  ["0.001349", "telemetry: simulated feed ready"],
  ["0.001410", "hwmon: fan curve auto", true],
  ["0.001470", "LINK ESTABLISHED..."],
  ["0.001528", "CONNECTED !"],
];

const BOOT_STEP_MS = 60;

function BootScreen({ step }: { step: number }) {
  const lines = BOOT_LOG.slice(0, step + 1).slice(-20);

  return (
    <div className="boot-screen">
      <p className="boot-kicker">SLOWY FLIGHT CONTROL / BOOT LOG</p>
      <div className="boot-log" aria-live="polite">
        {lines.map(([time, text, ok], index) => {
          const current = index === lines.length - 1;
          return (
            <p key={time} className={`boot-line ${current ? "is-current" : ""}`}>
              <span className="boot-time">[{time}]</span> {text}
              {ok ? <span className="boot-ok">[ OK ]</span> : null}
              {current ? <span className="block-cursor" /> : null}
            </p>
          );
        })}
      </div>
      <p className="boot-foot">FCS 2.0 · 5 CHANNELS · CRT READY</p>
    </div>
  );
}

export function MainMonitor({
  active,
  bootKey,
  note,
  noteId,
}: {
  active: SectionMeta;
  bootKey: number;
  note: string;
  noteId: number;
}) {
  const reduceMotion = useReducedMotion();
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [phase, setPhase] = useState<"on" | "off" | "wipe">("on");
  const [contentKey, setContentKey] = useState(0);
  const firstRun = useRef(true);

  useEffect(() => {
    if (reduceMotion) {
      setBooting(false);
      return;
    }

    setBooting(true);
    setBootStep(0);
    setPhase("on");
    const stream = window.setInterval(() => {
      setBootStep((step) => Math.min(step + 1, BOOT_LOG.length - 1));
    }, BOOT_STEP_MS);
    const settled = window.setTimeout(() => {
      window.clearInterval(stream);
      setBooting(false);
      setContentKey((key) => key + 1);
    }, BOOT_LOG.length * BOOT_STEP_MS + 650);

    return () => {
      window.clearInterval(stream);
      window.clearTimeout(settled);
    };
  }, [bootKey, reduceMotion]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (reduceMotion) {
      setPhase("on");
      setContentKey((key) => key + 1);
      return;
    }

    setPhase("off");
    const wipe = window.setTimeout(() => setPhase("wipe"), 160);
    const live = window.setTimeout(() => {
      setPhase("on");
      setContentKey((key) => key + 1);
    }, 430);

    return () => {
      window.clearTimeout(wipe);
      window.clearTimeout(live);
    };
  }, [active.id, reduceMotion]);

  return (
    <section className="panel monitor-panel" aria-label="Main monitor">
      <Screws />
      <div className="monitor-head">
        <span>
          MFD-01 <span className="dim">MULTIFUNCTION DISPLAY</span>
        </span>
        <span className="dim monitor-head-right">LINK STABLE · 60 HZ</span>
      </div>

      <div className="mfd-bezel">
        <div className={`mfd-screen crt ${phase === "off" ? "is-off" : ""}`}>
          <div className="screen-topbar">
            <span>
              SEC {active.code} <span className="dim">/</span>{" "}
              <span className="screen-accent">{active.label}</span>
            </span>
            <span className="screen-topbar-right">
              <StatusIndicator tone="cyan" pulse label="LIVE" />
              <span className="dim">PAGE {active.code} / 05</span>
            </span>
          </div>

          <div
            className="screen-body"
            tabIndex={0}
            role="region"
            aria-label={`${active.label} content`}
          >
            {booting ? (
              <BootScreen step={bootStep} />
            ) : phase === "off" ? (
              <p className="screen-standby">SIGNAL LOST</p>
            ) : (
              <div key={contentKey} className="screen-inner">
                <MonitorContent section={active.id} />
              </div>
            )}
            {phase === "wipe" && !booting ? (
              <span className="scan-wipe" aria-hidden="true" />
            ) : null}
          </div>

          <div className="screen-bottombar">
            <span>1–5 DIRECT</span>
            <span key={noteId} className="screen-ticker" aria-live="polite">
              SYSTEM OK · {note}
            </span>
            <span className="dim">{active.code}/05</span>
          </div>
        </div>
      </div>

      <div className="monitor-foot">
        <span>PWR 28V DC</span>
        <span className="dim">MFD-01 · DO NOT OBSTRUCT</span>
      </div>
    </section>
  );
}

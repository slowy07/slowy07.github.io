import { useEffect, useRef, useState } from "react";
import {
  PROFILE,
  PROJECTS,
  PROJECT_STACKS,
  SECTIONS,
  SKILL_GROUPS,
  type SectionId,
} from "../data/portfolio";
import {
  CockpitHeader,
  FunctionPanel,
  InstrumentPanel,
  MainMonitor,
  RotaryKnob,
  SectionKeys,
  SessionUptime,
  StatusIndicator,
  type Tone,
} from "./parts";
import SatelliteTracking from "./satellite";

const NOTES = [
  "ALL SYSTEMS NOMINAL",
  "NAV BUS STABLE",
  "CORE TEMP NOMINAL",
  "LINK QUALITY 98 PERCENT",
  "MEMORY CHECK PASSED",
  "ORBIT LOCK ACQUIRED",
  "SCAN COMPLETE — NO FAULTS",
  "GO FLIGHT",
];

function DataRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <div className="data-row">
      <span className="data-label">{label}</span>
      <span className={`data-value ${tone ? `tone-${tone}` : ""}`}>
        {value}
      </span>
    </div>
  );
}

function Counter({
  value,
  label,
  tone = "amber",
}: {
  value: number | string;
  label: string;
  tone?: Tone;
}) {
  return (
    <div className="counter">
      <span className={`counter-value tone-${tone}`}>{value}</span>
      <span className="counter-label">{label}</span>
    </div>
  );
}

function randomThrust() {
  return {
    t1: 64 + Math.round(Math.random() * 34),
    t2: 64 + Math.round(Math.random() * 34),
    vector: (Math.random() * 1.6 - 0.8).toFixed(1),
    feed: (10 + Math.random() * 6).toFixed(1),
  };
}

function ThrusterTelemetry() {
  const [thrust, setThrust] = useState(randomThrust);

  useEffect(() => {
    const timer = window.setInterval(() => setThrust(randomThrust()), 2200);
    return () => window.clearInterval(timer);
  }, []);

  const vector = Number(thrust.vector);

  return (
    <div className="thruster">
      {[
        ["T1", thrust.t1],
        ["T2", thrust.t2],
      ].map(([label, value]) => (
        <div key={label} className="thruster-gauge">
          <div className="data-row">
            <span className="data-label">{label} THRUST</span>
            <span className="data-value tone-cyan">{value}%</span>
          </div>
          <div className="thruster-bar">
            <span style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
      <DataRow
        label="VECTOR"
        value={`${vector > 0 ? "+" : ""}${vector === 0 ? "0.0" : thrust.vector}°`}
      />
      <DataRow label="FEED" value={`${thrust.feed} KG/S`} tone="amber" />
      <p className="inst-note">SIMULATED TELEMETRY · DECORATIVE</p>
    </div>
  );
}

export default function CockpitDashboard({
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
  const meta = SECTIONS[index];
  const bearing = String((index + 1) * 72).padStart(3, "0");
  const publicProjects = PROJECTS.filter(
    (project) => project.visibleProject.toLowerCase() === "public"
  ).length;
  const languages =
    SKILL_GROUPS.find((group) => group.id === "languages")?.items.length ?? 0;
  const environment =
    SKILL_GROUPS.find((group) => group.id === "environment")?.items.length ??
    0;

  const [soundOn, setSoundOn] = useState(false);
  const [bootKey, setBootKey] = useState(0);
  const [note, setNote] = useState("READY");
  const [noteId, setNoteId] = useState(0);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      void audio.current?.close();
    };
  }, []);

  const playClick = () => {
    if (!soundOn) return;
    try {
      const Context =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Context) return;
      const ctx = audio.current ?? new Context();
      audio.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 1180;
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      /* audio is optional */
    }
  };

  const ping = (label?: string) => {
    const line = NOTES[Math.floor(Math.random() * NOTES.length)];
    setNote(label ? `${label} · ${line}` : line);
    setNoteId((id) => id + 1);
    playClick();
  };

  const select = (id: SectionId) => {
    playClick();
    onSelect(id);
  };

  return (
    <div className="cockpit">
      <div className="vents" aria-hidden="true" />
      <CockpitHeader active={meta} />

      <div className="main-grid">
        <div className="monitor-unit">
          <MainMonitor
            active={meta}
            bootKey={bootKey}
            note={note}
            noteId={noteId}
          />

          <div className="panel control-strip">
            <RotaryKnob active={active} onSelect={select} />
            <div className="section-key-block">
              <div className="section-key-head">
                <span>SECTION SELECT · DSKY</span>
                <span className="dim">KEYS 1–5 / ARROWS</span>
              </div>
              <SectionKeys active={active} onSelect={select} />
            </div>
            <FunctionPanel
              soundOn={soundOn}
              onToggleSound={() => {
                setSoundOn((on) => !on);
                ping("AUDIO");
              }}
              onReboot={() => {
                setBootKey((key) => key + 1);
                ping("REBOOT");
              }}
              onPing={ping}
            />
          </div>
        </div>

        <aside className="instruments" aria-label="Flight instruments">
          <InstrumentPanel title="NAVIGATION" code="NAV-01" span>
            <DataRow
              label="SECTOR"
              value={`${meta.code} ${meta.label}`}
              tone="amber"
            />
            <DataRow label="CHANNEL" value={`${index + 1} / 5`} />
            <DataRow label="BEARING" value={`${bearing}°`} />
            <div className="compass" aria-hidden="true">
              {Array.from({ length: 15 }).map((_, tick) => (
                <span
                  key={tick}
                  className={`compass-tick ${tick % 5 === 0 ? "major" : ""}`}
                />
              ))}
              <span
                className="compass-mark"
                style={{ left: `${((index + 0.5) / SECTIONS.length) * 100}%` }}
              />
            </div>
            <p className="inst-note">AZ {bearing} · SECTOR TRACKING</p>
          </InstrumentPanel>

          <InstrumentPanel title="SYSTEM STATUS" code="SYS-02">
            <div className="status-list">
              <StatusIndicator tone="green" pulse label="CORE" />
              <span className="status-state">ONLINE</span>
              <StatusIndicator tone="cyan" label="NAV" />
              <span className="status-state">NOMINAL</span>
              <StatusIndicator tone="green" label="COMM" />
              <span className="status-state">OPEN</span>
              <StatusIndicator tone="amber" label="PWR" />
              <span className="status-state">STABLE</span>
            </div>
            <p className="inst-note">DECORATIVE STATUS BUS</p>
          </InstrumentPanel>

          <InstrumentPanel title="COMM LINK" code="COM-03">
            <DataRow label="LINK" value="HTTPS" />
            <DataRow label="SOURCE" value="STATIC" />
            <DataRow label="SESSION" value={<SessionUptime />} />
            <div className="inst-status">
              <StatusIndicator tone="green" pulse label="ONLINE" />
            </div>
          </InstrumentPanel>

          <InstrumentPanel title="PROJECT INDEX" code="PRJ-04">
            <div className="counter-row">
              <Counter value={PROJECTS.length} label="MISSIONS" />
              <Counter value={publicProjects} label="PUBLIC" tone="green" />
            </div>
            <DataRow label="STACKS" value={PROJECT_STACKS.length} />
            <DataRow label="STORED" value="STATIC JSON" />
          </InstrumentPanel>

          <InstrumentPanel title="SKILL BUS" code="SKL-05">
            <DataRow label="LANGUAGES" value={languages} tone="green" />
            <DataRow
              label="LEARNING"
              value={PROFILE.learning.length}
              tone="cyan"
            />
            <DataRow label="ENVIRONMENT" value={environment} tone="amber" />
            <DataRow label="METRIC" value="STATUS ONLY" />
          </InstrumentPanel>

          <InstrumentPanel title="SIGNAL" code="SIG-06" span>
            <ThrusterTelemetry />
          </InstrumentPanel>

          <InstrumentPanel title="SATELLITE TRACKING" code="SAT-07" span>
            <SatelliteTracking />
          </InstrumentPanel>
        </aside>
      </div>

      <div className="vents" aria-hidden="true" />
      <p className="serial-line">
        SLOWY / FCS-07 / MFD-01 / NAV-01 / COM-03 / PRJ-04 / SKL-05 / SIG-06 /
        SAT-07
      </p>
    </div>
  );
}

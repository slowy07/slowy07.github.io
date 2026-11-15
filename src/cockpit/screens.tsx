import { useReducedMotion } from "framer-motion";
import {
  ChartLine,
  ExternalLink,
  Github,
  Youtube,
} from "pixelarticons/react";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import {
  ABOUT,
  CHANNELS,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  PROJECT_STACKS,
  REQUESTS,
  REQUESTS_TOTAL,
  SKILL_GROUPS,
  TRAINING,
  type SectionId,
  type SkillStatus,
} from "../data/portfolio";
import { formatRp } from "../utils/format";
import { EquipmentManifest } from "./equipment";
import { Led, StatusIndicator, type Tone } from "./parts";

/* ------------------------------------------------------------ shared bits */

const pad = (value: number) => String(value).padStart(2, "0");

function ScreenHead({
  code,
  kicker,
  title,
  meta,
}: {
  code: string;
  kicker: string;
  title: string;
  meta?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="screen-head">
      <div className="screen-head-main">
        <p className="eyebrow">
          <span className="eyebrow-code">{code}</span>
          {kicker}
        </p>
        <h2 className="screen-title">
          <span className="screen-prompt" aria-hidden="true">
            &gt;
          </span>
          {reduceMotion ? (
            <span>{title}</span>
          ) : (
            <Typewriter
              options={{
                delay: 32,
                cursorClassName: "block-cursor",
                wrapperClassName: "title-writer",
              }}
              onInit={(typewriter) => {
                typewriter.typeString(title).start();
              }}
            />
          )}
        </h2>
      </div>
      {meta ? <p className="screen-meta">{meta}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------------- home */

function HomeScreen() {
  return (
    <>
      <ScreenHead
        code="01"
        kicker="IDENTIFICATION"
        title={PROFILE.name}
        meta={`CALLSIGN ${PROFILE.callsign}`}
      />

      <div className="home-grid">
        <div className="home-copy">
          <p className="screen-lede">{PROFILE.intro}</p>

          <p className="type-line">
            <span className="screen-prompt" aria-hidden="true">
              &gt;
            </span>
            SOFTWARE ENGINEER / SYSTEMS / AI RESEARCH
            <span className="block-cursor" aria-hidden="true" />
          </p>

          <dl className="readout-grid">
            <div>
              <dt>ROLE</dt>
              <dd>{PROFILE.role}</dd>
            </div>
            <div>
              <dt>DOMAIN</dt>
              <dd>{PROFILE.domain}</dd>
            </div>
            <div>
              <dt>STATUS</dt>
              <dd className="tone-green">{PROFILE.status}</dd>
            </div>
            <div>
              <dt>GITHUB</dt>
              <dd>
                <a
                  className="text-link"
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  @slowy07
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <figure className="portrait">
          <div className="portrait-frame">
            <img
              src="/foto_profile.png"
              alt="Portrait of Arfy Slowy"
              width="320"
              height="320"
              loading="eager"
            />
          </div>
          <figcaption>PILOT / IMG_001</figcaption>
        </figure>
      </div>

      <div className="home-status">
        <StatusIndicator tone="green" pulse label="CORE ONLINE" />
        <StatusIndicator tone="cyan" label="NAV READY" />
        <StatusIndicator tone="green" label="COMMS OPEN" />
        <span className="home-hint">
          ROTARY KNOB / SECTION KEYS / 1–5 / ARROWS
        </span>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------- about */

function AboutScreen() {
  return (
    <>
      <ScreenHead
        code="02"
        kicker="PILOT RECORD"
        title="ABOUT"
        meta={`${PROFILE.callsign} / HUMAN OPERATOR`}
      />

      <div className="about-grid">
        <div className="about-copy">
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside className="about-side">
          <section className="mini-panel">
            <p className="mini-label">FOCUS</p>
            <ul className="tag-list">
              {ABOUT.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="mini-panel">
            <p className="mini-label">INTERESTS</p>
            <ul className="tag-list">
              {PROFILE.hobbies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="mini-panel">
            <p className="mini-label">LEARNING QUEUE</p>
            <ul className="tag-list">
              {PROFILE.learning.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <EquipmentManifest />

      <section className="manifest">
        <header className="rail-head">
          <h3>FLIGHT LOG / EXPERIENCE</h3>
          <span className="dim">{EXPERIENCE.length} ENTRIES</span>
        </header>
        <ol className="logbook">
          {EXPERIENCE.map((entry) => (
            <li key={`${entry.org}-${entry.period}`} className="log-entry">
              <div className="log-side">
                <span className="log-period">{entry.period}</span>
                <span className="tag">{entry.type}</span>
              </div>
              <div className="log-main">
                <div className="log-head">
                  <h4>{entry.org}</h4>
                  <StatusIndicator
                    tone={entry.active ? "green" : "amber"}
                    label={entry.active ? "ACTIVE" : "ARCHIVED"}
                  />
                </div>
                <p className="log-role">{entry.role}</p>
                <p className="log-detail">{entry.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="about-panels">
        <section className="mini-panel training-block">
          <header className="rail-head">
            <h3>EDUCATION / TRAINING</h3>
            <span className="dim">NO FORMAL RECORD</span>
          </header>
          <p className="empty-line">
            NO FORMAL EDUCATION RECORD ON FILE. CONTINUOUS TRAINING BELOW.
          </p>
          <ul className="training-list">
            {TRAINING.map((item) => (
              <li key={item.name}>
                <Led tone="cyan" pulse />
                <span>{item.name}</span>
                <span className="dim">{item.kind}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- projects */

function ProjectsScreen() {
  const [filter, setFilter] = useState("all");
  const shown =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.technology === filter);

  return (
    <>
      <ScreenHead
        code="03"
        kicker="MISSION FILES"
        title="PROJECTS"
        meta={`${PROJECTS.length} RECORDS / ${PROJECT_STACKS.length} STACKS`}
      />

      <div className="chip-row" role="group" aria-label="Filter projects">
        <button
          type="button"
          className={`chip ${filter === "all" ? "on" : ""}`}
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          ALL <span className="dim">{PROJECTS.length}</span>
        </button>
        {PROJECT_STACKS.map((stack) => {
          const count = PROJECTS.filter(
            (project) => project.technology === stack
          ).length;
          return (
            <button
              key={stack}
              type="button"
              className={`chip ${filter === stack ? "on" : ""}`}
              aria-pressed={filter === stack}
              onClick={() => setFilter(stack)}
            >
              {stack.toUpperCase()} <span className="dim">{count}</span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="empty-line">NO RECORDS FOUND. CHECK BACK LATER.</p>
      ) : (
        <ul className="mission-list">
          {shown.map((project) => (
            <li key={project.title} className="mission">
              <div className="mission-thumb">
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  width="120"
                  height="90"
                />
              </div>
              <div className="mission-main">
                <div className="mission-head">
                  <h3>{project.title}</h3>
                  <span className="tag">{project.technology}</span>
                </div>
                <p className="mission-desc">{project.description}</p>
                <div className="mission-foot">
                  <span>
                    STATUS:{" "}
                    <span className="tone-green">
                      {project.visibleProject.toUpperCase()}
                    </span>
                  </span>
                  <a
                    className="mini-link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    OPEN FILE
                    <ExternalLink className="icon-12" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ skills */

const SKILL_TONE: Record<SkillStatus, Tone> = {
  logged: "green",
  learning: "cyan",
  environment: "amber",
};

function SkillsScreen() {
  return (
    <>
      <ScreenHead
        code="04"
        kicker="CAPABILITY MAP"
        title="SKILLS"
        meta="STATUS ONLY / NO SCORES"
      />

      <div className="skill-grid">
        {SKILL_GROUPS.map((group) => (
          <section key={group.id} className="skill-block">
            <header className="rail-head">
              <h3>{group.label}</h3>
              <span className="dim">
                {group.note} · {pad(group.items.length)}
              </span>
            </header>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span className="skill-name">
                    <StatusIndicator tone={SKILL_TONE[item.status]} />
                    {item.name}
                  </span>
                  <span className="skill-state">{item.status}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="screen-note">
        STATUS REFLECTS RECORDED ACTIVITY — NOT A PROFICIENCY SCORE.
      </p>
    </>
  );
}

/* ----------------------------------------------------------------- contact */

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  github: <Github className="icon-18" aria-hidden="true" />,
  youtube: <Youtube className="icon-18" aria-hidden="true" />,
  wakatime: <ChartLine className="icon-18" aria-hidden="true" />,
};

function ContactScreen() {
  return (
    <>
      <ScreenHead
        code="05"
        kicker="COMMS"
        title="CONTACT"
        meta={`${CHANNELS.length} OPEN CHANNELS`}
      />

      <div className="channel-grid">
        {CHANNELS.map((channel) => (
          <a
            key={channel.id}
            className="channel"
            href={channel.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="channel-icon">{CHANNEL_ICONS[channel.id]}</span>
            <span className="channel-copy">
              <span className="channel-label">{channel.label}</span>
              <span className="channel-handle">{channel.handle}</span>
              <span className="channel-note">{channel.note}</span>
            </span>
            <ExternalLink className="icon-14 channel-arrow" aria-hidden="true" />
          </a>
        ))}
      </div>

      <p className="contact-note">
        EMAIL NOT LISTED — GITHUB IS THE PRIMARY CONTACT CHANNEL.
      </p>

      <section className="support-log">
        <header className="rail-head">
          <h3>MEMBER SUPPORT LOG</h3>
          <span className="dim">
            {REQUESTS.length} ENTRIES · {formatRp(REQUESTS_TOTAL)}
          </span>
        </header>
        <ul>
          {REQUESTS.map((request, index) => (
            <li key={`${request.name}-${index}`} className="support-row">
              <span className="support-index">{pad(index + 1)}</span>
              <span className="support-name">{request.name}</span>
              <span className="support-value">{formatRp(request.nominal)}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- dispatch */

const SCREENS: Record<SectionId, () => JSX.Element> = {
  home: HomeScreen,
  about: AboutScreen,
  projects: ProjectsScreen,
  skills: SkillsScreen,
  contact: ContactScreen,
};

export function MonitorContent({ section }: { section: SectionId }) {
  const Screen = SCREENS[section];
  return <Screen />;
}

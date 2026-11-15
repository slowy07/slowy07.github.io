import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const VIEW_W = 324;
const VIEW_H = 108;
const CENTER_X = 162;
const CENTER_Y = 54;
const SCROLL_PERIOD = 48000;

const GRID_V = [36, 72, 108, 144, 180, 216, 252, 288]
  .map((x) => `M${x} 4V${VIEW_H - 4}`)
  .join(" ");
const GRID_H = [18, 36, 54, 72, 90]
  .map((y) => `M4 ${y}H${VIEW_W - 4}`)
  .join(" ");

const LONGITUDES: Array<[number, string]> = [
  [36, "124E"],
  [108, "136E"],
  [180, "148E"],
  [252, "160E"],
];

type Ring = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rot: number;
};

/* flat topographic contours, regenerated on every mount */
function makeContours(): Ring[][] {
  return Array.from({ length: 6 }, () => {
    const cx = 30 + Math.random() * 264;
    const cy = 18 + Math.random() * 70;
    const rx = 6 + Math.random() * 5;
    const ry = 4 + Math.random() * 4;
    const rot = -28 + Math.random() * 56;
    const rings = 3 + Math.floor(Math.random() * 2);

    return Array.from({ length: rings }, (_, ring) => ({
      cx,
      cy,
      rx: rx + ring * 4,
      ry: ry + ring * 3,
      rot,
    }));
  });
}

type Telemetry = {
  lat: number;
  lon: number;
  alt: number;
  vel: number;
  sig: number;
};

const INITIAL: Telemetry = {
  lat: 34.5,
  lon: 124.2,
  alt: 412.6,
  vel: 7.66,
  sig: -78,
};

const barCount = (sig: number) =>
  sig >= -76 ? 4 : sig >= -78 ? 3 : sig >= -80 ? 2 : 1;

export default function SatelliteTracking() {
  const reduceMotion = useReducedMotion();
  const terrainRef = useRef<SVGGElement>(null);
  const contours = useMemo(makeContours, []);
  const [pos, setPos] = useState<Telemetry>(INITIAL);

  useEffect(() => {
    const terrain = terrainRef.current;
    if (!terrain) return;

    const scroll = (progress: number) => {
      const t = ((progress % 1) + 1) % 1;
      terrain.setAttribute(
        "transform",
        `translate(${(-t * VIEW_W).toFixed(2)} 0)`
      );
      return t;
    };

    const publish = (t: number) => {
      setPos({
        lat: 34.5 + Math.sin(t * Math.PI * 2) * 0.6,
        lon: 124 + t * 36,
        alt: 412.6 + Math.sin(t * Math.PI * 2) * 1.8,
        vel: 7.66 + Math.cos(t * Math.PI * 2) * 0.03,
        sig: Math.round(-78 + Math.sin(t * Math.PI * 6) * 3),
      });
    };

    if (reduceMotion) {
      scroll(0);
      publish(0);
      return;
    }

    let frame = 0;
    let lastPublish = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = scroll((now - start) / SCROLL_PERIOD);
      if (now - lastPublish > 240) {
        lastPublish = now;
        publish(t);
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  const terrainLayer = (shift: number) => (
    <g key={shift} transform={`translate(${shift} 0)`}>
      {contours.map((blob, blobIndex) => (
        <g key={`blob-${blobIndex}`}>
          {blob.map((ring, ringIndex) => (
            <ellipse
              key={`ring-${blobIndex}-${ringIndex}`}
              cx={ring.cx}
              cy={ring.cy}
              rx={ring.rx}
              ry={ring.ry}
              transform={`rotate(${ring.rot} ${ring.cx} ${ring.cy})`}
              fill={ringIndex === 0 ? "rgba(63, 193, 224, 0.05)" : "none"}
              stroke="rgba(63, 193, 224, 0.3)"
              strokeWidth="0.7"
            />
          ))}
        </g>
      ))}

      <path
        d={GRID_V}
        fill="none"
        stroke="rgba(232, 210, 122, 0.09)"
        strokeWidth="0.5"
      />

      {LONGITUDES.map(([x, label]) => (
        <text key={label} x={x} y="7" textAnchor="middle">
          {label}
        </text>
      ))}
    </g>
  );

  return (
    <div className="sat">
      <div className="sat-map">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Scrolling topographic satellite flight map"
        >
          <rect
            x="0.5"
            y="0.5"
            width={VIEW_W - 1}
            height={VIEW_H - 1}
            fill="var(--crt)"
            stroke="rgba(63, 193, 224, 0.35)"
          />

          <g ref={terrainRef}>
            {terrainLayer(0)}
            {terrainLayer(VIEW_W)}
          </g>

          <path
            d={GRID_H}
            fill="none"
            stroke="rgba(232, 210, 122, 0.09)"
            strokeWidth="0.5"
          />

          <g className="sat-coords">
            <text x="2.5" y="18">
              40N
            </text>
            <text x="2.5" y="54">
              20N
            </text>
            <text x="2.5" y="90">
              00
            </text>
          </g>

          <g className="sat-trail">
            <path d="M94 54H118" stroke="var(--cyan)" strokeWidth="0.8" opacity="0.18" strokeDasharray="3 4" />
            <path d="M112 54H132" stroke="var(--cyan)" strokeWidth="1" opacity="0.35" strokeDasharray="4 3" />
            <path d="M128 54H150" stroke="var(--cyan)" strokeWidth="1.2" opacity="0.7" />
          </g>

          <g className="sat-craft" transform={`translate(${CENTER_X} ${CENTER_Y})`}>
            <circle
              className="sat-ping"
              r="7"
              fill="none"
              stroke="var(--cyan)"
              strokeWidth="0.8"
            />
            <circle r="4.5" fill="var(--cyan)" opacity="0.14" />
            <path
              d="M-7 0L-2 -1.6L0 -6L2 -1.6L8 0L2 1.6L0 6L-2 1.6Z"
              fill="var(--key)"
            />
          </g>

          <g className="sat-status">
            <circle cx="8" cy="15" r="1.8" fill="var(--green)" />
            <text x="14" y="17">
              CBK-01 · OPERATIONAL
            </text>
          </g>

          <g className="sat-legend">
            <g>
              <circle cx="6.5" cy="100" r="1.4" fill="var(--cyan)" />
              <text x="12" y="102">
                CURRENT POSITION
              </text>
            </g>
            <g>
              <path d="M70 98H76M70 101H76" stroke="var(--cyan)" strokeWidth="0.8" />
              <text x="79" y="102">
                FLIGHT TRAIL
              </text>
            </g>
          </g>

          <text className="sat-sim" x="318" y="102" textAnchor="end">
            SIM · DECORATIVE
          </text>
        </svg>
      </div>

      <dl className="sat-telemetry">
        <div className="sat-cell">
          <dt>ALTITUDE</dt>
          <dd>{pos.alt.toFixed(1)} KM</dd>
        </div>
        <div className="sat-cell">
          <dt>ORBITAL VELOCITY</dt>
          <dd>{pos.vel.toFixed(2)} KM/S</dd>
        </div>
        <div className="sat-cell">
          <dt>POSITION</dt>
          <dd>
            {pos.lat.toFixed(1)}N {pos.lon.toFixed(1)}E
          </dd>
        </div>
        <div className="sat-cell">
          <dt>SIGNAL</dt>
          <dd>
            {pos.sig} DBM
            <span className="sat-bars" aria-hidden="true">
              {[1, 2, 3, 4].map((bar) => (
                <i key={bar} className={bar <= barCount(pos.sig) ? "is-lit" : ""} />
              ))}
            </span>
          </dd>
        </div>
        <div className="sat-cell">
          <dt>ORBIT STATUS</dt>
          <dd className="tone-green">NOMINAL</dd>
        </div>
      </dl>
    </div>
  );
}

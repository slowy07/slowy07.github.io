import { GEAR, type GearGroup } from "../data/portfolio";

const AXIS_X = { x: 0.94, y: -0.34 };
const AXIS_Y = { x: -0.56, y: -0.22 };

type Point = { x: number; y: number };
type SlabShape = {
  p0: Point;
  p1: Point;
  p2: Point;
  p3: Point;
  top: string;
  right: string;
  left: string;
};

const svgPoint = (point: Point) => `${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
const polygon = (points: Point[]) => points.map(svgPoint).join(" ");

function slab(x: number, y: number, w: number, d: number, h: number): SlabShape {
  const p0 = { x, y };
  const p1 = { x: x + AXIS_X.x * w, y: y + AXIS_X.y * w };
  const p2 = {
    x: x + AXIS_X.x * w + AXIS_Y.x * d,
    y: y + AXIS_X.y * w + AXIS_Y.y * d,
  };
  const p3 = { x: x + AXIS_Y.x * d, y: y + AXIS_Y.y * d };

  return {
    p0,
    p1,
    p2,
    p3,
    top: polygon([p0, p1, p2, p3]),
    right: polygon([p0, p1, { x: p1.x, y: p1.y + h }, { x: p0.x, y: p0.y + h }]),
    left: polygon([p0, p3, { x: p3.x, y: p3.y + h }, { x: p0.x, y: p0.y + h }]),
  };
}

function facePoint(shape: SlabShape, u: number, v: number): Point {
  return {
    x:
      shape.p0.x +
      (shape.p1.x - shape.p0.x) * u +
      (shape.p3.x - shape.p0.x) * v,
    y:
      shape.p0.y +
      (shape.p1.y - shape.p0.y) * u +
      (shape.p3.y - shape.p0.y) * v,
  };
}

function facePolygon(
  shape: SlabShape,
  u1: number,
  v1: number,
  u2: number,
  v2: number
) {
  return polygon([
    facePoint(shape, u1, v1),
    facePoint(shape, u2, v1),
    facePoint(shape, u2, v2),
    facePoint(shape, u1, v2),
  ]);
}

function Slab({
  shape,
  topFill = "#0d0b08",
}: {
  shape: SlabShape;
  topFill?: string;
}) {
  return (
    <g>
      <polygon
        points={shape.left}
        fill="#0a0907"
        stroke="#2b8ba2"
        strokeWidth="0.9"
      />
      <polygon points={shape.left} fill="url(#hatch)" opacity="0.4" />
      <polygon
        points={shape.right}
        fill="#0d0b08"
        stroke="#2b8ba2"
        strokeWidth="0.9"
      />
      <polygon points={shape.right} fill="url(#hatch)" opacity="0.4" />
      <polygon
        points={shape.top}
        fill={topFill}
        stroke="#3fc1e0"
        strokeWidth="1"
      />
    </g>
  );
}

function Screw({ point }: { point: Point }) {
  return (
    <g stroke="#8a7a4a" strokeWidth="0.7">
      <circle cx={point.x} cy={point.y} r="2.4" fill="none" />
      <line
        x1={point.x - 1.7}
        y1={point.y - 1.7}
        x2={point.x + 1.7}
        y2={point.y + 1.7}
      />
      <line
        x1={point.x - 1.7}
        y1={point.y + 1.7}
        x2={point.x + 1.7}
        y2={point.y - 1.7}
      />
    </g>
  );
}

function Callout({ at, id, label }: { at: Point; id: string; label: string }) {
  return (
    <g>
      <line
        x1={at.x - 4}
        y1={at.y}
        x2="209"
        y2={at.y}
        stroke="#8a7a4a"
        strokeWidth="0.8"
      />
      <circle
        cx="200"
        cy={at.y}
        r="8"
        fill="#02060a"
        stroke="#3fc1e0"
        strokeWidth="0.9"
      />
      <text className="callout-num" x="200" y={at.y + 3} textAnchor="middle">
        {id}
      </text>
      <text className="callout-label" x="187" y={at.y + 3} textAnchor="end">
        {label}
      </text>
    </g>
  );
}

const CUTAWAY = [
  { id: "01", label: "LID", spec: "DISPLAY / HINGE" },
  { id: "02", label: "DECK", spec: "KEYBOARD / TRACKPAD" },
  { id: "03", label: "BOARD", spec: "XEON · A5000 · 64GB · 2TB" },
  { id: "04", label: "BATTERY", spec: "P15 GEN 2 PACK" },
  { id: "05", label: "CHASSIS", spec: "THINKPAD P15 GEN 2" },
];

function Teardown() {
  const lid = slab(320, 100, 180, 120, 4);
  const deck = slab(320, 200, 180, 120, 6);
  const board = slab(336, 300, 146, 96, 5);
  const battery = slab(322, 400, 138, 62, 9);
  const base = slab(320, 500, 180, 120, 10);

  const lidCenter = facePoint(lid, 0.5, 0.5);
  const cpu = facePoint(board, 0.4, 0.38);
  const gpuA = facePoint(board, 0.66, 0.34);
  const gpuB = facePoint(board, 0.78, 0.34);
  const ramTag = facePoint(board, 0.74, 0.72);
  const ssdTag = facePoint(board, 0.33, 0.8);

  return (
    <svg
      className="teardown-svg"
      viewBox="0 0 640 530"
      role="img"
      aria-label="Isometric engineering drawing of the ThinkPad P15 exploded into five layers: display lid, keyboard deck, mainboard with CPU, RAM, GPU and SSD, battery pack, and bottom chassis. Balloons and a dashed assembly axis show how the layers stack."
    >
      <defs>
        <pattern
          id="hatch"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="5" stroke="#2b8ba2" strokeWidth="0.5" />
        </pattern>
      </defs>

      <g stroke="#2b8ba2" strokeWidth="0.7" strokeDasharray="3 3" opacity="0.55">
        {[lid, deck, board, battery].map((shape, index) => {
          const next = [deck, board, battery, base][index];
          return (
            <g key={`guide-${index}`}>
              <line
                x1={shape.p3.x}
                y1={shape.p3.y + 7}
                x2={next.p3.x}
                y2={next.p3.y - 7}
              />
              <line
                x1={shape.p1.x}
                y1={shape.p1.y + 7}
                x2={next.p1.x}
                y2={next.p1.y - 7}
              />
            </g>
          );
        })}
      </g>

      <line
        x1="354"
        y1="6"
        x2="354"
        y2="524"
        stroke="#8a7a4a"
        strokeWidth="0.7"
        strokeDasharray="12 4 2 4"
        opacity="0.55"
      />

      <g>
        <Slab shape={base} topFill="#0a0f12" />
        <polygon
          points={facePolygon(base, 0.07, 0.07, 0.93, 0.93)}
          fill="#050a0e"
          stroke="#2b8ba2"
          strokeWidth="0.8"
        />
        <line
          x1={facePoint(base, 0.16, 0.5).x}
          y1={facePoint(base, 0.16, 0.5).y}
          x2={facePoint(base, 0.55, 0.5).x}
          y2={facePoint(base, 0.55, 0.5).y}
          stroke="#2b8ba2"
          strokeWidth="0.6"
        />
        {[0.14, 0.86].map((u) =>
          [0.14, 0.86].map((v) => (
            <Screw key={`boss-${u}-${v}`} point={facePoint(base, u, v)} />
          ))
        )}
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const y = base.p0.y + (base.p1.y - base.p0.y) * t;
          return (
            <line
              key={`vent-${t}`}
              x1={base.p0.x + (base.p1.x - base.p0.x) * t}
              y1={y + 3}
              x2={base.p0.x + (base.p1.x - base.p0.x) * t}
              y2={y + 8}
              stroke="#8a7a4a"
              strokeWidth="0.8"
            />
          );
        })}
        <Callout at={facePoint(base, 0, 0.5)} id="05" label="CHASSIS" />
      </g>

      <g>
        <Slab shape={battery} />
        {[0.25, 0.5, 0.75].map((u) => {
          const a = facePoint(battery, u, 0.12);
          const b = facePoint(battery, u, 0.88);
          return (
            <line
              key={`cell-${u}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#2b8ba2"
              strokeWidth="0.6"
            />
          );
        })}
        <polygon
          points={facePolygon(battery, 0.82, 0.38, 0.92, 0.62)}
          fill="#14110d"
          stroke="#8a7a4a"
          strokeWidth="0.7"
        />
        <Callout at={facePoint(battery, 0, 0.5)} id="04" label="BATTERY" />
      </g>

      <g>
        <Slab shape={board} topFill="#0a1418" />
        <polygon
          points={facePolygon(board, 0.08, 0.5, 0.52, 0.5)}
          fill="none"
          stroke="#1f6270"
          strokeWidth="0.6"
        />
        <polygon
          points={facePolygon(board, 0.3, 0.3, 0.5, 0.46)}
          fill="#14110d"
          stroke="#8a7a4a"
          strokeWidth="0.9"
        />
        <polygon
          points={facePolygon(board, 0.34, 0.34, 0.46, 0.42)}
          fill="none"
          stroke="#3fc1e0"
          strokeWidth="0.6"
        />
        <polygon
          points={facePolygon(board, 0.6, 0.24, 0.84, 0.44)}
          fill="#14110d"
          stroke="#8a7a4a"
          strokeWidth="0.9"
        />
        <ellipse
          cx={gpuA.x}
          cy={gpuA.y}
          rx="9"
          ry="5"
          fill="none"
          stroke="#3fc1e0"
          strokeWidth="0.6"
        />
        <ellipse
          cx={gpuB.x}
          cy={gpuB.y}
          rx="9"
          ry="5"
          fill="none"
          stroke="#3fc1e0"
          strokeWidth="0.6"
        />
        {[0, 1].map((index) => (
          <g key={`ram-${index}`}>
            <polygon
              points={facePolygon(
                board,
                0.56,
                0.56 + index * 0.12,
                0.92,
                0.63 + index * 0.12
              )}
              fill="#14110d"
              stroke="#8a7a4a"
              strokeWidth="0.8"
            />
            {[0.2, 0.5, 0.8].map((t) => {
              const a = facePoint(
                board,
                0.56 + (0.92 - 0.56) * t,
                0.56 + index * 0.12
              );
              const b = facePoint(
                board,
                0.56 + (0.92 - 0.56) * t,
                0.63 + index * 0.12
              );
              return (
                <line
                  key={`ram-tick-${index}-${t}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#3fc1e0"
                  strokeWidth="0.5"
                />
              );
            })}
          </g>
        ))}
        <polygon
          points={facePolygon(board, 0.18, 0.74, 0.48, 0.86)}
          fill="#14110d"
          stroke="#8a7a4a"
          strokeWidth="0.8"
        />
        <line
          x1={cpu.x}
          y1={cpu.y}
          x2={gpuA.x}
          y2={gpuA.y}
          stroke="#1f6270"
          strokeWidth="0.6"
        />
        <line
          x1={cpu.x}
          y1={cpu.y}
          x2={ramTag.x}
          y2={ramTag.y}
          stroke="#1f6270"
          strokeWidth="0.6"
        />
        <text className="part-label" x={cpu.x} y={cpu.y - 9} textAnchor="middle">
          CPU
        </text>
        <text
          className="part-label"
          x={(gpuA.x + gpuB.x) / 2}
          y={gpuA.y - 9}
          textAnchor="middle"
        >
          GPU
        </text>
        <text className="part-label" x={ramTag.x} y={ramTag.y + 9} textAnchor="middle">
          RAM
        </text>
        <text className="part-label" x={ssdTag.x} y={ssdTag.y + 9} textAnchor="middle">
          SSD
        </text>
        <Callout at={facePoint(board, 0, 0.5)} id="03" label="MAINBOARD" />
      </g>

      <g>
        <Slab shape={deck} />
        <polygon
          points={facePolygon(deck, 0.12, 0.14, 0.88, 0.58)}
          fill="#0d0b08"
          stroke="#3fc1e0"
          strokeWidth="0.8"
        />
        {Array.from({ length: 8 }, (_, index) => {
          const u = 0.12 + (0.76 * (index + 1)) / 9;
          const a = facePoint(deck, u, 0.14);
          const b = facePoint(deck, u, 0.58);
          return (
            <line
              key={`deck-key-${u}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#1f6270"
              strokeWidth="0.5"
            />
          );
        })}
        {Array.from({ length: 3 }, (_, index) => {
          const v = 0.14 + (0.44 * (index + 1)) / 4;
          const a = facePoint(deck, 0.12, v);
          const b = facePoint(deck, 0.88, v);
          return (
            <line
              key={`deck-row-${v}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#1f6270"
              strokeWidth="0.5"
            />
          );
        })}
        <polygon
          points={facePolygon(deck, 0.38, 0.68, 0.62, 0.86)}
          fill="none"
          stroke="#2b8ba2"
          strokeWidth="0.8"
        />
        {[0.08, 0.92].map((u) =>
          [0.08, 0.92].map((v) => (
            <Screw key={`deck-screw-${u}-${v}`} point={facePoint(deck, u, v)} />
          ))
        )}
        <Callout at={facePoint(deck, 0, 0.5)} id="02" label="DECK" />
      </g>

      <g>
        <Slab shape={lid} topFill="#0a1418" />
        <polygon
          points={facePolygon(lid, 0.08, 0.1, 0.92, 0.9)}
          fill="#02060a"
          stroke="#3fc1e0"
          strokeWidth="0.9"
        />
        <polygon
          points={facePolygon(lid, 0.12, 0.15, 0.88, 0.85)}
          fill="none"
          stroke="#2b8ba2"
          strokeWidth="0.6"
        />
        <text
          className="screen-model"
          x={lidCenter.x}
          y={lidCenter.y}
          textAnchor="middle"
        >
          P15 GEN 2
        </text>
        <text
          className="screen-sub"
          x={lidCenter.x}
          y={lidCenter.y + 10}
          textAnchor="middle"
        >
          DISPLAY
        </text>
        <circle
          cx={facePoint(lid, 0.5, 0.1).x}
          cy={facePoint(lid, 0.5, 0.1).y}
          r="1.5"
          fill="#3fc1e0"
        />
        {[0.2, 0.5, 0.8].map((u) => {
          const hinge = facePoint(lid, u, 1);
          return (
            <circle
              key={`hinge-${u}`}
              cx={hinge.x}
              cy={hinge.y}
              r="2.6"
              fill="#14110d"
              stroke="#8a7a4a"
              strokeWidth="0.7"
            />
          );
        })}
        <Callout at={facePoint(lid, 0, 0.5)} id="01" label="LID" />
      </g>

      <g stroke="#8a7a4a" strokeWidth="0.7" opacity="0.9">
        {[lid, deck, board, battery, base].map((shape, index) => (
          <line
            key={`ext-${index}`}
            x1={shape.p1.x}
            y1={shape.p1.y}
            x2="556"
            y2={shape.p1.y}
            strokeDasharray="2 3"
          />
        ))}
        <line x1="560" y1={lid.p1.y} x2="560" y2={base.p1.y} />
        <line x1="554" y1={lid.p1.y} x2="566" y2={lid.p1.y} />
        <line x1="554" y1={base.p1.y} x2="566" y2={base.p1.y} />
        {[deck, board, battery].map((shape) => (
          <line
            key={`tick-${shape.p1.y}`}
            x1="557"
            y1={shape.p1.y}
            x2="563"
            y2={shape.p1.y}
          />
        ))}
      </g>
      <text
        className="dim-label"
        x="600"
        y={(lid.p1.y + base.p1.y) / 2}
        textAnchor="middle"
      >
        5 LAYERS
      </text>
    </svg>
  );
}

function PackageGroup({ group, label }: { group: GearGroup; label: string }) {
  return (
    <div className="pkg-group">
      <p className="pkg-group-label">{label}</p>
      <ul className="pkg-list">
        {group.gearList.map((item) => (
          <li key={item.item}>
            <span className="pkg-name">{item.item}</span>
            {item.type?.length ? (
              <span className="pkg-tag">{item.type[0]}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EquipmentManifest() {
  const hardware = GEAR.filter((group) => /hardware/i.test(group.gear));
  const operatingSystem = GEAR.find((group) =>
    /operating/i.test(group.gear)
  );
  const software = GEAR.find((group) => /software/i.test(group.gear));
  const peripherals = hardware
    .flatMap((group) => group.gearList)
    .filter((item) => !item.type?.includes("computer"));
  const gearCount = GEAR.reduce(
    (sum, group) => sum + group.gearList.length,
    0
  );
  const packageCount =
    (operatingSystem?.gearList.length ?? 0) +
    (software?.gearList.length ?? 0);

  return (
    <section className="equipment">
      <header className="rail-head">
        <h3>EQUIPMENT MANIFEST / CUTAWAY</h3>
        <span className="dim">{gearCount} ITEMS · SCHEMATIC</span>
      </header>

      <div className="equipment-grid">
        <figure className="teardown">
          <Teardown />
          <figcaption>THINKPAD P15 GEN 2 · EXPLODED VIEW · NOT TO SCALE</figcaption>
          <ol className="cutaway-index">
            {CUTAWAY.map((part) => (
              <li key={part.id}>
                <span className="cutaway-id">{part.id}</span>
                <span className="cutaway-name">{part.label}</span>
                <span className="cutaway-spec">{part.spec}</span>
              </li>
            ))}
          </ol>
        </figure>

        <aside className="equipment-side">
          <section className="equipment-bay">
            <header className="rail-head">
              <h4>PACKAGE BAY</h4>
              <span className="dim">{packageCount} LOADED</span>
            </header>
            {operatingSystem ? (
              <PackageGroup group={operatingSystem} label="OS / PLATFORM" />
            ) : null}
            {software ? <PackageGroup group={software} label="TOOLS" /> : null}
          </section>

          <section className="equipment-bay">
            <header className="rail-head">
              <h4>PERIPHERALS</h4>
              <span className="dim">{peripherals.length} LINKED</span>
            </header>
            <ul className="pkg-list">
              {peripherals.map((item) => (
                <li key={item.item}>
                  <span className="pkg-name">{item.item}</span>
                  {item.type?.length ? (
                    <span className="pkg-tag">{item.type[0]}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <details className="foldout gear-log">
        <summary>
          FULL MANIFEST LOG
          <span className="dim">{gearCount} ITEMS</span>
        </summary>
        <div className="gear-groups">
          {GEAR.map((group) => (
            <section key={group.gear} className="gear-group">
              <h4>{group.gear}</h4>
              <ul>
                {group.gearList.map((item) => (
                  <li key={item.item}>
                    <p className="gear-item">{item.item}</p>
                    <p className="gear-desc">{item.desc}</p>
                    {item.type ? (
                      <p className="gear-tags">
                        {item.type.map((tag) => `[${tag}]`).join(" ")}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </details>
    </section>
  );
}

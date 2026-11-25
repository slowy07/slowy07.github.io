// @ts-expect-error runtime fs read; @types/node is not part of this frontend project
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { expect, test } from "vitest";
import html from "../index.html?raw";

const css = readFileSync("src/index.css", "utf8");
const tw = readFileSync("tailwind.config.js", "utf8");

test("declares Everblush palette tokens", () => {
  for (const token of [
    "--bg: #141b1e",
    "--surface: #232a2d",
    "--fg: #dadada",
    "--muted: #b3b9b8",
    "--line:",
    "#e57474",
    "#8ccf7e",
    "#67b0e8",
  ]) expect(`${css}\n${tw}`).toContain(token);
});

test("sets Everblush html metadata", () => {
  expect(html).toContain("<title>Arfy Slowy</title>");
  expect(html).toContain('name="theme-color" content="#141b1e"');
});

test("keeps primary foreground readable on background", () => {
  const luminance = (hex: string) => {
    const [r, g, b] = hex.slice(1).match(/../g)!.map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a: string, b: string) => {
    const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };
  expect(contrast("#dadada", "#141b1e")).toBeGreaterThan(7);
  expect(contrast("#b3b9b8", "#141b1e")).toBeGreaterThan(4.5);
});

test("has no cockpit source imports", () => {
  expect(existsSync("src/cockpit")).toBe(false);
  const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap((e: any) => {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) return walk(p);
    return /\.(ts|tsx|css)$/.test(e.name) ? [p] : [];
  });
  const sources = walk("src").filter((p) => !p.includes("/cockpit/") && !p.endsWith("theme.test.ts"));
  for (const p of sources) expect(readFileSync(p, "utf8")).not.toMatch(/cockpit\/|CockpitDashboard|DSKY|SIGNAL MAP/i);
});

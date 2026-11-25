import { render, screen, within } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import App from "./App";
import { CHANNELS, PROFILE, PROJECTS, SKILL_GROUPS } from "./data/portfolio";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
});

test("renders essential hero content", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /arfy slowy/i })).toBeInTheDocument();
  expect(screen.getAllByText(/software engineer/i).length).toBeGreaterThan(0);
  expect(screen.getByText(PROFILE.intro)).toBeInTheDocument();
});

test("renders about focus and essential sections", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /skills/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /contact/i })).toBeInTheDocument();
});

test("shows only four public projects as expandable panels", () => {
  window.location.hash = "#/projects";
  render(<App />);
  const section = screen.getByRole("region", { name: /projects/i });
  const publicProjects = PROJECTS.filter((p) => p.visibleProject.toLowerCase() === "public").slice(0, 4);
  const toggles = within(section).getAllByRole("button", { expanded: false });
  expect(toggles).toHaveLength(publicProjects.length);
  for (const project of publicProjects) {
    expect(within(section).getByText(project.title)).toBeInTheDocument();
  }
  window.history.replaceState(null, "", "/");
});

test("renders skill groups and contact channels", () => {
  render(<App />);
  for (const group of SKILL_GROUPS) expect(screen.getByText(group.label)).toBeInTheDocument();
  const contact = screen.getByRole("region", { name: /contact/i });
  for (const channel of CHANNELS) {
    const link = within(contact).getByRole("link", { name: new RegExp(channel.label, "i") });
    expect(link).toHaveAttribute("href", channel.href);
  }
});

test("has no hash routing behavior", () => {
  window.history.replaceState(null, "", "/");
  render(<App />);
  expect(window.location.hash).toBe("");
});

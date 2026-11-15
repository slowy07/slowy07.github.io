import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import App from "./App";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
});

test("boots the flight control system", () => {
  render(<App />);
  expect(screen.getByText(/FLIGHT CONTROL SYSTEM/i)).toBeInTheDocument();
  expect(screen.getByText(/SYSTEM ONLINE/i)).toBeInTheDocument();
  expect(screen.getByText(/INITIALIZING/i)).toBeInTheDocument();
});

test("section keys switch the monitor content and hash", async () => {
  render(<App />);

  const projectKey = screen.getByRole("button", {
    name: /^03 PROJECTS — MISSION FILES$/i,
  });
  fireEvent.click(projectKey);

  expect(
    await screen.findByText(/LunaOS/i, {}, { timeout: 5000 })
  ).toBeInTheDocument();
  expect(projectKey).toHaveAttribute("aria-pressed", "true");
  expect(window.location.hash).toBe("#/projects");
});

test("number keys select sections", async () => {
  render(<App />);

  fireEvent.keyDown(window, { key: "5" });

  expect(
    await screen.findByText(/MEMBER SUPPORT LOG/i, {}, { timeout: 5000 })
  ).toBeInTheDocument();
  expect(window.location.hash).toBe("#/contact");
});

test("renders the satellite tracking instrument", () => {
  render(<App />);

  expect(screen.getByText(/SATELLITE TRACKING/i)).toBeInTheDocument();
  expect(screen.getByText(/CBK-01/)).toBeInTheDocument();
  expect(screen.getByText(/ORBITAL VELOCITY/i)).toBeInTheDocument();
  expect(screen.getByText(/ORBIT STATUS/i)).toBeInTheDocument();
});

test("equipment manifest renders the cutaway and package bay", async () => {
  render(<App />);

  fireEvent.click(
    screen.getByRole("button", {
      name: /^02 ABOUT — PILOT RECORD$/i,
    })
  );

  expect(
    await screen.findByText(
      /EQUIPMENT MANIFEST \/ CUTAWAY/i,
      {},
      { timeout: 5000 }
    )
  ).toBeInTheDocument();
  expect(screen.getByText(/PACKAGE BAY/i)).toBeInTheDocument();
  expect(screen.getAllByText(/XEON W-11955M/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Endeavour OS \(Linux\)/i).length).toBeGreaterThan(0);
});

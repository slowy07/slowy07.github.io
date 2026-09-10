import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Requests, { formatRp } from "./Requests";

describe("formatRp", () => {
  test("formats nominal as Indonesian Rupiah", () => {
    expect(formatRp(5000000)).toMatch(/5\.000\.000/);
    expect(formatRp(0)).toMatch(/0/);
  });

  test("renders request list with nominal", () => {
    render(<Requests />);
    expect(screen.getByText(/MEMBER REQUESTS/)).toBeInTheDocument();
    expect(screen.getByText(/ahmad fauzi/i)).toBeInTheDocument();
    expect(screen.getByText(/2\.500\.000/)).toBeInTheDocument();
  });
});
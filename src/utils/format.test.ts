import { describe, expect, test } from "vitest";
import { formatRp } from "./format";

describe("formatRp", () => {
  test("formats nominal as Indonesian Rupiah", () => {
    expect(formatRp(5000000)).toMatch(/5\.000\.000/);
    expect(formatRp(0)).toMatch(/0/);
  });
});

// tests/readme.test.js
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

describe("README.md content check", () => {
  it("should contain the line 'this is super fun bro'", () => {
    const readmePath = join(process.cwd(), "README.md");
    const content = readFileSync(readmePath, "utf-8");

    expect(content).toContain("this is super fun bro");
  });
});

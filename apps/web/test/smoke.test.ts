import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const appRoot = resolve(import.meta.dirname, "..");

describe("web foundation smoke", () => {
  it("contains the branded status shell and shared UI configuration", () => {
    const page = readFileSync(resolve(appRoot, "app/[locale]/page.tsx"), "utf8");
    const components = readFileSync(resolve(appRoot, "components.json"), "utf8");

    expect(page).toContain("njiw");
    expect(page).toContain("Not implemented");
    expect(page).toContain("BrandWordmark");
    expect(components).toContain("@njiw/ui/components");
    expect(existsSync(resolve(appRoot, "app/globals.css"))).toBe(true);
  });
});

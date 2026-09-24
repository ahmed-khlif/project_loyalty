import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const appRoot = resolve(import.meta.dirname, "..");

describe("web foundation smoke", () => {
  it("contains the branded status shell and shared UI configuration", () => {
    const page = readFileSync(resolve(appRoot, "app/[locale]/page.tsx"), "utf8");
    const components = readFileSync(resolve(appRoot, "components.json"), "utf8");
    const messages = readFileSync(resolve(appRoot, "messages/en.json"), "utf8");
    const sharedStyles = readFileSync(resolve(appRoot, "../../packages/ui/src/styles/globals.css"), "utf8");

    expect(page).toContain("njiw");
    expect(page).toContain("getTranslations");
    expect(page).toContain("BrandLogo");
    expect(existsSync(resolve(appRoot, "public/logo.png"))).toBe(true);
    expect(messages).toContain("Not implemented");
    expect(messages).toContain("subscriptionsBody");
    expect(components).toContain("@njiw/ui/components");
    expect(sharedStyles).toContain('@source "../components"');
    expect(existsSync(resolve(appRoot, "app/globals.css"))).toBe(true);
    expect(existsSync(resolve(appRoot, "proxy.ts"))).toBe(true);
    expect(existsSync(resolve(appRoot, "messages/ar.json"))).toBe(true);
  });
});

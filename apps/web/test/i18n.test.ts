import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const appRoot = resolve(import.meta.dirname, "..");

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return prefix ? [prefix] : [];
  return Object.entries(value).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key));
}

describe("web locale foundation", () => {
  it("keeps French, Arabic, and English message keys aligned", () => {
    const catalogs = ["en", "fr", "ar"].map((locale) => JSON.parse(readFileSync(resolve(appRoot, `messages/${locale}.json`), "utf8")) as unknown);
    const expected = flattenKeys(catalogs[0]).sort();
    for (const catalog of catalogs) expect(flattenKeys(catalog).sort()).toEqual(expected);
  });

  it("contains Arabic copy for the RTL locale", () => {
    const arabic = readFileSync(resolve(appRoot, "messages/ar.json"), "utf8");
    expect(arabic).toMatch(/[\u0600-\u06ff]/);
  });
});

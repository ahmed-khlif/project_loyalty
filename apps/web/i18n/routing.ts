import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "ar", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  localeDetection: true
});

export type AppLocale = (typeof routing.locales)[number];

export function isArabicLocale(locale: string): boolean {
  return locale === "ar";
}

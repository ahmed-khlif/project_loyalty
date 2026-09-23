import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "njiw. — Loyalty, made clear",
  description: "A calm, trustworthy loyalty foundation for local cafés."
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

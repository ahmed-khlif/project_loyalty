import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params;
  if (!routing.locales.includes(rawLocale as AppLocale)) notFound();

  setRequestLocale(rawLocale as AppLocale);
  return children;
}

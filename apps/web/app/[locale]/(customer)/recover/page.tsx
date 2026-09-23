import { getTranslations } from "next-intl/server";
import { CustomerSection } from "@/components/role-pages";
import { CustomerFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function RecoverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "customer" });
  const states = await getTranslations({ locale, namespace: "states" });
  return <CustomerFrame locale={locale} active="account" title={t("recover")} description={t("accountBody")}><CustomerSection title={t("recover")} body={t("accountBody")} notice={t("notConnected")} state={{ loading: states("loading"), empty: states("empty"), error: states("error") }} /></CustomerFrame>;
}

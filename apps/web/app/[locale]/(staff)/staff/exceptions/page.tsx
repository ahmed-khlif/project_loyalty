import { getTranslations } from "next-intl/server";
import { StaffSection } from "@/components/role-pages";
import { StaffFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function StaffExceptionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "staff" });
  const states = await getTranslations({ locale, namespace: "states" });
  return <StaffFrame locale={locale} active="exceptions" title={t("exceptions")} description={t("exceptionsBody")}><StaffSection title={t("exceptions")} body={t("exceptionsBody")} state={{ loading: states("loading"), empty: states("empty"), error: states("error") }} /></StaffFrame>;
}

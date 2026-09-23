import { getTranslations } from "next-intl/server";
import { OperationsSection } from "@/components/role-pages";
import { MerchantFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function MerchantProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "merchant" });
  const states = await getTranslations({ locale, namespace: "states" });
  return <MerchantFrame locale={locale} active="programs" title={t("programs")} description={t("programsBody")}><OperationsSection title={t("programs")} body={t("programsBody")} state={{ loading: states("loading"), empty: states("empty"), error: states("error") }} /></MerchantFrame>;
}

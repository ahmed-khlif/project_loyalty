import { getTranslations } from "next-intl/server";
import { OperationsSection } from "@/components/role-pages";
import { MerchantFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function MerchantBranchesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "merchant" });
  const states = await getTranslations({ locale, namespace: "states" });
  return <MerchantFrame locale={locale} active="branches" title={t("team")} description={t("teamBody")}><OperationsSection title={t("team")} body={t("teamBody")} state={{ loading: states("loading"), empty: states("empty"), error: states("error") }} /></MerchantFrame>;
}

import { getTranslations } from "next-intl/server";
import { OperationsSection } from "@/components/role-pages";
import { AdminFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function AdminSubscriptionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "admin" });
  const states = await getTranslations({ locale, namespace: "states" });
  return <AdminFrame locale={locale} active="subscriptions" title={t("merchants")} description={t("queueBody")}><OperationsSection title={t("merchants")} body={t("queueBody")} state={{ loading: states("loading"), empty: states("empty"), error: states("error") }} /></AdminFrame>;
}

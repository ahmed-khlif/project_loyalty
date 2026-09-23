import { getTranslations } from "next-intl/server";
import { CustomerSection } from "@/components/role-pages";
import { CustomerFrame } from "@/components/route-shells";
import { PreviewNotice } from "@/components/role-shell";
import type { AppLocale } from "@/i18n/routing";

export default async function CredentialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "customer" });
  const states = await getTranslations({ locale, namespace: "states" });
  return <CustomerFrame locale={locale} active="membership" title={t("credential")} description={t("credentialBody")}><CustomerSection title={t("credential")} body={t("credentialBody")} notice={t("notConnected")} state={{ loading: states("loading"), empty: states("empty"), error: states("error") }}><PreviewNotice>{t("credentialBody")}</PreviewNotice></CustomerSection></CustomerFrame>;
}

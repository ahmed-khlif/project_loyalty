import { getTranslations } from "next-intl/server";
import { StaffScanner } from "@/components/role-pages";
import { StaffFrame } from "@/components/route-shells";
import type { AppLocale } from "@/i18n/routing";

export default async function StaffScanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as AppLocale;
  const t = await getTranslations({ locale, namespace: "staff" });
  return <StaffFrame locale={locale} active="scan" title={t("scanner")} description={t("scannerBody")}><StaffScanner strings={{ title: t("scanner"), body: t("scannerBody"), cameraDenied: t("cameraDenied"), unsupported: t("unsupported"), offline: t("offline"), cameraDisabled: t("scannerBody"), manualNotice: t("manualBody"), nothingSubmitted: t("offline") }} /></StaffFrame>;
}

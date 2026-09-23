import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { RoleShell } from "./role-shell";

type Role = "customer" | "staff" | "merchant" | "admin";

async function shellCopy(locale: AppLocale, role: Role) {
  const [common, nav, copy] = await Promise.all([
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: role })
  ]);
  return { common, nav, copy };
}

export async function CustomerFrame({ locale, active, title, description, children }: { locale: AppLocale; active: string; title: string; description: string; children: ReactNode }) {
  const { common, nav, copy } = await shellCopy(locale, "customer");
  return <RoleShell locale={locale} roleLabel={copy("eyebrow")} title={title} description={description} previewLabel={common("preview")} notConnectedLabel={copy("notConnected")} languageLabel={common("language")} backLabel={common("backHome")} navItems={[{ href: "/membership", label: nav("membership"), active: active === "membership" }, { href: "/rewards", label: nav("rewards"), active: active === "rewards" }, { href: "/activity", label: nav("activity"), active: active === "activity" }, { href: "/account", label: nav("account"), active: active === "account" }]}>{children}</RoleShell>;
}

export async function StaffFrame({ locale, active, title, description, children }: { locale: AppLocale; active: string; title: string; description: string; children: ReactNode }) {
  const { common, nav, copy } = await shellCopy(locale, "staff");
  return <RoleShell locale={locale} roleLabel={copy("eyebrow")} title={title} description={description} previewLabel={common("preview")} notConnectedLabel={copy("notConnected")} languageLabel={common("language")} backLabel={common("backHome")} navItems={[{ href: "/staff", label: nav("overview"), active: active === "overview" }, { href: "/staff/scan", label: nav("scan"), active: active === "scan" }, { href: "/staff/results", label: nav("results"), active: active === "results" }, { href: "/staff/exceptions", label: nav("exceptions"), active: active === "exceptions" }]}>{children}</RoleShell>;
}

export async function MerchantFrame({ locale, active, title, description, children }: { locale: AppLocale; active: string; title: string; description: string; children: ReactNode }) {
  const { common, nav, copy } = await shellCopy(locale, "merchant");
  return <RoleShell locale={locale} roleLabel={copy("eyebrow")} title={title} description={description} previewLabel={common("preview")} notConnectedLabel={copy("notConnected")} languageLabel={common("language")} backLabel={common("backHome")} navItems={[{ href: "/merchant", label: nav("overview"), active: active === "overview" }, { href: "/merchant/programs", label: nav("programs"), active: active === "programs" }, { href: "/merchant/activity", label: nav("customers"), active: active === "activity" }, { href: "/merchant/branches", label: nav("branches"), active: active === "branches" }, { href: "/merchant/billing", label: nav("billing"), active: active === "billing" }, { href: "/merchant/settings", label: nav("settings"), active: active === "settings" }]}>{children}</RoleShell>;
}

export async function AdminFrame({ locale, active, title, description, children }: { locale: AppLocale; active: string; title: string; description: string; children: ReactNode }) {
  const { common, nav, copy } = await shellCopy(locale, "admin");
  return <RoleShell locale={locale} roleLabel={copy("eyebrow")} title={title} description={description} previewLabel={common("preview")} notConnectedLabel={copy("notConnected")} languageLabel={common("language")} backLabel={common("backHome")} navItems={[{ href: "/admin", label: nav("overview"), active: active === "overview" }, { href: "/admin/merchants", label: nav("merchants"), active: active === "merchants" }, { href: "/admin/subscriptions", label: nav("subscriptions"), active: active === "subscriptions" }, { href: "/admin/support", label: nav("support"), active: active === "support" }, { href: "/admin/audit", label: nav("audit"), active: active === "audit" }]}>{children}</RoleShell>;
}

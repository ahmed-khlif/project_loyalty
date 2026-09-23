import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const labels: Record<AppLocale, string> = { fr: "FR", ar: "ع", en: "EN" };

export function LocaleSwitcher({ locale, label, href = "/" }: { locale: AppLocale; label: string; href?: string }) {
  return (
    <nav aria-label={label} className="flex items-center gap-1 rounded-full border border-border bg-card p-1 text-xs">
      {routing.locales.map((key) => (
        <Link key={key} href={href} locale={key} aria-current={key === locale ? "page" : undefined} className={`rounded-full px-3 py-2 font-medium ${key === locale ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
          {labels[key]}
        </Link>
      ))}
    </nav>
  );
}

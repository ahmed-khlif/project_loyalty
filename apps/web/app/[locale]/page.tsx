import Link from "next/link";
import { ArrowUpRight, Check, Globe2, ShieldCheck } from "lucide-react";
import { Button } from "@njiw/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@njiw/ui/components/card";

const locales = {
  fr: { label: "Français", dir: "ltr", eyebrow: "Fondation de l’application", title: "La fidélité, avec clarté.", body: "Une base locale, fiable et prête pour les cafés tunisiens. Cette interface est un shell de développement — aucun compte, scan ou tampon n’est encore actif." },
  ar: { label: "العربية", dir: "rtl", eyebrow: "أساس التطبيق", title: "ولاء واضح وموثوق.", body: "أساس محلي وموثوق للمقاهي التونسية. هذه الواجهة هي نسخة تأسيسية للتطوير — لا توجد حسابات أو عمليات مسح أو أختام مفعّلة بعد." },
  en: { label: "English", dir: "ltr", eyebrow: "Application foundation", title: "Loyalty, made clear.", body: "A calm, reliable foundation for Tunisian cafés. This is a development shell — accounts, scanning, and stamps are not active yet." }
} as const;

type Locale = keyof typeof locales;

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale in locales ? (rawLocale as Locale) : "fr";
  const copy = locales[locale];

  return (
    <main className="min-h-screen bg-canvas text-ink" dir={copy.dir} lang={locale}>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between gap-4">
          <Link className="text-xl font-semibold tracking-[-0.04em] text-forest" href={`/${locale}`}>
            njiw<span className="text-coffee">.</span>
          </Link>
          <nav aria-label="Language" className="flex items-center gap-1 rounded-full border border-forest/10 bg-surface p-1 text-xs">
            {Object.entries(locales).map(([key, item]) => (
              <Link key={key} className={`rounded-full px-3 py-1.5 ${key === locale ? "bg-forest text-white" : "text-forest/70 hover:text-forest"}`} href={`/${key}`}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-coffee/30 bg-coffee/10 px-3 py-1.5 text-sm text-forest">
              <span className="size-1.5 rounded-full bg-coffee" aria-hidden="true" />
              {copy.eyebrow}
            </p>
            <h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.07em] text-forest sm:text-7xl">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink/70">{copy.body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#status">Voir l’état de la fondation <ArrowUpRight className="size-4" aria-hidden="true" /></a>
              </Button>
              <Button asChild variant="outline">
                <a href="http://localhost:3001/api/v1/health/live">API liveness</a>
              </Button>
            </div>
          </div>

          <Card id="status" className="overflow-hidden border-forest/10 bg-surface shadow-sm">
            <CardHeader className="border-b border-forest/10 bg-forest text-white">
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-white">Foundation status</CardTitle>
                <ShieldCheck className="size-5 text-coffee" aria-hidden="true" />
              </div>
              <p className="text-sm text-white/70">Phase 2 · repository foundation</p>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              {[
                ["Responsive web shell", "Ready"],
                ["Shared UI baseline", "Ready"],
                ["API liveness", "Available"],
                ["Customer and loyalty flows", "Not implemented"]
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b border-forest/10 pb-4 last:border-0 last:pb-0">
                  <span className="text-sm text-ink/70">{label}</span>
                  <span className="flex items-center gap-1.5 text-right text-sm font-medium text-forest"><Check className="size-4 text-coffee" aria-hidden="true" />{value}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-lg bg-canvas p-3 text-sm text-ink/70"><Globe2 className="size-4 text-forest" aria-hidden="true" /> Français · العربية RTL · English scaffolding</div>
            </CardContent>
          </Card>
        </section>

        <footer className="flex flex-col gap-2 border-t border-forest/10 py-5 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <span>njiw. / نجيو · working brand concept</span>
          <span>Local foundation only — no production data</span>
        </footer>
      </div>
    </main>
  );
}

import { ArrowUpRight, LockKeyhole, Sparkles } from "lucide-react";
import { Card } from "@njiw/ui/components/card";

export function MembershipPreview({ label, title, body, status, slots }: { label: string; title: string; body: string; status: string; slots: string }) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-3 rounded-[2rem] bg-coffee/15 blur-2xl" aria-hidden="true" />
      <Card className="relative overflow-hidden rounded-[1.5rem] border-0 bg-forest p-7 text-white shadow-xl shadow-forest/15 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coffee">njiw. / نجيو</p>
            <p className="text-sm text-white/60">{label}</p>
          </div>
          <LockKeyhole className="size-5 text-coffee" aria-hidden="true" />
        </div>
        <div className="mt-16 max-w-sm space-y-3">
          <p className="break-words text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</p>
          <p className="break-words text-sm leading-6 text-white/70">{body}</p>
        </div>
        <div className="mt-10 grid grid-cols-6 gap-2 sm:gap-3" aria-label={slots}>
          {Array.from({ length: 6 }, (_, index) => <span key={index} className="aspect-square rounded-full border border-white/25 bg-white/5" aria-hidden="true" />)}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-4 text-xs text-white/60">
          <span>{status}</span>
          <span className="flex items-center gap-1.5 text-white"><Sparkles className="size-3.5 text-coffee" aria-hidden="true" />— / 6</span>
        </div>
      </Card>
      <div className="relative mx-5 -mt-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
        <span>{slots}</span>
        <ArrowUpRight className="size-4 shrink-0 text-coffee" aria-hidden="true" />
      </div>
    </div>
  );
}

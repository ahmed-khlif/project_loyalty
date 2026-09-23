import type { ReactNode } from "react";
import { ArrowUpRight, CircleCheck, LockKeyhole } from "lucide-react";
import { Button } from "@njiw/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@njiw/ui/components/card";
import { StatusBadge } from "@njiw/ui/components/states";
import { CustomerMembershipPanel, DashboardPreviewGrid, ScannerFrame, StateMatrix } from "./preview-panels";
import { PreviewNotice } from "./role-shell";

export function CustomerOverview({ strings, href }: { strings: { membership: string; progress: string; credential: string; reward: string; notConnected: string; progressUnavailable: string; credentialBody: string; rewardBody: string; noReward: string; progressReserved: string; noCounter: string }; href: string }) {
  return (
    <div className="space-y-6">
      <CustomerMembershipPanel membership={strings.membership} progress={strings.progress} credential={strings.credential} reward={strings.reward} notConnected={strings.notConnected} progressReserved={strings.progressReserved} noCounter={strings.noCounter} credentialNotice={strings.credentialBody} noReward={strings.noReward} rewardTerms={strings.rewardBody} />
      <div className="flex flex-wrap gap-3">
        <Button asChild><a href={href}>{strings.credential}<ArrowUpRight className="size-4" aria-hidden="true" /></a></Button>
        <StatusBadge status="neutral">{strings.progressUnavailable}</StatusBadge>
      </div>
    </div>
  );
}

export function CustomerSection({ title, body, notice, state, children }: { title: string; body: string; notice: string; state: { loading: string; empty: string; error: string }; children?: ReactNode }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent className="space-y-5"><p className="max-w-2xl leading-7 text-muted-foreground">{body}</p><PreviewNotice>{notice}</PreviewNotice>{children}</CardContent>
      </Card>
      <StateMatrix {...state} />
    </div>
  );
}

export function StaffOverview({ cards, notConnected }: { cards: Array<{ title: string; body: string }>; notConnected: string }) {
  return <div className="space-y-6"><DashboardPreviewGrid cards={cards} notConnected={notConnected} /><PreviewNotice><LockKeyhole className="mr-2 inline size-4" aria-hidden="true" />{notConnected}</PreviewNotice></div>;
}

export function StaffScanner({ strings }: { strings: { title: string; body: string; cameraDenied: string; unsupported: string; offline: string; cameraDisabled: string; manualNotice: string; nothingSubmitted: string } }) {
  return <ScannerFrame {...strings} />;
}

export function StaffSection({ title, body, state }: { title: string; body: string; state: { loading: string; empty: string; error: string } }) {
  return <div className="space-y-6"><Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><p className="max-w-2xl leading-7 text-muted-foreground">{body}</p></CardContent></Card><StateMatrix {...state} /></div>;
}

export function OperationsOverview({ cards, notConnected }: { cards: Array<{ title: string; body: string }>; notConnected: string }) {
  return <div className="space-y-6"><DashboardPreviewGrid cards={cards} notConnected={notConnected} /><Card><CardContent className="flex gap-3 p-5 text-sm leading-6 text-muted-foreground"><CircleCheck className="mt-0.5 size-5 shrink-0 text-coffee" aria-hidden="true" />{notConnected}</CardContent></Card></div>;
}

export function OperationsSection({ title, body, state, children }: { title: string; body: string; state: { loading: string; empty: string; error: string }; children?: ReactNode }) {
  return <div className="space-y-6"><Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="space-y-5"><p className="max-w-2xl leading-7 text-muted-foreground">{body}</p>{children}</CardContent></Card><StateMatrix {...state} /></div>;
}

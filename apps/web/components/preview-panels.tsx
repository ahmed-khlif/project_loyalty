import { CameraOff, ChartNoAxesCombined, CircleHelp, LayoutList, LockKeyhole, Settings2, ShieldAlert, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@njiw/ui/components/card";
import { EmptyState, ErrorState, LoadingState, StatusBadge } from "@njiw/ui/components/states";
import { PreviewNotice } from "./role-shell";

export function CustomerMembershipPanel({ membership, progress, credential, reward, notConnected, progressReserved, noCounter, credentialNotice, noReward, rewardTerms }: { membership: string; progress: string; credential: string; reward: string; notConnected: string; progressReserved: string; noCounter: string; credentialNotice: string; noReward: string; rewardTerms: string }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="overflow-hidden rounded-[1.5rem] shadow-md">
        <CardHeader className="bg-forest p-7 text-white sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-white">{membership}</CardTitle>
            <LockKeyhole className="size-5 text-coffee" aria-hidden="true" />
          </div>
          <p className="text-sm text-white/70">{credential}</p>
        </CardHeader>
        <CardContent className="space-y-6 p-7 sm:p-8">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">{progress}</p>
              <p className="mt-2 text-xl font-semibold text-foreground">—</p>
            </div>
            <StatusBadge status="neutral" className="max-w-full whitespace-normal">{notConnected}</StatusBadge>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-muted/50 p-5">
            <p className="text-sm font-medium text-foreground">{progressReserved}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{noCounter}</p>
          </div>
          <PreviewNotice>{credentialNotice}</PreviewNotice>
        </CardContent>
      </Card>
      <Card className="rounded-[1.5rem] border-coffee/30 shadow-sm">
        <CardHeader className="p-7 sm:p-8"><div className="mb-2 size-2 rounded-full bg-coffee" aria-hidden="true" /><CardTitle>{reward}</CardTitle></CardHeader>
        <CardContent className="px-7 pb-7 sm:px-8 sm:pb-8"><EmptyState title={noReward} description={rewardTerms} /></CardContent>
      </Card>
    </div>
  );
}

export function ScannerFrame({ title, body, cameraDenied, unsupported, offline, cameraDisabled, manualNotice, nothingSubmitted }: { title: string; body: string; cameraDenied: string; unsupported: string; offline: string; cameraDisabled: string; manualNotice: string; nothingSubmitted: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="rounded-[1.5rem] shadow-md">
        <CardHeader className="p-7 sm:p-8"><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary/40 bg-foreground p-8 text-center text-background" role="img" aria-label={body}>
            <div className="max-w-sm space-y-3">
              <CameraOff className="mx-auto size-10 text-primary" aria-hidden="true" />
              <p className="font-medium">{body}</p>
              <p className="text-sm text-background/70">{cameraDisabled}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <StatusBadge status="error">{cameraDenied}</StatusBadge>
            <StatusBadge status="warning">{unsupported}</StatusBadge>
            <StatusBadge status="neutral">{offline}</StatusBadge>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-5">
        <PreviewNotice><CircleHelp className="mr-2 inline size-4" aria-hidden="true" />{manualNotice}</PreviewNotice>
        <ErrorState>{nothingSubmitted}</ErrorState>
      </div>
    </div>
  );
}

const dashboardIcons = [LayoutList, ChartNoAxesCombined, UsersRound, Settings2];

export function DashboardPreviewGrid({ cards }: { cards: Array<{ title: string; body: string }> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card, index) => {
        const Icon = dashboardIcons[index % dashboardIcons.length];
        return <Card key={card.title} className="rounded-[1.25rem] border-border bg-card shadow-sm">
          <CardHeader className="flex-row items-start justify-between gap-4 p-6"><CardTitle className="text-base">{card.title}</CardTitle><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"><Icon className="size-4" aria-hidden="true" /></span></CardHeader>
          <CardContent className="px-6 pb-6"><p className="text-sm leading-6 text-muted-foreground">{card.body}</p></CardContent>
        </Card>;
      })}
    </div>
  );
}

export function StateMatrix({ loading, empty, error }: { loading: string; empty: string; error: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <LoadingState>{loading}</LoadingState>
      <EmptyState title={empty} />
      <ErrorState><ShieldAlert className="mr-2 inline size-4" aria-hidden="true" />{error}</ErrorState>
    </div>
  );
}

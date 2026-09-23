import { CameraOff, CircleHelp, LockKeyhole, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@njiw/ui/components/card";
import { EmptyState, ErrorState, LoadingState, StatusBadge } from "@njiw/ui/components/states";
import { PreviewNotice } from "./role-shell";

export function CustomerMembershipPanel({ membership, progress, credential, reward, notConnected, progressReserved, noCounter, credentialNotice, noReward, rewardTerms }: { membership: string; progress: string; credential: string; reward: string; notConnected: string; progressReserved: string; noCounter: string; credentialNotice: string; noReward: string; rewardTerms: string }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="overflow-hidden">
        <CardHeader className="bg-forest text-white">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-white">{membership}</CardTitle>
            <LockKeyhole className="size-5 text-coffee" aria-hidden="true" />
          </div>
          <p className="text-sm text-white/70">{credential}</p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{progress}</p>
              <p className="mt-2 text-xl font-semibold text-foreground">—</p>
            </div>
            <StatusBadge status="neutral">{notConnected}</StatusBadge>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-muted/50 p-5">
            <p className="text-sm font-medium text-foreground">{progressReserved}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{noCounter}</p>
          </div>
          <PreviewNotice>{credentialNotice}</PreviewNotice>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>{reward}</CardTitle></CardHeader>
        <CardContent><EmptyState title={noReward} description={rewardTerms} /></CardContent>
      </Card>
    </div>
  );
}

export function ScannerFrame({ title, body, cameraDenied, unsupported, offline, cameraDisabled, manualNotice, nothingSubmitted }: { title: string; body: string; cameraDenied: string; unsupported: string; offline: string; cameraDisabled: string; manualNotice: string; nothingSubmitted: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
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

export function DashboardPreviewGrid({ cards, notConnected }: { cards: Array<{ title: string; body: string }>; notConnected: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader><CardTitle className="text-base">{card.title}</CardTitle></CardHeader>
          <CardContent><p className="text-sm leading-6 text-muted-foreground">{card.body}</p><StatusBadge status="neutral" className="mt-4">{notConnected}</StatusBadge></CardContent>
        </Card>
      ))}
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

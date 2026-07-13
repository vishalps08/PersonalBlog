export function PostCardSkeleton() {
  return (
    <div className="flex animate-pulse gap-5 py-6">
      <div className="h-24 w-24 shrink-0 rounded bg-ash/10 dark:bg-ash/20" />
      <div className="min-w-0 flex-1 space-y-2 pt-1">
        <div className="h-3 w-24 rounded bg-ash/10 dark:bg-ash/20" />
        <div className="h-5 w-3/4 rounded bg-ash/10 dark:bg-ash/20" />
        <div className="h-3 w-full rounded bg-ash/10 dark:bg-ash/20" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="mb-4 animate-pulse">
      <div className="mb-5 h-[240px] w-full rounded-lg bg-ash/10 dark:bg-ash/20 sm:h-[360px]" />
      <div className="mb-2 h-3 w-32 rounded bg-ash/10 dark:bg-ash/20" />
      <div className="h-9 w-2/3 rounded bg-ash/10 dark:bg-ash/20" />
    </div>
  );
}
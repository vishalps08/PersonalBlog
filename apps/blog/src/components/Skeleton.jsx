export function PostCardSkeleton() {
  return (
    <div className="flex gap-5 py-6 sm:gap-6">
      <div className="skeleton-shimmer h-[88px] w-[88px] shrink-0 rounded-xl sm:h-[100px] sm:w-[100px]" />
      <div className="min-w-0 flex-1 space-y-2.5 pt-1">
        <div className="skeleton-shimmer h-3 w-24 rounded-full" />
        <div className="skeleton-shimmer h-5 w-3/4 rounded" />
        <div className="skeleton-shimmer h-3 w-full rounded" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl">
      <div className="skeleton-shimmer aspect-[16/9] w-full sm:aspect-[2/1]" />
    </div>
  );
}

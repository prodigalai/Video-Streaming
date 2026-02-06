import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  type?: "stream" | "video" | "creator";
  className?: string;
}

export function SkeletonCard({ type = "stream", className }: SkeletonCardProps) {
  if (type === "creator") {
    return (
      <div className={cn("rounded-xl overflow-hidden bg-card border border-border", className)}>
        <div className="h-20 bg-muted animate-pulse" />
        <div className="relative px-4 pb-4">
          <div className="-mt-8 mb-3">
            <div className="h-16 w-16 rounded-full bg-muted animate-pulse border-4 border-card" />
          </div>
          <div className="h-5 w-3/4 bg-muted animate-pulse rounded mb-2" />
          <div className="h-4 w-1/2 bg-muted animate-pulse rounded mb-3" />
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded mb-3" />
          <div className="h-9 w-full bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="aspect-video rounded-xl bg-muted animate-pulse" />
      <div className="flex gap-3">
        <div className="h-9 w-9 rounded-full bg-muted animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6, type = "stream" }: { count?: number; type?: "stream" | "video" | "creator" }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} type={type} />
      ))}
    </>
  );
}

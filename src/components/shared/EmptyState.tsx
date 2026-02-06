import { Radio, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        {icon || <VideoOff className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="glow-primary-sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function NoLiveStreams() {
  return (
    <EmptyState
      icon={<Radio className="h-10 w-10 text-muted-foreground" />}
      title="No Live Streams"
      description="There are no live streams at the moment. Check back later or explore on-demand content."
      action={{
        label: "Browse Videos",
        onClick: () => {},
      }}
    />
  );
}

export function NoResults({ query }: { query?: string }) {
  return (
    <EmptyState
      title="No Results Found"
      description={query ? `We couldn't find anything for "${query}". Try different keywords.` : "No results match your filters."}
    />
  );
}

export function NoContent() {
  return (
    <EmptyState
      title="Nothing Here Yet"
      description="This section is empty. Content will appear here once available."
    />
  );
}

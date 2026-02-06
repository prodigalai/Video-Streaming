import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CreatorCardProps {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner?: string;
  followers: number;
  isLive?: boolean;
  isFollowing?: boolean;
  className?: string;
}

export function CreatorCard({
  id,
  name,
  username,
  avatar,
  banner,
  followers,
  isLive = false,
  isFollowing = false,
  className,
}: CreatorCardProps) {
  return (
    <div className={cn("group card-hover rounded-xl overflow-hidden bg-card border border-border", className)}>
      {/* Banner */}
      <div className="relative h-20 bg-gradient-primary">
        {banner && (
          <img src={banner} alt="" className="w-full h-full object-cover" />
        )}
        {isLive && (
          <Badge
            variant="destructive"
            className="absolute top-2 right-2 bg-live glow-live text-white font-bold text-xs"
          >
            LIVE
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="relative px-4 pb-4">
        {/* Avatar */}
        <div className="relative -mt-8 mb-3">
          <Link to={`/creator/${id}`}>
            <img
              src={avatar}
              alt={name}
              className={cn(
                "h-16 w-16 rounded-full border-4 border-card transition-all",
                isLive && "ring-2 ring-live"
              )}
            />
            {isLive && (
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-live ring-2 ring-card live-pulse" />
            )}
          </Link>
        </div>

        {/* Info */}
        <Link to={`/creator/${id}`} className="block mb-3">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </Link>

        {/* Stats */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <Users className="h-4 w-4" />
          <span>{followers >= 1000 ? `${(followers / 1000).toFixed(1)}K` : followers} followers</span>
        </div>

        {/* Action */}
        <Button
          variant={isFollowing ? "secondary" : "default"}
          size="sm"
          className="w-full"
          onClick={(e) => e.preventDefault()}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  );
}

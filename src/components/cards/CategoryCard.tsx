import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CategoryCardProps {
  name: string;
  image: string;
  count?: number;
  tags?: string[];
  className?: string;
  onClick?: () => void;
}

export function CategoryCard({ name, image, count, tags = ["FPS", "Shooter"], className, onClick }: CategoryCardProps) {
  return (
    <div 
      className={cn("group flex flex-col gap-2 cursor-pointer w-full", className)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3.5/4.5] overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
      </div>

      {/* Details */}
      <div className="space-y-0.5">
        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
          {name}
        </h3>
        {count !== undefined && (
          <p className="text-xs text-muted-foreground font-medium">
            {count}K watching
          </p>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {tags && tags.slice(0, 2).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="px-1.5 py-0 text-[10px] h-5 bg-white/10 hover:bg-white/20 text-muted-foreground border-transparent font-medium rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

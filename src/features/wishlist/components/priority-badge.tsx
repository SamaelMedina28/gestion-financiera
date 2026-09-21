import { Badge } from "@/components/ui/badge";
import { PRIORITY_META, type Priority } from "@/features/wishlist/types";
import { cn } from "@/lib/utils";

const PRIORITY_STYLES: Record<Priority, string> = {
  HIGH: "bg-destructive/10 text-destructive ring-destructive/20",
  MEDIUM: "bg-primary/10 text-primary ring-primary/20",
  LOW: "bg-muted text-muted-foreground ring-border",
};

export function PriorityBadge({ priority }: { priority: Priority | null }) {
  if (!priority) {
    // TODO: decide si "Sin prioridad" debe existir en el back o si priority será requerido.
    return (
      <Badge variant="outline" className="shrink-0">
        Sin prioridad
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      title={PRIORITY_META[priority].hint}
      className={cn("shrink-0 ring-1", PRIORITY_STYLES[priority])}
    >
      {PRIORITY_META[priority].label}
    </Badge>
  );
}

import type { LucideIcon } from "lucide-react";

interface SectionPlaceholderProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  todo: string;
}

export function SectionPlaceholder({
  icon: Icon,
  eyebrow,
  title,
  description,
  todo,
}: SectionPlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{eyebrow}</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Icon className="size-6 text-muted-foreground" />
        </span>
        <p className="font-medium">Módulo en diseño</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          La navegación y el layout ya están listos. Falta la funcionalidad.
        </p>
        <p className="max-w-md rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          TODO: {todo}
        </p>
      </div>
    </div>
  );
}

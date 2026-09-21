import { HeartCrack } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WishlistEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-muted">
        <HeartCrack className="size-6 text-muted-foreground" />
      </span>
      <div>
        <p className="font-medium">Tu wishlist está vacía</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Agrega eso que quieres comprar para ordenarlo por prioridad y no
          perderlo de vista.
        </p>
      </div>
      {/* TODO: este botón ya navega a /wishlist/new. Solo falta el back. */}
      <Link href="/wishlist/new" className={cn(buttonVariants())}>
        Agregar mi primer deseo
      </Link>
    </div>
  );
}

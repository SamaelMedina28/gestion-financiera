import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MOCK_WISHLIST } from "@/features/wishlist/mock-data";
import { WishlistGrid } from "@/features/wishlist/components/wishlist-grid";
import { formatPrice } from "@/features/wishlist/types";
import { cn } from "@/lib/utils";

export default function WishlistPage() {
  // TODO: reemplaza MOCK_WISHLIST por datos reales del usuario.
  // Sugerencia: `const products = await getWishlistProducts(userId)` + filtros por prioridad.
  const products = MOCK_WISHLIST;
  const total = products.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="space-y-6">
      {/* Encabezado: acción principal arriba en desktop, FAB abajo en móvil */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Wishlist</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Mis deseos
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} productos · Total {formatPrice(total)}
          </p>
        </div>
        <Link
          href="/wishlist/new"
          className={cn(buttonVariants(), "hidden sm:inline-flex")}
        >
          <Plus />
          Agregar producto
        </Link>
      </div>

      {/* TODO: agrega filtros/sort UI aquí (prioridad, precio) cuando hagas el back. */}
      <WishlistGrid products={products} />

      {/* FAB móvil: pulgar-friendly, abajo a la derecha sobre el tabbar */}
      <Link
        href="/wishlist/new"
        aria-label="Agregar producto"
        className={cn(
          buttonVariants({ size: "icon-lg" }),
          "fixed right-4 bottom-24 z-40 rounded-full shadow-lg sm:hidden"
        )}
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
}

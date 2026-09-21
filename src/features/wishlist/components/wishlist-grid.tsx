import type { WishlistProduct } from "@/features/wishlist/types";
import { WishlistCard } from "@/features/wishlist/components/wishlist-card";
import { WishlistEmptyState } from "@/features/wishlist/components/wishlist-empty-state";

interface WishlistGridProps {
  products: WishlistProduct[];
}

export function WishlistGrid({ products }: WishlistGridProps) {
  // TODO: mueve el fetch + filtros + orden al servidor.
  // Este grid es solo presentación: 1 col en móvil, 2 en sm, 3 en lg.
  if (products.length === 0) return <WishlistEmptyState />;

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id} className="h-full">
          <WishlistCard product={product} />
        </li>
      ))}
    </ul>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WishlistForm } from "@/features/wishlist/components/wishlist-form";

export default function WishlistNewPage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Wishlist / Nuevo</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Agregar producto
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Guarda lo que quieres comprar con su precio y prioridad.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detalles del producto</CardTitle>
          <CardDescription>
            Basado en el schema <code>Product</code> de Prisma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: conecta el submit a tu server action createProduct */}
          <WishlistForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}

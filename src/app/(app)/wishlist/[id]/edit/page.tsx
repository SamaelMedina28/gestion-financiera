import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_WISHLIST } from "@/features/wishlist/mock-data";
import { WishlistForm } from "@/features/wishlist/components/wishlist-form";
import { cn } from "@/lib/utils";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function WishlistEditPage({ params }: EditPageProps) {
  const { id } = await params;

  // TODO: reemplaza por fetch real: `await getProductById(id, userId)`.
  // Si no existe o no es del usuario -> notFound() o redirect.
  const product = MOCK_WISHLIST.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Link
        href="/wishlist"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-fit")}
      >
        <ArrowLeft />
        Volver a la wishlist
      </Link>

      <div>
        <p className="text-sm text-muted-foreground">Wishlist / Editar</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Editar producto
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Actualiza los datos de “{product.name}”.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detalles del producto</CardTitle>
          <CardDescription>
            Los cambios se guardarán para este producto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* TODO: conecta el submit a tu server action updateProduct(id, data) */}
          <WishlistForm
            mode="edit"
            defaultValues={{
              name: product.name,
              description: product.description,
              price: product.price,
              priority: product.priority,
              link: product.link,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

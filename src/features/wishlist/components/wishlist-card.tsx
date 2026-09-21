"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatPrice,
  type WishlistProduct,
} from "@/features/wishlist/types";
import { PriorityBadge } from "@/features/wishlist/components/priority-badge";
import { WishlistDeleteDialog } from "@/features/wishlist/components/wishlist-delete-dialog";
import { cn } from "@/lib/utils";

interface WishlistCardProps {
  product: WishlistProduct;
}

export function WishlistCard({ product }: WishlistCardProps) {
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  return (
    <>
      <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2 text-base">{product.name}</CardTitle>
            <PriorityBadge priority={product.priority} />
          </div>
          <CardDescription className="line-clamp-2 min-h-10">
            {product.description ?? "Sin descripción."}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-auto">
          {/* TODO: usa la moneda del usuario desde settings cuando exista */}
          <p className="text-2xl font-semibold tracking-tight">
            {formatPrice(product.price)}
          </p>
          {product.link ? (
            <a
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex max-w-full items-center gap-1 truncate text-sm text-primary hover:underline"
            >
              <ExternalLink className="size-3.5 shrink-0" />
              <span className="truncate">Ver enlace</span>
            </a>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">Sin enlace</p>
          )}
        </CardContent>

        <CardFooter className="flex gap-2">
          <Link
            href={`/wishlist/${product.id}/edit`}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1")}
          >
            <Pencil />
            Editar
          </Link>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 />
            Eliminar
          </Button>
        </CardFooter>
      </Card>

      <WishlistDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        productName={product.name}
        // TODO: pasa el id real y ejecuta la eliminación en el padre/servidor.
        // productId={product.id}
      />
    </>
  );
}

"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  PRIORITY_OPTIONS,
  type WishlistProduct,
} from "@/features/wishlist/types";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { createWishListItem, State } from "../actions/createWishListItem";
import { useRouter } from "next/navigation";

interface WishlistFormProps {
  mode: "create" | "edit";
  // TODO: en edit, pasa el producto real desde el servidor.
  // En create, no pases nada.
  defaultValues?: Partial<WishlistProduct>;
}

// Formulario espejo del model Product en Prisma:
// name, description?, price, priority?, link?
export function WishlistForm({ mode, defaultValues }: WishlistFormProps) {
  const isEdit = mode === "edit";
  const router = useRouter();
  const   [state, formAction] = useActionState<State, FormData>(createWishListItem, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      router.push("/wishlist");
    }
  }, [state.success, router]);

  return (
    <form
      className="space-y-5"
      action={formAction}
    >
      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del producto</Label>
        <Input
          id="name"
          name="name"
          placeholder="Ej. Audífonos over-ear"
          required
          minLength={2}
          maxLength={80}
          defaultValue={defaultValues?.name ?? ""}
          autoComplete="off"
        />
        {/* TODO: muestra fieldErrors del servidor aquí */}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <Label htmlFor="description">Descripción</Label>
          <span className="text-xs text-muted-foreground">Opcional</span>
        </div>
        <Textarea
          id="description"
          name="description"
          placeholder="Detalles, modelo, color, dónde lo viste…"
          rows={3}
          maxLength={500}
          defaultValue={defaultValues?.description ?? ""}
        />
      </div>

      {/* Precio + Prioridad: 2 columnas en desktop, 1 en móvil */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="price"
              name="price"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              placeholder="0.00"
              required
              defaultValue={defaultValues?.price ?? ""}
              className="pl-7"
            />
          </div>
          {/* TODO: valida price > 0 en el servidor (Float en Prisma) */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select
            name="priority"
            defaultValue={defaultValues?.priority ?? undefined}
          >
            <SelectTrigger id="priority" className="w-full">
              <SelectValue placeholder="Selecciona prioridad" />
            </SelectTrigger>
            <SelectContent>
              {/* TODO: decide si permites "sin prioridad" (null en Prisma) */}
              {PRIORITY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Opcional. Puedes dejarlo sin elegir.
          </p>
        </div>
      </div>

      {/* Link */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <Label htmlFor="link">Enlace</Label>
          <span className="text-xs text-muted-foreground">Opcional</span>
        </div>
        <Input
          id="link"
          name="link"
          type="url"
          inputMode="url"
          placeholder="https://tienda.com/producto"
          defaultValue={defaultValues?.link ?? ""}
        />
      </div>

      {/* Acciones: sticky en móvil para fácil alcance */}
      <div className="sticky bottom-20 flex flex-col-reverse gap-2 pt-2 sm:static sm:flex-row sm:justify-end md:bottom-0">
        <Link
          href="/wishlist"
          className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
        >
          Cancelar
        </Link>
        <Button type="submit" className="w-full sm:w-auto">
          {isEdit ? "Guardar cambios" : "Agregar a la wishlist"}
        </Button>
      </div>
    </form>
  );
}

// Tipos del módulo Wishlist.
// TODO: genera este tipo desde Prisma cuando conectes el back
// (ej. `import type { Product, Priority } from "@/generated/prisma/client"`).
// Por ahora es un espejo manual del schema para diseñar sin lógica.

export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface WishlistProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  priority: Priority | null;
  link: string | null;
}

export const PRIORITY_META: Record<
  Priority,
  { label: string; hint: string }
> = {
  HIGH: { label: "Alta", hint: "Lo quiero pronto" },
  MEDIUM: { label: "Media", hint: "Cuando se pueda" },
  LOW: { label: "Baja", hint: "Sin prisa" },
};

export const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: "HIGH", label: "Alta" },
  { value: "MEDIUM", label: "Media" },
  { value: "LOW", label: "Baja" },
];

// TODO: reemplaza por fetch real (server action / route handler con userId).
export function formatPrice(value: number, currency = "MXN") {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

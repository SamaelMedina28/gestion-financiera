import { Heart, PiggyBank, Wallet, type LucideIcon } from "lucide-react";

// TODO: Ajusta el nombre/tagline si quieres otra identidad de marca.
export const APP_IDENTITY = {
  name: "Finanzas",
  shortName: "F",
  tagline: "Tus metas, gastos y ahorros en un solo lugar",
  description:
    "Organiza tu wishlist, controla tus gastos y haz crecer tu ahorro.",
} as const;

export type AppSectionId = "wishlist" | "expenses" | "savings";

export interface AppSection {
  id: AppSectionId;
  label: string;
  shortLabel: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export const APP_SECTIONS: AppSection[] = [
  {
    id: "wishlist",
    label: "Wishlist",
    shortLabel: "Lista",
    href: "/wishlist",
    icon: Heart,
    description: "Cosas que quieres comprar, ordenadas por prioridad.",
  },
  {
    id: "expenses",
    label: "Gastos",
    shortLabel: "Gastos",
    href: "/expenses",
    icon: Wallet,
    description: "Registra y categoriza tus gastos del día a día.",
  },
  {
    id: "savings",
    label: "Ahorro",
    shortLabel: "Ahorro",
    href: "/savings",
    icon: PiggyBank,
    description: "Metas de ahorro y progreso mensual.",
  },
];

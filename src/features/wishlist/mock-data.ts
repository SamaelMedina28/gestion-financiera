import type { WishlistProduct } from "@/features/wishlist/types";

// TODO: elimina este mock cuando conectes la base de datos.
// Solo existe para diseñar el index/cards en móvil y desktop.
export const MOCK_WISHLIST: WishlistProduct[] = [
  {
    id: "mock-1",
    name: "Audífonos over-ear",
    description: "Para trabajar y estudiar sin ruido. Modelo con cancelación activa.",
    price: 2499,
    priority: "HIGH",
    link: "https://ejemplo.com/audifonos",
  },
  {
    id: "mock-2",
    name: "Silla ergonómica",
    description: "Mi espalda lo agradecerá. Buscar con reposabrazos ajustables.",
    price: 4800,
    priority: "MEDIUM",
    link: null,
  },
  {
    id: "mock-3",
    name: "Curso de finanzas personales",
    description: null,
    price: 899,
    priority: "HIGH",
    link: "https://ejemplo.com/curso",
  },
  {
    id: "mock-4",
    name: "Bicicleta urbana",
    description: "Rodada 700, ideal para ir al trabajo. Segunda mano también vale.",
    price: 9500,
    priority: "LOW",
    link: null,
  },
  {
    id: "mock-5",
    name: "Monitor 27\" 1440p",
    description: "Para programar más cómodo. IPS de preferencia.",
    price: 6200,
    priority: "MEDIUM",
    link: "https://ejemplo.com/monitor",
  },
  {
    id: "mock-6",
    name: "Fondo de emergencia (aporte)",
    description: "No es un producto, pero lo trato como wishlist para no gastarlo.",
    price: 10000,
    priority: null,
    link: null,
  },
];

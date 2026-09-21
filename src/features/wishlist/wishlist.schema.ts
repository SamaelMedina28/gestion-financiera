
import * as z from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().optional(),
    price: z.string().min(0, "El precio debe ser mayor a 0").refine((value) => !isNaN(Number(value)), "El precio debe ser un número"),
    priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
    link: z.string().url().optional(),
})

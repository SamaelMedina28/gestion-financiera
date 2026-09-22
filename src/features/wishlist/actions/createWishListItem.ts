"use server";

import { revalidatePath } from "next/cache";
import { addWishlistService } from "../services/wishlist.services";
import { Priority } from "../types";
import { productSchema } from "../wishlist.schema";

export interface State {
    success?: boolean;
    error?: string;
    fieldErrors?: Partial<
        Record<"name" | "description" | "price" | "priority" | "link", string[]>
    >;
    data?: {
        name: string;
        description: string | null;
        price: number;
        priority: Priority | null;
        link: string | null;
    };
}

export const createWishListItem = async (
    prevState: State,
    formData: FormData,
): Promise<State> => {
    try {
        const validation = productSchema.safeParse({
            name: formData.get("name"),
            description: formData.get("description") || undefined,
            price: formData.get("price"),
            priority: formData.get("priority") || undefined,
            link: formData.get("link") || undefined,
        });

        console.log("validation:", validation.error?.issues);
        if (!validation.success) {
            return {
                success: false,
                fieldErrors: validation.error.flatten().fieldErrors,
            };
        }

        const { name, description, price, priority, link } = validation.data;

        const product = await addWishlistService({
            name,
            description,
            price: Number(price),
            priority: priority as Priority,
            link,
        });

        revalidatePath("/wishlist");
        return { success: true, data: product };
    } catch (error) {
        console.log(error);
        return { success: false, error: (error as Error).message };
    }
};
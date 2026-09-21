'use server';

import { revalidatePath } from "next/cache";
import { addWishlistService } from "../services/wishlist.services";
import { Priority } from "../types";

interface State {
    success?: boolean;
    error?: string;
    data?: { name: string, description: string | null, price: number, priority: Priority | null, link: string | null };
}

export const createWishListItem = async (prevState: State, formData: FormData): Promise<State> => {
    try {
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price') as string;
        const priority = formData.get('priority') as string;
        const link = formData.get('link') as string;
        const priorityEnum = priority as Priority;
        const product = await addWishlistService({ name, description, price: Number(price), priority: priorityEnum, link });
        revalidatePath('/wishlist');
        return {
            success: true,
            data: product,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}
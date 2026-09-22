import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Priority, WishlistProduct } from "../types";

export const getWishlistService = async () => {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("No se pudo obtener la sesión");
    }
    const products = await db.product.findMany({
        where: {
            userId: session.user.id,
        },
    });
    const total = products.reduce(
        (acc: number, p: WishlistProduct) => acc + p.price,
        0,
    );
    return { products, total };
};

export const addWishlistService = async (data: { name: string, description: string | undefined, price: number, priority: Priority | undefined, link: string | undefined }) => {
    const session = await auth();
    console.log("session:", session);
    if (!session?.user?.id) {
        throw new Error("No se pudo obtener la sesión");
    }
    const product = await db.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            priority: data.priority,
            link: data.link,
            userId: session.user.id,
        },
    });
    return product;
}
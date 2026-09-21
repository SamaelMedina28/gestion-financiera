import { auth } from "@/auth";
import { db } from "@/lib/db";
import { WishlistProduct } from "../types";

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

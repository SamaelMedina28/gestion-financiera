import { auth } from "@/auth";
import { db } from "@/lib/db";

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
    const total = products.reduce((acc: number, p: Product) => acc + p.price, 0);
    return { products, total };
};

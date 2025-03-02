import { Product } from "../types/product";

export default async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Грешка при зареждане на продукти");

        const data: Product[] = await res.json();
        return data;
    } catch (error) {
        console.error("Грешка при взимане на продуктите:", error);
        return [];
    }
}
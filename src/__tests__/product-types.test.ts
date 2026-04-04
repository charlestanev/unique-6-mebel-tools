import { describe, it, expect } from "vitest";
import type { Product } from "@/types/product";

describe("Product type", () => {
    it("allows creating a product with required fields", () => {
        const product: Product = {
            id: "test-id-1",
            name: "CNC Рутер",
            description: "Професионален CNC рутер",
            image: "/images/cnc.jpg",
            category: "машини",
        };
        expect(product.id).toBe("test-id-1");
        expect(product.name).toBe("CNC Рутер");
        expect(product.price).toBeUndefined();
        expect(product.subcategory).toBeUndefined();
        expect(product.media).toBeUndefined();
    });

    it("allows creating a product with all fields", () => {
        const product: Product = {
            id: "test-id-2",
            name: "Диамантен диск",
            price: 250,
            description: "Диск за рязане на камък",
            image: "/images/disc.jpg",
            category: "инструменти",
            subcategory: "диамантени инструменти",
            media: ["/images/disc-2.jpg", "https://youtube.com/watch?v=abc"],
        };
        expect(product.price).toBe(250);
        expect(product.subcategory).toBe("диамантени инструменти");
        expect(product.media).toHaveLength(2);
    });
});

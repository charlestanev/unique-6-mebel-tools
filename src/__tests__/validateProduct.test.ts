import { describe, it, expect } from "vitest";
import validateProduct from "@/utils/validateProduct";

describe("validateProduct", () => {
    it("returns null for a valid product", () => {
        const product = {
            name: "CNC Рутер",
            description: "Професионален CNC рутер за дърво и МДФ",
            image: "https://example.com/cnc.jpg",
            category: "машини" as const,
        };
        expect(validateProduct(product)).toBeNull();
    });

    it("returns null for a valid product with optional price", () => {
        const product = {
            name: "Диамантен диск",
            price: 150,
            description: "Висококачествен диск за рязане на гранит",
            image: "https://example.com/disc.jpg",
            category: "инструменти" as const,
            subcategory: "дискове",
        };
        expect(validateProduct(product)).toBeNull();
    });

    it("returns error for name shorter than 3 chars", () => {
        const product = {
            name: "AB",
            description: "Това е валидно описание на продукт",
            image: "https://example.com/img.jpg",
            category: "машини" as const,
        };
        const error = validateProduct(product);
        expect(error).not.toBeNull();
        expect(error).toContain("3 символа");
    });

    it("returns error for description shorter than 10 chars", () => {
        const product = {
            name: "Фрезер",
            description: "Кратко",
            image: "https://example.com/img.jpg",
            category: "инструменти" as const,
        };
        const error = validateProduct(product);
        expect(error).not.toBeNull();
        expect(error).toContain("10 символа");
    });

    it("returns error for invalid image URL", () => {
        const product = {
            name: "Фрезер",
            description: "Професионален фрезер за дървообработка",
            image: "not-a-url",
            category: "инструменти" as const,
        };
        const error = validateProduct(product);
        expect(error).not.toBeNull();
    });

    it("returns error for invalid category", () => {
        const product = {
            name: "Фрезер",
            description: "Професионален фрезер за дървообработка",
            image: "https://example.com/img.jpg",
            category: "невалидна" as const,
        };
        const error = validateProduct(product);
        expect(error).not.toBeNull();
    });

    it("returns error for missing required fields", () => {
        const error = validateProduct({});
        expect(error).not.toBeNull();
    });

    it("allows product without price (optional)", () => {
        const product = {
            name: "Софтуер CAD",
            description: "Професионален софтуер за проектиране на мебели",
            image: "https://example.com/soft.jpg",
            category: "софтуер" as const,
        };
        expect(validateProduct(product)).toBeNull();
    });
});

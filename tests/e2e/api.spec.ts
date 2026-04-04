import { test, expect } from "@playwright/test";

test.describe("API endpoints", () => {
    test("GET /api/products should return products array", async ({ request }) => {
        const response = await request.get("/api/products");
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
    });

    test("GET /api/products should return products with required fields", async ({ request }) => {
        const response = await request.get("/api/products");
        const data = await response.json();
        if (data.length > 0) {
            const product = data[0];
            expect(product).toHaveProperty("id");
            expect(product).toHaveProperty("name");
            expect(product).toHaveProperty("description");
            expect(product).toHaveProperty("image");
            expect(product).toHaveProperty("category");
        }
    });

    test("POST /api/products without auth should fail", async ({ request }) => {
        const response = await request.post("/api/products", {
            data: {
                name: "Test Product",
                description: "This is a test",
                image: "/images/test.jpg",
                category: "машини",
            },
        });
        // Should be 401 Unauthorized
        expect(response.status()).toBe(401);
    });

    test("DELETE /api/products without auth should fail", async ({ request }) => {
        const response = await request.delete("/api/products", {
            data: { id: "fake-id" },
        });
        expect(response.status()).toBe(401);
    });

    test("GET /api/auth-check without cookie should return false", async ({ request }) => {
        const response = await request.get("/api/auth-check");
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data.authenticated).toBe(false);
    });
});

test.describe("SEO", () => {
    test("should have robots.txt", async ({ request }) => {
        const response = await request.get("/robots.txt");
        expect(response.status()).toBe(200);
    });

    test("should have sitemap.xml", async ({ request }) => {
        const response = await request.get("/sitemap.xml");
        expect(response.status()).toBe(200);
    });
});

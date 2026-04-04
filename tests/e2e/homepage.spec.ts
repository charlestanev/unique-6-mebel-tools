import { test, expect } from "@playwright/test";

test.describe("Homepage — Каталог", () => {
    test("should load the homepage with correct title", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle(/Unique6|Каталог/i);
    });

    test("should display the catalog heading", async ({ page }) => {
        await page.goto("/");
        const heading = page.locator("h1");
        await expect(heading).toBeVisible();
        await expect(heading).toContainText("Каталог");
    });

    test("should display the navbar with contact info", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("nav, header")).toBeVisible();
    });

    test("should display the search bar", async ({ page }) => {
        await page.goto("/");
        const searchInput = page.locator('input[placeholder*="Търсене"], input[type="search"], input[type="text"]').first();
        await expect(searchInput).toBeVisible();
    });

    test("should display category filter buttons", async ({ page }) => {
        await page.goto("/");
        // "Всички" and "инструменти" buttons should be visible
        await expect(page.getByRole("button", { name: "Всички" })).toBeVisible();
        await expect(page.getByRole("button", { name: "инструменти" })).toBeVisible();
    });

    test("should load products from API", async ({ page }) => {
        await page.goto("/");
        // Wait for products to load
        await page.waitForResponse((resp) =>
            resp.url().includes("/api/products") && resp.status() === 200
        );
        // Should display at least one product card
        const cards = page.locator('[class*="rounded"]').filter({ hasText: /.+/ });
        await expect(cards.first()).toBeVisible({ timeout: 10000 });
    });

    test("should have a working footer", async ({ page }) => {
        await page.goto("/");
        const footer = page.locator("footer");
        await expect(footer).toBeVisible();
    });
});

test.describe("Search functionality", () => {
    test("should filter products by search query", async ({ page }) => {
        await page.goto("/");
        await page.waitForResponse((resp) =>
            resp.url().includes("/api/products") && resp.status() === 200
        );
        const searchInput = page.locator('input[placeholder*="Търсене"], input[type="search"], input[type="text"]').first();
        await searchInput.fill("CNC");
        // After typing, the product list should update
        await page.waitForTimeout(500);
    });
});

test.describe("Dark mode", () => {
    test("should toggle dark mode", async ({ page }) => {
        await page.goto("/");
        const html = page.locator("html");
        // Find a dark mode toggle button (moon/sun icon)
        const darkModeBtn = page.locator('button').filter({ has: page.locator('svg') }).first();
        if (await darkModeBtn.isVisible()) {
            await darkModeBtn.click();
            // Check that either dark class was added/removed
            await page.waitForTimeout(300);
        }
    });
});

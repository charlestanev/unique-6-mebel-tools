import { test, expect } from "@playwright/test";

test.describe("Admin login", () => {
    test("should display the admin login page", async ({ page }) => {
        await page.goto("/admin-login");
        const heading = page.locator("h1, h2").first();
        await expect(heading).toBeVisible();
    });

    test("should show error for wrong credentials", async ({ page }) => {
        await page.goto("/admin-login");
        await page.fill('input[type="text"], input[name="username"]', "wrong");
        await page.fill('input[type="password"]', "wrongpass");
        const submitBtn = page.locator('button[type="submit"], button').filter({ hasText: /вход|login|влез/i }).first();
        await submitBtn.click();
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/admin-login/);
    });

    test("should redirect unauthenticated users from admin to login", async ({ page }) => {
        await page.goto("/admin");
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(/admin-login/);
    });
});

test.describe("Static pages", () => {
    test("should load terms page", async ({ page }) => {
        await page.goto("/terms");
        const heading = page.locator("h1").first();
        await expect(heading).toBeVisible();
    });

    test("should load privacy policy page", async ({ page }) => {
        await page.goto("/privacy-policy");
        const heading = page.locator("h1").first();
        await expect(heading).toBeVisible();
    });

    test("should load cookies policy page", async ({ page }) => {
        await page.goto("/cookies-policy");
        const heading = page.locator("h1").first();
        await expect(heading).toBeVisible();
    });

    test("should display 404 page for invalid routes", async ({ page }) => {
        await page.goto("/nonexistent-page");
        await expect(page.getByText("404")).toBeVisible();
    });
});

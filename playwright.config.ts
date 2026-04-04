import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/e2e",
    timeout: 30000,
    retries: 0,
    use: {
        baseURL: "http://localhost:3000",
        headless: true,
        viewport: { width: 1280, height: 720 },
    },
    webServer: {
        command: "npm run dev",
        port: 3000,
        timeout: 30000,
        reuseExistingServer: true,
    },
    projects: [
        {
            name: "chromium",
            use: { browserName: "chromium" },
        },
    ],
});

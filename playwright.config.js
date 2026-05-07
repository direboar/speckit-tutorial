import { defineConfig } from "@playwright/test";

const port = process.env.PORT || "4173";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: `http://127.0.0.1:${port}`
  },
  webServer: {
    command: `node scripts/dev-server.mjs --port ${port}`,
    port: Number(port),
    reuseExistingServer: true,
    timeout: 30_000
  }
});


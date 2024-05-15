import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";

import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./setupTests.ts"],
  },
});

import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

// this file is tempoorary to get around error that remix/vite is throwing "Error: Remix Vite plugin can't detect preamble. Something is wrong." when running tests
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: { include: ["app/**"], provider: 'istanbul' },
    setupFiles: ["./app/tests/setupTest.ts"],
    environment: "happy-dom",
  },
});

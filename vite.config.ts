import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      routes: (defineRoutes) => {
        return defineRoutes((route) => {
          route("", "pages/layout.tsx", () => {
            route("/", "pages/home.tsx", { index: true });
            route("", "pages/gallery/home.tsx", { index: true });
            route(":postId", "pages/gallery/details.tsx");
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});

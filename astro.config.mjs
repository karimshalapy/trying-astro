import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://karimshalapy.github.io",
  base: "/trying-astro",
  integrations: [tailwind()]
});
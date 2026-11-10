// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { safeMarkdown, accessibleMarkdown } from "./src/lib/safe-markdown.mjs";

// https://astro.build/config
export default defineConfig({
    site: "https://donneko.github.io",
    markdown: {
        processor: satteri({
            mdastPlugins: [safeMarkdown],
            hastPlugins: [accessibleMarkdown],
        }),
    },
});

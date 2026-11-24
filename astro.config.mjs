// @ts-check
import { defineConfig, sharpImageService } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { safeMarkdown, accessibleMarkdown } from "./src/lib/safe-markdown.mjs";

// https://astro.build/config
export default defineConfig({
    site: "https://donneko.net",
    trailingSlash: "always",
    integrations: [sitemap()],
    image: {
        service: sharpImageService({ webp: { lossless: true } }),
    },
    markdown: {
        processor: satteri({
            mdastPlugins: [safeMarkdown],
            hastPlugins: [accessibleMarkdown],
        }),
    },
});

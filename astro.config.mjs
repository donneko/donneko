// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://donneko.github.io',
    redirects: {
        "/site/main.htm": "/",
        "/site/about.htm": "/about/",
        "/site/works.htm": "/works/",
        "/site/diary.htm": "/diary/",
        "/site/links.htm": "/links/",
        "/site/nav.htm": "/",
        "/site/news.htm": "/",
        "/site/site-works/default.htm": "/works/",
        "/site/site-works/work-index.htm": "/works/",
        "/site/site-works/img-1.htm": "/works/",
        "/site/site-works/img-2.htm": "/works/",
        "/site/site-works/img-onigiri.htm": "/works/",
        "/site/site-works/img-live.htm": "/works/",
    },
});

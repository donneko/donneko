import type { APIRoute } from "astro";
import { publicImage } from "../lib/images";
import { getPublishedWorks, localUrl, worksUrl } from "../lib/works";

export const prerender = true;

const escapeXML = (value: string) =>
    value.replace(
        /[&<>"']/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&apos;",
            })[character]!
    );

export const GET: APIRoute = async ({ site }) => {
    const seen = new Set<string>();
    const entries = (await getPublishedWorks()).flatMap((work) => {
        const sources = [
            work.data.thumbnail,
            ...work.data.gallery.filter(({ type }) => type === "image").map(({ src }) => src),
        ];
        const images = sources.flatMap((src) => {
            const image = publicImage(src);
            if (!image) return [];
            const url = new URL(localUrl(image.path), site).href;
            if (seen.has(url)) return [];
            seen.add(url);
            return `<image:image><image:loc>${escapeXML(url)}</image:loc></image:image>`;
        });
        return images.length
            ? [
                  `<url><loc>${escapeXML(new URL(worksUrl(work.id), site).href)}</loc>${images.join("")}</url>`,
              ]
            : [];
    });
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries.join("")}</urlset>\n`,
        { headers: { "Content-Type": "application/xml; charset=utf-8" } }
    );
};

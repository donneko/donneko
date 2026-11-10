import type { APIRoute } from "astro";
import { blogUrl, getPublishedPosts, postUrl } from "../../lib/blog";

const escapeXml = (value: string) =>
    value.replace(/[<>&"']/g, (character) => {
        return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" }[character]!;
    });

// ビルド時にXMLファイルだけを生成する。サーバーや投稿APIは使わない。
export const GET: APIRoute = async ({ site }) => {
    if (!site) throw new Error("RSSの生成にはastro.config.mjsのsite設定が必要です。");
    const posts = await getPublishedPosts();
    const items = posts.map((post) => {
        const url = escapeXml(new URL(postUrl(post), site).href);
        return `<item>
            <title>${escapeXml(post.data.title)}</title>
            <description>${escapeXml(post.data.description)}</description>
            <link>${url}</link>
            <guid isPermaLink="true">${url}</guid>
            <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
            <category>${escapeXml(post.data.category)}</category>
        </item>`;
    });
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0"><channel>
            <title>技術ブログ | 丼猫のウェブサイト</title>
            <description>開発記録、技術解説、設計や実験の記録。</description>
            <link>${escapeXml(new URL(blogUrl(), site).href)}</link>
            <language>ja</language>
            ${items.join("\n")}
        </channel></rss>`,
        { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } }
    );
};

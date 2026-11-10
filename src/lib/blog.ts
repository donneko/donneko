import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

// 一覧・個別ページ・カテゴリ・タグ・RSSのすべてで同じ公開条件を使う。
export async function getPublishedPosts(): Promise<BlogPost[]> {
    const posts = await getCollection("blog", ({ data }) => !data.draft);
    return posts.sort(
        (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime() || a.id.localeCompare(b.id)
    );
}

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
});

export const formatBlogDate = (date: Date) => dateFormatter.format(date);

export function blogUrl(path = ""): string {
    return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/blog/${path}`;
}

export const postUrl = (post: BlogPost) => blogUrl(`${post.id}/`);
export const categoryUrl = (category: string) => blogUrl(`categories/${category}/`);
// Astroは # と ? をパス生成時に%表記へ変換するため、静的ホストでも
// 同じファイルに到達できる、衝突しないパス用の表現にする。
export const tagSlug = (tag: string) =>
    tag.replace(/[~?#]/g, (character) => `~${character.codePointAt(0)!.toString(16)}~`);
export const tagUrl = (tag: string) => blogUrl(`tags/${encodeURIComponent(tagSlug(tag))}/`);

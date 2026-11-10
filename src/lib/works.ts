import { getCollection, type CollectionEntry } from "astro:content";
import { workCategories, workSubcategories } from "../data/work-categories";

export type Work = CollectionEntry<"works">;
export type WorkMedia = Work["data"]["gallery"][number];

export async function getPublishedWorks(): Promise<Work[]> {
    const works = await getCollection("works", ({ data }) => !data.draft);
    return works.sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

export function getFeaturedWorks(works: Work[]): Work[] {
    return works
        .filter(({ data }) => data.featured)
        .sort(
            (a, b) =>
                a.data.featuredOrder - b.data.featuredOrder ||
                a.data.order - b.data.order ||
                a.id.localeCompare(b.id)
        )
        .slice(0, 3);
}

export function localUrl(path: string): string {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    return path.startsWith("/") && !path.startsWith("//") ? `${base}${path}` : path;
}

export const worksUrl = (slug = "") => localUrl(`/works/${slug ? `${slug}/` : ""}`);
export const workCategoryLabel = (work: Work) => workCategories[work.data.category];
export function workSubcategoryLabel(work: Work): string | undefined {
    const id = work.data.subcategory;
    return id ? (workSubcategories[id as keyof typeof workSubcategories] ?? id) : undefined;
}

export function workThumbnail(work: Work): WorkMedia | undefined {
    if (work.data.thumbnail) {
        return {
            type: "image",
            src: work.data.thumbnail,
            alt: work.data.thumbnailAlt || `${work.data.title}のプレビュー`,
        };
    }
    return work.data.gallery.find(({ type }) => type === "image");
}

export const workMainMedia = (work: Work) => work.data.gallery[0] ?? workThumbnail(work);

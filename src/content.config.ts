import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { blogCategoryIds } from "./data/blog";
import { workCategoryIds } from "./data/work-categories";

const blog = defineCollection({
    loader: glob({
        base: "./src/content/blog",
        pattern: "*.md",
        generateId: ({ entry }) => {
            const id = entry.replace(/\.md$/, "");
            // 数字のページ番号やカテゴリ・タグのルートと衝突させない。
            if (
                !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id) ||
                ["categories", "tags"].includes(id)
            ) {
                throw new Error(
                    `ブログのファイル名は英小文字から始まる kebab-case にしてください: ${entry}`
                );
            }
            return id;
        },
    }),
    schema: z.object({
        title: z.string().trim().min(1),
        description: z.string().trim().min(1),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        category: z.enum(blogCategoryIds),
        tags: z
            .array(
                z
                    .string()
                    .trim()
                    .min(1)
                    .regex(/^[^/\\%\p{Cc}]+$/u)
            )
            .default([])
            .transform((tags) => [...new Set(tags.map((tag) => tag.normalize("NFC")))])
            .refine(
                (tags) => tags.every((tag) => tag !== "." && tag !== ".."),
                "タグに . と .. は使えません"
            ),
        draft: z.boolean().default(false),
    }),
});

// 外部URLはhttp(s)、ローカルURLは単一の / から始まるパスだけを許可する。
const workUrl = z
    .string()
    .trim()
    .min(1)
    .refine((value) => {
        if (/[\\\p{Cc}]/u.test(value)) return false;
        if (value.startsWith("/") && !value.startsWith("//")) return true;
        try {
            return ["https:", "http:"].includes(new URL(value).protocol);
        } catch {
            return false;
        }
    }, "URLは / から始まるパス、またはhttp(s)を指定してください");

const workLink = z.object({
    href: workUrl,
    label: z.string().trim().min(1),
    external: z.boolean().default(true),
});

const workMedia = z.object({
    type: z.enum(["image", "video"]).default("image"),
    src: workUrl,
    alt: z.string().default(""),
    poster: workUrl.optional(),
});

const works = defineCollection({
    loader: glob({
        base: "./src/content/works",
        pattern: "*.md",
        generateId: ({ entry }) => {
            const id = entry.replace(/\.md$/, "");
            if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id) || id === "index") {
                throw new Error(
                    `作品のファイル名は英小文字のkebab-caseで指定してください: ${entry}`
                );
            }
            return id;
        },
    }),
    schema: z.object({
        title: z.string().trim().min(1),
        description: z.string().trim().min(1),
        category: z.enum(workCategoryIds),
        subcategory: z.string().trim().min(1).optional(),
        year: z.number().int().min(1000).max(9999).optional(),
        status: z.string().trim().min(1).optional(),
        thumbnail: workUrl.optional(),
        thumbnailAlt: z.string().default(""),
        gallery: z.array(workMedia).default([]),
        technologies: z.array(z.string().trim().min(1)).default([]),
        features: z.array(z.string().trim().min(1)).default([]),
        links: z
            .union([
                z.array(workLink),
                z.record(z.string(), workUrl).transform((links) =>
                    Object.entries(links).map(([key, href]) => ({
                        href,
                        label:
                            { github: "GitHub", demo: "デモ", npm: "npm", download: "配布先" }[
                                key
                            ] ?? key,
                        external: /^https?:\/\//i.test(href),
                    }))
                ),
            ])
            .default([]),
        featured: z.boolean().default(false),
        featuredOrder: z.number().int().nonnegative().default(999),
        order: z.number().int().nonnegative().default(999),
        draft: z.boolean().default(false),
        relatedPosts: z.array(reference("blog")).default([]),
    }),
});

export const collections = { blog, works };

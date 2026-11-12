export const blogCategories = {
    development: { label: "Development", description: "開発記録" },
    engineering: { label: "Engineering", description: "技術解説・設計" },
    infrastructure: { label: "Infrastructure", description: "サーバー・ネットワーク" },
    research: { label: "Research", description: "技術検証・実験" },
} as const;

export type BlogCategory = keyof typeof blogCategories;
export const blogCategoryIds = Object.keys(blogCategories) as [BlogCategory, ...BlogCategory[]];

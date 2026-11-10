export const workCategories = {
    software: "Software",
    hardware: "Hardware",
    design: "Design",
    visual: "3D / Game / Video",
} as const;

export const workCategoryIds = ["software", "hardware", "design", "visual"] as const;

// 以前の9分類はsubcategoryとして保持する。
export const workSubcategories = {
    web: "Webサイト",
    npm: "npmパッケージ",
    program: "プログラム",
    hardware: "電子工作",
    design: "デザイン",
    illustration: "イラスト",
    "3d": "3D",
    game: "ゲーム",
    video: "動画",
} as const;

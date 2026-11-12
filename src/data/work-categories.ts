export const workCategories = {
    software: "ソフトウェア",
    hardware: "ハードウェア",
    design: "デザイン",
    others: "その他",
} as const;

export const workCategoryIds = ["software", "hardware", "design", "others"] as const;

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
    experimental: "実験的",
    arduino: "Arduino",
} as const;

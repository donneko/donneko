import type { Link, Project, ProjectMedia } from "../types/main.type";

const image = (work: string, file: string, alt: string): ProjectMedia => ({ type: "image", src: `/works/${work}/${file}`, alt });
const video = (work: string, file: string, alt: string): ProjectMedia => ({ type: "video", src: `/works/${work}/${file}`, alt });
const entry = (title: string, category: string, description: string, media: ProjectMedia[], links?: Link[]): Project => ({ title, category, description, media, links });
const numbered = (title: string, category: string, slug: string, file: string, type: "image" | "video", count: number): Project[] =>
    Array.from({ length: count }, (_, index) => {
        const number = String(index + 1).padStart(2, "0");
        const name = `${title} ${number}`;
        return entry(name, category, `${title}の作品。`, [type === "image" ? image(`${slug}-${number}`, file, name) : video(`${slug}-${number}`, file, name)]);
    });

const npmLinks = (npm: string, github: string): Link[] => [
    { href: `https://www.npmjs.com/package/@donneko/${npm}`, label: "npmで見る", external: true },
    { href: `https://github.com/donneko/${github}`, label: "GitHub でリポジトリをみる", external: true },
];

const blenderRenders = ["jpg", "png", "jpg", "png", "jpg", "png", "jpg", "jpg"].map((extension, index) => {
    const number = String(index + 1).padStart(2, "0");
    return entry(`Blender レンダー ${number}`, "3d", "Blender で制作した3D作品。", [image(`blender-render-${number}`, `render.${extension}`, `Blender レンダー ${number}`)]);
});

const photoshopPosters = [
    ["東京の都市ポスター", "tokyo-city-poster"], ["富士山ポスター", "mount-fuji-poster"],
    ["求人マッチングポスター", "job-matching-poster"], ["報・連・相ポスター", "communication-poster"],
    ["F-15ポスター", "fighter-jet-poster"], ["海ポスター", "sea-poster"],
    ["夏ポスター", "summer-poster"], ["破壊ポスター", "tank-poster"],
].map(([title, work]) => entry(title, "design", "Photoshop で制作したグラフィック作品。", [image(work, "poster.png", title)]));

export const projects: Project[] = [
    entry("tyoi-server", "npm", "小さなAPIサーバーや静的ファイルサーバーを簡単に立ち上げるために作っているNode.js / TypeScript製のサーバーフレームワーク。", [image("tyoi-server", "terminal-output.png", "tyoi-server の起動画面")], npmLinks("tyoi-server", "tyoi-api-node-server")),
    entry("tyoi-logger", "npm", "Node.js / TypeScript 向けに作っているロガー。", [image("tyoi-logger", "terminal-output.png", "tyoi-logger の起動画面")], npmLinks("tyoi-logger", "tyoi-logger")),
    entry("tyoi-cli", "npm", "Node.js / TypeScript 向けに作っている CLI ツール。", [image("tyoi-cli", "terminal-output.png", "tyoi-cli の起動画面")], npmLinks("tyoi-cli", "tyoi-cli")),
    entry("site-map", "npm", "サイトマップを扱うために作っている npm パッケージ。", [image("site-map", "logo.png", "site-map のロゴ"), image("site-map", "json-output.png", "site-map のJSON出力")], npmLinks("site-map", "site-map")),
    entry("RΛLINE 3D Visual Portfolio", "web", "3D 表現を使った架空のビジュアルポートフォリオ。", [image("r4line-portfolio", "preview.png", "RΛLINE の画面"), image("r4line-portfolio", "logo-sheet.jpg", "RΛLINE のロゴ素材")], [{ href: "http://r4line.donneko.net/", label: "ウェブサイトをみる", external: true }]),
    entry("ウィンドウシステム", "web", "ウェブサイトで色々操作したいときに、便利だなぁって思ったんで作成。", [image("window-system", "development.jpg", "開発画面"), image("window-system", "usage.jpg", "利用例"), image("window-system", "demo.jpeg", "デモ画面")], [{ href: "https://donneko.github.io/window-system-demo/", label: "ウェブサイトを開く", external: true }, { href: "https://github.com/donneko/window-system", label: "GitHub でリポジトリをみる", external: true }]),
    entry("数学ウェブアプリ", "web", "昔学内のコンテストに出すために作ったサイト。", [image("math-problems", "design-01.jpg", "デザイン案"), image("math-problems", "design-02.png", "デザイン案"), image("math-problems", "app-preview.jpeg", "アプリ画面")], [{ href: "https://donneko.github.io/math-problems/", label: "ウェブサイトを開く", external: true }, { href: "https://github.com/donneko/math-problems/", label: "GitHub でリポジトリをみる", external: true }]),
    entry("タグ連鎖モデル", "program", "入力からアイデアをつなげるモデルの実験。", [image("tag-chain-model", "result.png", "タグ連鎖モデルの実行結果")]),
    ...numbered("AI実験", "program", "ai-experiment", "preview.jpg", "image", 3),
    ...numbered("Blender アニメーション", "3d", "blender-animation", "animation.mp4", "video", 8),
    ...blenderRenders,
    entry("バス時刻表", "web", "次のバスと出発までの時間を見やすく表示する画面を作ってみた。", ["01", "02", "03", "04"].map((number) => image("bus-timetable", `dashboard-${number}.png`, "バス時刻表の画面"))),
    entry("C言語 数当てゲーム", "program", "C言語で作った、難易度を選んで遊べる数当てゲーム。", [image("number-guessing-game", "gameplay.jpg", "ゲーム画面")]),
    entry("電子工作", "hardware", "部品を触りながら、電子工作でできることを試していた記録。", [video("electronic-craft", "demo-01.mp4", "電子工作の動画"), video("electronic-craft", "demo-02.mp4", "電子工作の動画"), image("electronic-craft", "prototype.jpg", "電子工作の試作品")]),
    entry("エラーページ", "web", "エラー画面にも雰囲気をつけたくて作ったデザイン。", [video("error-pages", "demo-01.mp4", "動画"), video("error-pages", "demo-02.mp4", "動画"), image("error-pages", "403-page.jpg", "403 エラーページ"), ...["01", "02", "03", "04", "05"].map((number) => image("error-pages", `page-${number}.jpg`, "エラーページ"))]),
    entry("ゲーム制作", "video", "ゲームを作っていたときの動画記録。", [video("game-project", "demo.mp4", "ゲーム制作の動画")]),
    entry("Xヘッダー画像", "design", "ペットボトルのラベル風に作ったヘッダー画像。", [image("donneko-twitter-header", "header.png", "DONNEKO のXヘッダー画像")]),
    entry("YouTubeヘッダー画像", "design", "DONNEKO のデザインを横長サイズに合わせたヘッダー画像。", [image("donneko-youtube-header", "header.png", "DONNEKO のYouTubeヘッダー画像")]),
    entry("宇宙図版", "design", "宇宙をテーマにした図版デザイン。", [image("space-graphics", "fall-map.jpg", "FALL MAP の図版"), image("space-graphics", "space-debris.jpg", "SPACE DEBRIS の図版")]),
    entry("グリッドシステム", "design", "グリッドをテーマにしたグラフィック。", [image("grid-system", "title-card.jpg", "GRID SYSTEM のタイトルカード")]),
    entry("Automated Systems", "design", "自動化システムをテーマにしたグラフィック。", [image("automated-systems", "poster.jpg", "ポスター")]),
    entry("市民生活", "design", "市民サービスを題材にしたグラフィック。", [image("city-services", "poster.jpg", "ポスター")]),
    entry("インターネットサービス", "design", "ネットワークを題材にしたグラフィック。", [image("internet-services", "poster.jpg", "ポスター")]),
    entry("梱包表示システム", "design", "梱包用の注意表示とアイコンをまとめたデザイン。", [image("packaging-symbols", "caution-label.png", "注意ラベル"), image("packaging-symbols", "color-palette.png", "配色案"), image("packaging-symbols", "handling-icons.png", "取扱表示アイコン"), image("packaging-symbols", "layout-guide.png", "レイアウトガイド"), image("packaging-symbols", "caution-layout.png", "注意表示のレイアウト"), image("packaging-symbols", "icon-set.png", "取扱表示アイコンセット")]),
    entry("インタラクティブ字幕", "design", "ノードで組み立てる字幕表現の試作。", [image("interactive-subtitles", "preview.png", "プレビュー"), image("interactive-subtitles", "editor.jpg", "編集画面")]),
    entry("日本語タイポグラフィ", "design", "日本語文字を使ったグラフィックの試作。", [image("japanese-typography", "editor.jpg", "編集画面")]),
    entry("HTML/CSSコーディングバナー", "design", "HTML/CSS コーディングを題材にしたバナー。", [image("coding-course-banner", "banner.png", "コーディングバナー")]),
    entry("デジタルデザインコレクション", "design", "過去に作った画面やグラフィックをまとめたもの。", [image("digital-design-collection", "collection.jpg", "コレクション")]),
    entry("自習マナーポスター", "design", "自習時のマナーを伝えるポスター。", [image("self-study-posters", "quiet-study.png", "静かな自習"), image("self-study-posters", "no-voice.png", "声を使わない"), image("self-study-posters", "no-talking.png", "会話を控える")]),
    entry("配信用フレーム", "design", "ワイド配信向けに作ったフレーム素材。", [image("streaming-frame", "frame.png", "配信用の21対9フレーム")]),
    entry("メモアプリリスト", "web", "メモを気軽に書き留めるためのシンプルなアプリ。", [image("memo-app", "preview-01.jpg", "メモアプリの画面"), image("memo-app", "preview-02.png", "メモアプリの画面")]),
    entry("このサイトの旧デザイン", "web", "このサイトを作り直す前に考えていた実験的なデザイン案。", [...["01", "02", "03", "04", "05", "06"].map((number) => image("personal-site-concept", `preview-${number}.jpg`, "旧デザイン")), image("personal-site-concept", "preview-07.png", "旧デザイン")]),
    entry("おにぎりイラスト", "illustration", "小さなペンタブの動作確認がてら描いたおにぎり。", [image("onigiri-illustration", "illustration.png", "おにぎりのイラスト")]),
    ...photoshopPosters,
    entry("自作Webサーバー", "program", "Node.js で Web サーバーの動きを試していた記録。", [image("node-server", "terminal-output.jpg", "自作Webサーバーの実行画面")]),
    entry("Stormworks デモ", "game", "Stormworks で制作したものの動画記録。", [video("stormworks-demo", "demo.mp4", "Stormworks のデモ動画")]),
    entry("Stormworks モニターウォール", "game", "Stormworks の中で制作したモニター表示。", [image("stormworks-monitor-wall", "preview.jpg", "モニターウォール")]),
    ...numbered("Stormworks ビルド", "game", "stormworks-build", "preview.jpg", "image", 3),
    entry("Stormworks ビルド 04", "game", "Stormworks の中で制作したもの。", [image("stormworks-build-04", "preview.png", "Stormworks ビルド 04")]),
    ...numbered("学習・実験", "program", "study-experiment", "demo.mp4", "video", 3),
    ...["04", "05"].map((number) => entry(`学習・実験 ${number}`, "program", "学習や試作の記録。", [image(`study-experiment-${number}`, "photo.jpg", `学習・実験 ${number}`)])),
];

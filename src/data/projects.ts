import type { Project, ProjectMedia } from "../types/main.type";

const image = (src: string, alt: string): ProjectMedia => ({ type: "image", src, alt });
const video = (src: string, alt: string): ProjectMedia => ({ type: "video", src, alt });

export const projects: Project[] = [
    {
        title: "tyoi-server",
        category: "npm",
        media: [image("/works/tyoi-server/image.png", "tyoi-serverの起動画像")],
        description:
            "小さなAPIサーバーや静的ファイルサーバーを簡単に立ち上げるために作っているNode.js / TypeScript製のサーバーフレームワーク。CLI、WebSocket、API Registry、ログ、セキュリティ機能などを実装している。npmにも公開していて、現在も開発中。",
        links: [
            {
                href: "https://www.npmjs.com/package/@donneko/tyoi-server",
                label: "npmで見る",
                external: true,
            },
            {
                href: "https://github.com/donneko/tyoi-api-node-server",
                label: "GitHub でリポジトリをみる",
                external: true,
            },
        ],
    },
    {
        title: "tyoi-logger",
        category: "npm",
        media: [image("/works/tyoi-logger/image.png", "tyoi-loggerの起動画像")],
        description:
            "Node.js / TypeScript 向けに作っているロガー。必要な場所で気軽にログを残せるようにしたくて作成中。",
        links: [
            {
                href: "https://www.npmjs.com/package/@donneko/tyoi-logger",
                label: "npmで見る",
                external: true,
            },
            {
                href: "https://github.com/donneko/tyoi-logger",
                label: "GitHub でリポジトリをみる",
                external: true,
            },
        ],
    },
    {
        title: "tyoi-cli",
        category: "npm",
        media: [image("/works/tyoi-cli/image.png", "tyoi-cliの起動画像")],
        description:
            "Node.js / TypeScript 向けに作っている CLI ツール。コマンドラインから使いやすい仕組みを試したくて作成中。",
        links: [
            {
                href: "https://www.npmjs.com/package/@donneko/tyoi-cli",
                label: "npmで見る",
                external: true,
            },
            {
                href: "https://github.com/donneko/tyoi-cli",
                label: "GitHub でリポジトリをみる",
                external: true,
            },
        ],
    },
    {
        title: "site-map",
        category: "npm",
        media: [
            image("/works/site-map/image.png", "site-mapのロゴ画像"),
            image("/works/site-map/sc.png", "site-mapの出力のJSON画像"),
        ],
        description:
            "サイトマップを扱うために作っている npm パッケージ。必要な情報をまとめて扱いやすくしたくて作成中。",
        links: [
            {
                href: "https://www.npmjs.com/package/@donneko/site-map",
                label: "npmで見る",
                external: true,
            },
            {
                href: "https://github.com/donneko/site-map",
                label: "GitHub でリポジトリをみる",
                external: true,
            },
        ],
    },
    {
        title: "RΛLINE 3D Visual Portfolio",
        category: "web",
        media: [image("/works/r4line/logos.jpg", "RΛLINE 3D Visual Portfolio のロゴ素材")],
        description:
            "3D 表現を使った架空のビジュアルポートフォリオ。ロゴなどの素材もあわせて制作した。",
        links: [
            {
                href: "http://r4line.donneko.net/",
                label: "ウェブサイトをみる",
                external: true,
            },
        ],
    },
    {
        title: "ウィンドウシステム",
        category: "web",
        media: [
            image("/works/window-system/dev.jpg", "ウィンドウシステムの開発画面"),
            image("/works/window-system/used.jpg", "ウィンドウシステムの利用例"),
            image("/works/window-system/window-system-demo-.jpeg", "ウィンドウシステムのデモ画面"),
        ],
        description: "ウェブサイトで色々操作したいときに、便利だなぁって思ったんで作成",
        links: [
            {
                href: "https://donneko.github.io/window-system-demo/",
                label: "ウェブサイトを開く",
                external: true,
            },
            {
                href: "https://github.com/donneko/window-system",
                label: "GitHub でリポジトリをみる",
                external: true,
            },
        ],
    },
    {
        title: "数学ウェブアプリ",
        category: "web",
        media: [
            image("/works/math-problems/design1.jpg", "数学ウェブアプリのデザイン案"),
            image("/works/math-problems/design2.png", "数学ウェブアプリのデザイン案"),
            image("/works/math-problems/math-problems.jpeg", "数学ウェブアプリの画面"),
        ],
        description:
            "昔学内のコンテストに出すために作ったサイト。今見たらJSのコードがベタ書きとかで恥ずかしい(｡>﹏<｡)",
        links: [
            {
                href: "https://donneko.github.io/math-problems/",
                label: "ウェブサイトを開く",
                external: true,
            },
            {
                href: "https://github.com/donneko/math-problems/",
                label: "GitHub でリポジトリをみる",
                external: true,
            },
        ],
    },
    {
        title: "AI実験",
        category: "program",
        media: [
            image("/works/ai/G2-l06UbwAAgrwU.png", "AI 実験の実行結果"),
            image("/works/ai/G2xmWnybIAAAqpA.jpg", "AI 実験の画面"),
            image("/works/ai/GuqOfAnWYAAd1gX.jpg", "AI 実験の画面"),
            image("/works/ai/GWrH4v_aIAEf4Vd.jpg", "AI 実験の画面"),
        ],
        description: "AI を使って、入力に対する反応やアイデアの出し方を試していたときの記録。",
    },
    {
        title: "Blender作品集",
        category: "3d",
        media: [
            video("/works/blender/donneko_-1963073766164201561-01.mp4", "Blender 作品の動画"),
            video("/works/blender/donneko_-1963428822042513710-01.mp4", "Blender 作品の動画"),
            video("/works/blender/donneko_-1963465975145418823-01.mp4", "Blender 作品の動画"),
            video("/works/blender/donneko_-1963540582367981775-01.mp4", "Blender 作品の動画"),
            video("/works/blender/donneko_-1964687692467503345-01.mp4", "Blender 作品の動画"),
            video("/works/blender/donneko_-1966069801048215566-01.mp4", "Blender 作品の動画"),
            video("/works/blender/donneko_-1968174318745161863-01.mp4", "Blender 作品の動画"),
            video("/works/blender/donneko_-1968280410930180259-01.mp4", "Blender 作品の動画"),
            image("/works/blender/G078FJDaYAALmxD.jpg", "Blender で制作した3Dモデル"),
            image("/works/blender/G0D8DO-bgAAy7fB.png", "Blender 作品の画面"),
            image("/works/blender/G0DssWcaMAAQjzQ.jpg", "Blender 作品の画面"),
            image("/works/blender/G0XudAvbgAAnktl.png", "Blender 作品の画面"),
            image("/works/blender/G2TDwwvbMAAG_lO.jpg", "Blender 作品の画面"),
            image("/works/blender/Gz-KTGHb0AACuB0.png", "Blender 作品の画面"),
            image("/works/blender/Gz4zeF6bAAEEyu7.jpg", "Blender 作品の画面"),
            image("/works/blender/Gz56Llsa8AAUtyi.jpg", "Blender 作品の画面"),
        ],
        description:
            "Blender で作ったモデルや動きの試作をまとめたもの。いろいろ触りながら表現を試していた。",
    },
    {
        title: "バス時刻表",
        category: "web",
        media: [
            image("/works/bus-timetable/HJFWxU6awAA1fwG.png", "バス時刻表の表示画面"),
            image("/works/bus-timetable/HJFWxU6bkAA-2hf.png", "バス時刻表の表示画面"),
            image("/works/bus-timetable/HJFWxU7acAAE2Bb.png", "バス時刻表の表示画面"),
            image("/works/bus-timetable/HJFWxVXaoAAdeek.png", "バス時刻表の表示画面"),
        ],
        description: "次のバスと出発までの時間を見やすく表示する画面を作ってみた。",
    },
    {
        title: "C言語 数当てゲーム",
        category: "program",
        media: [image("/works/c-language/HEkbYE5bkAI2P3d.jpg", "C言語で作った数当てゲームの画面")],
        description: "C言語で作った、難易度を選んで遊べる数当てゲーム。",
    },
    {
        title: "電子工作",
        category: "hardware",
        media: [
            video("/works/electronic-crafts/donneko_-1969764404737777993-01.mp4", "電子工作の動画"),
            video("/works/electronic-crafts/donneko_-1969792894765859078-01.mp4", "電子工作の動画"),
            image("/works/electronic-crafts/G1YcTNHagAIlYGB.jpg", "電子工作の写真"),
        ],
        description: "部品を触りながら、電子工作でできることを試していたときの記録。",
    },
    {
        title: "エラーページ集",
        category: "web",
        media: [
            video("/works/error-page/donneko_-1964148747706986760-01.mp4", "エラーページの動画"),
            video("/works/error-page/donneko_-1968324172809134142-01.mp4", "エラーページの動画"),
            image("/works/error-page/G-4BqR0XkAAhkjt.jpg", "403 エラーページ"),
            image("/works/error-page/Gq3q6albQAAgBrH.jpg", "エラーページのデザイン"),
            image("/works/error-page/Gq3qz_DX0AEpcSg.jpg", "エラーページのデザイン"),
            image("/works/error-page/Gu0lsGvWwAASmfr.jpg", "エラーページのデザイン"),
            image("/works/error-page/Gu2i3XzWgAAA1FI.jpg", "エラーページのデザイン"),
            image("/works/error-page/Gu2sxeoWUAAx3KC.jpg", "エラーページのデザイン"),
        ],
        description: "ただのエラー画面にも雰囲気をつけたくて作っていたデザイン集。",
    },
    {
        title: "ゲーム制作",
        category: "video",
        media: [video("/works/game/donneko_-1904553158417986007-01.mp4", "ゲーム制作の動画")],
        description: "ゲームを作っていたときの動画記録。",
    },
    {
        title: "Xヘッダー画像",
        category: "design",
        media: [image("/works/header-twitter/DONNEKO2.png", "DONNEKO のXヘッダー画像")],
        description: "ヘッダー画像がないなと思ったときに、ペットボトルのラベル風に作ってみたもの。",
    },
    {
        title: "YouTubeヘッダー画像",
        category: "design",
        media: [image("/works/header-youtube/DONNEKO.png", "DONNEKO のYouTubeヘッダー画像")],
        description: "DONNEKO のデザインを YouTube 用の横長サイズに合わせたヘッダー画像。",
    },
    {
        title: "Illustrator作品集",
        category: "design",
        media: [
            image("/works/illustrator/G-_YRMpXMAAtHDO.jpg", "Illustrator 作品"),
            image("/works/illustrator/G0XeW9sagAA4yT-.png", "Illustrator 作品"),
            image("/works/illustrator/G0kq90GbMAA1Zkk.png", "Illustrator 作品"),
            image("/works/illustrator/G0kq9v7awAEnIw8.png", "Illustrator 作品"),
            image("/works/illustrator/G0kq9wAacAAA6vg.png", "Illustrator 作品"),
            image("/works/illustrator/G0kq9zzaMAYeRxt.png", "Illustrator 作品"),
            image("/works/illustrator/G0ksbJGakAA6bWL.png", "Illustrator 作品"),
            image("/works/illustrator/G2oxFiRaEAAFD31.png", "Illustrator 作品"),
            image("/works/illustrator/G2UBjQNa4AAG6eb.jpg", "Illustrator 作品"),
            image("/works/illustrator/G2UFuLIbMAI7BQW.png", "Illustrator 作品"),
            image("/works/illustrator/G3M-gebbsAA3C9s.jpg", "Illustrator 作品"),
            image("/works/illustrator/G5DabPEagAA3hdS.jpg", "Illustrator 作品"),
            image("/works/illustrator/G_B_zbfW0AAvvjN.jpg", "Illustrator 作品"),
            image("/works/illustrator/G_CeaunWMAEgYnn.jpg", "Illustrator 作品"),
            image("/works/illustrator/G_EzmFNW4AEd38q.jpg", "Illustrator 作品"),
            image("/works/illustrator/G_FrMeUXMAAtSHn.jpg", "Illustrator 作品"),
            image("/works/illustrator/G_FrOlOWoAAmobl.jpg", "Illustrator 作品"),
            image("/works/illustrator/GihTV2GaYAAqTF1.png", "Illustrator 作品"),
            image("/works/illustrator/GihTV2HagAAaMWk.png", "Illustrator 作品"),
            image("/works/illustrator/GihTV2HbsAA7zVq.png", "Illustrator 作品"),
            image("/works/illustrator/lIve.png", "配信用の21対9フレーム素材"),
        ],
        description: "Illustrator で作ったロゴ、グラフィック、配信向けの素材など。",
    },
    {
        title: "メモアプリリスト",
        category: "web",
        media: [
            image("/works/memo/GvkRkcfXQAAWEm_.jpg", "メモアプリリストの画面"),
            image("/works/memo/image.png", "メモアプリリストの画面"),
        ],
        description: "メモを気軽に書き留めるための、シンプルなアプリ画面。",
    },
    {
        title: "このサイトの旧デザイン",
        category: "web",
        media: [
            image("/works/my-site/G-9xDw8XsAEUCUV.jpg", "このサイトの旧デザイン"),
            image("/works/my-site/G-9xDxHWMAE7Rd9.jpg", "このサイトの旧デザイン"),
            image("/works/my-site/G-9xDxHWUAA708F.jpg", "このサイトの旧デザイン"),
            image("/works/my-site/G1IZFOtasAAmrh_.jpg", "このサイトの旧デザイン"),
            image("/works/my-site/G1IZFOub0AAVbrq.jpg", "このサイトの旧デザイン"),
            image("/works/my-site/GrI45QhX0AAa4nQ.jpg", "このサイトの旧デザイン"),
            image("/works/my-site/HE9hHFpa0AAb3ys.png", "このサイトの旧デザイン"),
        ],
        description: "このサイトを作り直す前に考えていた、実験的なデザイン案。",
    },
    {
        title: "おにぎりイラスト",
        category: "illustration",
        media: [
            image(
                "/works/other/%E3%81%8A%E3%81%AB%E3%81%8E%E3%82%8A.png",
                "ペンタブで描いたおにぎりのイラスト"
            ),
        ],
        description: "小さなペンタブの動作確認がてら描いたおにぎり。",
    },
    {
        title: "Photoshop作品集",
        category: "design",
        media: [
            image("/works/photoshop/G2UK5lObMAETeBF.png", "Photoshop 作品"),
            image("/works/photoshop/G2UPzUpbUAAAiFt.png", "Photoshop 作品"),
            image("/works/photoshop/G2UXxImboAAPGDB.png", "Photoshop 作品"),
            image("/works/photoshop/G2Z0xrQaYAABErZ.png", "Photoshop 作品"),
            image("/works/photoshop/G2Z7zM3aMAA9KuU.png", "Photoshop 作品"),
            image("/works/photoshop/G2Zu9GjbMAI9WyH.png", "Photoshop 作品"),
            image("/works/photoshop/G2aAhEOawAAb1Xt.png", "Photoshop 作品"),
            image("/works/photoshop/G2aHuvUawAAqG1p.png", "Photoshop 作品"),
        ],
        description: "Photoshop で加工やレイアウトを試していた画像作品。",
    },
    {
        title: "自作Webサーバー",
        category: "program",
        media: [image("/works/server/HE8hTFyb0AAkd6u.jpg", "自作Webサーバーの実行画面")],
        description: "Node.js で Web サーバーの動きを試していたときの記録。",
    },
    {
        title: "Stormworks作品",
        category: "game",
        media: [
            video("/works/stormworks/donneko_-1842902707222491292-01.mp4", "Stormworks 作品の動画"),
            image("/works/stormworks/GZH-vKMbQAAnky1.png", "Stormworks 作品"),
            image("/works/stormworks/GiNZSgnaIAAlYlY.jpg", "Stormworks 作品"),
            image("/works/stormworks/GwsoB1TaQAAri-i.jpg", "Stormworks 作品"),
            image("/works/stormworks/GyjLuj3aUAAX0Oy.jpg", "Stormworks 作品"),
            image("/works/stormworks/GyQS1hza4AA3G6_.jpg", "Stormworks 作品"),
        ],
        description: "Stormworks の中で作った装置や表示まわりの記録。",
    },
    {
        title: "学習・実験",
        category: "program",
        media: [
            video("/works/study/donneko_-1951440910518251749-01.mp4", "学習・実験の動画"),
            video("/works/study/donneko_-1967840906582823122-01.mp4", "学習・実験の動画"),
            video("/works/study/donneko_-1967934938315100397-01.mp4", "学習・実験の動画"),
            image("/works/study/G1S1rqYbQAAWS4G.jpg", "学習・実験の記録"),
            image("/works/study/GaafZljaUAATu21.jpg", "学習・実験の記録"),
        ],
        description: "勉強や実験の途中で作ったものを残していた記録。",
    },
];

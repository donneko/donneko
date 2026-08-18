import type { Project } from "../types/main.type";

export const projects: Project[] = [
    {
        title: "ウィンドウシステム",
        hasScreenshot: true,
        src: "https://donneko.github.io/window-system-demo/",
        alt: "ウィンドウシステムのウェブサイトの画像",
        description:
            "16:9の素材はいっぱいあるのに、21:9はないのはなぜなぜ？？？ なら作っちゃえ!! ワイドモニターで配信ができるようになったぜ！！ 小声：配信なんてしないけど。",
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
        hasScreenshot: true,
        src: "https://donneko.github.io/math-problems/",
        alt: "数学ウェブアプリのウェブサイトの画像",
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
        title: "昔のこのドメインのサイトデザイン案",
        hasScreenshot: false,
        src: "/site/site-works/img/DONNEKO.png",
        alt: "昔のこのドメインのサイトのデザイン画像",
        description: "デザインは良かったんだけど、実現する気力がなかった(泣)SF系にハマっていたとき",
    },
    {
        title: "ツイッターヘッダー画像1",
        hasScreenshot: false,
        src: "/site/site-works/img/DONNEKO.png",
        alt: "丼猫のTwitterヘッダー画像",
        description:
            "ツイッターでヘッダー画像がないな…って思ったときに、なら作っちゃえ！！☆ ってイラストレーターで簡単に作ったもの。ペットボトルのラベルをリスペクトしてオマージュしております。",
    },
    {
        title: "YouTubeヘッダー画像",
        hasScreenshot: false,
        src: "/site/site-works/img/DONNEKO2.png",
        alt: "丼猫のYouTubeヘッダー画像",
        description: "『画像1』をYouTube用のヘッダーに対応させたやつ。",
    },
    {
        title: "画像おにぎり",
        hasScreenshot: false,
        src: "/site/site-works/img/おにぎり.png",
        alt: "ペンタブで描いたおにぎりのイラスト",
        description:
            "リサイクル屋さんで小さなペンタブを安く購入したから、動作確認がてらおにぎりを描いてみたよ。おにぎりの画像の透明度を落としてトレスしてるよーー。",
    },
    {
        title: "配信用の21:9の枠",
        hasScreenshot: false,
        src: "/site/site-works/img/LIve.png",
        alt: "21対9の配信用フレーム素材",
        description:
            "16:9の素材はいっぱいあるのに、21:9はないのはなぜなぜ？？？ なら作っちゃえ!! ワイドモニターで配信ができるようになったぜ！！ 小声：配信なんてしないけど。",
    },
];

import type { LinkTable } from "../types/main.type.ts";

export const links: LinkTable[] = [
    {
        href: "/about/",
        label: "私について",
        external: false,
        description: "私について書かれているよ！！",
    },
    {
        href: "/works/",
        label: "作品",
        external: false,
        description: "作った作品について書かれてるよ！！",
    },
    {
        href: "/diary/",
        label: "日記だよ",
        external: false,
        description: "思ったことについて適当に書くよ！！",
    },
    {
        href: "/links/",
        label: "リンク",
        external: false,
        description: "リンクのことについていっぱい書かれてるよ！！",
    },
    {
        href: "https://github.com/donneko",
        label: "GitHub",
        external: true,
        description: "作ったプログラムをアップロードするところだよ！！",
    },
    {
        href: "https://zenn.dev/donneko",
        label: "Zenn",
        external: true,
        description: "気がついた事とか、誰かに発信したいときに使う",
    },
    {
        href: "https://twitter.com/donneko_",
        label: "ツイッター",
        external: true,
        description: "つぶやいたりするところ",
    },
    {
        href: "https://misskey.io/@donneko",
        label: "misskey",
        external: true,
        description: "ツイッターとは別の楽しさがある",
    },
];

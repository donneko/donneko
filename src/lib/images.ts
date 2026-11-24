import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";
import { localUrl } from "./works";

// 公開パスと元画像を維持したまま、Astroでメタ情報と派生画像を生成する。
const images = import.meta.glob<ImageMetadata>("/public/**/*.{png,jpg,jpeg,webp,gif,avif,svg}", {
    eager: true,
    import: "default",
});

export function publicImage(src?: string) {
    if (!src?.startsWith("/") || src.startsWith("//") || /[\\\p{Cc}]/u.test(src)) return;
    try {
        const url = new URL(src, "https://public.invalid");
        const metadata = images[`/public${decodeURIComponent(url.pathname)}`];
        if (metadata) return { path: url.pathname, metadata };
    } catch {
        // 不正なパスはOGP・画像サイトマップに登録しない。
    }
}

export function socialImage(src?: string) {
    const image = publicImage(src);
    if (image && ["png", "jpg", "jpeg", "webp", "gif"].includes(image.metadata.format)) {
        return image;
    }
}

// 実測して効果が大きかった画像だけを対象にする。イラスト・画面はPNGを維持。
const optimizedFormats = new Map<string, "png" | "webp">([
    ["/works/onigiri-illustration/image-01.png", "png"],
    ["/works/tyoi-server/image-01.png", "png"],
    ["/works/r4line-portfolio/image-01.png", "webp"],
    ["/works/blender-bottle-tutorial/image-01.png", "webp"],
    ["/works/blender-bottle-tutorial/image-02.png", "webp"],
    ["/works/blender-jam-jar-tutorial/image-01.png", "webp"],
]);

const variants = new Map<string, Promise<{ src: string; width: number }[]>>();

export async function imageAttributes(src: string) {
    const image = publicImage(src);
    const original = {
        src: localUrl(src),
        width: image?.metadata.width,
        height: image?.metadata.height,
    };
    if (!image) return original;
    const format = optimizedFormats.get(image.path);
    if (!format) return original;

    let pending = variants.get(image.path);
    if (!pending) {
        const maximum = Math.min(image.metadata.width, 1600);
        const widths = [...new Set([160, 480, 960, maximum].filter((w) => w <= maximum))];
        pending = Promise.all(
            widths
                .sort((a, b) => a - b)
                .map(async (width) => {
                    const result = await getImage({ src: image.metadata, width, format });
                    return { src: result.src, width };
                })
        );
        variants.set(image.path, pending);
    }
    const sources = await pending;
    const fallback = sources.find(({ width }) => width >= 960) ?? sources[sources.length - 1];
    return {
        ...original,
        src: fallback.src,
        width: fallback.width,
        height: Math.round((image.metadata.height * fallback.width) / image.metadata.width),
        srcset: sources.map(({ src, width }) => `${src} ${width}w`).join(", "),
    };
}

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
    cp,
    mkdir,
    mkdtemp,
    readFile,
    readdir,
    realpath,
    rm,
    symlink,
    writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";
import test from "node:test";

const project = fileURLToPath(new URL("../", import.meta.url));

async function fixture(t) {
    const root = await realpath(await mkdtemp(join(tmpdir(), "donneko-works-test-")));
    t.after(() => rm(root, { recursive: true, force: true }));
    await cp(join(project, "src"), join(root, "src"), { recursive: true });
    await mkdir(join(root, "src/content/blog"), { recursive: true });
    await cp(join(project, "tsconfig.json"), join(root, "tsconfig.json"));
    await cp(join(project, "package.json"), join(root, "package.json"));
    const config = await readFile(join(project, "astro.config.mjs"), "utf8");
    await writeFile(
        join(root, "astro.config.mjs"),
        config.replace("defineConfig({", 'defineConfig({ cacheDir: "./.astro-cache",')
    );
    await symlink(join(project, "node_modules"), join(root, "node_modules"), "dir");
    // Content Collectionsが実際に検証・変換した値をテストだけで取り出す静的ファイル。
    await writeFile(
        join(root, "src/pages/verify-works.json.ts"),
        'import {getCollection} from "astro:content"; export const GET = async () => new Response(JSON.stringify(await getCollection("works")));'
    );
    return root;
}

function build(root, ...args) {
    const result = spawnSync(
        process.execPath,
        [join(project, "node_modules/astro/bin/astro.mjs"), "build", "--root", root, ...args],
        {
            cwd: root,
            encoding: "utf8",
            env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
            timeout: 60_000,
        }
    );
    assert.equal(result.status, 0, result.error?.message ?? result.stdout + result.stderr);
}

async function addWork(root, id, data = {}, body = "") {
    const metadata = { title: id, description: `${id}の概要`, category: "software", ...data };
    const frontmatter = Object.entries(metadata)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join("\n");
    await writeFile(
        join(root, `src/content/works/${id}.md`),
        `---\n${frontmatter}\n---\n${body}\n`
    );
}

const html = (root, slug = "") => readFile(join(root, "dist/works", slug, "index.html"), "utf8");
const featuredLinks = (source) =>
    [...source.matchAll(/<a class="featured-card" href="([^"]+)"/g)].map((match) => match[1]);
const escapeHtml = (text) =>
    text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

test("全作品のメタ情報・メディア・リンクを静的ページに保持する", async (t) => {
    const root = await fixture(t);
    const sourceIds = (await readdir(join(root, "src/content/works")))
        .filter((name) => name.endsWith(".md"))
        .map((name) => name.slice(0, -3));
    build(root);
    const works = JSON.parse(await readFile(join(root, "dist/verify-works.json"), "utf8"));
    assert.deepEqual(works.map(({ id }) => id).sort(), sourceIds.sort());
    const published = works.filter(({ data }) => !data.draft);
    const index = await html(root);
    assert.equal([...index.matchAll(/<li\b[^>]*data-work-row\b/g)].length, published.length);
    assert.equal(
        [...index.matchAll(/<template\b[^>]*data-work-template=/g)].length,
        published.length
    );
    for (const href of featuredLinks(index)) {
        assert.ok(published.some((work) => href === `/works/${work.id}/`));
    }
    assert.doesNotMatch(index, /class="markdown-body"/);
    for (const work of works) {
        if (work.data.draft) {
            await assert.rejects(html(root, work.id), { code: "ENOENT" });
            continue;
        }
        const page = await html(root, work.id);
        assert.ok(page.includes(escapeHtml(work.data.title)));
        assert.ok(page.includes(escapeHtml(work.data.description)));
        for (const media of work.data.gallery) {
            assert.ok(
                page.includes(escapeHtml(media.src)),
                `メディア欠落: ${work.id} → ${media.src}`
            );
            if (media.src.startsWith("/")) {
                await assert.doesNotReject(readFile(join(project, "public", media.src)));
            }
        }
        for (const link of work.data.links) {
            assert.ok(
                page.includes(escapeHtml(link.href)),
                `リンク欠落: ${work.id} → ${link.href}`
            );
            assert.ok(page.includes(escapeHtml(link.label)));
        }
    }
});

test("サブカテゴリーは複数指定・旧単一値・未指定に対応し、全表示箇所に反映する", async (t) => {
    const root = await fixture(t);
    await rm(join(root, "src/content/works"), { recursive: true });
    await mkdir(join(root, "src/content/works"));
    await addWork(root, "multi", {
        subcategory: [" arduino ", "experimental", "arduino", "独自<分類>"],
    });
    await addWork(root, "legacy", { subcategory: " web " });
    await addWork(root, "omitted");
    await addWork(root, "empty", { subcategory: [] });
    await addWork(root, "null-value", { subcategory: null });
    build(root);

    const works = JSON.parse(await readFile(join(root, "dist/verify-works.json"), "utf8"));
    assert.deepEqual(works.find(({ id }) => id === "multi").data.subcategory, [
        "arduino",
        "experimental",
        "独自<分類>",
    ]);
    assert.deepEqual(works.find(({ id }) => id === "legacy").data.subcategory, ["web"]);
    const index = await html(root);
    for (const [id, label] of [
        ["multi", "Arduino / 実験的 / 独自&lt;分類&gt;"],
        ["legacy", "Webサイト"],
    ]) {
        const row = index.match(
            new RegExp(`<li\\b[^>]*data-work-id="${id}"[^>]*>[\\s\\S]*?</li>`)
        )?.[0];
        const preview = index.match(
            new RegExp(`<template\\b[^>]*data-work-template="${id}"[^>]*>[\\s\\S]*?</template>`)
        )?.[0];
        assert.ok(row?.includes(label), `Indexの分類欠落: ${id}`);
        assert.ok(preview?.includes(label), `Previewの分類欠落: ${id}`);
        assert.ok((await html(root, id)).includes(`<p class="work-subcategory">${label}</p>`));
    }
    assert.doesNotMatch(index, /独自<分類>|Arduino \/ 実験的 \/ Arduino/);
    for (const id of ["omitted", "empty", "null-value"]) {
        assert.deepEqual(works.find((work) => work.id === id).data.subcategory, []);
        assert.doesNotMatch(await html(root, id), /class="work-subcategory"/);
    }
});

test("Featured順序と上限・下書き除外・省略値・Markdown・公開Blogとの関連・baseパス", async (t) => {
    const root = await fixture(t);
    await rm(join(root, "src/content/works"), { recursive: true });
    await mkdir(join(root, "src/content/works"));
    await writeFile(
        join(root, "src/content/blog/private-post.md"),
        '---\ntitle: "PRIVATE_BLOG_TITLE"\ndescription: "非公開"\npubDate: 2026-01-01\ncategory: development\ndraft: true\n---\n'
    );
    await addWork(root, "plain", { featured: true, featuredOrder: 3 });
    await addWork(root, "first", { featured: true, featuredOrder: 1 });
    await addWork(root, "last", { featured: true, featuredOrder: 4 });
    await addWork(root, "draft-work", {
        title: "PRIVATE_WORK_TITLE",
        featured: true,
        featuredOrder: 0,
        draft: true,
    });
    await addWork(
        root,
        "body",
        {
            title: "詳しい作品",
            featured: true,
            featuredOrder: 2,
            year: 2026,
            status: "development",
            technologies: ["TypeScript"],
            features: ["検証用の機能"],
            relatedPosts: ["private-post"],
            gallery: [
                { type: "image", src: "/works/tyoi-server/image-01.png", alt: "検証画像1" },
                { type: "image", src: "/works/site-map/image-01.png", alt: "検証画像2" },
            ],
            links: { github: "https://github.com/donneko/", demo: "/works/plain/" },
        },
        "## 本文だけの見出し\n\nMarkdown本文の検証です。\n\n~~~ts\nconst value: number = 1;\n~~~\n\n| 項目 | 内容 |\n| --- | --- |\n| 表 | 検証 |\n\n> 引用の検証\n\n<script>WORK_SCRIPT_EXECUTED</script>\n\n[x](javascript:alert%281%29)"
    );
    build(root);
    const index = await html(root);
    assert.deepEqual(featuredLinks(index), ["/works/first/", "/works/body/", "/works/plain/"]);
    assert.doesNotMatch(index, /PRIVATE_WORK_TITLE|本文だけの見出し|WORK_SCRIPT_EXECUTED/);
    assert.equal([...index.matchAll(/<li\b[^>]*data-work-row\b/g)].length, 4);
    await assert.rejects(html(root, "draft-work"), { code: "ENOENT" });
    const plain = await html(root, "plain");
    assert.match(plain, /画像はまだありません/);
    assert.doesNotMatch(
        plain,
        /class="markdown-body"|<h2>使用技術|<h2>主な機能|id="work-gallery-heading"|関連するBlog記事|状況：/
    );
    const body = await html(root, "body");
    assert.match(body, /2026年/);
    assert.match(body, /状況：development/);
    assert.match(body, /本文だけの見出し/);
    assert.match(body, /class="astro-code/);
    assert.match(body, /class="markdown-body"/);
    assert.match(body, /class="markdown-table-scroll"/);
    assert.match(body, /<blockquote>/);
    assert.match(body, /id="work-gallery-heading"/);
    assert.doesNotMatch(
        body,
        /PRIVATE_BLOG_TITLE|private-post|WORK_SCRIPT_EXECUTED|href="javascript:/i
    );
    assert.match(body, /href="https:\/\/github.com\/donneko\/"/);
    assert.match(body, /href="\/works\/plain\/"/);
    const data = JSON.parse(await readFile(join(root, "dist/verify-works.json"), "utf8"));
    const defaults = data.find((work) => work.id === "plain").data;
    assert.deepEqual(defaults.gallery, []);
    assert.deepEqual(defaults.technologies, []);
    assert.deepEqual(defaults.features, []);
    assert.deepEqual(defaults.links, []);
    assert.deepEqual(defaults.relatedPosts, []);
    assert.equal(defaults.draft, false);
    assert.equal(defaults.year, undefined);
    assert.equal(defaults.status, undefined);

    build(root, "--base", "/example");
    const base = await html(root, "body");
    assert.match(base, /href="\/example\/works\/"/);
    assert.match(base, /href="\/example\/works\/plain\/"/);
    assert.match(base, /src="\/example\/works\/tyoi-server\/image-01\.png"/);
});

test("公開作品0件でもFeaturedと一覧・詳細を安全に生成する", async (t) => {
    const root = await fixture(t);
    await rm(join(root, "src/content/works"), { recursive: true });
    await mkdir(join(root, "src/content/works"));
    await addWork(root, "private-only", { draft: true, featured: true });
    build(root);
    const index = await html(root);
    assert.equal(featuredLinks(index).length, 0);
    assert.doesNotMatch(
        index,
        /id="featured-heading"|<li\b[^>]*data-work-row|<template\b[^>]*data-work-template=/
    );
    assert.match(index, /0 \/ 0作品/);
    assert.match(index, /該当する作品はありません/);
    assert.deepEqual(
        (await readdir(join(root, "dist/works"))).filter((file) => file === "private-only"),
        []
    );
});

test("README・コピー元は公開せず、両テンプレートはコピー後に有効な下書きとして扱う", async (t) => {
    const root = await fixture(t);
    const workIds = (await readdir(join(root, "src/content/works")))
        .filter((name) => name.endsWith(".md"))
        .map((name) => name.slice(0, -3));
    const blogIds = (await readdir(join(root, "src/content/blog")))
        .filter((name) => name.endsWith(".md"))
        .map((name) => name.slice(0, -3));
    for (const collection of ["blog", "works"]) {
        await cp(
            join(project, `src/content/_templates/${collection}.md`),
            join(root, `src/content/${collection}/template-check.md`)
        );
        // コピー元のdraftを外しても収集対象外であることを検証する。
        const templatePath = join(root, `src/content/_templates/${collection}.md`);
        const template = await readFile(templatePath, "utf8");
        await writeFile(
            templatePath,
            template
                .replace(
                    /^title:.*$/m,
                    `title: "OUTSIDE_${collection.toUpperCase()}_TEMPLATE_SENTINEL"`
                )
                .replace(/^draft: true$/m, "draft: false")
        );
    }
    await writeFile(join(root, "src/content/README.md"), "# CONTENT_README_DO_NOT_PUBLISH\n");
    await writeFile(
        join(root, "src/pages/verify-blog.json.ts"),
        'import {getCollection} from "astro:content"; export const GET = async () => new Response(JSON.stringify(await getCollection("blog")));'
    );

    const assertInternalFilesExcluded = async () => {
        const files = await readdir(join(root, "dist"), { recursive: true });
        assert.ok(!files.some((name) => /(?:^|\/)(?:README\.md|_templates)(?:\/|$)/i.test(name)));
        for (const name of files.filter((name) => /\.(?:html|xml)$/.test(name))) {
            assert.doesNotMatch(
                await readFile(join(root, "dist", name), "utf8"),
                /CONTENT_README_DO_NOT_PUBLISH|OUTSIDE_(?:BLOG|WORKS)_TEMPLATE_SENTINEL/
            );
        }
    };

    build(root);
    const works = JSON.parse(await readFile(join(root, "dist/verify-works.json"), "utf8"));
    const posts = JSON.parse(await readFile(join(root, "dist/verify-blog.json"), "utf8"));
    assert.deepEqual(works.map(({ id }) => id).sort(), [...workIds, "template-check"].sort());
    assert.deepEqual(posts.map(({ id }) => id).sort(), [...blogIds, "template-check"].sort());
    assert.equal(works.find(({ id }) => id === "template-check").data.draft, true);
    assert.equal(posts.find(({ id }) => id === "template-check").data.draft, true);
    const publicWorks = works.filter(({ data }) => !data.draft).length;
    const publicPosts = posts.filter(({ data }) => !data.draft).length;
    assert.equal(
        [...(await html(root)).matchAll(/<li\b[^>]*data-work-row\b/g)].length,
        publicWorks
    );
    const blog = await readFile(join(root, "dist/blog/index.html"), "utf8");
    assert.ok(blog.includes(`全${publicPosts}件`));
    await assert.rejects(html(root, "template-check"), { code: "ENOENT" });
    await assert.rejects(readFile(join(root, "dist/blog/template-check/index.html")), {
        code: "ENOENT",
    });
    await assert.rejects(readFile(join(root, "dist/blog/rss.xml")), { code: "ENOENT" });
    const postTitle = posts.find(({ id }) => id === "template-check").data.title;
    const workTitle = works.find(({ id }) => id === "template-check").data.title;
    assert.ok(!blog.includes(postTitle));
    assert.ok(!(await html(root)).includes(workTitle));
    await assertInternalFilesExcluded();

    // draftを外せば、テンプレートから通常の記事・作品ページを生成できる。
    for (const collection of ["blog", "works"]) {
        const path = join(root, `src/content/${collection}/template-check.md`);
        await writeFile(
            path,
            (await readFile(path, "utf8")).replace(/^draft: true$/m, "draft: false")
        );
    }
    build(root);
    assert.match(await html(root, "template-check"), /class="markdown-body"/);
    const publishedBlog = await readFile(join(root, "dist/blog/template-check/index.html"), "utf8");
    assert.match(publishedBlog, /class="markdown-body"/);
    assert.ok(publishedBlog.includes(postTitle));
    assert.equal(
        [...(await html(root)).matchAll(/<li\b[^>]*data-work-row\b/g)].length,
        publicWorks + 1
    );
    assert.ok(
        (await readFile(join(root, "dist/blog/index.html"), "utf8")).includes(
            `全${publicPosts + 1}件`
        )
    );
    await assertInternalFilesExcluded();
});

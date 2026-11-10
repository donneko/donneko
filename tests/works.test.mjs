import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
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
import ts from "typescript";

const project = fileURLToPath(new URL("../", import.meta.url));
const groups = {
    npm: "software",
    web: "software",
    program: "software",
    hardware: "hardware",
    design: "design",
    illustration: "design",
    "3d": "visual",
    game: "visual",
    video: "visual",
};

async function fixture(t) {
    const root = await realpath(await mkdtemp(join(tmpdir(), "donneko-works-test-")));
    t.after(() => rm(root, { recursive: true, force: true }));
    await cp(join(project, "src"), join(root, "src"), { recursive: true });
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
            cwd: project,
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

test("69件の作品・103件のメディア・13件のリンクと元分類をすべて保持する", async (t) => {
    const root = await fixture(t);
    const legacySource = await readFile(join(project, "src/data/projects.ts"), "utf8");
    const compiled = ts.transpileModule(legacySource, {
        compilerOptions: { module: ts.ModuleKind.ESNext },
    }).outputText;
    const { projects } = await import(
        `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
    );
    build(root);
    const works = JSON.parse(await readFile(join(root, "dist/verify-works.json"), "utf8"));
    assert.equal(projects.length, 69);
    // 新規作品の追加やFeatured設定の変更を妨げず、元69件の移行を照合する。
    assert.ok(works.length >= projects.length);
    const originalIds = new Set(projects.map((work) => work.media[0].src.split("/")[2]));
    const migrated = works.filter((work) => originalIds.has(work.id));
    const published = works.filter((work) => !work.data.draft);
    assert.equal(migrated.length, 69);
    assert.equal(
        migrated.reduce((total, work) => total + work.data.gallery.length, 0),
        103
    );
    assert.equal(
        migrated.reduce((total, work) => total + work.data.links.length, 0),
        13
    );
    const entries = new Map(works.map((work) => [work.id, work]));
    const index = await html(root);
    assert.equal([...index.matchAll(/<li\b[^>]*data-work-row\b/g)].length, published.length);
    assert.equal(
        [...index.matchAll(/<template\b[^>]*data-work-template=/g)].length,
        published.length
    );
    for (const href of featuredLinks(index)) {
        assert.ok(published.some((work) => href === `/works/${work.id}/`));
    }
    assert.doesNotMatch(index, /class="work-body"/);

    for (const [position, original] of projects.entries()) {
        const id = original.media[0].src.split("/")[2];
        const work = entries.get(id);
        assert.ok(work, `移行漏れ: ${original.title}`);
        assert.equal(work.data.title, original.title);
        assert.equal(work.data.description, original.description);
        assert.equal(work.data.subcategory, original.category);
        assert.equal(work.data.category, groups[original.category]);
        assert.equal(work.data.order, position + 1);
        assert.deepEqual(work.data.gallery, original.media);
        assert.deepEqual(work.data.links, original.links ?? []);
        if (work.data.draft) {
            await assert.rejects(html(root, id), { code: "ENOENT" });
            continue;
        }
        const page = await html(root, id);
        assert.ok(page.includes(escapeHtml(original.title)));
        assert.ok(page.includes(escapeHtml(original.description)));
        for (const media of original.media) {
            assert.ok(page.includes(media.src), `メディア欠落: ${id} → ${media.src}`);
            await assert.doesNotReject(readFile(join(project, "public", media.src)));
        }
        for (const link of original.links ?? []) {
            assert.ok(page.includes(link.href), `リンク欠落: ${id} → ${link.href}`);
            assert.ok(page.includes(escapeHtml(link.label)));
        }
    }
    const categoryCounts = migrated.reduce((counts, work) => {
        counts[work.data.category] = (counts[work.data.category] ?? 0) + 1;
        return counts;
    }, {});
    assert.deepEqual(categoryCounts, { software: 22, visual: 23, hardware: 1, design: 23 });
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
            relatedPosts: ["sample-markdown", "private-post"],
            gallery: [
                { type: "image", src: "/works/tyoi-server/terminal-output.png", alt: "検証画像1" },
                { type: "image", src: "/works/site-map/logo.png", alt: "検証画像2" },
            ],
            links: { github: "https://github.com/donneko/", demo: "/works/plain/" },
        },
        "## 本文だけの見出し\n\nMarkdown本文の検証です。\n\n~~~ts\nconst value: number = 1;\n~~~\n\n<script>WORK_SCRIPT_EXECUTED</script>\n\n[x](javascript:alert%281%29)"
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
        /class="work-body"|<h2>使用技術|<h2>主な機能|id="work-gallery-heading"|関連するBlog記事|状況：/
    );
    const body = await html(root, "body");
    assert.match(body, /2026年/);
    assert.match(body, /状況：development/);
    assert.match(body, /本文だけの見出し/);
    assert.match(body, /class="astro-code/);
    assert.match(body, /id="work-gallery-heading"/);
    assert.match(body, /href="\/blog\/sample-markdown\/"/);
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
    assert.match(base, /src="\/example\/works\/tyoi-server\/terminal-output.png"/);
    assert.match(base, /href="\/example\/blog\/sample-markdown\/"/);
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

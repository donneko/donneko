import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
    cp,
    mkdtemp,
    mkdir,
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

async function createFixture(t) {
    const root = await realpath(await mkdtemp(join(tmpdir(), "donneko-blog-test-")));
    t.after(() => rm(root, { recursive: true, force: true }));
    await cp(join(project, "src"), join(root, "src"), { recursive: true });
    await cp(join(project, "public"), join(root, "public"), { recursive: true });
    for (const name of ["astro.config.mjs", "tsconfig.json", "package.json"]) {
        await cp(join(project, name), join(root, name));
    }
    // node_modulesは共有するが、Content Layerのキャッシュは検証プロジェクトごとに分ける。
    const config = await readFile(join(root, "astro.config.mjs"), "utf8");
    await writeFile(
        join(root, "astro.config.mjs"),
        config.replace("defineConfig({", 'defineConfig({ cacheDir: "./.astro-cache",')
    );
    await symlink(join(project, "node_modules"), join(root, "node_modules"), "dir");
    await rm(join(root, "src/content/blog"), { recursive: true, force: true });
    await mkdir(join(root, "src/content/blog"));
    return root;
}

async function addPost(root, id, metadata = {}, body = "## 表示確認\n\n検証用の記事です。") {
    const data = {
        title: `検証記事 ${id}`,
        description: `検証用の概要 ${id}`,
        pubDate: "2026-01-01",
        category: "development",
        ...metadata,
    };
    const frontmatter = Object.entries(data)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join("\n");
    await writeFile(
        join(root, `src/content/blog/${id}.md`),
        `---\n${frontmatter}\n---\n\n${body}\n`
    );
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

const html = (root, route) => readFile(join(root, "dist", route, "index.html"), "utf8");
const postLinks = (source) =>
    [...source.matchAll(/<h2\b[^>]*>\s*<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);

async function outputFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const children = await Promise.all(
        entries.map((entry) =>
            entry.isDirectory()
                ? outputFiles(join(directory, entry.name))
                : [join(directory, entry.name)]
        )
    );
    return children.flat();
}

test("21記事の並び順・ページ送り・下書き除外・タグ・Markdown", async (t) => {
    const root = await createFixture(t);
    for (let number = 1; number <= 21; number++) {
        const suffix = String(number).padStart(2, "0");
        await addPost(root, `post-${suffix}`, {
            pubDate: `2026-01-${suffix}`,
            category: number % 2 ? "development" : "engineering",
        });
    }
    // ソートはファイル名や作成順ではなくpubDateを使う。
    await addPost(
        root,
        "post-01",
        {
            title: "検証 <タイトル> & RSS",
            pubDate: "2026-02-01",
            updatedDate: "2026-02-02",
            tags: ["C++", "C#", "日本語", "設計 メモ", "C++"],
        },
        `## コードと安全性

~~~ts
const message: string = "sample";
~~~

| 項目 | 内容 |
| --- | --- |
| sample | sample |

> 引用のサンプル

![背景画像](../../assets/tana.svg)

<script>globalThis.rawHtmlExecuted = true</script>

<img src="x" onerror="alert(1)">

[危険なリンク](javascript:alert%281%29)
[参照リンク][unsafe]

[unsafe]: javascript:alert%281%29

[dataリンク](data:text/html,test)
[正常なリンク](https://example.com/)

~~~html
<script>これはコード例として表示する文字列</script>
~~~`
    );
    await addPost(root, "draft-secret", {
        title: "DRAFT_SECRET_TITLE",
        description: "DRAFT_SECRET_DESCRIPTION",
        pubDate: "2030-01-01",
        category: "research",
        tags: ["DRAFT_SECRET_TAG"],
        draft: true,
    });
    build(root);

    const first = await html(root, "blog");
    const second = await html(root, "blog/2");
    const third = await html(root, "blog/3");
    const expected = [
        "01",
        ...Array.from({ length: 20 }, (_, i) => String(21 - i).padStart(2, "0")),
    ].map((id) => `/blog/post-${id}/`);
    assert.deepEqual(postLinks(first), expected.slice(0, 10));
    assert.deepEqual(postLinks(second), expected.slice(10, 20));
    assert.deepEqual(postLinks(third), expected.slice(20));
    assert.match(first, /全21件/);
    assert.match(first, /href="\/blog\/2\/" rel="next"/);
    assert.doesNotMatch(first, /rel="prev"/);
    assert.match(second, /href="\/blog\/" rel="prev"/);
    assert.match(second, /href="\/blog\/3\/" rel="next"/);
    assert.match(third, /href="\/blog\/2\/" rel="prev"/);
    assert.doesNotMatch(third, /rel="next"/);
    await assert.rejects(html(root, "blog/1"), { code: "ENOENT" });
    await assert.rejects(html(root, "blog/4"), { code: "ENOENT" });
    await assert.rejects(html(root, "blog/draft-secret"), { code: "ENOENT" });
    await assert.rejects(html(root, "blog/tags/DRAFT_SECRET_TAG"), { code: "ENOENT" });

    assert.equal(postLinks(await html(root, "blog/categories/development")).length, 11);
    assert.equal(postLinks(await html(root, "blog/categories/engineering")).length, 10);
    assert.match(
        await html(root, "blog/categories/research"),
        /公開されている記事はまだありません/
    );
    assert.match(
        await html(root, "blog/categories/infrastructure"),
        /公開されている記事はまだありません/
    );

    const article = await html(root, "blog/post-01");
    assert.match(article, /2026年2月1日/);
    assert.match(article, /更新日：[\s\S]*2026年2月2日/);
    assert.match(article, /<title>検証 &lt;タイトル&gt; &amp; RSS \| 丼猫のウェブサイト<\/title>/);
    assert.match(article, /name="description" content="検証用の概要 post-01"/);
    assert.match(article, /class="astro-code/);
    assert.match(article, /<span style="color:/);
    assert.match(article, /tabindex="0"/);
    assert.match(article, /class="markdown-table-scroll"/);
    assert.match(article, /<blockquote>/);
    assert.match(article, /<img /);
    assert.match(article, /href="https:\/\/example.com\/"/);
    assert.match(article, /これはコード例として表示する文字列/);
    assert.doesNotMatch(
        article,
        /<script[\s>]|onerror=|globalThis\.rawHtmlExecuted|href="(?:javascript|data):/i
    );
    assert.equal((article.match(/href="\/blog\/tags\/C%2B%2B\/"/g) ?? []).length, 1);

    // 出力ファイルをURLデコードしてたどり、全ブログ内リンクとCSS・画像を検証する。
    const files = await outputFiles(join(root, "dist"));
    for (const file of files.filter((path) => path.endsWith(".html") && path.includes("/blog/"))) {
        const source = await readFile(file, "utf8");
        assert.doesNotMatch(source, /DRAFT_SECRET_/);
        for (const [, href] of source.matchAll(/(?:href|src)="([^"#]+)"/g)) {
            if (!href.startsWith("/")) continue;
            const pathname = decodeURIComponent(new URL(href, "https://example.com").pathname);
            const target = join(root, "dist", pathname, pathname.endsWith("/") ? "index.html" : "");
            await assert.doesNotReject(readFile(target), `リンク切れ: ${file} → ${href}`);
        }
    }

    // RSSは削除済み。公開機能を追加し直していないことも確認する。
    await assert.rejects(readFile(join(root, "dist/blog/rss.xml")), { code: "ENOENT" });
});

test("記事0件と下書きだけのブログを正常に生成する", async (t) => {
    const root = await createFixture(t);
    for (const draftOnly of [false, true]) {
        if (draftOnly) await addPost(root, "only-draft", { draft: true, tags: ["非公開タグ"] });
        build(root);
        const source = await html(root, "blog");
        assert.match(source, /全0件/);
        assert.match(source, /公開されている記事はまだありません/);
        assert.doesNotMatch(source, /<nav class="blog-pagination"/);
        assert.equal(postLinks(source).length, 0);
        const files = await outputFiles(join(root, "dist/blog"));
        assert.equal(files.filter((file) => file.endsWith(".html")).length, 5);
    }
});

test("base付きでもブログが同じ公開パスにリンクする", async (t) => {
    const root = await createFixture(t);
    await addPost(root, "base-sample", { tags: ["Astro"] });
    build(root, "--base", "/example");
    // Astroのdistはbase自体を含まず、その配下へ配置するファイルが生成される。
    const source = await html(root, "blog");
    assert.match(source, /href="\/example\/blog\/base-sample\/"/);
    assert.match(source, /href="\/example\/blog\/categories\/development\/"/);
    assert.match(source, /href="\/example\/blog\/tags\/Astro\/"/);
});

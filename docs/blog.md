# 技術ブログの運用

メタ情報の一覧・初期値・書き方は [ContentのREADME](../src/content/README.md) にまとめています。
記事の追加には [Blogテンプレート](../src/content/_templates/blog.md) をコピーして使ってください。README・テンプレートは公開対象外です。

Astro 7.4.1 / SSG構成でContent Layer API（`glob`、`getCollection`、`render`）を使用しています。
記事は `src/content/blog/` 直下の `.md` のみです。CMS・DB・認証・投稿APIはありません。
追加のnpmパッケージは使用していません。Markdownの安全設定には、既存のAstro依存に含まれる `@astrojs/markdown-satteri` を使用します。

## 記事を追加する

`src/content/blog/my-first-post.md` を作成します。

````markdown
---
title: "記事タイトル"
description: "記事の概要。記事一覧とmeta descriptionで使います。"
pubDate: 2026-11-09
updatedDate: 2026-11-10
category: development
tags: [Astro, TypeScript]
draft: true
---

## 最初の見出し

本文をMarkdownで書きます。

```ts
const message = "サンプル";
```
````

- `title`、`description`、`pubDate`、`category` は必須です。
- `updatedDate` と `tags` は省略できます。`draft` の省略時は `false` です。
- `draft: true` の記事は開発時も含めて一覧・個別ページ・カテゴリ・タグから除外します。プレビューする場合はローカルで一時的に `false` にし、公開前に戻してください。
- `pubDate` は予約投稿の指定ではありません。未来の日付でも `draft: false` なら公開されます。
- 日付は `YYYY-MM-DD` を推奨します。表示は日本語・日本時間です。
- ファイル名がそのままURLのslugになります。英小文字で始まる `my-first-post.md` のようなkebab-caseを使用してください。数字だけの名前と `categories.md`、`tags.md` は使用できません。
- サブディレクトリと `.mdx` は読み込みません。公開後にファイル名を変えるとURLも変わります。
- タイトルはページ側が `h1` として表示するので、本文の見出しは `##` から始めてください。
- 生HTMLは削除されます。コードフェンス中のHTMLは文字列として表示できます。リンクや画像で `javascript:`、`data:` などのスキームは使えません。
- 画像には代替テキストを付けます。`public/blog/example.png` の場合は `![画像の説明](/blog/example.png)` と記述します。`src` 内の画像はMarkdownファイルからの相対パスも使用できます。
- 初期サンプル `sample-markdown.md` は、運用開始時に削除または下書きにできます。

## カテゴリとタグ

カテゴリは次の英小文字の値を使用します。表示名との対応は `src/data/blog.ts` で管理しています。

| 設定値 | 表示名 | 用途 |
| --- | --- | --- |
| `development` | Development | 開発記録 |
| `engineering` | Engineering | 技術解説・設計 |
| `infrastructure` | Infrastructure | サーバー・ネットワーク |
| `research` | Research | 技術検証・実験 |

カテゴリを追加する場合は `src/data/blog.ts` に項目を追加してください。スキーマ・リンク・静的ページに反映されます。
カテゴリページは記事0件でも生成されます。

タグは自由な文字列の配列です。日本語・`C++`・`C#` も使用できます。大文字小文字は区別するため表記を統一してください。
前後の空白を除去し、同一記事内での重複はまとめます。URLのパス区切りになる `/`・`\`・`%`、制御文字、`.` と `..` は使用できません。
タグページは公開記事のタグだけから生成し、URLはエンコードします。
静的ホストで確実に配信するため、`#`・`?`・`~` はパス内で衝突しない表記に置き換えます（例：`C#` → `/blog/tags/C~23~/`）。表示名は元のタグのままです。

## URLと公開方法

- `/blog/`：新しい順、1ページ10件。0件のときも表示します。
- `/blog/2/`、`/blog/3/`：記事が増えると自動生成します。`/blog/1/` は生成しません。
- `/blog/my-first-post/`：記事詳細。
- `/blog/categories/development/`：カテゴリ別の全記事（新しい順）。
- `/blog/tags/Astro/`：タグ別の全記事（新しい順）。

現在のサイトにはRSSの生成・配信はありません。

既存設定は `site: "https://donneko.github.io"`、`base` 未指定のルート配信です。既存ページもルート相対リンクを使っています。
GitHub Actionsは引き続きNode.js 22で `npm ci` → `npm run build` → `dist/` をGitHub Pagesへ公開します。
独自ドメイン `donneko.net` への実際のDNS・Pages設定はこのリポジトリだけでは確認できません。実際の公開先が独自ドメインなら、`site` も運用設定に合わせてください。
ブログの自動生成リンクは `BASE_URL` に対応していますが、将来サイト全体をサブパスに移す場合は既存ページのルート相対リンクも確認する必要があります。

Worksは制作物紹介、Blogは開発過程・設計・検証・トラブルシューティング、Diaryは既存の外部日記への案内です。
Worksの `src/content/works/*.md` に `relatedPosts: [my-first-post]` を設定すると、作品詳細から公開済みの関連記事へリンクできます。
Worksの現在のデータ構造と運用方法は [Worksのガイド](works.md) を参照してください。

## 確認

```sh
npm ci
npm run dev
npm run build
npm run preview
npm run test:blog
```

`test:blog` は一時ディレクトリに検証用プロジェクトを作り、実際の静的ビルドでページ送り、並び順、空の一覧、下書き除外、タグのURL、生HTML・危険なリンクの除外を確認します。
運用記事や本番の `dist/` は書き換えません。
ブラウザではデスクトップと狭い画面で、コード・表の横スクロール、キーボードフォーカス、画像と既存ページも確認してください。

公式APIの参考：
[Content Collections](https://docs.astro.build/en/guides/content-collections/)、
[Sätteri](https://docs.astro.build/en/reference/markdown-processors/satteri/)、
[Pagination](https://docs.astro.build/en/guides/routing/#pagination)。

## 今回の変更ファイル

既存ファイルの変更：

- `astro.config.mjs`：Markdownの安全設定・横スクロールのアクセシビリティ。
- `package.json`：`test:blog` コマンドだけを追加。依存関係は変更なし。
- `src/components/nav.astro`：ブログへのリンクを追加。
- `src/pages/index.astro`：サイトマップへブログを追加。

追加ファイル：

- `src/content.config.ts`：Content Layerの読み込み・スキーマ・記事ID。
- `src/content/blog/sample-markdown.md`：動作確認用の記事1件。
- `src/data/blog.ts`：カテゴリ定義。
- `src/lib/blog.ts`：公開記事取得・ソート・日付・URL。
- `src/lib/safe-markdown.mjs`：生HTML・危険なURLの除外、表とコードのキーボード操作。
- `src/layouts/BlogLayout.astro`：既存レイアウトを使うブログ用レイアウト。
- `src/components/blog/PostList.astro`：記事アーカイブ。
- `src/components/blog/PostMeta.astro`：日付・カテゴリ・タグ表示。
- `src/pages/blog/[...page].astro`：一覧とページ送り。
- `src/pages/blog/[slug].astro`：記事詳細。
- `src/pages/blog/categories/[category].astro`：カテゴリ別一覧。
- `src/pages/blog/tags/[tag].astro`：タグ別一覧。
- `src/styles/blog.css`：ブログに限定したスタイル。
- `tests/blog.test.mjs`：一時プロジェクトでのビルド検証。
- `docs/blog.md`：この運用ガイド。

ブログ追加時には、既存のWorks・Diary・About・Linksの本文、共通レイアウト、共通CSS、GitHub Actions、lockfileは変更していません。Worksのその後の再設計については [Worksのガイド](works.md) を参照してください。

## 実装時の確認結果

- `npm run build` 成功（既存5ページを含む13 HTMLページと静的RSS）。
- `npm run test:blog` の3テスト成功。21記事、0記事、下書きのみ、サブパス配信を含む4回の静的ビルドを検証。
- `tsc --noEmit`、変更対象のESLint・Prettier、`git diff --check` 成功。
- Chromiumで280 / 320 / 390 / 768 / 1440pxの各幅を確認。ブログ5ルート×5幅でページ全体の横はみ出しなし。
- 各幅で長いコード・表の横スクロール、コードへのフォーカス、大きな画像の収まりを確認。
- 既存5ページを1440 / 390pxで確認。Worksの絞り込みと画像送りも動作。
- Works・Diary・About・Linksのmain内DOMが変更前のビルドと一致。
- GitHub Pagesへの実際のデプロイは未実施。独自ドメインのDNS・Pages設定は未確認。
- 既存の共通レイアウトには未配置の `/favicon.svg`・`/favicon.ico` 参照があります。今回の追加によるものではないため変更せず、ブログ内リンクの検証では除外しています。

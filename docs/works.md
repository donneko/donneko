# Worksの構成と運用

メタ情報の一覧・初期値・書き方は [ContentのREADME](../src/content/README.md) にまとめています。
記事の追加には [Worksテンプレート](../src/content/_templates/works.md) をコピーして使ってください。README・テンプレートは公開対象外です。

Astro 7.2.2のContent Layer APIを使い、作品を `src/content/works/*.md` で管理します。
静的HTMLを生成する構成です。依存パッケージ、GitHub Actions、公開先設定は変更していません。

## 現在のファイル構成

現在の作品数は39件です。作品名に合わせてMarkdown24件を改名し、使用中の画像・動画96件を対応する作品IDのフォルダへ集約しました。未使用メディア7件は削除しています。
メディア名は `image-01.jpg`・`video-01.mp4` の形式です。作品詳細・メディアの旧URLへの転送はありません。
改名対応表・削除一覧は [メディア監査](works-media-audit.md) を参照してください。

## 初回移行時の記録

既存の69作品を69件のMarkdownへ移行しました。タイトル・概要・元カテゴリ・メディアの順序・代替テキスト・リンクのURLとラベルは保持しています。

| 項目 | 移行前 | 移行後 |
| --- | ---: | ---: |
| 作品数 | 69 | 69 |
| 画像 | 86 | 86 |
| 動画 | 17 | 17 |
| 外部リンク | 13 | 13 |

元の9分類は `subcategory` に保持し、Explorerでは4グループにまとめました。

| category | 表示名 | 元の分類 | 件数 |
| --- | --- | --- | ---: |
| `software` | Software | npm・web・program | 22 |
| `hardware` | Hardware | hardware | 1 |
| `design` | Design | design・illustration | 23 |
| `visual` | 3D / Game / Video | 3d・game・video | 23 |

初回移行時は、作品のslugに既存メディアのディレクトリ名を使用し、`/works/` と全画像・動画の公開パスを維持しました。その後の整理で、作品詳細とメディアのパスを変更しています。
以前は作品ごとのHTMLページがなかったため、今回は `/works/tyoi-server/` など69件の詳細ページを追加しています。
初回移行時は画像・動画のファイルを移動・変更していません。

旧データからの移行は完了しており、現在は `src/content/works/*.md` が作品データの管理元です。
作品の更新はMarkdownだけに行ってください。年・状態・使用技術・機能は、既存情報で確認できたものだけを設定し、不明な値は省略しています。

## 画面と操作

- Featured Projects：最大3件。先頭を大きくするBentoレイアウトです。カードから作品詳細へ通常のページ遷移をします。
- Project Explorer：1000px以上では左が全作品のIndex、右が選択した作品のPreviewです。本文は読み込まず、概要・技術・特徴・リンクを表示します。
- 1000px未満では縦型の一覧になります。作品をタップすると短い作品も含めて詳細ページに進み、ブラウザの「戻る」で一覧へ戻れます。
- カテゴリ変更時、現在の作品が該当すれば選択を維持し、該当しなければ先頭の作品を表示します。0件の場合は空状態を表示します。
- PCではTab・Enter・Spaceに加えて、Index内の↑↓・Home・Endでも作品を選べます。Ctrl / Commandクリックなどは通常のリンクとして詳細ページを開きます。
- 画像はクリックで拡大します。閉じるボタン・Esc・背景クリックで閉じ、元の画像リンクにフォーカスを戻します。動画はブラウザ標準のコントロールで再生できます。
- JavaScript無効時はIndexの全作品が通常のリンクとして機能し、画像は元ファイルを新しいタブに開きます。動かないフィルタボタンは表示しません。

共通ナビゲーション、フォント、配色、背景、余白は既存レイアウトを使用します。既存の共通レイアウトにサイトフッターは未設置のため、新たなサイトフッターは追加していません。
詳細ページ末尾にはWorks一覧へ戻るリンクがあります。

## 作品を追加する

`src/content/works/my-project.md` を作成します。ファイル名がslugになります。公開後は変更しないでください。
英小文字から始まるkebab-caseを使い、一覧と衝突する `index.md` は使用できません。

```yaml
---
title: "作品名"
description: "作品の短い概要"
category: software
draft: true
---
```

`title`・`description`・`category` は必須です。それ以外の項目は必要なものだけ追加します。

```yaml
# 任意項目の記述例。実際に確認できる情報だけを設定してください。
subcategory: [web, program]
year: 2026
status: development
thumbnail: /works/my-project/image-01.png
thumbnailAlt: "作品の画面"
gallery:
    - type: image
      src: /works/my-project/image-01.png
      alt: "作品の画面"
    - type: video
      src: /works/my-project/video-01.mp4
      alt: "操作デモ"
      # poster: /works/my-project/image-02.png
technologies:
    - TypeScript
features:
    - "主な特徴"
links:
    github: "https://github.com/your-account/your-project"
    demo: "https://example.com/"
order: 70
featured: false
featuredOrder: 1
relatedPosts: []
```

画像・動画は `public/works/<作品ID>/` に配置し、種類ごとに `image-01.png`・`video-01.mp4` の形式でギャラリー掲載順に採番します。拡張子は元の形式を維持します。同じファイルへの重複参照は同じURLを使い、ギャラリー外のサムネイルは画像の末尾に採番します。
Markdownには `/works/my-project/image-01.png` のように公開パスを書きます。追加時は既存ファイルの番号を変更せず、次の未使用番号を使ってください。
`thumbnail` を省略するとギャラリー内の先頭画像を使います。画像がなければサイトに合わせたプレースホルダーを表示します。
動画だけの作品には「VIDEO」を表示し、プレビューと詳細で動画を再生できます。

メイン表示は `gallery` の先頭、ギャラリーがなければ `thumbnail` です。ギャラリーの2件目以降は詳細ページのギャラリーに表示します。
画像は枠の比率を確保してから `object-fit: contain` で収めるため、縦長のポスターも切り抜きません。

リンクのラベルを指定したい場合は、既存作品と同じ配列形式も使えます。

```yaml
links:
    - href: "https://example.com/"
      label: "ウェブサイトをみる"
      external: true
```

`subcategory` は複数指定できます（例：`subcategory: [web, program]`）。従来の `subcategory: web` も引き続き使えます。省略・空配列・値なし（null）は分類なしとして扱い、同じ値の重複はまとめます。

`subcategory`、`gallery`、`technologies`、`features`、`links`、`relatedPosts` の初期値は空配列です。
`featured`・`draft` は省略時 `false`、`featuredOrder`・`order` は省略時 `999` です。
年・状態・画像は省略できます。情報がない見出しや空の本文欄は表示しません。

## Featuredの設定

掲載する作品に `featured: true` を指定します。`featuredOrder` が小さい順で最大3件を表示し、先頭を大きくします。
同じ番号なら `order`、さらに同じ場合はslugで順序を決めます。公開作品はすべて詳細ページを持ちます。

初期設定は次の3件です。作品の機能を追加推測せず、既存説明と画像を使っています。

1. `tyoi-server`：`featuredOrder: 1`
2. `r4line-portfolio`：`featuredOrder: 2`
3. `packaging-symbols`：`featuredOrder: 3`

## 本文・Blog・下書き

代表作の詳しい説明はFrontmatterの下にMarkdownで書けます。見出しは `##` から始めます。
本文は詳細ページだけで表示し、Explorerに長文を展開しません。本文なしでも正常に表示します。

Blogの記事IDを `relatedPosts` に設定すると、詳細ページ末尾に公開記事だけを表示します。

```yaml
relatedPosts:
    - my-development-note
```

記事IDは `src/content/blog/my-development-note.md` のファイル名から拡張子を除いた値です。
存在しない記事IDはスキーマ検証で検出します。Blog側が `draft: true` の記事は表示しません。
現在の移行作品には、根拠のない関連付けを行っていません。

作品の `draft: true` はFeatured・Index・Previewテンプレート・詳細ページの生成対象から除外します。
MarkdownにはBlogと同じ安全設定を適用し、生HTMLは除外します。リンク・メディアURLはローカル公開パスとhttp(s)に制限しています。

## ローカル確認

```sh
npm run dev
npm run build
npm run preview
npm run test:works
npm run test:blog
```

`test:works` は一時プロジェクトを作ってビルドし、全作品のメタ情報・メディア・リンク、Featuredの順序・上限、下書き、本文なし・画像なし、Markdown、安全設定、関連Blog記事、サブパス、公開作品0件を検証します。
元の記事や本番用の `dist/` は書き換えません。
テストは現在のMarkdownの収集結果と生成ページを照合します。作品の追加やFeatured設定の変更にも対応します。

## 実装時の確認結果

- `npm run build` 成功。既存ページを含む82 HTMLページと静的RSSを生成。
- `npm run test:works` 3件、`npm run test:blog` 3件が成功。
- TypeScript、変更対象のESLint・Prettier、`git diff --check` を確認。
- Chromiumで280 / 320 / 390 / 700 / 768 / 999 / 1000 / 1440pxの8幅、Works一覧と代表的な詳細5ルートの計40組を確認。ページ全体の横はみ出しなし。
- Featuredからの詳細遷移、全カテゴリ、選択の維持・対象外時の切り替え、空状態、キーボード、動画表示、画像拡大、閉じた後のフォーカス復帰、プレビュー切り替え時のスクロール位置を確認。
- スマホ幅で詳細への遷移とブラウザの戻る操作を確認。JavaScript無効の1440 / 390pxでも全69作品のリンク、詳細ページ、元画像の拡大にアクセス可能。
- 既存Blog・トップ・About・Diary・Linksの12 HTMLファイルとBlog RSSが、作業前のビルドとバイト単位で一致。
- サイト内187パスにリンク切れなし。従来から未配置の `/favicon.svg`・`/favicon.ico` は対象外。

本番デプロイ・GitHubへのpushは行っていません。外部サイトの稼働状況、実機モバイルでの操作は検証対象外です。

## 変更ファイル

- `src/pages/works.astro`：一覧をFeatured / Explorerに変更。
- `src/content.config.ts`：Blogを維持し、Worksの読み込みとスキーマを追加。
- `src/data/projects.ts`：移行前データであることを示すコメントだけを追加。
- `package.json`：`test:works` コマンドだけを追加。
- `src/content/works/*.md`：既存69作品のMarkdown。
- `src/data/work-categories.ts`：4グループと元9分類のラベル。
- `src/lib/works.ts`：公開条件、並び順、URL、サムネイル。
- `src/layouts/WorkLayout.astro`：共通レイアウトを使うWorks用レイアウト。
- `src/components/works/FeaturedWorks.astro`：Featured。
- `src/components/works/ProjectExplorer.astro`：Index、フィルタ、Vanilla JavaScript。
- `src/components/works/ProjectPreview.astro`：概要プレビュー。
- `src/components/works/WorkThumbnail.astro`：サムネイルとプレースホルダー。
- `src/components/works/WorkMedia.astro`：画像・動画。
- `src/components/works/WorkGallery.astro`：複数メディア。
- `src/components/works/ImageLightbox.astro`：画像拡大。
- `src/pages/works/[slug].astro`：作品詳細。
- `src/styles/works.css`：Worksに限定したスタイル。
- `tests/works.test.mjs`：ビルド・移行検証。
- `docs/works.md`：この運用ガイド。
- `docs/blog.md`：Worksから関連するBlog記事を設定する方法を更新。

既存のBlog実装・共通レイアウト・共通CSS・ナビゲーション・公開メディア・lockfile・GitHub Actionsは変更していません。

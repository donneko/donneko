# Blog・WorksのMarkdown執筆ガイド

BlogとWorksはMarkdownの先頭にあるYAML Frontmatterでメタ情報を設定します。
型・必須項目・初期値の実装は [`../content.config.ts`](../content.config.ts) が正本です。
本文の見た目は共通の [`../styles/markdown.css`](../styles/markdown.css) で管理しています。

## 配置と公開対象

```text
src/content/
├── README.md                 # このガイド：収集・公開の対象外
├── _templates/               # コピー元：収集・公開の対象外
│   ├── blog.md
│   └── works.md
├── blog/
│   └── my-first-post.md       # Blogの記事
└── works/
    └── my-project.md          # Worksの作品
```

収集するのは `blog/`・`works/` **それぞれの直下にある `*.md` だけ**です。
このREADMEと `_templates/` はコレクションの外にあり、`draft` の値に関係なく、記事・作品・一覧やサイトの公開ファイルに含めません。
公開対象のフォルダへREADMEやテンプレート自体を置いたり、`public/`・`src/pages/` へコピーしたりしないでください。

## テンプレートから追加する

リポジトリのルートで実行します。コピー先のファイル名は用途に合わせて変更してください。

```sh
cp src/content/_templates/blog.md src/content/blog/my-first-post.md
cp src/content/_templates/works.md src/content/works/my-project.md
```

- [Blogテンプレート](_templates/blog.md)・[Worksテンプレート](_templates/works.md) はどちらも `draft: true` です。
- タイトル・概要・カテゴリ・必要なメタ情報・本文を書き換えます。Blogの公開日も必ず確認してください。
- コメント付きの記述例を使うときは、対応する `gallery: []`・`links: []` などの行を例のブロックに置き換え、同じキーを重複させないでください。
- `draft: true` の間は、開発時も含めて公開用の一覧・個別ページに表示しません。表示確認時だけローカルで `false` にし、公開前に設定を確認してください。
- ファイル名は英小文字で始まるkebab-caseです。例：`my-project.md`。数字だけの名前、空白、大文字、アンダースコア、サブディレクトリ、`.mdx` は使用しません。
- ファイル名から `.md` を除いたものが記事・作品IDとなり、URLは `/blog/my-first-post/`・`/works/my-project/` です。公開後に名前を変えるとURLも変わります。
- Blogでは `categories.md`・`tags.md`、Worksでは `index.md` は使用できません。

## Blogのメタ情報

現在のサイトにはRSSの生成・配信はありません。

| フィールド    | 型       | 必須 | 省略時     | 用途・注意点                                        |
| ------------- | -------- | ---- | ---------- | --------------------------------------------------- |
| `title`       | string   | 必須 | なし       | 空でない記事タイトル。ページの `h1` とtitleに使用。 |
| `description` | string   | 必須 | なし       | 空でない概要。一覧・meta descriptionに使用。        |
| `pubDate`     | date     | 必須 | なし       | 公開日。`YYYY-MM-DD` を推奨。新しい順に並びます。   |
| `updatedDate` | date     | 任意 | 表示しない | 更新した場合の日付。                                |
| `category`    | string   | 必須 | なし       | 下表の英小文字の値を1つ指定。                       |
| `tags`        | string[] | 任意 | `[]`       | 関連する技術・話題。タグ別ページを生成。            |
| `draft`       | boolean  | 任意 | `false`    | `true` なら一覧・記事詳細・カテゴリ・タグから除外。 |

```yaml
---
title: "記事のタイトル"
description: "記事の概要"
pubDate: 2026-11-10
updatedDate: 2026-11-11
category: development
tags: [Astro, TypeScript]
draft: true
---
```

### カテゴリと日付・タグ

| 設定値           | 表示名         | 用途                   |
| ---------------- | -------------- | ---------------------- |
| `development`    | Development    | 開発記録               |
| `engineering`    | Engineering    | 技術解説・設計         |
| `infrastructure` | Infrastructure | サーバー・ネットワーク |
| `research`       | Research       | 技術検証・実験         |

- 日付はビルド時にDateへ変換し、日本語・日本時間で表示します。時刻も指定する場合は、`2026-11-10T09:00:00+09:00` のようにタイムゾーンを明記してください。
- `pubDate` は予約投稿機能ではありません。未来の日付でも `draft: false` なら公開します。
- タグは大文字小文字を区別します。前後の空白を取り除き、UnicodeのNFCで正規化し、同じ記事内での重複をまとめます。
- 日本語・`C++`・`C#` も使用できます。`/`・`\`・`%`・制御文字、`.`・`..` は使えません。
- タグのURLは自動生成します。`#`・`?`・`~` はパス内で衝突しない表記に変換します（例：`C#` → `/blog/tags/C~23~/`）。

## Worksのメタ情報

| フィールド      | 型                           | 必須 | 省略時                 | 用途・注意点                                                        |
| --------------- | ---------------------------- | ---- | ---------------------- | ------------------------------------------------------------------- |
| `title`         | string                       | 必須 | なし                   | 空でない作品名。                                                    |
| `description`   | string                       | 必須 | なし                   | 空でない概要。Featured・Preview・詳細・meta descriptionに使用。     |
| `category`      | string                       | 必須 | なし                   | 下表の4グループから1つ指定。                                        |
| `subcategory`   | string[]（stringも互換対応） | 任意 | `[]`                   | より細かな分類を複数指定。元の9分類もこの項目で保持。               |
| `year`          | number                       | 任意 | 表示しない             | 制作年。1000〜9999の整数。分からなければ省略。                      |
| `status`        | string                       | 任意 | 表示しない             | 空でない状態の表示名。例：`development`。固定の選択肢はありません。 |
| `thumbnail`     | string                       | 任意 | ギャラリー内の先頭画像 | Index・Featuredの画像。画像がなければプレースホルダーを表示。       |
| `thumbnailAlt`  | string                       | 任意 | `""`                   | サムネイルの代替テキスト。空なら作品名を使った説明を表示。          |
| `gallery`       | メディア配列                 | 任意 | `[]`                   | 画像・動画を掲載順に指定。詳細は後述。                              |
| `technologies`  | string[]                     | 任意 | `[]`                   | 使用技術。実際に確認できるものだけを記載。                          |
| `features`      | string[]                     | 任意 | `[]`                   | 主な機能・特徴。Previewと詳細に表示。                               |
| `links`         | リンク配列またはオブジェクト | 任意 | `[]`                   | GitHub・デモ・配布先など。詳細は後述。                              |
| `featured`      | boolean                      | 任意 | `false`                | Featuredへの掲載対象にするか。                                      |
| `featuredOrder` | number                       | 任意 | `999`                  | Featuredの順序。0以上の整数で、小さい順。                           |
| `order`         | number                       | 任意 | `999`                  | Indexの順序。0以上の整数で、小さい順。                              |
| `draft`         | boolean                      | 任意 | `false`                | `true` ならFeatured・Index・Preview・詳細から除外。                 |
| `relatedPosts`  | string[]                     | 任意 | `[]`                   | 実在するBlogの記事ID。公開記事だけを詳細に表示。                    |

### カテゴリ・表示順・関連記事

| `category` | 表示名       | `subcategory` の既存値                          |
| ---------- | ------------ | ----------------------------------------------- |
| `software` | ソフトウェア | `web`、`npm`、`program`                         |
| `hardware` | ハードウェア | `hardware`、`arduino`                           |
| `design`   | デザイン     | `design`、`illustration`、`3d`、`game`、`video` |
| `others`   | その他       | `experimental` など                             |

`subcategory` は配列で複数指定できます。カテゴリにかかわらず指定でき、上表の組み合わせに制限はありません。

```yaml
subcategory:
    - arduino
    - experimental
# 1行でも指定できます：subcategory: [arduino, experimental]
```

既存のsubcategoryは対応する表示名に変換し、記述順に「 / 」で区切って一覧・プレビュー・詳細へ表示します。それ以外の空でない文字列も、そのままの表示名として指定できます。
前後の空白を除去し、同じ値の重複はまとめます。省略・空配列（`[]`）・値なし（`subcategory:` または `null`）は分類なしです。空文字列や文字列以外の配列要素は使えません。
従来の単一値（`subcategory: web`）も引き続き利用でき、内部では1要素の配列として扱います。Explorerのカテゴリフィルタは引き続き `category` で絞り込みます。

- Featuredは公開作品のうち `featured: true` の作品を最大3件表示し、先頭を大きくします。`featuredOrder` → `order` → IDの順で並べます。
- Indexは `order` → IDの順です。公開作品には本文の有無にかかわらず詳細ページを生成します。
- `relatedPosts: [my-development-note]` は `src/content/blog/my-development-note.md` を参照します。存在しないIDはビルド時に検出し、Blog側が下書きならリンクを表示しません。
- 年・状態・技術・機能は推測で補完しないでください。空の配列に対応する見出しや、本文のないMarkdown欄は表示しません。

### 画像・動画

`public/works/my-project/preview.png` を配置した場合は、`/works/my-project/preview.png` と指定します。
Worksのメタ情報内のURLは、単一の `/` から始まる公開パス、または `http://`・`https://` です。`//` から始まるURL、バックスラッシュ、制御文字は許可しません。

```yaml
thumbnail: /works/my-project/preview.png
thumbnailAlt: "作品のプレビュー画面"
gallery:
    - type: image
      src: /works/my-project/preview.png
      alt: "作品の画面"
    - type: video
      src: /works/my-project/demo.mp4
      alt: "操作デモ"
      poster: /works/my-project/poster.png
```

| galleryの項目 | 型                     | 必須 | 省略時                                     |
| ------------- | ---------------------- | ---- | ------------------------------------------ |
| `src`         | string                 | 必須 | なし。画像・動画のURL。                    |
| `type`        | `image` または `video` | 任意 | `image`                                    |
| `alt`         | string                 | 任意 | `""`。表示時は作品名による説明で補います。 |
| `poster`      | string                 | 任意 | なし。動画のポスター画像に使用。           |

メインのプレビューは `gallery` の先頭、ギャラリーがなければ `thumbnail` です。2件目以降は詳細ページのギャラリーに表示します。
`thumbnail` を省略した場合、Index・Featuredはギャラリー内の先頭画像を使用します。動画だけの作品は「VIDEO」のプレースホルダーになります。

### 外部リンク・内部リンク

簡潔なオブジェクト形式：

```yaml
links:
    github: "https://github.com/your-account/your-project"
    demo: "https://example.com/"
```

`github`・`demo`・`npm`・`download` はそれぞれ「GitHub」・「デモ」・「npm」・「配布先」と表示し、それ以外のキーはそのまま表示します。
`http(s)` は外部リンク、公開パスは内部リンクとして扱います。

表示名や外部リンクの動作を指定する配列形式：

```yaml
links:
    - href: "https://example.com/"
      label: "デモを開く"
      external: true
    - href: "/blog/my-development-note/"
      label: "開発記録を読む"
      external: false
```

配列形式は `href` と空でない `label` が必須、`external` は省略時 `true` です。外部リンクは新しいタブで開きます。

## 共通のMarkdown本文

- YAMLの終わりの `---` より下に本文を書きます。ページ側がタイトルを `h1` にするため、本文見出しは `##` から始めます。
- Worksの本文は詳細ページだけに表示します。小規模な作品では本文を省略できます。
- 本文幅は最大740px。見出し・リスト・表・引用・リンク・画像・コードの見た目はBlogとWorksで共通です。
- コードフェンスに `ts`・`js`・`html` などの言語を指定するとシンタックスハイライトが付きます。長いコードと表は横スクロールできます。
- 本文の画像には代替テキストを付けます。`public/` 内の画像は公開パス、`src/` 内の画像はMarkdownからの相対パスも使用できます。
- 生HTMLは削除されます。コードフェンス内のHTMLは文字列として表示できます。危険なURLのスキームは除外します。

````markdown
## 見出し

- 箇条書き
- `インラインコード`

```ts
const message = "表示例";
```

| 項目     | 説明   |
| -------- | ------ |
| サンプル | 表の例 |

> 引用の例です。

![画像の説明](/works/my-project/preview.png)
````

## 確認コマンド

```sh
npm run dev
npm run build
npm run test:blog
npm run test:works
```

サイト全体の運用方法は [Blogのガイド](../../docs/blog.md)・[Worksのガイド](../../docs/works.md) を参照してください。

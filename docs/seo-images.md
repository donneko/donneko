# OGP・画像サイトマップ・画像の配信

## OGP画像

共通のLayoutでtitle・description・canonicalからOGPを生成します。Blog記事の種類はarticle、それ以外はwebsiteです。404などnoindexのページにはOGPを出力しません。

- Works詳細は既存のthumbnail、なければギャラリーの先頭画像を使用します。
- BlogはFrontmatterの任意項目`ogImage`と`ogImageAlt`で指定できます。`ogImage`には`public/`内の画像の公開パスを書きます。
- 共通画像の配置先は`public/ogp/default.png`、推奨サイズは1200×630pxです。画像自体は未作成です。
- ページ画像が未指定・存在しない・画像形式でない場合は共通画像を使います。共通画像も未配置ならog:imageを省略し、twitter:cardをsummaryにします。画像があればsummary_large_imageです。
- OGPではPNG・JPEG・WebP・GIFを使用します。存在を確認できない外部画像とSVG・動画は出力しません。外部画像を使用する場合は許諾を確認してpublicに配置してください。
- 最適化対象の作品は表示用の派生画像をOGPにも使用します。URLはサイト設定を基準とした絶対URLです。

## 画像サイトマップ

`/sitemap-images.xml`をAstroの静的エンドポイントでビルド時に生成します。既存の`@astrojs/sitemap`によるページ用サイトマップはそのまま使用し、robots.txtには両方を記載しています。

公開WorksのFrontmatterにあるthumbnailと、galleryのtypeがimageのsrcを対象にします。実在するpublic内の画像だけを登録し、下書き・外部画像・動画・存在しないファイルは除外します。URLを正規化して画像の重複を除きます。同じ画像を複数作品で共有している場合は、表示順が先の作品に登録します。XMLの特殊文字はエスケープします。

## 画像の最適化

元画像を移動・削除せず、Astro標準のgetImageとSharp画像サービスでビルド時に派生画像を生成します。publicの元画像をAstroの画像メタデータとして読み込み、既存の公開URLと原本を残しています。追加依存パッケージや実行時の画像変換・Cloudflareの有料機能は不要です。

対象は`src/lib/images.ts`のoptimizedFormatsに明示した6画像です。

- おにぎりイラスト、tyoi-serverの画面：PNGを維持。
- RΛLINEの画面、Blender瓶2画像・ジャム瓶1画像：可逆WebP。透明部分を維持。
- その他の画像、ドット絵、アイコン、テクスチャ類：元画像・元形式を維持。

幅160・480・960・最大1600pxのうち元画像を超えないサイズを生成し、srcsetとsizesで選択します。Indexは64〜76px、Featured・Preview・詳細・ギャラリーは既存の表示幅に合わせます。画像のwidth・heightはメタデータから取得し、既存の16:10枠とobject-fitは変更しません。主画像にはeagerとfetchpriority=high、画面外の画像にはlazyを使用します。

拡大リンクとライトボックスは元画像のURLを引き続き使用します。原本と派生画像の両方が公開されるので、公開ファイル全体の容量は増えます。容量削減は通常表示での転送量についての比較です。

## 検証

`npm run build`、`npm run test:works`、`npm run test:blog`を順番に実行します。Worksテストには画像の存在・重複・下書き・動画除外・XMLエスケープ・共通OGP画像の有無・Blog記事画像・baseパス・原本保持の検証を含みます。

2026年11月24日の実装時検証では、ビルド、Works 7件・Blog 3件のテスト、TypeScript、変更したコードのESLint・Prettierが成功しました。全XMLのパース、画像サイトマップ81件の実在・重複除外、OGP画像33件、ローカルHTTP 109 URLの正常応答を確認しています。21派生画像は同じ寸法に縮小した元画像と比較し、見える画素のRGB値と透明度が完全一致しました。既存の本文・リンク・スクリプト・CSS・原画像・動画とページ用サイトマップも変更前と照合しています。

対象6画像の容量比較（転送量の実測ではなく、生成ファイルの合計）：

| 比較対象 | 容量 | 元画像合計からの削減率 |
| --- | ---: | ---: |
| 元画像 | 9,072,931 bytes | — |
| 標準表示用（960px、元が小さい場合は原寸） | 2,193,141 bytes | 75.8% |
| Index用（160px） | 118,681 bytes | 98.7% |

ブラウザ操作の接続が利用できず、今回の実装後のPC・モバイル表示とライトボックスの実操作確認は未完了です。CSSとライトボックスのコード、原本へのリンクは維持しています。共通OGP画像は配置待ちです。本番デプロイ・CDN上の配信やSNS側のカード表示は検証していません。

仕様の参考：[Astroの画像機能](https://docs.astro.build/en/guides/images/)、[Googleの画像サイトマップ](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)、[Open Graph Protocol](https://ogp.me/)。

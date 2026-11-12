# Worksのファイル整理・メディア監査

2026年11月12日に、作品のファイル名とメディアの配置を整理しました。この文書は `docs/` に置き、公開対象に含めません。

## 整理結果

- Markdown：39件を維持。24件を改名し、15件は名前を維持。
- 画像・動画：103件から96件へ。使用中96件を改名・移動し、未使用7件（1,421,932バイト）を削除。
- メタ情報・本文・掲載順・代替テキストは、参照URL以外を維持。メディアの拡張子・内容も維持。
- 詳細ページとメディアは新URLへ変更し、旧URLの転送やファイルの複製は設けない。

## 命名規則

作品は英小文字のkebab-caseで内容を表す名前にします。Markdown名が作品ID・詳細URLになります。
メディアは `public/works/<作品ID>/` にまとめ、画像を `image-01.jpg`、動画を `video-01.mp4` の形式にします。番号は種類ごとに既存のギャラリー掲載順です。ギャラリー外のサムネイルは画像の末尾に採番し、同じファイルの重複参照は同じURLを使います。

## Markdownの改名対応表

`src/content/works/` 配下。拡張子は `.md`。各名前は `/works/<名前>/` の詳細URLに対応します。

| 変更前                  | 変更後                          |
| ----------------------- | ------------------------------- |
| ai-experiment-01        | markov-chain-model              |
| ai-experiment-03        | stormworks-lua-gpts             |
| blender-animation-01    | blender-tablet-tutorial         |
| blender-animation-02    | blender-horror-tv-room          |
| blender-animation-03    | blender-experiments             |
| blender-animation-04    | blender-jam-jar-tutorial        |
| blender-animation-05    | blender-physics-animation       |
| blender-animation-06    | blender-rotating-cardboard-box  |
| blender-animation-07    | blender-rotating-plastic-bottle |
| blender-animation-08    | blender-backrooms               |
| blender-render-04       | blender-bottle-tutorial         |
| blender-render-08       | blender-night-room              |
| donneko-twitter-header  | bottle-label-headers            |
| electronic-craft        | arduino-traffic-light           |
| game-project            | unreal-engine-platformer        |
| internet-services       | illustrator-experiments         |
| job-matching-poster     | photoshop-experiments           |
| personal-site-concept   | donneko-site-old-design         |
| stormworks-build-01     | stormworks-vehicles             |
| stormworks-build-02     | stormworks-radio-ram            |
| stormworks-build-03     | stormworks-small-turret         |
| stormworks-build-04     | stormworks-morse-radio          |
| stormworks-monitor-wall | stormworks-image-display        |
| study-experiment-02     | gaming-button                   |

## 使用中メディアの対応表

パスはすべて `public/works/` からの相対パスです。SHA-256は移動前のファイル内容の値で、移動後も一致することを照合します。

| 変更前                                   | 変更後                                       | SHA-256                                                            |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| ai-experiment-01/preview.jpg             | markov-chain-model/image-01.jpg              | `6f4321e915e9a0839c288f6d45f52e69b7ebac02f68919b512dbf4f279a9604d` |
| interactive-subtitles/preview.png        | markov-chain-model/image-02.png              | `3ed8144c29c43b2f46ec1c9fd1799988961f082a97571b0ec55b4455e9de028c` |
| interactive-subtitles/editor.jpg         | markov-chain-model/image-03.jpg              | `9a173a5dc12ad777645d69c9c176ffd2d2bef7c638146d52dd21f8ecd8527e60` |
| ai-experiment-03/preview.jpg             | stormworks-lua-gpts/image-01.jpg             | `248eab27403dba23a7b9e0ab074ad130a933143668d0d133f11ed8f87ee54097` |
| blender-render-07/render.jpg             | blender-tablet-tutorial/image-01.jpg         | `000af7dd38a6557bc18d7fdcbd584ca5cb029059dd8e72bda476f383c4022a15` |
| blender-animation-01/animation.mp4       | blender-tablet-tutorial/video-01.mp4         | `a1eb4dfa7b8b64008d53a659b528a50b3dd87849d89303728caceeedb6f19c65` |
| blender-animation-02/animation.mp4       | blender-horror-tv-room/video-01.mp4          | `8ef9748f67bea427f007971a1ecb6e931b148edb7f36261b7ccb01d0293eb01a` |
| blender-render-05/render.jpg             | blender-experiments/image-01.jpg             | `9fa14568edf0ca67d58b3a75101c43d98c7f0688b7d2145baad69052c03c0e6e` |
| blender-render-01/render.jpg             | blender-experiments/image-02.jpg             | `b3985cbe09869055966f5cb47f423cfd8e8d74b2083c7435f71d2afcaa2e9c82` |
| blender-animation-03/animation.mp4       | blender-experiments/video-01.mp4             | `027d8931f117f4c409843bde36011e16ae8db5e99abf6d764e7e8e142bc4d375` |
| blender-render-03/render.jpg             | blender-experiments/image-03.jpg             | `e913e082357fe1c99f185e807b2a5fc795facdc8e75786380fc568b6152731c0` |
| blender-render-06/render.png             | blender-jam-jar-tutorial/image-01.png        | `9e7c324740bf02ce4f65b6b72020b8f337c8bcf4032319d137cd3ad77ccf069b` |
| blender-animation-04/animation.mp4       | blender-jam-jar-tutorial/video-01.mp4        | `659cf5b6978394591d586f6a6607c518ec0fdcd5fe2bace6c169db4ccd561e05` |
| blender-animation-05/animation.mp4       | blender-physics-animation/video-01.mp4       | `e852859829a39416eb2d1e2c42188c0d452fd2400c35ca23be12c4f8bd0360d1` |
| blender-animation-06/animation.mp4       | blender-rotating-cardboard-box/video-01.mp4  | `97b1f603342ad9f66949a794c6395a6d48b69d374595c9b1e739ca0fcdbfba3f` |
| packaging-symbols/color-palette.png      | blender-rotating-cardboard-box/image-01.png  | `ae1e2eb8aa139e9255cf3fdd3b2a3e75a77935a4594d7c8705ce7fcf47bf9feb` |
| packaging-symbols/handling-icons.png     | blender-rotating-cardboard-box/image-02.png  | `36413dc95b0c518845f08046ee2f85de2860bb54a0b8ea8f74e97332347b98d5` |
| packaging-symbols/layout-guide.png       | blender-rotating-cardboard-box/image-03.png  | `d1baf4d85627e0eba07d36c429588d8b3d3fdfb8a130034ed770d57d21842d37` |
| packaging-symbols/caution-layout.png     | blender-rotating-cardboard-box/image-04.png  | `ac19d0a471864989a0320a00ee7d60da1ac4a002a0ddb790642afabc3a091360` |
| packaging-symbols/caution-label.png      | blender-rotating-cardboard-box/image-05.png  | `6898b7ab620b48be9f4805ab009d7899d45126b81c088d318498e5e513ef5ede` |
| packaging-symbols/icon-set.png           | blender-rotating-cardboard-box/image-06.png  | `e071f3cf7125a2ecffb85c6d6f90bbf07748992b112ab1e699d5b36690281152` |
| blender-animation-07/animation.mp4       | blender-rotating-plastic-bottle/video-01.mp4 | `21de22ccd897828ec6017f28ad1cb587f3e72bebeb8938e933217a398ee8c0fa` |
| blender-animation-08/animation.mp4       | blender-backrooms/video-01.mp4               | `accc27f8603470e157b361e5f62d6b75e6330d87f762eb56f1715cccf2ea3483` |
| blender-render-04/render.png             | blender-bottle-tutorial/image-01.png         | `17fff4bd779bfafa34c3f7e21251f4059d5c3e495d7072df0df7cfa5ab12380a` |
| blender-render-02/render.png             | blender-bottle-tutorial/image-02.png         | `ac0d44c0f592ad7f947fe09e591836d83b9659f2734ff7419829187d8676ae1c` |
| blender-render-08/render.jpg             | blender-night-room/image-01.jpg              | `25426a54fa74d1a3047db9da6490a4e45229def247fe88e9c9fedf22754c4a58` |
| bus-timetable/dashboard-01.png           | bus-timetable/image-01.png                   | `2355cd75642bdfa580967f867fac9d9999ac4c64fda4fa91a165fe15e14a12ac` |
| bus-timetable/dashboard-02.png           | bus-timetable/image-02.png                   | `d578c42b8c8eef38d7570f880bfe69cc238579186625bf2998c6177ab81911ed` |
| bus-timetable/dashboard-03.png           | bus-timetable/image-03.png                   | `a2bfda2c81f818a4695c775bfe71ee37877326ef471852e30f4e4222e3339be8` |
| bus-timetable/dashboard-04.png           | bus-timetable/image-04.png                   | `7fead3675d903e4251cebe332a03602171ef8eb6bff80fe9534c116c7d06c7cc` |
| donneko-twitter-header/header.png        | bottle-label-headers/image-01.png            | `0e7c35ca118769f7b82807caf13b36b129a2a743e94cbe5cf4721e61342325af` |
| donneko-youtube-header/header.png        | bottle-label-headers/image-02.png            | `4434f70c9a07dda8c3c5cb575c33b1f0419de16c0b47cd9cce0ddec800095d20` |
| electronic-craft/prototype.jpg           | arduino-traffic-light/image-01.jpg           | `e649e8c851b0b4a192d6945fbf26784540734cfbcf0df170a0d2d369fbae5493` |
| electronic-craft/demo-01.mp4             | arduino-traffic-light/video-01.mp4           | `840f1b1f16b4edb0d4674a0e2ddd8e6b10432d75634e270c3e22d536e51aea99` |
| electronic-craft/demo-02.mp4             | arduino-traffic-light/video-02.mp4           | `00b228b74dae7d454f17b57f4d98659941f8611f501b6b3825403112e9362809` |
| error-pages/403-page.jpg                 | error-pages/image-01.jpg                     | `6a39432f0b95b352554dfdeeec8a01afb731c0b8b8dbf37f67257befa24b0ff2` |
| error-pages/page-02.jpg                  | error-pages/image-02.jpg                     | `391a03f33af7ded4c888fc2fc0650cf503249d1c02fd13b8a5cb21829f345d6d` |
| error-pages/demo-01.mp4                  | error-pages/video-01.mp4                     | `d835cff3901a4689a8d00ef269d6eb04259d22d747cd14bc5298cdc71a11c895` |
| error-pages/demo-02.mp4                  | error-pages/video-02.mp4                     | `51187163a59631bd7bd7d72c665cc5d7f0cb1f64a67522dc2a1259e829fb0e2f` |
| error-pages/page-03.jpg                  | error-pages/image-03.jpg                     | `bacb10a1a99fe28182e24900fd2242398768eb0a9832b333e2870c8ec81c6a79` |
| error-pages/page-04.jpg                  | error-pages/image-04.jpg                     | `eac481cad9ec90227d1fc5a0e4a72ebf6cd41885eff36fba8e857777327862b5` |
| error-pages/page-05.jpg                  | error-pages/image-05.jpg                     | `20071970fa9973c1eb0f1c4f0b55f7980ba6bfd58a73f64f264e70e20db4e687` |
| game-project/demo.mp4                    | unreal-engine-platformer/video-01.mp4        | `63aa1c54ec7e6f7cfd9cab601ce9f0434f1463a67a45ad1e3892b0c9e5b7e95f` |
| automated-systems/poster.jpg             | illustrator-experiments/image-01.jpg         | `14e115726e0156cd707335172ec1857befbd179d6b48eeafb05be3bc07b3ff46` |
| internet-services/poster.jpg             | illustrator-experiments/image-02.jpg         | `7c29b8d65e75c6bf246b2f427cb262898d03b909edf9d6021dc775c943358c23` |
| space-graphics/fall-map.jpg              | illustrator-experiments/image-03.jpg         | `3690f8faddec9a288c9b282b5828f3f172a724a4c5392f5764bfcb3e37dc90b1` |
| space-graphics/space-debris.jpg          | illustrator-experiments/image-04.jpg         | `08f36fedf3d801aeffb3c81e6ebe883c665bde1417389b312636ad5f612cfb3c` |
| city-services/poster.jpg                 | illustrator-experiments/image-05.jpg         | `2102e722b0472ade6576e7933d3ba272c07e4b40090bdd87ec3217c8e1e7c3e5` |
| grid-system/title-card.jpg               | illustrator-experiments/image-06.jpg         | `27f7d8025b599ccf4f5cda3d508f485e2b987f2ce70e95ec02d5cff867cdea9c` |
| ai-experiment-02/preview.jpg             | illustrator-experiments/image-07.jpg         | `4d3346bc9f10d602ae46a289e7973122ac255f53545544828e8ca894faa4d418` |
| fighter-jet-poster/poster.png            | photoshop-experiments/image-01.png           | `d6eeea82e3c76a61a00b0f106026955c08f7ef76b27752d8aee5df809c5d3619` |
| job-matching-poster/poster.png           | photoshop-experiments/image-02.png           | `2268bcfc3d05a6963742801063c4b210a1996545f1ef08caffa02ed69d0213fa` |
| tokyo-city-poster/poster.png             | photoshop-experiments/image-03.png           | `a83933e77bbc68f65bd65022eb975716a2317e2668fd7ff5233ba236bf687e19` |
| coding-course-banner/banner.png          | photoshop-experiments/image-04.png           | `f8c3829debd8b8168175de757996bd8de8b98c38bf680f8b0161be826719f1d6` |
| communication-poster/poster.png          | photoshop-experiments/image-05.png           | `3d316b20772b5147f1b0247654ed7d436f6f3eff0165d3433135d20e389ce742` |
| sea-poster/poster.png                    | photoshop-experiments/image-06.png           | `658fbfe575102d6707596b184b13531f94f5e6a1f6ac50b3a2cfe903f7289abf` |
| tank-poster/poster.png                   | photoshop-experiments/image-07.png           | `b235f82bfc75cd9bbbabd0859844ee00279de4f1e8d48aadf10bf3f2205aa762` |
| summer-poster/poster.png                 | photoshop-experiments/image-08.png           | `cc5c0adeee419fd02d9ccc25f24624cd0bb442027abf298cb8d3876e0bb5ad1c` |
| mount-fuji-poster/poster.png             | photoshop-experiments/image-09.png           | `6231875c830c558cd6ede6a21fdaf45275f42c5cfa80c85a1118740bc36ff2b0` |
| math-problems/app-preview.jpeg           | math-problems/image-01.jpeg                  | `33ae0ca4d9edbf5bd237f6da370122e947e486a884d3acd029489fa7b83c0213` |
| math-problems/design-01.jpg              | math-problems/image-02.jpg                   | `a75c713a905345ac0b1a63a0cec3b529605816ade64a7a4c77fb5902b1d2ef6f` |
| math-problems/design-02.png              | math-problems/image-03.png                   | `3d8a0c1f8925dc5597cbd31207b49d0bcbbb7dabf31af03d9ee28dbee064565f` |
| memo-app/preview-02.png                  | memo-app/image-01.png                        | `fec2836be849db580dbe76873e2469aeaf845e8ed1f03d876d92dd6377ea32f6` |
| memo-app/preview-01.jpg                  | memo-app/image-02.jpg                        | `3a442a339421b87a46cf777444a8e306791c964cb6a5f6ca694b596ea3e26e50` |
| number-guessing-game/gameplay.jpg        | number-guessing-game/image-01.jpg            | `58b9fb063c0ce52295af88770f3f858ecd5694e845bf1f3287569aa4e2f7c87e` |
| onigiri-illustration/illustration.png    | onigiri-illustration/image-01.png            | `f91b738701ae468b8bdef020577e9c441d56c12113cab8147da5fd3452307bbc` |
| personal-site-concept/preview-01.jpg     | donneko-site-old-design/image-01.jpg         | `c185e32f2f071fa0af44444b2228a7603a20831fd3bd3542aa3c2e21446ffdf6` |
| personal-site-concept/preview-02.jpg     | donneko-site-old-design/image-02.jpg         | `56c79a127d0ec250278b8f385934e67b2c113cbcd261312c08b9539e5c79ef52` |
| personal-site-concept/preview-03.jpg     | donneko-site-old-design/image-03.jpg         | `5483a232f27c94e24d6a55f45c6704fc8672b650c3d36bf6e1302588b604fa2e` |
| digital-design-collection/collection.jpg | donneko-site-old-design/image-04.jpg         | `1f60179122e84378172e6de254f0def916f957f82a4b58889454d251aa52936c` |
| personal-site-concept/preview-04.jpg     | donneko-site-old-design/image-05.jpg         | `b0c244dcb09685bc7bc990637d7a7a23d596c051dac2f2556b71a68f162a21b1` |
| personal-site-concept/preview-05.jpg     | donneko-site-old-design/image-06.jpg         | `e46b371ef12774ea65f3c52e3634a6e6a6852a72354d9dd16c62a738b4901f0a` |
| study-experiment-05/photo.jpg            | donneko-site-old-design/image-07.jpg         | `b87938b977df1f7af7672a424a1e6394d036aa5fc59f8a760e9d95daad0fc42a` |
| r4line-portfolio/preview.png             | r4line-portfolio/image-01.png                | `6a8fb286203749f2b32771b5d816682be73ff6971ced53c6f5a37f79344c6289` |
| r4line-portfolio/logo-sheet.jpg          | r4line-portfolio/image-02.jpg                | `2ea870c0e1d448610d58e7311589653dd1a3edfff2d522d3cefd95983643bfa6` |
| self-study-posters/quiet-study.png       | self-study-posters/image-01.png              | `d7e4c2fb63412804a6c5740a7da7c7d4990ca0e7c71a404f5477f7ab13bab4e5` |
| self-study-posters/no-voice.png          | self-study-posters/image-02.png              | `5caa66d9518c214e919c647908e496770625e6f3e68a6551915f7fb9b8282db7` |
| self-study-posters/no-talking.png        | self-study-posters/image-03.png              | `fc7c63ab37883ed5a33c8c072dac3af97b12e7dbf0552da0d50411358c4fcf8f` |
| site-map/logo.png                        | site-map/image-01.png                        | `e5f7aed32d5dacd42878bfa73677e081d67b5ac01c401841b8e4d05b000e66aa` |
| site-map/json-output.png                 | site-map/image-02.png                        | `d585b34b7b19fac33a574886072cfcefd56d319201fe255776a68e10046e412a` |
| stormworks-build-01/preview.jpg          | stormworks-vehicles/image-01.jpg             | `9fdfd9f40eef9f05c4530943b8ff802d2914a3c60e9395bdbe3b33c254426b79` |
| stormworks-build-02/preview.jpg          | stormworks-radio-ram/image-01.jpg            | `0fa22c609f1e2efa9bee66f947e8c5aec29073a8f4e0985a4a993dbfd997bc4b` |
| stormworks-build-03/preview.jpg          | stormworks-small-turret/image-01.jpg         | `c1d7d69da81234afe38015085f62905967b6ba52a1c76a941cb42bdf24e88673` |
| stormworks-build-04/preview.png          | stormworks-morse-radio/image-01.png          | `9259e8dcaef95e2c071b178734564a7e5a2a8c880dcbc66181f3f1823050e58f` |
| stormworks-demo/demo.mp4                 | stormworks-morse-radio/video-01.mp4          | `d4e5e5e1b0dcf9a2dc4f7fd106ef430834354009b135e0483e3ca09d818ebdba` |
| stormworks-monitor-wall/preview.jpg      | stormworks-image-display/image-01.jpg        | `368000f0082e2d027aad8e9002698d847b8ff540d05deff368fabf4faf2ad50a` |
| streaming-frame/frame.png                | streaming-frame/image-01.png                 | `6b79c8390f29cc2ee8c0e98e93333fbf43b0f108ed9eeabdbe6456443b169c8e` |
| study-experiment-02/demo.mp4             | gaming-button/video-01.mp4                   | `44db712878f946258be801e8d9162f7b3a5b2f178f5acd8b7fc2c627854cb002` |
| tag-chain-model/result.png               | tag-chain-model/image-01.png                 | `e417465a92e48518ef96fd540926f80796185e7c73fdcfdecf2a7ce1cc5d1025` |
| tyoi-cli/terminal-output.png             | tyoi-cli/image-01.png                        | `2d1c206118760759e5a4c51174d2458603750013af2c7056ea80b21ef908d958` |
| tyoi-logger/terminal-output.png          | tyoi-logger/image-01.png                     | `d689fda7f1807344856c08e8d91a51d2f28483d2ef847eef14161510cb0d6b07` |
| tyoi-server/terminal-output.png          | tyoi-server/image-01.png                     | `6daaedfad61c009fc0c3eaee05cdf4ce98302bd4ec497237042ecd26eb3cc603` |
| node-server/terminal-output.jpg          | tyoi-server/image-02.jpg                     | `e34630df08af4f9e6b6f7cf943100ec96e26f42288b02d97dabdb8141292fb94` |
| window-system/usage.jpg                  | window-system/image-01.jpg                   | `fb29f314bdce2e5302315681a888f1c7545dc9052c1b91b84d9a40830f92d649` |
| window-system/development.jpg            | window-system/image-02.jpg                   | `cd93ae3a0f515b8931d1c8e0f254ef0e3aa4129eb0b028a1cbf2f8d4b56e648d` |
| window-system/demo.jpeg                  | window-system/image-03.jpeg                  | `99ea6cff24f9e87f6dec988eba9da80230c75986a9f5aaf272f6eb39357943ea` |

## 削除した未使用メディア

削除直前に、下書きを含むMarkdown、サムネイル、ギャラリー、ポスター、本文、サイトのコードから参照がないことを確認しました。テストや運用ドキュメントだけの記述は、公開サイトの使用と区別しています。

| 削除パス（public/works/配下）        | バイト数 | SHA-256                                                            |
| ------------------------------------ | -------: | ------------------------------------------------------------------ |
| error-pages/page-01.jpg              |  183,150 | `9f606d1987751a0bef7f76cfe3c95c874668d4a496d664864e967abeb1064a25` |
| japanese-typography/editor.jpg       |   21,155 | `8e1bf87125391a41316c937c793a8e1519bb465181096391b12d652d79a4e464` |
| personal-site-concept/preview-06.jpg |   40,212 | `17fc376b6dca376d7736c35798ab3453f920c8c4be21f41fc02958160c357e45` |
| personal-site-concept/preview-07.png |  153,726 | `b61529aed9a4fd48cf2ec9062d6b9844bb45ecb3587f3fa07790752d5f967fb7` |
| study-experiment-01/demo.mp4         |  159,749 | `d62994059ef0676d64a77c8cfea5ba6ea3c3dd8dfa8c5763c2f9faf0f699ad29` |
| study-experiment-03/demo.mp4         |  772,281 | `28d2349fd6270d99aad8974e88e4b1a0db00101e627823b3b5a6018558ddea78` |
| study-experiment-04/photo.jpg        |   91,659 | `e116a983a4b0dd322b6fb3e69b43af47e351f6d92c43148ec6a3ff90cd40d1f6` |

新しい作品の追加手順は [執筆ガイド](../src/content/README.md) を参照してください。

# ポッドキャストホスティングサービス API＆料金 調査

調査日: 2026-02-17

## 前提

stand.fm / Voicy / Spotify / Apple Podcasts には、外部からエピソードを投稿する公開APIがない。
プログラマティックに配信するには「ホスティングサービスのAPIでエピソード公開 → RSS経由で各プラットフォームに自動配信」が現実的なアプローチ。

```
音声生成 → ホスティングAPI でエピソード公開 → RSS自動更新 → Spotify/Apple等に自動配信
```

---

## 各配信プラットフォームのAPI状況

| プラットフォーム | 公開API | 投稿API | 備考 |
|---|---|---|---|
| **stand.fm** | なし | なし | RSS発行で他プラットフォームへ配信は可能（一方向のみ） |
| **Spotify** | [Web API](https://developer.spotify.com/documentation/web-api)（読み取り専用） | なし | RSSフィード経由でのみ。2026年から一部ホスティング事業者向けに[Distribution API](https://newsroom.spotify.com/2026-01-07/spotify-partner-program-updates/)開始（一般開発者不可） |
| **Voicy** | なし | なし | 審査制。アプリ/PCから手動アップロードのみ |
| **Apple Podcasts** | ホスティングプロバイダ向けのみ | なし | RSSフィード提出が基本。個人開発者向け公開APIなし |

---

## ホスティングサービス詳細比較

### 1. Transistor.fm ★おすすめ

- 公式: https://transistor.fm/pricing/
- API Docs: https://developers.transistor.fm/

#### 料金

| プラン | 月払い | 年払い(月あたり) | DL上限 | ポッドキャスト数 |
|---|---|---|---|---|
| Starter | $19/月 | ~$16/月 | 20K DL/月 | 無制限 |
| Professional | $49/月 | ~$41/月 | 100K DL/月 | 無制限 |
| Business | $99/月 | ~$83/月 | 250K DL/月 | 無制限 |
| Enterprise | $199+/月 | カスタム | 250K+ DL/月 | 無制限 |

※年払いは「12ヶ月分を10ヶ月の価格で」

#### API

- **全プランでAPI Access明記**
- 認証: APIキー
- アップロードフロー:
  1. presigned URLを取得
  2. 音声ファイルをHTTP PUTでアップロード
  3. `POST /v1/episodes` でエピソード作成（title, summary, season, number等）
- トランスクリプトもAPI経由で追加可能

#### 特徴

- 全プラン無制限ポッドキャスト・無制限チームメンバー
- ダウンロード数課金（アップロード容量制限なし）
- ドキュメントが充実

---

### 2. Buzzsprout

- 公式: https://www.buzzsprout.com/pricing
- API Docs: https://github.com/buzzsprout/buzzsprout-api

#### 料金

| プラン | 月払い | 年払い | アップロード上限 |
|---|---|---|---|
| Free | $0 | - | 2時間/月（**90日で削除**） |
| Basic | $19/月 | $199/年 (~$17/月) | 4時間/月 |
| Professional | $39/月 | $399/年 (~$33/月) | 15時間/月 |
| Business | $79/月 | $799/年 (~$67/月) | 35時間/月 |

#### API

- 認証: Token-based HTTP Authentication (`Authorization: Token token=xxx`)
- エンドポイント: `https://www.buzzsprout.com/api/{podcast_id}/episodes.json`
- エピソード作成: `POST /episodes.json`
  - `audio_url` or `audio_file`（マルチパート添付）
  - `artwork_url` or `artwork_file`
  - `title`, `description`, `summary`, `published_at`, `season_number`, `episode_number` 等
- 更新: `PUT /episodes/{id}.json`
- 削除エンドポイントはなし
- **APIが使えるプランの明記なし**（無料プランでは不明、有料プランでは利用可能と思われる）

#### 特徴

- 時間課金モデル（アップロード時間/月）
- 無料プランは90日でエピソード削除されるため実用的ではない

---

### 3. Podbean

- 公式: https://www.podbean.com/podcast-hosting-pricing
- API Docs: https://developers.podbean.com/podbean-api-docs/
- 開発者ポータル: https://developers.podbean.com/

#### 料金

| プラン | 月払い | 年払い(月あたり) | アップロード上限 | 帯域 |
|---|---|---|---|---|
| Free | $0 | - | 合計5時間(500MB) | 100GB/月 |
| Unlimited Audio | $17/月 | $12/月 | 1GB/月 (~16時間) | 無制限 |
| Unlimited Plus | $39/月 | $29/月 | 10GB/月 (~160時間) | 無制限 |
| Network | $99/月 | $79/月 | 40GB/月 | 3TB/月 |
| Business | $129/月 | $99/月 | 40GB/月 | 無制限 |

#### API

- 認証: OAuth 2.0
- アップロードフロー:
  1. OAuth認証でアクセストークン取得
  2. ファイルアップロードAPIで音声ファイルを送信 → `media_key` 取得
  3. エピソード公開APIに `media_key`（+ オプションで `logo_key`）を渡して公開
- レスポンス: メディアファイルURL + エピソードパーマリンクURL
- **APIが使えるプランの明記なし**（開発者登録は無料だが、有料プラン必要の可能性大）

#### 特徴

- 最安$12/月（年払い）で始められる
- 無料プランは合計500MBで実質使えない

---

### 4. RSS.com

- 公式: https://rss.com/pricing/
- API Docs: https://api.rss.com/v4/docs

#### 料金

| プラン | 月払い | 年払い(月あたり) | 特徴 |
|---|---|---|---|
| Free (FLAN) | $0 | - | 無制限エピソード、自動配信 |
| Creator | $5.99/月 | ~$4.49/月 | カスタムドメイン等 |
| Podcast Networks | $19.99/月 | ~$14.99/月 | 複数ポッドキャスト、API |

#### API

- **Podcast Networksプラン以上のみ**（$15〜20/月が最低ライン）
- ダッシュボードからAPIキー生成（複数キー対応）
- エピソードのプログラマティック公開が可能

#### 特徴

- 無料プランは無制限エピソード・自動配信で寛大だが、APIアクセスなし
- APIを使うには最上位プランが必要

---

## 総合比較

| サービス | API利用可能プラン | 最低月額(API込み) | 認証方式 | アップロード方式 | ドキュメント品質 |
|---|---|---|---|---|---|
| **Transistor.fm** | **全プラン** | **$19/月 ($16/月 年払い)** | APIキー | presigned URL PUT | ★★★ 充実 |
| **Buzzsprout** | 有料プラン? | $19/月 ($17/月 年払い) | Token | POST (ファイル添付/URL) | ★★☆ GitHub公開 |
| **Podbean** | 有料プラン? | $17/月 ($12/月 年払い) | OAuth 2.0 | Upload → media_key → Publish | ★★☆ あり |
| **RSS.com** | Networksのみ | $20/月 ($15/月 年払い) | APIキー | あり | ★★☆ あり |

---

## 結論

### Transistor.fm が最有力候補

1. **全プランで明確にAPI Access記載**（他サービスは曖昧）
2. $19/月のStarterで無制限ポッドキャスト数
3. APIドキュメントが公式で整備されている
4. アップロードフローが明確（presigned URL → エピソード作成）
5. ダウンロード数課金なので、アップロード容量を気にしなくてよい

### 最安を狙うなら Podbean ($12/月〜)

- ただしAPIがどのプランで使えるか不明確
- OAuth 2.0のため実装がやや複雑

### 想定パイプライン

```
generate.py (音声生成)
  ↓
generate_image.py (サムネイル生成)
  ↓
Transistor API (エピソード公開)
  ↓
RSS自動更新
  ↓
Spotify / Apple Podcasts / Amazon Music 等に自動配信
```

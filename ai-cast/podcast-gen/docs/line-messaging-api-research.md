# LINE Messaging API 調査結果

## 結論

LINE Messaging API を使えばプログラムからメッセージ（テキスト・動画含む）を送信可能。Node.js の公式 SDK あり。

## API 概要

### 利用可能な送信方法

| 方法 | 対象 | 月間メッセージ枠消費 |
|---|---|---|
| **Reply** | Webhook イベントへの返信 | なし（無制限） |
| **Push** | 特定ユーザー 1 人 | あり |
| **Multicast** | 最大 500 ユーザー | あり |
| **Broadcast** | 全フォロワー | あり |
| **Narrowcast** | 条件セグメント（最低 50 人） | あり |

### 料金プラン（日本）

| プラン | 月額 | 無料メッセージ数/月 | 追加メッセージ |
|---|---|---|---|
| **Free** | ¥0 | 200 | 購入不可 |
| **Light** | ¥5,000 | 5,000 | 購入不可 |
| **Standard** | ¥15,000 | 30,000 | 約 ¥3/通 |

- Broadcast の場合、フォロワー数 × 1 がメッセージ数としてカウントされる
- Reply メッセージは全プランで無制限

## 動画送信の仕様

| 項目 | 制限 |
|---|---|
| **最大ファイルサイズ** | 200 MB |
| **対応フォーマット** | MP4 のみ |
| **動画の長さ** | 明示的な制限なし（サイズ制限に収まる範囲） |
| **コーデック/解像度** | 明示的な要件なし（標準的な MP4） |
| **プロトコル** | HTTPS（TLS 1.2 以上）必須 |
| **プレビュー画像** | 必須（動画 URL + サムネイル URL のセット） |

### 注意点

- 動画は URL 指定（HTTPS）で送信する方式。ファイルを直接アップロードするのではなく、公開 URL を指定する
- Flex Message 内で動画を使う場合、アスペクト比を揃える必要あり

## SDK

**公式: `@line/bot-sdk`**（TypeScript 対応）

```bash
npm install @line/bot-sdk
```

Node.js 20+ 必須。

### 認証

最もシンプルな方法: LINE Developers Console で **Long-lived Channel Access Token** を発行してそのまま使う。

必要な環境変数:
- `LINE_CHANNEL_ACCESS_TOKEN` — メッセージ送信用
- `LINE_CHANNEL_SECRET` — Webhook 検証用（Webhook を使う場合）

## セットアップ手順

1. [LINE Developers](https://developers.line.biz) でアカウント作成
2. Provider → Messaging API チャンネルを作成
3. Channel Secret と Long-lived Channel Access Token を取得
4. `.env` に追加
5. `@line/bot-sdk` をインストール

## 実装イメージ

```typescript
import { messagingApi } from '@line/bot-sdk';

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
});

// テキストをブロードキャスト
async function broadcastText(text: string) {
  await client.broadcast({
    messages: [{ type: 'text', text }],
  });
}

// 動画をブロードキャスト
async function broadcastVideo(videoUrl: string, previewImageUrl: string) {
  await client.broadcast({
    messages: [{
      type: 'video',
      originalContentUrl: videoUrl,
      previewImageUrl: previewImageUrl,
    }],
  });
}

// 特定ユーザーにプッシュ
async function pushText(userId: string, text: string) {
  await client.pushMessage({
    to: userId,
    messages: [{ type: 'text', text }],
  });
}
```

## 既存 X 投稿との比較

| | X (Twitter) | LINE |
|---|---|---|
| **SDK** | `twitter-api-v2` | `@line/bot-sdk` |
| **認証** | OAuth 1.0a (4 つの鍵) | Channel Access Token (1 つ) |
| **動画アップロード** | ファイル直接アップロード | HTTPS URL 指定 |
| **動画上限** | 512 MB / 2 分 20 秒 | 200 MB / 長さ制限なし |
| **配信対象** | 全パブリック | フォロワー（友だち追加者）のみ |
| **無料枠** | API 利用制限あり | 200 通/月 |

## 備考

- LINE Notify は 2025 年 3 月末で終了済み。Messaging API が唯一の選択肢
- 動画は URL 指定のため、動画ファイルのホスティング先が別途必要（S3、Cloudflare R2 など）
- Webhook（ユーザーからのメッセージ受信）を使う場合は HTTPS の公開エンドポイントが必要

# ai-cast 海外既存サービス調査

調査日: 2026-02-18

## ai-castのコア

情報収集 → AIが対話形式で要約 → ポッドキャスト音声を自動生成

---

## 海外の直接競合

### Huxe
- https://techcrunch.com/2025/09/23/former-notebooklm-devs-new-app-huxe-taps-audio-to-help-you-with-news-and-research/
- 元NotebookLM開発者が創業。$4.6M調達（Conviction, Dylan Field, Jeff Dean等）
- メール・カレンダー・Webニュースを統合し、対話形式のポッドキャストを生成
- 聴取中に割り込めるインタラクティブ音声
- 完全無料、iOS/Android対応
- 最初B2Bで立ち上げ→個人向けにピボット。収益化プランは未公開

### Google Daily Listen
- https://techcrunch.com/2025/01/09/googles-daily-listen-ai-feature-generates-a-podcast-based-on-your-discover-feed/
- Google検索/Discoverのフォロー履歴から毎日約5分のパーソナライズドポッドキャストを自動生成
- 無料。2025年1月開始、1年以上経っても米国+インドの英語のみ
- Search Labs実験段階で正式プロダクトになっていない

### Google NotebookLM Audio Overview
- https://blog.google/technology/ai/notebooklm-audio-overviews/
- ドキュメントをアップロードすると2人のAIホストが対話形式で解説
- 80+言語対応（日本語含む）。ただしインタラクティブモードは英語のみ
- 無料 / Plus版あり

### Washington Post - Your Personal Podcast
- https://digiday.com/media/the-washington-post-debuts-ai-personalized-podcasts-to-hook-younger-listeners/
- 閲覧履歴ベースで記事を自動選定、AIホスト2人の対話形式で要約（4〜8分）
- ElevenLabsとの複数年契約。LLMスクリプト生成→別LLMで精度チェック
- 正確性の問題が指摘されている
- WaPo購読者向け

### TailoredPod
- https://www.tailoredpod.ai/
- 関心カテゴリを選択→複数ニュースソースから自動収集→毎日約10分のニュースポッドキャスト
- 記事へのVoteでフィードバック→精度向上
- 無料（2カテゴリ）/ $7.99/月（5カテゴリ）

### Jellypod
- https://www.jellypod.com/
- ニュースレター→AI対話形式のデイリーポッドキャスト
- Deep SearchでWeb補足取得
- 消費者向けは無料、制作ツール（Studio）側で課金（$24〜$150/月）

### Perplexity Discover Daily
- https://www.perplexity.ai/podcast
- Discoverフィードからテック・科学・文化のブリーフィングを音声化（ElevenLabs使用）
- Perplexity本体への誘導装置。単体での収益化は意図していない

### ChatGPT Pulse
- https://openai.com/index/introducing-chatgpt-pulse/
- ChatGPTが過去のチャット・メモリ・フィードバックに基づき日次でパーソナライズドリサーチを配信
- 音声ではなくビジュアルカード形式だが、情報収集→要約のコアは同じ
- Pro用（$20/月）

---

## マネタイズの現状

### パターン整理

| パターン | サービス | 説明 |
|---|---|---|
| 本業への集客装置（無料） | Google, Perplexity, WaPo | ポッドキャスト自体では稼がない |
| 制作ツールSaaS（有料） | Jellypod, Wondercraft | 「作る人」から課金 |
| VC資金で無料→将来課金（未確定） | Huxe | まだユーザー獲得フェーズ |
| コンテンツ課金（苦戦） | TailoredPod | $7.99/月だが規模感が見えない |
| 大量生産×広告 | Inception Point AI | 1ep $1以下、20再生で黒字。週3,000ep生産 |

### 結論

toCで「情報収集→要約→ポッドキャスト」を単体サービスとしてマネタイズしている成功事例はまだ存在しない。

---

## 差別化の分析

### 厳しい現実

- コア機能はコモディティ化が進行中
- Googleが無料で提供している時点で、同じ土俵でtoCの課金は困難
- 日本語ソースの横断収集も技術的な壁にならない（ChatGPT Pulseの例）
- ツール型はユーザー同士のつながりがなく、より良いものが出たら乗り換えられやすい
- SNS/コミュニティ型（はてブ、Zenn、Qiita）はネットワーク効果で残るが、ツール型はそうならない

### 日本語市場

- 上記サービスはすべて英語圏向け。日本語で同等のサービスはゼロ
- ただし「大手がまだやっていないだけ」であり、いつ来てもおかしくない
- Google Daily Listenが1年以上米国+インド限定なのは、日本語市場の優先度が低いため

### ビジネス化するなら

最も現実的な方向: **メディアブランド化**

- ツールではなく「番組」として認知される方向
- リスナーは「AIポッドキャスト生成ツール」ではなく「あの番組の次回」を聴きたくて来る
- 裏側がAI生成かどうかはリスナーにとって関係ない
- コミュニティ要素（トピック投票、コメント、議論）を組み合わせるとさらに差別化
- ただしコミュニティを育てるのが最も難しい部分

### 現実的なステップ

1. 番組として既存チャネル（Spotify, YouTube等）で配信を始める
2. リスナーがつくか検証する
3. コミュニティやアプリ化はその後の話

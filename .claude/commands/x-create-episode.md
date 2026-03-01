# テックメディアのトレンドからエピソード台本生成

複数のテックメディアAPIからバズっている記事を取得し、それをもとにai-castポッドキャストの台本を生成する。

## ポッドキャストの方向性

ソフトウェアエンジニア向けのテック系ポッドキャスト。主な対象領域:
- Claude Code、Codex CLIなどLLMコーディング支援ツールの最新アップデート
- AI/LLMを活用した開発ワークフロー

## 手順

### 1. エピソード番号の決定と既存エピソードの確認

`ai-cast/podcast-gen/content/` 内の既存ファイルを確認し:
- 次のエピソード番号を採番する（ゼロ埋め3桁: 001, 002, ...）
- 過去の台本をすべて読み、扱ったトピックを把握する（重複回避のため）

### 2. 各メディアAPIでトレンド記事を取得

以下のAPIからWebFetchで記事を取得し、各メディアのバズ指標が高い記事を抽出する。

#### Zenn（日本語、トピック別）
バズ指標: `liked_count`
```
https://zenn.dev/api/articles?order=daily&topicname=claudecode
https://zenn.dev/api/articles?order=daily&topicname=openai
https://zenn.dev/api/articles?order=daily&topicname=llm
```

#### Qiita（日本語、タグ検索）
バズ指標: `likes_count`, `stocks_count`
```
https://qiita.com/api/v2/items?page=1&per_page=10&query=tag:LLM+OR+tag:Claude+OR+tag:ChatGPT+stocks:>5
```

#### Hacker News（英語、キーワード検索）
バズ指標: `points`, `num_comments`
```
https://hn.algolia.com/api/v1/search?query=Claude+Code+OR+Codex+CLI+OR+LLM+coding&tags=story&hitsPerPage=10
```

#### Dev.to（英語、タグ別・週間トップ）
バズ指標: `positive_reactions_count`
```
https://dev.to/api/articles?tag=ai&top=7&per_page=10
https://dev.to/api/articles?tag=llm&top=7&per_page=10
```

#### はてなブックマーク（日本語、テクノロジーカテゴリ全体）
バズ指標: `bookmarkcount`（RSS内）
```
https://b.hatena.ne.jp/hotentry/it.rss
```
※テクノロジーカテゴリ全体なので、取得後にLLM/AI関連の記事をフィルタリングする。

### 3. 記事候補の提示

取得した記事から、過去エピソードと被らないものを選び、候補を3〜5個提示する。各候補に:
- 記事タイトルとURL
- バズ指標（いいね数等）
- 記事の概要（1行）

ユーザーに**1本**選んでもらう。この1本を深掘りするエピソードを作る。

### 4. 選ばれた記事の深掘り

選ばれた記事をWebFetchで本文を全文読み込み、内容を徹底的に理解する。
その上で、記事だけでは足りない背景知識・関連情報をWebSearchで補足する（公式ドキュメント、関連議論、比較対象など）。

### 5. 台本の生成

以下のフォーマットで台本を生成する。既存エピソード `ai-cast/podcast-gen/content/001-claude-code-skills.md` を参考にすること。

**フォーマット:**

```markdown
# エピソード: {タイトル}

## メタ情報
- 想定尺: 約5分
- 形式: MC（進行役）+ ゲスト（詳しい人）の対話
- ソース: {調査で見つけた記事の概要}

---

## 台本

MC: ...

ゲスト: ...

（MC/ゲストの対話形式で、自然な会話として構成）

---

## 参照記事
1. [記事タイトル](URL) - 著者名
```

**台本のルール:**
- 話者は必ず `MC:` と `ゲスト:` のプレフィックスで始める（TTS multi-speaker用）
- MCは進行役で質問を投げ、ゲストが詳しく解説する構成
- 約5分の想定尺（読み上げで5分程度のテキスト量）
- 1本の記事を深掘りする構成：背景→核心→具体例→実務での活かし方→まとめ
- 記事の表面的な要約ではなく、「なぜそうなのか」「自分のプロジェクトでどう使えるか」まで踏み込む
- 専門用語は噛み砕いて説明し、具体例を交える
- 冒頭でテーマ紹介、最後にまとめがある自然な流れ

### 6. ファイル保存

`ai-cast/podcast-gen/content/{番号}-{slug}.md` に保存する。
slugはトピックから英語のkebab-caseで生成する。

### 7. 次のステップの案内

台本の保存完了後、ユーザーに台本を確認してもらう。OKが出たら以下のステップ8〜10を順に実行する。

### 8. 音声生成

```bash
cd ai-cast/podcast-gen && npx tsx main.ts audio content/{ファイル名} output/{番号}-{slug}.wav
```

### 9. サムネイル画像生成

エピソードのタイトルを渡してサムネイルを生成する。

```bash
cd ai-cast/podcast-gen && npx tsx main.ts image "{エピソードタイトル}" output/{番号}-{slug}-thumbnail.png
```

### 10. MP4動画生成（サムネイル + 音声 + 波形アニメーション）

ffmpegでサムネイル画像を背景に、音声の波形アニメーションを重ねたMP4動画を生成する。
ファイル名はステップ8・9でリネームしたものを使う。

```bash
ffmpeg -y \
  -i output/{番号}-{slug}.wav \
  -loop 1 -i output/{番号}-{slug}-thumbnail.png \
  -filter_complex "
    [0:a]showwaves=s=1376x200:mode=cline:rate=25:colors=0x4A9EFF@0.8:scale=sqrt[waves];
    [1:v]scale=1376:768[bg];
    [bg][waves]overlay=0:568[v]
  " \
  -map "[v]" -map 0:a \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 192k \
  -shortest -pix_fmt yuv420p \
  output/{番号}-{slug}.mp4
```

パラメータ説明:
- `showwaves`: 音声波形をリアルタイムにビジュアライズ
  - `mode=cline`: 中央線スタイル（滑らかな波形）
  - `colors=0x4A9EFF@0.8`: 青系の半透明波形
  - `scale=sqrt`: ダイナミクスを圧縮して見やすく
- サムネイル（1376x768）の下部200pxに波形をオーバーレイ
- 出力: H.264 + AAC、25fps

### 11. X告知用テキスト生成

台本の内容をもとに、X投稿用の宣伝テキストを2パターン生成する。

**パターン1: 問いかけ型** — リスナーが抱えそうな疑問や課題から入る
**パターン2: 要点まとめ型** — エピソードの核心を箇条書きで整理

**ルール:**
- 280文字以内
- 台本の核心的なポイントを凝縮
- ハッシュタグは0〜2個
- 絵文字は控えめに
- 動画を添付する前提で、末尾に「↓」等のリンク誘導は不要
- 末尾に「あとで聴けるように右下から保存しておいてください！」を必ず含める

2パターン提示し、ユーザーに選んでもらう。

**例（エピソード: OpenClawと自律型AIコーディングの現在地）:**

パターン1: 問いかけ型
```
Claude Code、Codex CLI、そしてOpenClaw。

自律型AIコーディングツール増えすぎて、何がどう違うのかわからなくないですか？

「プランナーとエグゼキューターを分離する」という設計思想がカギでした。

CLAUDE.md肥大化問題やセキュリティリスクも含めて約5分で整理しました。
```

パターン2: 要点まとめ型
```
自律型AIコーディングの最前線、5分で追いつけるポッドキャスト作りました。

- OpenClawの設計思想（Claude Code/Codex CLIとの違い）
- 深津氏の「プランナー×エグゼキューター分離」実践
- CLAUDE.md肥大化の責務分離パターン
- 見落としがちなセキュリティリスク

#AIコーディング
```

### 12. 告知テキストの保存

ユーザーが選んだパターンを `ai-cast/podcast-gen/content/{番号}-{slug}-x-post.md` に保存する。
ユーザーがテキストを加工・編集できるようにするため、**投稿前に必ずファイルに保存する**。

ユーザーに「加工が必要なら編集してください。完了したら教えてください」と伝えて待つ。

### 13. Xに動画付きで投稿

ユーザーの編集完了後、保存した告知テキストファイルを読み込み、ステップ10で生成したMP4動画と一緒にXに投稿する。

```bash
cd ai-cast/podcast-gen && npx tsx main.ts post "$(cat content/{番号}-{slug}-x-post.md)" output/{番号}-{slug}.mp4
```

投稿完了後、ツイートのURLを表示する。

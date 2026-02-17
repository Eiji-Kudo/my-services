# ローカルで気軽にエピソード作成できるようにする

作成日: 2026-02-17
ステータス: 計画中

## 背景

現在、新しいエピソードを作るには以下の手動ステップが必要：

1. `content/` に台本を手書き（MC/ゲスト形式）
2. `src/generate-image.ts` のハードコード `PROMPT` 定数を書き換え
3. `npx tsx main.ts audio content/<file>.txt` を実行
4. `npx tsx main.ts image` を実行
5. 出力は常に `output/podcast.wav` / `output/podcast_thumbnail.png` に固定上書き

特に「ソースコードを直接編集する」のハードルが高く、出力管理も煩雑。

## ゴール

2ステップでエピソード作成を完結させる：

**ステップ1: Claude Codeで台本生成**

Claude Codeに台本を書かせて `content/` に保存。ローカルならLLM呼び出しのコードを書く必要はない。

**ステップ2: CLIで音声+サムネイル一括生成**

```bash
npx tsx main.ts generate content/002-react-server-components.md
```

このコマンドで以下が完了する：
1. 台本のタイトル行を解析
2. 音声生成 → `output/002-react-server-components.wav`
3. タイトルからサムネイル生成 → `output/002-react-server-components.png`

## 設計方針

- 台本生成はClaude Codeに任せる → `generate-script.ts` は不要
- CLIは「台本ファイルを受け取って音声+画像を生成する」だけに集中
- ファイル名からエピソード番号とslugを自動判定（`001-xxx.md` → `001-xxx`）

## 実装タスク

### 1. `src/generate-image.ts` 変更

タイトルに応じた動的プロンプト対応。

- `generateImage(title?: string, outputPath?: string)` にシグネチャ変更
- `title` が渡された場合、ベースプロンプト（イラストスタイル、配色、雰囲気の指定）にタイトルを埋め込み
- `title` なしの場合は既存のハードコードプロンプトを使用（後方互換）

### 2. `main.ts` 変更

`generate` コマンドを追加。

```
tsx main.ts generate <content-file>
```

処理フロー：
1. 台本ファイルを読み込み、1行目の `# タイトル` を解析
2. ファイル名からベース名を取得（`content/002-xxx.md` → `002-xxx`）
3. `generateAudio(contentFile, "output/{ベース名}.wav")` で音声生成
4. `generateImage(title, "output/{ベース名}.png")` でサムネイル生成
5. 完了サマリーを表示

### 3. `package.json` にスクリプト追加

```json
"generate": "tsx main.ts generate"
```

`npm run generate -- content/002-xxx.md` で実行可能に。

## 既存コマンドとの互換性

- `npm run audio` / `npm run image` はそのまま動作
- `generate` は新しいコマンドとして追加するだけなので破壊的変更なし

## チェックリスト

- [ ] `src/generate-image.ts` に `title` 引数追加
- [ ] `main.ts` に `generate` コマンド追加（台本解析+音声+画像の一括実行）
- [ ] `package.json` に `generate` スクリプト追加
- [ ] ローカルで動作確認

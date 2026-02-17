import { writeFileSync } from "fs";
import { client } from "./client.js";

const PROMPT = `
テック系ポッドキャストのサムネイル画像を、おしゃれなデジタルイラスト風のスタイルで生成してください。写真やフォトリアルではなく、イラストレーションで。

要件:
- 日本人の美人女性がヘッドフォンをつけて街を歩いているイラスト
- 明るく爽やかなトーン、白やライトブルー、パステル系の配色
- テック系だけどカジュアルで親しみやすい雰囲気
- 音声アイコンは1つだけ、大きくシンプルに配置（音声波形またはサウンドウェーブ）。アイコンを複数散りばめないこと
- テキスト: 「Zennで話題のClaude Code Skills、結局どう使えばいいの？」
- テキストは日本語で正確に、読みやすく配置
- Xのロゴや「16:9」などのメタ情報は画像内に入れない
`;

export async function generateImage(
  outputPath: string = "output/podcast_thumbnail.png",
): Promise<void> {
  const response = await client.models.generateContent({
    model: "gemini-3-pro-image-preview",
    contents: [{ role: "user", parts: [{ text: PROMPT }] }],
    config: {
      responseModalities: ["IMAGE"],
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts ?? []) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data!, "base64");
      writeFileSync(outputPath, buffer);
      console.log(`${outputPath} を生成しました`);
      break;
    }
  }
}

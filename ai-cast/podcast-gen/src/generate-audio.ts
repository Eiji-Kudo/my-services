import { readFileSync } from "fs";
import { FileWriter } from "wav";
import { client } from "./client.js";

export async function generateAudio(
  scriptPath: string,
  outputPath: string = "output/podcast.wav",
): Promise<void> {
  const raw = readFileSync(scriptPath, "utf-8").trim();
  const scriptMatch = raw.match(/## 台本\s*\n([\s\S]*?)(?:\n---|\n## |$)/);
  const dialogue = (scriptMatch ? scriptMatch[1].trim() : raw).replaceAll("ゲスト:", "Guest:");
  const stylePrompt = `Say the following conversation in a natural podcast style at a moderate, unhurried pace. Take your time with each sentence. MC is a warm and engaging host. Guest is a knowledgeable expert who explains things clearly and deliberately. Both speakers should sound conversational and expressive, with natural pauses between thoughts and a relaxed rhythm. Do not rush.\n\n`;
  const script = stylePrompt + dialogue;

  const response = await client.models.generateContent({
    model: "gemini-2.5-pro-preview-tts",
    httpOptions: { timeout: 600_000 },
    contents: [{ role: "user", parts: [{ text: script }] }],
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        multiSpeakerVoiceConfig: {
          speakerVoiceConfigs: [
            {
              speaker: "MC",
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Aoede" },
              },
            },
            {
              speaker: "Guest",
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Rasalgethi" },
              },
            },
          ],
        },
      },
    },
  });

  const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!data) {
    throw new Error("No audio data in response");
  }

  const pcmBuffer = Buffer.from(data, "base64");

  await new Promise<void>((resolve, reject) => {
    const writer = new FileWriter(outputPath, {
      channels: 1,
      sampleRate: 24000,
      bitDepth: 16,
    });
    writer.on("error", reject);
    writer.on("finish", resolve);
    writer.write(pcmBuffer);
    writer.end();
  });

  console.log(`${outputPath} を生成しました (${pcmBuffer.length} bytes)`);
}

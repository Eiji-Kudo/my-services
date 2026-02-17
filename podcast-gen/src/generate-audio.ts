import { readFileSync } from "fs";
import { FileWriter } from "wav";
import { client } from "./client.js";

export async function generateAudio(
  scriptPath: string,
  outputPath: string = "output/podcast.wav",
): Promise<void> {
  const script = readFileSync(scriptPath, "utf-8").trim();

  const response = await client.models.generateContent({
    model: "gemini-2.5-pro-preview-tts",
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
              speaker: "ゲスト",
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Puck" },
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

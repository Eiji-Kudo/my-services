import { generateAudio } from "./src/generate-audio.js";
import { generateImage } from "./src/generate-image.js";

const command = process.argv[2];

if (command === "audio") {
  const scriptPath = process.argv[3] ?? "content/episode_001.md";
  await generateAudio(scriptPath);
} else if (command === "image") {
  await generateImage();
} else {
  console.log("Usage: tsx main.ts <audio|image>");
  process.exit(1);
}

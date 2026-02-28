import { generateAudio } from "./src/generate-audio.js";
import { generateImage } from "./src/generate-image.js";
import { postWithVideo, postText } from "./src/post-x.js";

const command = process.argv[2];

if (command === "audio") {
  const scriptPath = process.argv[3] ?? "content/episode_001.md";
  const outputPath = process.argv[4] ?? "output/podcast.wav";
  await generateAudio(scriptPath, outputPath);
} else if (command === "image") {
  const title = process.argv[3];
  if (!title) {
    console.log("Usage: tsx main.ts image <title> [output-path]");
    process.exit(1);
  }
  const outputPath = process.argv[4] ?? "output/podcast_thumbnail.png";
  await generateImage(title, outputPath);
} else if (command === "post") {
  const text = process.argv[3];
  const videoPath = process.argv[4];
  if (!text) {
    console.log("Usage: tsx main.ts post <text> [video-path]");
    process.exit(1);
  }
  if (videoPath) {
    await postWithVideo(text, videoPath);
  } else {
    await postText(text);
  }
} else {
  console.log("Usage: tsx main.ts <audio|image|post>");
  process.exit(1);
}

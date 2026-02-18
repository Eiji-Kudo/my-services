import { TwitterApi } from "twitter-api-v2";
import { readFileSync } from "fs";

const envContent = readFileSync(".env", "utf-8");
const envVars: Record<string, string> = {};
for (const line of envContent.split("\n")) {
  if (line.startsWith("#") || !line.includes("=")) continue;
  const [key, ...rest] = line.split("=");
  envVars[key.trim()] = rest.join("=").trim();
}

const client = new TwitterApi({
  appKey: envVars.X_API_CONSUMER_KEY,
  appSecret: envVars.X_API_KEY_SECRET,
  accessToken: envVars.X_ACCESS_TOKEN,
  accessSecret: envVars.X_ACCESS_TOKEN_SECRET,
});

try {
  const tweet = await client.v2.tweet("X API接続テスト 🎙️");
  console.log("投稿成功:", JSON.stringify(tweet, null, 2));
} catch (e: any) {
  console.error("エラー:", e.code, JSON.stringify(e.data ?? e.message));
}

import { TwitterApi } from "twitter-api-v2";
import { config } from "dotenv";

config();

function createClient(): TwitterApi {
  return new TwitterApi({
    appKey: process.env.X_API_CONSUMER_KEY!,
    appSecret: process.env.X_API_KEY_SECRET!,
    accessToken: process.env.X_ACCESS_TOKEN!,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET!,
  });
}

export async function postWithVideo(
  text: string,
  videoPath: string,
): Promise<{ tweetId: string; url: string }> {
  const client = createClient();

  console.log(`動画をアップロード中: ${videoPath}`);
  const mediaId = await client.v1.uploadMedia(videoPath, {
    mimeType: "video/mp4",
    chunkLength: 5 * 1024 * 1024,
  });
  console.log(`アップロード完了: mediaId=${mediaId}`);

  console.log("ツイートを投稿中...");
  const tweet = await client.v2.tweet({
    text,
    media: { media_ids: [mediaId] },
  });

  const tweetId = tweet.data.id;
  const me = await client.v2.me();
  const url = `https://x.com/${me.data.username}/status/${tweetId}`;

  console.log(`投稿完了: ${url}`);
  return { tweetId, url };
}

export async function postText(
  text: string,
): Promise<{ tweetId: string; url: string }> {
  const client = createClient();

  const tweet = await client.v2.tweet(text);
  const tweetId = tweet.data.id;
  const me = await client.v2.me();
  const url = `https://x.com/${me.data.username}/status/${tweetId}`;

  console.log(`投稿完了: ${url}`);
  return { tweetId, url };
}

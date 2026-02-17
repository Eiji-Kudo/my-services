import os
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

prompt = """
テック系ポッドキャストのサムネイル画像を、おしゃれなデジタルイラスト風のスタイルで生成してください。写真やフォトリアルではなく、イラストレーションで。

要件:
- 日本人の美人女性がヘッドフォンをつけて街を歩いているイラスト
- 明るく爽やかなトーン、白やライトブルー、パステル系の配色
- テック系だけどカジュアルで親しみやすい雰囲気
- 音声アイコンは1つだけ、大きくシンプルに配置（音声波形またはサウンドウェーブ）。アイコンを複数散りばめないこと
- テキスト: 「Zennで話題のClaude Code Skills、結局どう使えばいいの？」
- テキストは日本語で正確に、読みやすく配置
- Xのロゴや「16:9」などのメタ情報は画像内に入れない
"""

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(
            aspect_ratio="16:9",
        ),
    )
)

for part in response.parts:
    if part.inline_data is not None:
        image = Image.open(BytesIO(part.inline_data.data))
        image.save("podcast_thumbnail.png")
        print(f"podcast_thumbnail.png を生成しました ({image.size[0]}x{image.size[1]})")
        break

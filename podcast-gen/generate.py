import os
import wave
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

script = """
MC: 今回のテーマは「Claude Code Skills」。Zennでここ数ヶ月、Skills関連の記事がすごく増えてるんですよね。今日はそのトレンド記事5本をまとめて紹介していきます。

ゲスト: よろしくお願いします。Skillsは2025年10月にリリースされて、そこからv2.1.0、v2.1.3と立て続けにアップデートが入って、正直キャッチアップが大変な領域なんですよね。

MC: まずシンプルに、Skillsって何がうれしいんですか？

ゲスト: 一言でいうと「必要なときだけ知識を渡せる」ことです。CLAUDE.mdに全部書くと起動時に毎回読み込まれてコンテキストを圧迫する。Skillsなら、コードレビューのルールはレビュー時だけ読み込まれる。これが大きいです。

MC: なるほど。ただ、Zennの記事を見てると「Skillsを使いこなさなきゃ」って焦ってる人も多いみたいで。1本目の記事がまさにそれでした。

ゲスト: TOKIUMの新卒エンジニアの方の体験談ですね。SNSで盛り上がってるのを見て焦って、TypeScriptのスキルとかセキュリティチェックのサブエージェントとか色々作ったけど、結局どれも実務で使わなかった。「Skillsを作ること」自体が目的になってしまったと。
""".strip()

response = client.models.generate_content(
    model="gemini-2.5-flash-preview-tts",
    contents=script,
    config=types.GenerateContentConfig(
        response_modalities=["AUDIO"],
        speech_config=types.SpeechConfig(
            multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(
                speaker_voice_configs=[
                    types.SpeakerVoiceConfig(
                        speaker="MC",
                        voice_config=types.VoiceConfig(
                            prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Aoede")
                        )
                    ),
                    types.SpeakerVoiceConfig(
                        speaker="ゲスト",
                        voice_config=types.VoiceConfig(
                            prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Puck")
                        )
                    ),
                ]
            )
        )
    )
)

data = response.candidates[0].content.parts[0].inline_data.data

with wave.open("podcast_test.wav", "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(24000)
    wf.writeframes(data)

print(f"podcast_test.wav を生成しました ({len(data)} bytes)")

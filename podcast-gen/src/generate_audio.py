import wave
from pathlib import Path

from google.genai import types

from src.client import get_client


def generate_audio(script_path: str, output_path: str = "output/podcast.wav") -> None:
    script = Path(script_path).read_text(encoding="utf-8").strip()
    client = get_client()

    response = client.models.generate_content(
        model="gemini-2.5-pro-preview-tts",
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
                            ),
                        ),
                        types.SpeakerVoiceConfig(
                            speaker="ゲスト",
                            voice_config=types.VoiceConfig(
                                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Puck")
                            ),
                        ),
                    ]
                )
            ),
        ),
    )

    data = response.candidates[0].content.parts[0].inline_data.data

    with wave.open(output_path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(24000)
        wf.writeframes(data)

    print(f"{output_path} を生成しました ({len(data)} bytes)")

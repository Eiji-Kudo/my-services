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

MC: 転機があったんですよね。

ゲスト: ペアプロしてた先輩が異動することになって、「先輩とやってた設計議論をSkillにすればいいんだ」と気づいた。具体的には、LLMアプリで「LLMでなければできない処理にだけLLMを使う」というサンドイッチ型の設計パターンをSkill化したんです。結果、先輩の時間を使わずに同じレベルの設計議論ができるようになったと。

MC: 暗黙知のSkill化、いいですね。ところで2本目と3本目の記事は、似たような機能が増えすぎて混乱するという話でした。Skills、CLAUDE.md、スラッシュコマンド、サブエージェント、Hooks…。

ゲスト: そこはNOT A HOTELのharu067さんの整理がわかりやすくて。判断フローがあるんですよ。「特定イベントで確実に実行したい？」ならHooks。「常に必要な知識？」ならCLAUDE.md。「独立タスクで過程を忘れてOK？」ならサブエージェント。「ショートカットで呼びたい？」ならスラッシュコマンド。それ以外がSkills。

MC: 「過程を忘れてOK」っていう判断基準、面白いですね。

ゲスト: サブエージェントは別のコンテキストで動いて結果だけ返すんです。翻訳エージェントが大量のファイルを調査しても、その調査過程は親のコンテキストに影響しない。200Kトークンという限られた窓をどう使うかが、全部の機能設計の根っこにある。nananhiryuさんの記事でも、v2.1.3でCommandsがSkillsに統合された経緯が整理されていて、結局Skillsが拡張のほぼ必須の仕組みになってきていると。

MC: その「コンテキストをどう使うか」が4本目の記事のテーマですよね。

ゲスト: はい。Anthropic公式のSkillsアップデートを分析した記事で、「コンテキストウィンドウは公共資源」という考え方が紹介されてます。公式Skillsでは「段階的情報開示」を実践していて、3層構造なんです。第1層がスキル名と説明で約100ワード、常に読み込まれる。第2層がSKILL.md本体で発動時だけ読み込み、5000ワード以内推奨。第3層がスクリプトやリソースで実行時に読み込む。

MC: 必要なときに必要な分だけ。

ゲスト: そうです。あと面白いのが、AIの癖を踏まえたルールも入れていること。「タイトル下のアクセント線は使うな」とか、AIが自信満々でやりがちなミスを事前に封じてる。

MC: 最後の5本目はチームでの共有の話ですね。

ゲスト: Plugin Marketplace機能で、GitHubリポジトリからSkillsを直接インストールできるんです。おすすめはハイブリッド構成で、組織共通のSkillsはグローバルに、プロジェクト固有のものはプロジェクトの.claudeディレクトリに置く。より具体的なスコープが優先されるルールなので、チーム標準を保ちつつプロジェクトごとのカスタマイズもできる。

MC: 5本通して見えてきたポイントをまとめると？

ゲスト: 3つですね。まず「何を解決したいか」から逆算して作ること。とりあえず作るんじゃなくて、自分の業務の暗黙知を探す。次に、機能が増えてきたけど判断フローに沿えば迷わない。そして、コンテキストウィンドウは公共資源。段階的に情報を開示して、必要な分だけ使う設計を意識すること。

MC: ありがとうございます。今回は「Zennで話題のClaude Code Skills、結局どう使えばいいの？」をお届けしました。
""".strip()

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

with wave.open("podcast_full.wav", "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(24000)
    wf.writeframes(data)

print(f"podcast_full.wav を生成しました ({len(data)} bytes)")

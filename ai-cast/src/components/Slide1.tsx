import { Brand } from "./Brand"
import { IPhone } from "./IPhone"
import { XImportScreen } from "./XImportScreen"
import { NowPlayingScreen } from "./NowPlayingScreen"

const episodes = [
  {
    title: "Claude Code アプデ解説（今週版）",
    meta: "5分 · 2026.02.14 生成",
    summary:
      "Plan モードの精度向上、MCP連携強化、hooks機能の追加。開発フローが大きく変わる3つのポイント。",
    gradient:
      "linear-gradient(135deg, #2d1b69 0%, #7c3aed 40%, #c026d3 70%, #e11d9b 100%)",
  },
  {
    title: "ChatGPT vs Gemini 使い分け",
    meta: "7分 · 2026.02.13 生成",
    summary:
      "タスク別の得意領域と失敗パターン。コード生成・要約・分析でどう使い分けるか。",
    gradient: "linear-gradient(135deg, #1a1040 0%, #2d1b69 100%)",
  },
  {
    title: "React Server Components 深掘り",
    meta: "6分 · 2026.02.12 生成",
    summary:
      "SSRとの違い、パフォーマンス改善の実測値、導入時の注意点をまとめて解説。",
    gradient: "linear-gradient(135deg, #0d1b2a 0%, #1b4332 100%)",
  },
]

function EpisodeListScreen() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <div className="text-[13px] font-bold text-[var(--color-w1)]">
        マイエピソード
      </div>
      <div className="mt-[2px] text-[9px] text-[var(--color-w3)]">
        {episodes.length}件のエピソード · あなたの興味から生成
      </div>
      <div className="mt-3 flex flex-col gap-[10px]">
        {episodes.map((ep, i) => (
          <div
            key={i}
            className="rounded-[10px] border border-[var(--color-card-b)] bg-[var(--color-card)] p-[10px]"
          >
            <div className="mb-[6px] flex items-center gap-[8px]">
              <div
                className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px]"
                style={{ background: ep.gradient }}
              >
                <span className="text-[8px] text-white">▶</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10px] font-bold leading-[1.3] text-[var(--color-w1)]">
                  {ep.title}
                </div>
                <div className="mt-[2px] text-[8px] text-[var(--color-w3)]">
                  {ep.meta}
                </div>
              </div>
            </div>
            <div className="rounded-[6px] bg-[var(--color-purple-6)] px-[8px] py-[6px]">
              <div className="text-[8px] leading-[1.5] text-[var(--color-w5)]">
                {ep.summary}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="mt-[270px] flex items-center">
      <div className="h-[2px] w-5 bg-gradient-to-r from-[var(--color-purple-40)] to-[var(--color-purple)]" />
      <div className="border-y-[5px] border-l-[8px] border-y-transparent border-l-[var(--color-purple)]" />
    </div>
  )
}

export function Slide1() {
  return (
    <section
      id="slide1"
      className="relative flex h-[var(--height-slide)] w-[var(--width-slide)] shrink-0 flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] p-[var(--spacing-pad)]"
    >
      <div className="absolute left-[var(--spacing-pad)] top-[var(--spacing-pad)]">
        <Brand />
      </div>

      <div className="mb-6 rounded-2xl border border-[var(--color-purple-40)] bg-[var(--color-purple-6)] px-10 py-5 text-center text-[30px] leading-[1.8] text-[var(--color-w1)]">
        あなたの
        <span className="grad font-semibold">興味</span>
        と
        <span className="grad font-semibold">知識レベル</span>
        に合わせて、
        <span className="grad font-semibold">AI</span>
        が毎日届ける。
      </div>
      <h1 className="mb-10 text-center text-[52px] font-bold leading-[1.3] tracking-[-0.03em] text-[var(--color-w1)]">
        あなた専用の
        <span className="grad">Podcast</span>
        を自動生成。
      </h1>

      <div className="mb-10 flex items-start justify-center gap-5">
        <div className="flex flex-col items-center">
          <IPhone>
            <XImportScreen />
          </IPhone>
          <div className="mt-5 text-center">
            <div className="text-[15px] font-bold text-[var(--color-w1)]">
              𝕏 プロフィール
            </div>
            <div className="mt-[3px] text-[12px] text-[var(--color-w3)]">
              あなたの投稿が興味のソースに
            </div>
          </div>
        </div>

        <FlowArrow />

        <div className="flex flex-col items-center">
          <IPhone>
            <EpisodeListScreen />
          </IPhone>
          <div className="mt-5 text-center">
            <div className="text-[15px] font-bold text-[var(--color-w1)]">
              あなた専用エピソード
            </div>
            <div className="mt-[3px] text-[12px] text-[var(--color-w3)]">
              AIが興味を抽出して生成
            </div>
          </div>
        </div>

        <FlowArrow />

        <div className="flex flex-col items-center">
          <IPhone>
            <NowPlayingScreen />
          </IPhone>
          <div className="mt-5 text-center">
            <div className="text-[15px] font-bold text-[var(--color-w1)]">
              Podcastで聴く
            </div>
            <div className="mt-[3px] text-[12px] text-[var(--color-w3)]">
              通勤中にサクッと
            </div>
          </div>
        </div>
      </div>

      <div className="text-[15px] text-[var(--color-w3)]">
        セットアップは1分、あとは毎日届くのを聴くだけ。
      </div>
    </section>
  )
}

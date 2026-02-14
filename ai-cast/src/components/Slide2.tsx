import { Brand } from "./Brand"
import { IPhone } from "./IPhone"
import { SlideIndex } from "./SlideIndex"

function ScreenLabel({ text }: { text: string }) {
  return (
    <div className="mt-4 text-center text-[13px] font-semibold text-[var(--color-w5)]">
      {text}
    </div>
  )
}

function WireSwipe() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <div className="text-[13px] font-bold text-[var(--color-w1)]">好みを選ぶ</div>
      <div className="mt-[2px] text-[9px] text-[var(--color-w3)]">
        スワイプで興味あるトピックを選択
      </div>

      <div className="relative mt-3 flex flex-1 items-center justify-center">
        <div
          className="absolute -rotate-3 rounded-[14px] border border-dashed border-[var(--color-w15)] bg-[var(--color-card)] p-3"
          style={{ width: 200, height: 240, top: 4, left: 14 }}
        />
        <div
          className="relative z-10 rotate-2 rounded-[14px] border border-[var(--color-purple-22)] bg-[var(--color-card)] p-3"
          style={{ width: 200, height: 240 }}
        >
          <div className="mb-2 flex aspect-[4/3] w-full items-center justify-center rounded-[8px]" style={{ background: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 100%)' }}>
            <div className="text-center text-[11px] font-bold leading-[1.4] text-white">
              LLM
              <br />
              ファインチューニング
            </div>
          </div>
          <div className="text-[11px] font-bold leading-[1.3] text-[var(--color-w1)]">
            LLMファインチューニング実践
          </div>
          <div className="mt-1 text-[8px] leading-[1.4] text-[var(--color-w5)]">
            LoRA / QLoRA の使い分けと実運用のコツを解説
          </div>
          <div className="mt-2 flex items-center gap-[4px]">
            <div className="rounded-[4px] bg-[var(--color-purple-12)] px-[5px] py-[2px] text-[7px] text-[var(--color-purple)]">
              AI/ML
            </div>
            <div className="rounded-[4px] bg-[var(--color-purple-12)] px-[5px] py-[2px] text-[7px] text-[var(--color-purple)]">
              実践
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6">
        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full border-2 border-[var(--color-w15)]">
          <span className="text-[14px] text-[var(--color-w3)]">✕</span>
        </div>
        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full border-2 border-[var(--color-purple-40)]">
          <span className="text-[14px] text-[var(--color-purple)]">♥</span>
        </div>
      </div>
    </div>
  )
}

const episodes = [
  {
    title: "Claude Code アプデ解説（今週版）",
    meta: "5分 · 2026.02.14 生成",
    summary: "Plan モードの精度向上、MCP連携強化、hooks機能の追加。開発フローが大きく変わる3つのポイント。",
  },
  {
    title: "ChatGPT vs Gemini 使い分け",
    meta: "7分 · 2026.02.13 生成",
    summary: "タスク別の得意領域と失敗パターン。コード生成・要約・分析でどう使い分けるか。",
  },
]

function WireEpisodeList() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <div className="text-[13px] font-bold text-[var(--color-w1)]">マイエピソード</div>
      <div className="mt-[2px] text-[9px] text-[var(--color-w3)]">2件のエピソード</div>

      <div className="mt-3 flex flex-col gap-[10px]">
        {episodes.map((ep, i) => (
          <div
            key={i}
            className="rounded-[10px] border border-[var(--color-card-b)] bg-[var(--color-card)] p-[10px]"
          >
            <div className="mb-[6px] flex items-center gap-[8px]">
              <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px]" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #7c3aed 100%)' }}>
                <span className="text-[8px] text-white">▶</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10px] font-bold leading-[1.3] text-[var(--color-w1)]">
                  {ep.title}
                </div>
                <div className="mt-[2px] text-[8px] text-[var(--color-w3)]">{ep.meta}</div>
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

      <div className="mt-auto flex items-center justify-center rounded-[10px] border border-dashed border-[var(--color-purple-22)] py-[10px]">
        <span className="text-[10px] text-[var(--color-purple)]">+ 新しいエピソードを生成</span>
      </div>
    </div>
  )
}

const categories = ["AI Tooling", "Cloud Infra", "Frontend", "SRE", "Career"]

const discoveryItems = [
  { user: "Yuki", title: "Anthropic MCP 活用パターン集", duration: "8分", likes: "24", category: "AI Tooling", match: "92%" },
  { user: "Ken", title: "Cloudflare Workers 実践Tips", duration: "6分", likes: "18", category: "Cloud Infra", match: "85%" },
  { user: "Mika", title: "React Server Components 深掘り", duration: "5分", likes: "31", category: "Frontend", match: "78%" },
]

function WireDiscover() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <div className="text-[13px] font-bold text-[var(--color-w1)]">みんなのエピソード</div>
      <div className="mt-[2px] text-[9px] text-[var(--color-w3)]">
        あなたの好みに近い公開エピソード
      </div>

      <div className="mt-2 flex gap-[3px]">
        {categories.map((cat, i) => (
          <div
            key={cat}
            className={`rounded-full px-[6px] py-[1px] text-[6px] leading-[1.6] ${
              i === 0
                ? "bg-[var(--color-purple)] text-white"
                : "border border-[var(--color-card-b)] bg-[var(--color-card)] text-[var(--color-w3)]"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-[10px]">
        {discoveryItems.map((item, i) => (
          <div
            key={i}
            className="rounded-[10px] border border-[var(--color-card-b)] bg-[var(--color-card)] p-[10px]"
          >
            <div className="mb-[6px] flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--color-purple-12)]">
                  <span className="text-[7px] font-bold text-[var(--color-purple)]">
                    {item.user[0]}
                  </span>
                </div>
                <span className="text-[8px] font-medium text-[var(--color-w3)]">{item.user}</span>
              </div>
              <span className="text-[7px] font-medium text-[var(--color-purple)]">
                {item.match} マッチ
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px]" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #7c3aed 100%)' }}>
                <span className="text-[7px] text-white">▶</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10px] font-bold leading-[1.3] text-[var(--color-w1)]">
                  {item.title}
                </div>
                <div className="mt-[2px] flex items-center gap-[4px] text-[8px] text-[var(--color-w3)]">
                  <span>{item.duration}</span>
                  <span>·</span>
                  <span>♡ {item.likes}</span>
                  <span>·</span>
                  <span className="text-[var(--color-purple)]">{item.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WireTranscript() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <div className="text-[13px] font-bold text-[var(--color-w1)]">要約・文字起こし</div>

      <div className="mt-3 rounded-[10px] border border-[var(--color-purple-22)] bg-[var(--color-purple-6)] p-3">
        <div className="mb-[4px] text-[8px] font-semibold text-[var(--color-purple)]">
          AI要約
        </div>
        <div className="text-[9px] leading-[1.5] text-[var(--color-w5)]">
          Claude Code の最新アップデートでは、Plan モードの精度向上と MCP サーバー連携が強化。
          開発フローへの影響と導入手順を解説。
        </div>
      </div>

      <div className="my-3 flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-[var(--color-w15)]" />
        <span className="text-[8px] text-[var(--color-w3)]">文字起こし</span>
        <div className="h-[1px] flex-1 bg-[var(--color-w15)]" />
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <div className="mb-[2px] text-[7px] text-[var(--color-purple)]">00:00</div>
          <div className="text-[9px] leading-[1.5] text-[var(--color-w5)]">
            今週の Claude Code アップデート、大きく3つのポイントがあります。
          </div>
        </div>
        <div>
          <div className="mb-[2px] text-[7px] text-[var(--color-purple)]">00:32</div>
          <div className="text-[9px] leading-[1.5] text-[var(--color-w5)]">
            まず Plan モードですが、コンテキストの理解精度が上がっています。
          </div>
        </div>
        <div>
          <div className="mb-[2px] text-[7px] text-[var(--color-purple)]">01:15</div>
          <div className="text-[9px] leading-[1.5] text-[var(--color-w5)]">
            次に MCP サーバーとの連携が大幅に改善されまして…
          </div>
        </div>
      </div>
    </div>
  )
}

export function Slide2() {
  return (
    <section
      id="slide2"
      className="relative flex h-[var(--height-slide)] w-[var(--width-slide)] shrink-0 flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] p-[var(--spacing-pad)]"
    >
      <div className="absolute left-[var(--spacing-pad)] top-[var(--spacing-pad)]">
        <Brand />
      </div>

      <h2 className="mb-10 text-center text-[40px] font-bold tracking-[-0.02em] text-[var(--color-w1)]">
        貴重な耳時間を
        <br />
        <span className="grad">ai-cast</span>で。
      </h2>

      <div className="flex items-start gap-7">
        <div>
          <IPhone>
            <WireSwipe />
          </IPhone>
          <ScreenLabel text="好みをスワイプ" />
        </div>
        <div>
          <IPhone>
            <WireEpisodeList />
          </IPhone>
          <ScreenLabel text="エピソード一覧" />
        </div>
        <div>
          <IPhone>
            <WireDiscover />
          </IPhone>
          <ScreenLabel text="みんなのエピソード" />
        </div>
        <div>
          <IPhone>
            <WireTranscript />
          </IPhone>
          <ScreenLabel text="要約・文字起こし" />
        </div>
      </div>

      <SlideIndex current={2} total={2} />
    </section>
  )
}

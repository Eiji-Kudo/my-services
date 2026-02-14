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

const customExamples = [
  { icon: "📊", text: "Zenn ランキング Top5 を要約して" },
  { icon: "📰", text: "今週の HackerNews 注目記事まとめ" },
  { icon: "🎯", text: "Next.js の最新リリースノート解説" },
]

function WireCustomRequest() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <div className="text-[13px] font-bold text-[var(--color-w1)]">カスタム要望</div>
      <div className="mt-[2px] text-[9px] text-[var(--color-w3)]">
        聴きたいテーマをリクエスト
      </div>

      <div className="mt-3 rounded-[10px] border border-[var(--color-card-b)] bg-[var(--color-card)] p-[10px]">
        <div className="flex items-center gap-[6px]">
          <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-purple-12)]">
            <span className="text-[12px]">✨</span>
          </div>
          <div className="min-w-0 flex-1 rounded-[6px] border border-[var(--color-w15)] bg-[var(--color-bg)] px-[8px] py-[6px]">
            <span className="text-[8px] text-[var(--color-w3)]">何を聴きたい？</span>
          </div>
        </div>
      </div>

      <div className="my-3 flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-[var(--color-w15)]" />
        <span className="text-[8px] text-[var(--color-w3)]">例えば…</span>
        <div className="h-[1px] flex-1 bg-[var(--color-w15)]" />
      </div>

      <div className="flex flex-col gap-[8px]">
        {customExamples.map((ex, i) => (
          <div
            key={i}
            className="flex items-center gap-[8px] rounded-[10px] border border-[var(--color-purple-22)] bg-[var(--color-purple-6)] px-[10px] py-[8px]"
          >
            <span className="text-[12px]">{ex.icon}</span>
            <span className="text-[9px] font-medium leading-[1.4] text-[var(--color-w5)]">
              {ex.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-center rounded-[10px] border border-[var(--color-purple-40)] bg-[var(--color-purple-12)] py-[8px]">
        <span className="text-[10px] font-semibold text-[var(--color-purple)]">リクエストを送信</span>
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
            <WireDiscover />
          </IPhone>
          <ScreenLabel text="みんなのエピソード" />
        </div>
        <div>
          <IPhone>
            <WireCustomRequest />
          </IPhone>
          <ScreenLabel text="カスタム要望" />
        </div>
      </div>

      <SlideIndex current={2} total={2} />
    </section>
  )
}

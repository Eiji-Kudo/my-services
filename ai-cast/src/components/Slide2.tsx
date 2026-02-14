import { Brand } from "./Brand"
import { SlideIndex } from "./SlideIndex"

const examples = [
  {
    label: "Example A",
    title: "Claude Code アップデート解説（今週版）",
    items: [
      "何が変わった？（要点3つ）",
      "何が嬉しい？（開発フローへの効き）",
      "すぐ試す手順（最短）",
      "つまずき所（注意点）",
    ],
  },
  {
    label: "Example B",
    title: 'ChatGPT / Claude / Gemini "Skills"使い分け',
    items: [
      "何が得意？（タスク別）",
      "失敗パターン（よくある罠）",
      "使えるプロンプト型（テンプレ）",
      "チーム導入のコツ",
    ],
  },
  {
    label: "Example C",
    title: "インフラ新機能まとめ（AWS/GCP/Cloudflare）",
    items: [
      "重要アップデートだけ抽出",
      "影響（コスト/安定性/運用）",
      "使うべき条件・使わない条件",
      "次に追うべきリンク",
    ],
  },
  {
    label: "Example D",
    title: "Big Tech 求人ブリーフィング（職種別）",
    items: [
      "今出てるロールの傾向",
      "求められるスキルセット",
      "書類で刺さる実績の書き方",
      "面接で見られるポイント（想定）",
    ],
  },
]

function ExampleCard({
  label,
  title,
  items,
}: {
  label: string
  title: string
  items: string[]
}) {
  return (
    <div className="rounded-[12px] border border-[var(--color-card-b)] bg-[var(--color-card)] px-4 py-[18px]">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-purple)]">
        {label}
      </div>
      <div className="mb-[10px] text-[15px] font-bold leading-[1.4] text-[var(--color-w1)]">
        {title}
      </div>
      <ul className="ex-items list-none">
        {items.map((item) => (
          <li
            key={item}
            className="relative py-[2px] pl-[11px] text-[12px] leading-[1.5] text-[var(--color-w5)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Slide2() {
  return (
    <section
      id="slide2"
      className="relative flex h-[var(--height-slide)] w-[var(--width-slide)] shrink-0 flex-col justify-center overflow-hidden bg-[var(--color-bg)] p-[var(--spacing-pad)]"
    >
      <div className="mb-5">
        <Brand />
      </div>
      <div className="flex items-center gap-12">
        <div className="flex-1">
          <h2 className="mb-6 text-[40px] font-bold tracking-[-0.02em] text-[var(--color-w1)]">
            こんな回が
            <br />
            &ldquo;あなた向け&rdquo;に作られる
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {examples.map((ex) => (
              <ExampleCard
                key={ex.label}
                label={ex.label}
                title={ex.title}
                items={ex.items}
              />
            ))}
          </div>
          <div className="mt-5 text-[13px] text-[var(--color-w3)]">
            &ldquo;あなたの興味×あなたのレベル&rdquo;で編集する想定　／　※プロトタイプ検証中
          </div>
        </div>
      </div>
      <SlideIndex current={2} total={2} />
    </section>
  )
}

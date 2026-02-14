const feeds = [
  { name: "@techcrunch_jp", text: "Claude 4.5 Sonnet がリリース、コード生成精度が…" },
  { name: "@because_and", text: "大規模言語モデルのファインチューニング実践ガイド" },
  { name: "@aws_japan", text: "Amazon Bedrock に新モデル追加。エージェント機能が…" },
]

const topics = [
  "Claude Code skills 実運用ケーススタディ",
  "AI時代のエンジニアリングマネジメント",
  "テックリードのためのデータパイプライン構築手法",
]

function FeedItem({ name, text }: { name: string; text: string }) {
  return (
    <div className="flex items-start gap-[8px]">
      <div className="mt-[2px] h-[18px] w-[18px] shrink-0 rounded-full bg-[var(--color-card-b)]" />
      <div className="min-w-0">
        <div className="text-[8px] font-medium text-[var(--color-w3)]">{name}</div>
        <div className="truncate text-[9px] leading-[1.4] text-[var(--color-w5)]">{text}</div>
      </div>
    </div>
  )
}

function Bubble({ text, delay }: { text: string; delay: number }) {
  return (
    <div
      className="xi-bubble relative rounded-[14px] border border-[rgba(191,90,242,0.22)] bg-[rgba(191,90,242,0.08)] px-[12px] py-[8px]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-[10px] font-semibold leading-[1.4] text-[var(--color-w1)]">
        {text}
      </div>
      <div className="absolute -bottom-[6px] left-[18px] h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[rgba(191,90,242,0.22)]" />
    </div>
  )
}

export function XImportScreen() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <div className="mb-[10px] text-[13px] font-bold text-[var(--color-w1)]">
        𝕏連携して好みを抽出
      </div>

      <div className="mb-[10px] rounded-[10px] border border-[var(--color-card-b)] bg-[var(--color-card)] px-[10px] py-[8px]">
        <div className="mb-[6px] flex items-center gap-[6px]">
          <span className="text-[10px] font-bold text-[var(--color-w1)]">𝕏</span>
          <span className="text-[7px] text-[var(--color-w3)]">タイムライン</span>
        </div>
        <div className="flex flex-col gap-[6px]">
          {feeds.map((f) => (
            <FeedItem key={f.name} name={f.name} text={f.text} />
          ))}
        </div>
      </div>

      <div className="mb-[10px] flex items-center justify-center gap-[4px]">
        <div className="h-[1px] flex-1 bg-[var(--color-w15)]" />
        <span className="text-[8px] text-[var(--color-purple)]">▼ AI が分析</span>
        <div className="h-[1px] flex-1 bg-[var(--color-w15)]" />
      </div>

      <div className="mb-[6px] text-[8px] font-medium text-[var(--color-w3)]">
        抽出されたトピック
      </div>
      <div className="flex flex-col gap-[8px]">
        {topics.map((t, i) => (
          <Bubble key={i} text={t} delay={i * 0.3} />
        ))}
      </div>
    </div>
  )
}

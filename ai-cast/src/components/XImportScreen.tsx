const topics = [
  { text: "Claude Code skills 実運用ケーススタディ", handle: "@indygreg" },
  { text: "AI時代のエンジニアリングマネジメント", handle: "@lethain" },
  { text: "テックリードのためのデータパイプライン構築手法", handle: "@emilybache" },
]

function Bubble({
  text,
  handle,
  delay,
}: {
  text: string
  handle: string
  delay: number
}) {
  return (
    <div
      className="xi-bubble relative rounded-[14px] border border-[rgba(191,90,242,0.22)] bg-[rgba(191,90,242,0.08)] px-[14px] py-[10px]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-[11px] font-semibold leading-[1.4] text-[var(--color-w1)]">
        {text}
      </div>
      <div className="mt-[3px] text-[9px] font-medium text-[var(--color-purple)]">
        {handle}
      </div>
      <div className="absolute -bottom-[6px] left-[18px] h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[rgba(191,90,242,0.22)]" />
    </div>
  )
}

export function XImportScreen() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-[15px] font-[800] text-[var(--color-w1)]">𝕏</span>
        <span className="rounded-[980px] bg-[rgba(191,90,242,0.15)] px-2 py-[2px] text-[8px] font-semibold tracking-[0.04em] text-[var(--color-purple)]">
          連携中
        </span>
      </div>
      <div className="mb-[14px] text-[9px] text-[var(--color-w3)]">
        タイムライン・お気に入りからトピックを抽出中...
      </div>
      <div className="flex flex-1 flex-col gap-[14px]">
        {topics.map((t, i) => (
          <Bubble key={t.handle} text={t.text} handle={t.handle} delay={i * 0.3} />
        ))}
      </div>
    </div>
  )
}

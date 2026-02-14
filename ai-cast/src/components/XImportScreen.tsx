const items: {
  topic: string
  handle: string
  status: "done" | "spinning" | "pending"
  dur?: string
}[] = [
  {
    topic: "Claude Code アプデ解説",
    handle: "いいね 14件 · 今週",
    status: "done",
    dur: "5分",
  },
  {
    topic: "Cloudflare Workers + Hono 構成",
    handle: "リポスト 3件 · ブクマ 8件",
    status: "done",
    dur: "4分",
  },
  {
    topic: "LLM エージェント設計パターン",
    handle: "いいね 9件 · リプライ 2件",
    status: "spinning",
    dur: "生成中...",
  },
  {
    topic: "Next.js vs Remix 比較論",
    handle: "ブクマ 5件 · 先週",
    status: "pending",
  },
  {
    topic: "スタートアップ資金調達の動向",
    handle: "いいね 3件 · 2週間前",
    status: "pending",
  },
]

function Dot({ status }: { status: "done" | "spinning" | "pending" }) {
  if (status === "done") {
    return (
      <div className="h-[18px] w-[18px] shrink-0 rounded-full border-[1.5px] border-[var(--color-purple)] bg-[var(--color-purple)]" />
    )
  }
  if (status === "spinning") {
    return (
      <div className="xi-dot spinning h-[18px] w-[18px] shrink-0 rounded-full border-[1.5px]" />
    )
  }
  return (
    <div className="h-[18px] w-[18px] shrink-0 rounded-full border-[1.5px] border-[var(--color-w15)]" />
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
        タイムラインから生成中...
      </div>
      <div className="flex flex-1 flex-col">
        {items.map((item) => (
          <div
            key={item.topic}
            className="flex items-center gap-[10px] border-b border-[var(--color-w15)] py-[10px]"
          >
            <Dot status={item.status} />
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold leading-[1.3] text-[var(--color-w1)]">
                {item.topic}
              </div>
              <div className="mt-[1px] text-[9px] text-[var(--color-w3)]">
                {item.handle}
              </div>
            </div>
            {item.dur && (
              <div
                className={`shrink-0 self-center text-[10px] ${
                  item.status === "spinning"
                    ? "font-medium text-[var(--color-purple)]"
                    : "font-semibold text-[var(--color-w5)]"
                }`}
              >
                {item.dur}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-2 pt-3">
        <div className="text-center text-[10px] text-[var(--color-w5)]">
          <strong className="font-bold text-[var(--color-purple)]">2</strong> / 5
          エピソード生成済み
        </div>
      </div>
    </div>
  )
}

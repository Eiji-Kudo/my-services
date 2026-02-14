const myPosts = [
  {
    text: "Claude Code の hooks 機能、CIに組み込んだら開発体験が全然変わった。自動レビューが捗る。",
    time: "3h",
    likes: 24,
    rts: 5,
  },
  {
    text: "Cloudflare Workers + Hono の組み合わせ最高すぎる。デプロイ速度が桁違い。",
    time: "1d",
    likes: 41,
    rts: 12,
  },
  {
    text: "React Server Components、プロダクションで使い始めたけどバンドルサイズ激減した。",
    time: "2d",
    likes: 18,
    rts: 3,
  },
]

export function XImportScreen() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative h-[52px] shrink-0" style={{ background: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 100%)' }} />

      <div className="relative px-3 pb-2">
        <div className="-mt-[22px] mb-[6px] h-[44px] w-[44px] rounded-full border-[3px] border-[var(--color-bg)] bg-[var(--color-purple-15)]" />
        <div className="text-[11px] font-bold leading-none text-[var(--color-w1)]">
          Eiji
        </div>
        <div className="mt-[1px] text-[8px] text-[var(--color-w3)]">
          @eiji_dev
        </div>
        <div className="mt-[4px] text-[8px] leading-[1.4] text-[var(--color-w5)]">
          Software Engineer / AI・インフラ・フロントエンド
        </div>
        <div className="mt-[4px] flex gap-[10px] text-[7px] text-[var(--color-w3)]">
          <span><span className="font-bold text-[var(--color-w5)]">312</span> フォロー中</span>
          <span><span className="font-bold text-[var(--color-w5)]">1,024</span> フォロワー</span>
        </div>
      </div>

      <div className="border-b border-[var(--color-w15)]">
        <div className="mx-3 border-b-2 border-[var(--color-purple)] pb-[6px] pt-[4px] text-center text-[9px] font-bold text-[var(--color-w1)]" style={{ width: 'fit-content' }}>
          ポスト
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-[8px] overflow-hidden px-3 py-2">
        {myPosts.map((p, i) => (
          <div
            key={i}
            className="flex gap-[8px] border-b border-[var(--color-w15)] pb-[8px]"
          >
            <div className="mt-[2px] h-[20px] w-[20px] shrink-0 rounded-full bg-[var(--color-purple-15)]" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-[4px]">
                <span className="text-[8px] font-bold text-[var(--color-w1)]">
                  Eiji
                </span>
                <span className="text-[7px] text-[var(--color-w3)]">
                  @eiji_dev · {p.time}
                </span>
              </div>
              <div className="mt-[2px] text-[8px] leading-[1.5] text-[var(--color-w5)]">
                {p.text}
              </div>
              <div className="mt-[3px] flex items-center gap-[12px] text-[7px] text-[var(--color-w3)]">
                <span>♡ {p.likes}</span>
                <span>⇄ {p.rts}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

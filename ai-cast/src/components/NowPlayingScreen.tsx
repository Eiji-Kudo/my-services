export function NowPlayingScreen() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden px-5 py-4">
      <div className="mb-3 text-center text-[11px] font-semibold tracking-[0.04em] text-[var(--color-w3)]">
        再生中
      </div>
      <div className="mb-3 flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-[14px]" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #7c3aed 40%, #c026d3 70%, #e11d9b 100%)' }}>
        <div className="text-center text-[13px] font-bold leading-[1.3] text-white">
          Claude Code
          <br />
          アプデ解説
        </div>
        <div className="text-[9px] text-[rgba(255,255,255,0.6)]">今週版</div>
      </div>
      <div className="mb-1 text-center text-[14px] font-bold leading-[1.3] text-[var(--color-w1)]">
        Claude Code アップデート解説
      </div>
      <div className="mb-3 text-center text-[11px] text-[var(--color-purple)]">
        aicast · 5分
      </div>
      <div className="mb-[5px]">
        <div className="h-1 w-full overflow-hidden rounded-[2px] bg-[#333]">
          <div className="h-full w-[35%] rounded-[2px] bg-[var(--color-w1)]" />
        </div>
      </div>
      <div className="mb-2 flex justify-between text-[9px] text-[var(--color-w3)]">
        <span>1:42</span>
        <span>-3:18</span>
      </div>
      <div className="mb-3 flex items-center justify-center gap-7">
        <div className="np-btn-sm np-prev flex h-4 w-5 items-center justify-center" />
        <div className="np-play flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[var(--color-w1)]" />
        <div className="np-btn-sm np-next flex h-4 w-5 items-center justify-center" />
      </div>
      <div className="flex flex-col gap-[6px] border-t border-[#333] pt-3 text-[9px] text-[var(--color-w3)]">
        <div className="flex gap-2">
          <span className="shrink-0 text-[var(--color-w5)]">生成日</span>
          <span>2026.02.14</span>
        </div>
        <div className="flex gap-2">
          <span className="shrink-0 text-[var(--color-w5)]">出典</span>
          <span className="truncate">Anthropic Changelog, GitHub Releases</span>
        </div>
        <div className="flex gap-2">
          <span className="shrink-0 text-[var(--color-w5)]">文字起こし</span>
          <span className="truncate">今週のClaude Codeアップデートを…</span>
        </div>
      </div>
    </div>
  )
}

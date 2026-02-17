export function SlideIndex({ current, total }: { current: number; total: number }) {
  const fmt = (n: number) => String(n).padStart(2, "0")
  return (
    <div className="absolute bottom-[var(--spacing-pad)] right-[var(--spacing-pad)] text-[13px] font-medium text-[var(--color-w15)] tracking-[0.1em]">
      {fmt(current)} &mdash; {fmt(total)}
    </div>
  )
}

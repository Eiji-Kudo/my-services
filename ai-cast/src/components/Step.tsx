import type { ReactNode } from "react"

export function Step({
  icon,
  vis,
  num,
  title,
  desc,
}: {
  icon: ReactNode
  vis: ReactNode
  num: string
  title: string
  desc: ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col items-center px-[8px] text-center">
      <div className="step-icon relative mb-[16px] flex h-[80px] w-[80px] items-center justify-center rounded-[20px] border border-[rgba(191,90,242,0.22)] bg-[rgba(191,90,242,0.08)]">
        <svg className="relative z-1 h-[36px] w-[36px]" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      {vis}
      <div className="mb-[8px] text-[11px] font-bold tracking-[0.1em] text-[var(--color-purple)]">
        {num}
      </div>
      <div className="mb-[6px] text-[20px] font-bold leading-[1.4] text-[var(--color-w1)]">
        {title}
      </div>
      <div className="text-[13px] leading-[1.6] text-[var(--color-w5)]">
        {desc}
      </div>
    </div>
  )
}

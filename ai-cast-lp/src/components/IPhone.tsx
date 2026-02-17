import type { ReactNode } from "react"

export function IPhone({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[280px] h-[572px] shrink-0 rounded-[48px] border-4 border-[#333] bg-[#1a1a1a] p-[14px] shadow-[0_0_0_1px_#000,0_20px_60px_rgba(0,0,0,0.5)]">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[36px] bg-[var(--color-bg)]">
        <div className="mx-auto mt-[10px] h-[22px] w-[80px] shrink-0 rounded-[11px] bg-[#1a1a1a]" />
        {children}
        <div className="mx-auto mb-[10px] mt-[8px] h-[4px] w-[100px] shrink-0 rounded-[2px] bg-[#555]" />
      </div>
    </div>
  )
}

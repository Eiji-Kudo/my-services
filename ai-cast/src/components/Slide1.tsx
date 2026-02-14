import { Brand } from "./Brand"
import { IPhone } from "./IPhone"
import { XImportScreen } from "./XImportScreen"
import { NowPlayingScreen } from "./NowPlayingScreen"
import { StepFlow } from "./StepFlow"
import { SlideIndex } from "./SlideIndex"

export function Slide1() {
  return (
    <section
      id="slide1"
      className="relative flex h-[var(--height-slide)] w-[var(--width-slide)] shrink-0 flex-col justify-center overflow-hidden bg-[var(--color-bg)] p-[var(--spacing-pad)]"
    >
      <div className="mb-[28px]">
        <Brand />
      </div>
      <div className="mb-9 flex items-center gap-12">
        <div className="w-[420px] shrink-0">
          <h1 className="mb-5 text-[56px] font-bold leading-[1.35] tracking-[-0.03em] text-[var(--color-w1)]">
            あなた専用の
            <br />
            <span className="grad">Podcast</span>を
            <br />
            自動生成。
          </h1>
          <div className="flex items-center gap-[10px]">
            <span className="rounded-full border border-[rgba(191,90,242,0.3)] bg-[rgba(191,90,242,0.12)] px-[14px] py-[6px] text-[15px] font-semibold text-[var(--color-purple)]">
              𝕏 連携
            </span>
            <span className="text-[16px] text-[var(--color-w15)]">→</span>
            <span className="rounded-full border border-[rgba(191,90,242,0.2)] bg-[rgba(191,90,242,0.06)] px-[14px] py-[6px] text-[15px] font-medium text-[rgba(191,90,242,0.8)]">
              AIが編集
            </span>
            <span className="text-[16px] text-[var(--color-w15)]">→</span>
            <span className="rounded-full border border-[rgba(191,90,242,0.2)] bg-[rgba(191,90,242,0.06)] px-[14px] py-[6px] text-[15px] font-medium text-[rgba(191,90,242,0.8)]">
              Podcastで届く
            </span>
          </div>
        </div>
        <div className="flex flex-1 justify-center gap-10">
          <IPhone>
            <XImportScreen />
          </IPhone>
          <IPhone>
            <NowPlayingScreen />
          </IPhone>
        </div>
      </div>
      <div className="mb-7">
        <StepFlow />
      </div>
      <div className="text-sm text-[var(--color-w3)]">
        <span>セットアップは1分、あとは毎日届くのを聴くだけ。</span>
      </div>
    </section>
  )
}

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
        <div className="flex-1">
          <h1 className="mb-5 text-[56px] font-bold leading-[1.35] tracking-[-0.03em] text-[var(--color-w1)]">
            あなた専用の
            <br />
            <span className="grad">&ldquo;学びPodcast&rdquo;</span>を
            <br />
            自動生成。
          </h1>
          <div className="text-[22px] leading-[1.7] text-[var(--color-w5)]">
            興味に合わせてオーダーメイドで、
            <br />
            5分に編集して届ける。
          </div>
        </div>
        <div className="flex shrink-0 gap-6">
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
      <div className="flex items-center gap-5 text-sm text-[var(--color-w3)]">
        <span>寝る前 / 散歩 / 通勤で、読む代わりに追いつく。</span>
        <span className="whitespace-nowrap rounded-full border border-[var(--color-w15)] px-3.5 py-1.5 text-xs text-[var(--color-w5)]">
          レベル調整（初心者〜実務）
        </span>
        <span className="whitespace-nowrap rounded-full border border-[var(--color-w15)] px-3.5 py-1.5 text-xs text-[var(--color-w5)]">
          要点→背景→次アクション
        </span>
      </div>
      <SlideIndex current={1} total={2} />
    </section>
  )
}

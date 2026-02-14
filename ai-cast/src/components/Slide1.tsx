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
          <div className="text-[22px] leading-[1.7] text-[var(--color-w5)]">
            X連携するだけ、
            <br />
            AIがあなた専用のPodcastを作成。
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
        <span>いつものPodcastを、あなた専用にオーダーメイド。</span>
      </div>
    </section>
  )
}

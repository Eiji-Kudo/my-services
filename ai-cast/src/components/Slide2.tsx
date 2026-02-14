import { Brand } from "./Brand"
import { IPhone } from "./IPhone"
import { SlideIndex } from "./SlideIndex"

function WireBar({ w = "100%", h = 8 }: { w?: string; h?: number }) {
  return (
    <div
      className="rounded-[4px] bg-[var(--color-w15)]"
      style={{ width: w, height: h }}
    />
  )
}

function WireRect({ h = 40, className = "" }: { h?: number; className?: string }) {
  return (
    <div
      className={`w-full rounded-[8px] border border-dashed border-[var(--color-w15)] ${className}`}
      style={{ height: h }}
    />
  )
}

function ScreenLabel({ text }: { text: string }) {
  return (
    <div className="mt-4 text-center text-[13px] font-semibold text-[var(--color-w5)]">
      {text}
    </div>
  )
}

function WireXImport() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <WireBar w="60%" h={12} />
      <div className="mt-4 rounded-[10px] border border-dashed border-[var(--color-w15)] p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[var(--color-w15)]" />
          <WireBar w="40%" h={6} />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-[6px] flex items-start gap-2">
            <div className="mt-[2px] h-[14px] w-[14px] shrink-0 rounded-full bg-[var(--color-w15)]" />
            <div className="flex-1">
              <WireBar w="35%" h={5} />
              <div className="mt-1">
                <WireBar w="90%" h={5} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 flex items-center gap-2">
        <div className="h-[1px] flex-1 bg-[var(--color-w15)]" />
        <span className="text-[8px] text-[var(--color-purple)]">▼ AI が分析</span>
        <div className="h-[1px] flex-1 bg-[var(--color-w15)]" />
      </div>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="mb-2 rounded-[12px] border border-dashed border-[var(--color-purple-22)] bg-[var(--color-purple-6)] px-3 py-[10px]"
        >
          <WireBar w={`${75 - i * 10}%`} h={7} />
        </div>
      ))}
    </div>
  )
}

function WireEpisodeList() {
  return (
    <div className="flex flex-1 flex-col px-4 py-4">
      <WireBar w="50%" h={12} />
      <div className="mt-1">
        <WireBar w="30%" h={6} />
      </div>

      <div className="mt-4 flex flex-col gap-[10px]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-[10px] border border-dashed border-[var(--color-w15)] p-[10px]"
          >
            <div className="h-[40px] w-[40px] shrink-0 rounded-[8px] bg-[var(--color-w15)]" />
            <div className="flex-1">
              <WireBar w="80%" h={7} />
              <div className="mt-[6px]">
                <WireBar w="50%" h={5} />
              </div>
            </div>
            <div className="h-[20px] w-[20px] shrink-0 rounded-full border border-dashed border-[var(--color-w15)]" />
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <WireRect h={44} className="flex items-center justify-center" />
      </div>
    </div>
  )
}

function WireNowPlaying() {
  return (
    <div className="flex flex-1 flex-col px-5 py-4">
      <div className="mb-3 flex justify-center">
        <WireBar w="30%" h={6} />
      </div>

      <div className="mb-3 flex aspect-square w-full items-center justify-center rounded-[14px] border border-dashed border-[var(--color-w15)] bg-[var(--color-purple-6)]">
        <div className="flex flex-col items-center gap-2">
          <WireBar w="60px" h={10} />
          <WireBar w="40px" h={6} />
        </div>
      </div>

      <div className="mb-1 flex justify-center">
        <WireBar w="70%" h={10} />
      </div>
      <div className="mb-3 flex justify-center">
        <WireBar w="45%" h={6} />
      </div>

      <div className="mb-[5px] h-1 w-full rounded-[2px] bg-[var(--color-w15)]">
        <div className="h-full w-[35%] rounded-[2px] bg-[var(--color-w3)]" />
      </div>
      <div className="mb-3 flex justify-between">
        <WireBar w="20px" h={5} />
        <WireBar w="20px" h={5} />
      </div>

      <div className="mb-3 flex items-center justify-center gap-7">
        <div className="h-4 w-5 rounded-[2px] bg-[var(--color-w15)]" />
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-dashed border-[var(--color-w3)]" />
        <div className="h-4 w-5 rounded-[2px] bg-[var(--color-w15)]" />
      </div>

      <div className="mt-auto flex flex-col gap-[5px]">
        <WireRect h={30} />
        <WireRect h={30} />
      </div>
    </div>
  )
}

export function Slide2() {
  return (
    <section
      id="slide2"
      className="relative flex h-[var(--height-slide)] w-[var(--width-slide)] shrink-0 flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] p-[var(--spacing-pad)]"
    >
      <div className="absolute left-[var(--spacing-pad)] top-[var(--spacing-pad)]">
        <Brand />
      </div>

      <h2 className="mb-10 text-center text-[40px] font-bold tracking-[-0.02em] text-[var(--color-w1)]">
        想定画面
      </h2>

      <div className="flex items-start gap-10">
        <div>
          <IPhone>
            <WireXImport />
          </IPhone>
          <ScreenLabel text="興味を取り込む" />
        </div>
        <div>
          <IPhone>
            <WireEpisodeList />
          </IPhone>
          <ScreenLabel text="エピソード一覧" />
        </div>
        <div>
          <IPhone>
            <WireNowPlaying />
          </IPhone>
          <ScreenLabel text="再生画面" />
        </div>
      </div>

      <SlideIndex current={2} total={2} />
    </section>
  )
}

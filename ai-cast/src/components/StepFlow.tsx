import { Step } from "./Step"
import { StepArrow } from "./StepArrow"

function Chip({ children, hl }: { children: React.ReactNode; hl?: boolean }) {
  return (
    <span
      className={`whitespace-nowrap rounded-[980px] border px-[10px] py-[3px] text-[9px] font-medium ${
        hl
          ? "border-[rgba(191,90,242,0.3)] bg-[rgba(191,90,242,0.15)] font-semibold text-[var(--color-purple)]"
          : "border-[rgba(191,90,242,0.15)] bg-[rgba(191,90,242,0.06)] text-[rgba(191,90,242,0.7)]"
      }`}
    >
      {children}
    </span>
  )
}

function VisArrow() {
  return <span className="text-[10px] text-[var(--color-w3)]">→</span>
}

function Step1Vis() {
  return (
    <div className="mb-[12px] flex items-center justify-center gap-[6px]">
      <Chip>𝕏 Feed</Chip>
      <Chip>Claude Code</Chip>
      <Chip>Infra</Chip>
    </div>
  )
}

function Step2Vis() {
  return (
    <div className="mb-[12px] flex items-center justify-center gap-[6px]">
      <Chip>15 ソース</Chip>
      <VisArrow />
      <Chip hl>3 トピック</Chip>
    </div>
  )
}

function Step3Vis() {
  const heights = [30, 55, 40, 75, 100, 60, 35, 80, 50, 30, 65, 45]
  return (
    <div className="mb-[12px] flex h-[28px] items-end gap-[3px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-[2px] bg-[rgba(191,90,242,0.4)]"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}

const step1Icon = (
  <>
    <circle cx="12" cy="5" r="3" />
    <path d="M12 8v4" />
    <path d="M8 14h8" />
    <path d="M6 14v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" />
    <path d="M9 22v-3" />
    <path d="M15 22v-3" />
  </>
)

const step2Icon = (
  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
)

const step3Icon = (
  <>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </>
)

export function StepFlow() {
  return (
    <div className="flex items-start">
      <Step
        icon={step1Icon}
        vis={<Step1Vis />}
        num="STEP 01"
        title="興味を取り込む"
        desc={
          <>
            X連携（フォロー/いいね/リスト）
            <br />
            or トピック手入力
          </>
        }
      />
      <StepArrow />
      <Step
        icon={step2Icon}
        vis={<Step2Vis />}
        num="STEP 02"
        title="情報を集めて編集"
        desc={
          <>
            重要度付け / ノイズ除去
            <br />
            要点→背景→論点→次アクション
          </>
        }
      />
      <StepArrow />
      <Step
        icon={step3Icon}
        vis={<Step3Vis />}
        num="STEP 03"
        title="Podcastで届く"
        desc={
          <>
            3〜7分 / 毎日 or 毎週
            <br />
            途中から聴いても分かる構成
          </>
        }
      />
    </div>
  )
}

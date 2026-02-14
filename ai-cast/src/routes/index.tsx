import { Link } from '@tanstack/react-router'
import { Slide1 } from '../components/Slide1'
import { Slide2 } from '../components/Slide2'

const SCALE = 0.35

const slides = [
  { num: 1, component: <Slide1 /> },
  { num: 2, component: <Slide2 /> },
]

export function IndexPage() {
  return (
    <div className="flex min-h-screen w-full flex-wrap items-center justify-center gap-10 bg-[#111] p-12">
      {slides.map((s) => (
        <Link
          key={s.num}
          to="/slide/$num"
          params={{ num: String(s.num) }}
          className="group flex flex-col items-center gap-4"
        >
          <div
            className="overflow-hidden rounded-lg shadow-[0_4px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all group-hover:ring-2 group-hover:ring-[var(--color-purple)]/60 group-hover:shadow-[0_4px_60px_rgba(191,90,242,0.15)]"
            style={{
              width: 1350 * SCALE,
              height: 1080 * SCALE,
            }}
          >
            <div
              style={{
                transform: `scale(${SCALE})`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}
            >
              {s.component}
            </div>
          </div>
          <span className="text-sm font-medium tracking-[0.1em] text-[var(--color-w15)] transition-colors group-hover:text-[var(--color-w5)]">
            {String(s.num).padStart(2, '0')}
          </span>
        </Link>
      ))}
    </div>
  )
}

import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from '@tanstack/react-router'
import { EPISODES } from '../data/episodes'

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function WaveformIcon({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-[14px]">
      {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
        <div
          key={i}
          className={`w-[2px] rounded-full ${active ? 'bg-purple' : 'bg-w3'}`}
          style={{
            height: `${h * 14}px`,
            animation: active ? `waveform 0.8s ease-in-out ${i * 0.1}s infinite alternate` : 'none',
          }}
        />
      ))}
    </div>
  )
}

export function PlayerPage() {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [showQueue, setShowQueue] = useState(false)
  const [showNowPlaying, setShowNowPlaying] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)

  const currentEp = currentIdx !== null ? EPISODES[currentIdx] : null

  const tick = useCallback(() => {
    if (!currentEp) return
    setElapsed((prev) => {
      const next = prev + 1
      if (next >= currentEp.durationSec) {
        setCurrentIdx((idx) => {
          if (idx !== null && idx < EPISODES.length - 1) {
            setElapsed(0)
            setProgress(0)
            return idx + 1
          }
          setIsPlaying(false)
          return idx
        })
        return 0
      }
      setProgress(next / currentEp.durationSec)
      return next
    })
  }, [currentEp])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(tick, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, tick])

  const playEpisode = (idx: number) => {
    if (currentIdx === idx) {
      setIsPlaying(!isPlaying)
      return
    }
    setCurrentIdx(idx)
    setElapsed(0)
    setProgress(0)
    setIsPlaying(true)
    setShowNowPlaying(false)
  }

  const playPrev = () => {
    if (currentIdx !== null && currentIdx > 0) {
      setCurrentIdx(currentIdx - 1)
      setElapsed(0)
      setProgress(0)
    }
  }

  const playNext = () => {
    if (currentIdx !== null && currentIdx < EPISODES.length - 1) {
      setCurrentIdx(currentIdx + 1)
      setElapsed(0)
      setProgress(0)
    }
  }

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentEp) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setProgress(ratio)
    setElapsed(Math.floor(ratio * currentEp.durationSec))
  }

  return (
    <div className="min-h-screen bg-bg text-w1 flex flex-col" style={{ fontFamily: "'SF Pro Display', 'SF Pro', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes waveform {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.3); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .slide-up { animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-in { animation: fadeIn 0.25s ease-out; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-bg/80 border-b border-w15">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold tracking-tight">AI Cast</h1>
          </div>
          <button
            onClick={() => setShowQueue(!showQueue)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${showQueue ? 'bg-purple text-black' : 'bg-w15 text-w5 hover:bg-w15/80'}`}
          >
            Queue
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 pb-32">
        {/* Now Playing Modal */}
        {showNowPlaying && currentEp && (
          <div className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-2xl flex flex-col slide-up">
            <div className="flex items-center justify-between px-5 py-4">
              <button onClick={() => setShowNowPlaying(false)} className="text-w5 text-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <span className="text-xs text-w3 uppercase tracking-widest font-medium">Now Playing</span>
              <div className="w-6" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 gap-10">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-card relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-purple/30">#{currentEp.number}</div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {currentEp.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-purple/15 text-purple/80">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full max-w-xs text-center space-y-1">
                <h2 className="text-lg font-semibold leading-tight">{currentEp.title}</h2>
                <p className="text-sm text-w3">Episode {currentEp.number}</p>
              </div>

              <div className="w-full max-w-xs space-y-2">
                <div className="w-full h-1 rounded-full bg-w15 cursor-pointer" onClick={seekTo}>
                  <div className="h-full rounded-full bg-purple transition-all" style={{ width: `${progress * 100}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-w3 font-mono">
                  <span>{formatTime(elapsed)}</span>
                  <span>-{formatTime(currentEp.durationSec - elapsed)}</span>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <button onClick={playPrev} className="text-w5 hover:text-w1 transition-colors disabled:opacity-30" disabled={currentIdx === 0}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-w1 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>
                <button onClick={playNext} className="text-w5 hover:text-w1 transition-colors disabled:opacity-30" disabled={currentIdx === EPISODES.length - 1}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Queue Sidebar */}
        {showQueue && (
          <div className="fixed inset-0 z-40 flex justify-end fade-in" onClick={() => setShowQueue(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative w-full max-w-sm bg-card border-l border-w15 h-full overflow-y-auto slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-card/90 backdrop-blur-xl border-b border-w15 px-5 py-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Up Next</h2>
                <button onClick={() => setShowQueue(false)} className="text-w3 hover:text-w1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="p-3">
                {EPISODES.map((ep, idx) => {
                  const isCurrent = idx === currentIdx
                  const isPast = currentIdx !== null && idx < currentIdx
                  return (
                    <button
                      key={ep.id}
                      onClick={() => playEpisode(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all ${isCurrent ? 'bg-purple/10' : 'hover:bg-w15/50'} ${isPast ? 'opacity-40' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${isCurrent ? 'bg-purple/20' : 'bg-w15'}`}>
                        {isCurrent && isPlaying ? (
                          <WaveformIcon active />
                        ) : (
                          <span className="text-xs font-bold text-w3">{ep.number}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium truncate ${isCurrent ? 'text-purple' : ''}`}>{ep.title}</p>
                        <p className="text-[11px] text-w3 mt-0.5">{ep.duration}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Episode List */}
        <div className="py-6 space-y-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Episodes</h2>
              <p className="text-sm text-w3 mt-1">{EPISODES.length} episodes</p>
            </div>
            <button
              onClick={() => { setCurrentIdx(0); setElapsed(0); setProgress(0); setIsPlaying(true) }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple text-black text-sm font-semibold hover:bg-purple/90 transition-colors active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              Play All
            </button>
          </div>

          {EPISODES.map((ep, idx) => {
            const isCurrent = idx === currentIdx
            return (
              <div
                key={ep.id}
                className={`group relative rounded-2xl border transition-all ${isCurrent ? 'border-purple/30 bg-purple/5' : 'border-w15/50 bg-card/50 hover:bg-card hover:border-w15'}`}
              >
                <div className="flex items-start gap-4 p-4">
                  <button
                    onClick={() => playEpisode(idx)}
                    className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden cursor-pointer hover:scale-105 transition-transform active:scale-95 ${isCurrent ? 'bg-purple/15' : 'bg-w15/70'}`}
                  >
                    {isCurrent && isPlaying ? (
                      <WaveformIcon active />
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={isCurrent ? 'var(--color-purple)' : 'var(--color-w3)'}><path d="M8 5v14l11-7z" /></svg>
                    )}
                    {isCurrent && (
                      <div className="absolute inset-0 border-2 border-purple/30 rounded-xl" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to="/player/$episodeId"
                          params={{ episodeId: ep.id }}
                          className={`text-[15px] font-semibold leading-snug hover:underline decoration-w15 underline-offset-2 ${isCurrent ? 'text-purple' : 'text-w1'}`}
                        >
                          {ep.title}
                        </Link>
                        <p className="text-[13px] text-w3 mt-1.5 leading-relaxed line-clamp-2">{ep.description}</p>
                      </div>
                      <Link
                        to="/player/$episodeId"
                        params={{ episodeId: ep.id }}
                        className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="w-8 h-8 rounded-full bg-w15 flex items-center justify-center hover:bg-w15/80 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-w5)" strokeWidth="2" strokeLinecap="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 mt-2.5">
                      <span className="text-[11px] text-w3 font-mono">{ep.duration}</span>
                      <span className="text-[11px] text-w3/40">·</span>
                      <span className="text-[11px] text-w3">{ep.date}</span>
                      <div className="flex gap-1.5 ml-auto">
                        {ep.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-w15/60 text-w3">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Bottom Player Bar */}
      {currentEp && (
        <div className="fixed bottom-0 left-0 right-0 z-30 slide-up">
          <div className="w-full h-[2px] bg-w15/30">
            <div className="h-full bg-purple transition-all duration-1000" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="backdrop-blur-2xl bg-card/90 border-t border-w15/50">
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
              <button
                onClick={() => setShowNowPlaying(true)}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="w-10 h-10 rounded-lg bg-purple/15 flex-shrink-0 flex items-center justify-center">
                  {isPlaying ? <WaveformIcon active /> : <span className="text-xs font-bold text-purple/60">{currentEp.number}</span>}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{currentEp.title}</p>
                  <p className="text-[11px] text-w3 font-mono">{formatTime(elapsed)} / {currentEp.duration}</p>
                </div>
              </button>

              <div className="flex items-center gap-1">
                <button onClick={playPrev} className="p-2 text-w3 hover:text-w1 transition-colors disabled:opacity-30" disabled={currentIdx === 0}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-w1 flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z" /></svg>
                  )}
                </button>
                <button onClick={playNext} className="p-2 text-w3 hover:text-w1 transition-colors disabled:opacity-30" disabled={currentIdx === EPISODES.length - 1}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 w-24">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-w3 flex-shrink-0">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-purple h-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

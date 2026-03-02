import { useEffect } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { EPISODES, findEpisode, findEpisodeIndex } from '../data/episodes'

function useOgp(title: string, description: string, path: string) {
  useEffect(() => {
    const baseUrl = window.location.origin
    const url = `${baseUrl}${path}`

    const tags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:type': 'music.song',
      'og:url': url,
      'og:site_name': 'AI Cast',
      'og:image': `${baseUrl}/og-image.png`,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': `${baseUrl}/og-image.png`,
    }

    const elements: HTMLMetaElement[] = []

    Object.entries(tags).forEach(([property, content]) => {
      const attr = property.startsWith('twitter:') ? 'name' : 'property'
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, property)
        document.head.appendChild(el)
        elements.push(el)
      }
      el.setAttribute('content', content)
    })

    const prevTitle = document.title
    document.title = `${title} | AI Cast`

    return () => {
      elements.forEach((el) => el.remove())
      document.title = prevTitle
    }
  }, [title, description, path])
}

export function EpisodePage() {
  const { episodeId } = useParams({ strict: false }) as { episodeId: string }
  const episode = findEpisode(episodeId)
  const episodeIdx = findEpisodeIndex(episodeId)

  useOgp(
    episode?.title ?? 'Episode Not Found',
    episode?.description ?? '',
    `/player/${episodeId}`
  )

  if (!episode) {
    return (
      <div className="min-h-screen bg-bg text-w1 flex items-center justify-center" style={{ fontFamily: "'SF Pro Display', 'SF Pro', system-ui, -apple-system, sans-serif" }}>
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold text-w3/20">404</div>
          <p className="text-w3">エピソードが見つかりません</p>
          <Link to="/player" className="inline-block text-sm text-purple hover:underline">
            エピソード一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  const prevEp = episodeIdx > 0 ? EPISODES[episodeIdx - 1] : null
  const nextEp = episodeIdx < EPISODES.length - 1 ? EPISODES[episodeIdx + 1] : null

  return (
    <div className="min-h-screen bg-bg text-w1" style={{ fontFamily: "'SF Pro Display', 'SF Pro', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-1 { animation-delay: 0.05s; opacity: 0; }
        .delay-2 { animation-delay: 0.1s; opacity: 0; }
        .delay-3 { animation-delay: 0.15s; opacity: 0; }
        .delay-4 { animation-delay: 0.2s; opacity: 0; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-bg/80 border-b border-w15">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/player" className="flex items-center gap-2 text-w5 hover:text-w1 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-sm">Episodes</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-purple flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight">AI Cast</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8">
        {/* Hero Section */}
        <div className="fade-in-up">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Artwork */}
            <div className="w-full sm:w-48 aspect-square sm:aspect-auto sm:h-48 rounded-2xl bg-card relative overflow-hidden flex-shrink-0 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple/25 via-transparent to-purple/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-7xl sm:text-5xl font-black text-purple/20 tracking-tighter">#{episode.number}</div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-w5 backdrop-blur-sm font-mono">{episode.duration}</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex gap-1.5 flex-wrap">
                {episode.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple/12 text-purple/80 font-medium">{tag}</span>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">{episode.title}</h1>
              <div className="flex items-center gap-3 text-sm text-w3">
                <span>Episode {episode.number}</span>
                <span className="text-w15">·</span>
                <span>{episode.date}</span>
                <span className="text-w15">·</span>
                <span className="font-mono">{episode.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fade-in-up delay-1 mt-6 flex items-center gap-3">
          <Link
            to="/player"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-purple text-black font-semibold hover:bg-purple/90 transition-colors active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            再生する
          </Link>
          <button className="flex items-center gap-2 px-5 py-3 rounded-full bg-w15 text-w5 text-sm font-medium hover:bg-w15/80 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" x2="12" y1="2" y2="15" />
            </svg>
            共有
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-w15/50 my-8" />

        {/* Description */}
        <section className="fade-in-up delay-2 space-y-3">
          <h2 className="text-sm font-semibold text-w3 uppercase tracking-wider">About this episode</h2>
          <p className="text-[15px] text-w5 leading-relaxed">{episode.longDescription}</p>
        </section>

        {/* Chapters */}
        <section className="fade-in-up delay-3 mt-10 space-y-4">
          <h2 className="text-sm font-semibold text-w3 uppercase tracking-wider">Chapters</h2>
          <div className="space-y-1">
            {episode.chapters.map((ch, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-card transition-colors group text-left"
              >
                <span className="text-sm font-mono text-purple/70 w-12 flex-shrink-0">{ch.time}</span>
                <div className="h-px flex-1 bg-w15/30 group-hover:bg-w15/50 transition-colors" />
                <span className="text-sm text-w5 group-hover:text-w1 transition-colors">{ch.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="fade-in-up delay-4 mt-12 border-t border-w15/50 pt-8">
          <h2 className="text-sm font-semibold text-w3 uppercase tracking-wider mb-4">More episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prevEp && (
              <Link
                to="/player/$episodeId"
                params={{ episodeId: prevEp.id }}
                className="flex items-center gap-3 p-4 rounded-xl border border-w15/50 bg-card/30 hover:bg-card hover:border-w15 transition-all group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-w3 flex-shrink-0">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <div className="min-w-0">
                  <p className="text-[11px] text-w3 mb-0.5">前のエピソード</p>
                  <p className="text-sm font-medium truncate group-hover:text-purple transition-colors">{prevEp.title}</p>
                </div>
              </Link>
            )}
            {nextEp && (
              <Link
                to="/player/$episodeId"
                params={{ episodeId: nextEp.id }}
                className={`flex items-center justify-between gap-3 p-4 rounded-xl border border-w15/50 bg-card/30 hover:bg-card hover:border-w15 transition-all group ${!prevEp ? 'sm:col-start-2' : ''}`}
              >
                <div className="min-w-0">
                  <p className="text-[11px] text-w3 mb-0.5">次のエピソード</p>
                  <p className="text-sm font-medium truncate group-hover:text-purple transition-colors">{nextEp.title}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-w3 flex-shrink-0">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* OGP Preview (wireframe visual) */}
        <div className="mt-12 border-t border-w15/50 pt-8 pb-16">
          <h2 className="text-sm font-semibold text-w3 uppercase tracking-wider mb-4">OGP Preview</h2>
          <div className="rounded-xl border border-w15/50 overflow-hidden bg-card/50 max-w-md">
            <div className="aspect-[1.91/1] bg-gradient-to-br from-purple/15 via-card to-card relative flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-4xl font-black text-purple/25 mb-2">#{episode.number}</div>
                <div className="text-xs text-w3/60">AI Cast</div>
              </div>
            </div>
            <div className="p-4 border-t border-w15/30">
              <p className="text-[11px] text-w3 uppercase tracking-wider mb-1">aicast.example.com</p>
              <p className="text-sm font-semibold leading-snug">{episode.title}</p>
              <p className="text-xs text-w3 mt-1 line-clamp-2">{episode.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

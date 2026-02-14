import { Outlet, useMatches } from '@tanstack/react-router'
import { useEffect } from 'react'

export function RootLayout() {
  const matches = useMatches()
  const isIndex = matches[matches.length - 1]?.fullPath === '/'

  useEffect(() => {
    document.body.style.background = '#111'
    document.body.style.fontFamily = "system-ui, -apple-system, sans-serif"
    document.body.style.margin = '0'
    document.body.style.display = 'flex'
    document.body.style.flexDirection = 'column'
    document.body.style.alignItems = 'center'
    document.body.style.webkitFontSmoothing = 'antialiased'

    if (isIndex) {
      document.body.style.overflow = 'auto'
      document.body.style.padding = '48px 0'
      document.body.style.gap = '48px'
    } else {
      document.body.style.overflow = 'hidden'
      document.body.style.padding = '0'
      document.body.style.gap = '0'
    }
  }, [isIndex])

  return <Outlet />
}

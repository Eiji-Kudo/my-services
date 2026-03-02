import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { RootLayout } from './routes/__root'
import { IndexPage } from './routes/index'
import { PlayerPage } from './routes/player'
import { EpisodePage } from './routes/episode'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
})

const playerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/player',
  component: PlayerPage,
})

const episodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/player/$episodeId',
  component: EpisodePage,
})

const routeTree = rootRoute.addChildren([indexRoute, playerRoute, episodeRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { RootLayout } from './routes/__root'
import { IndexPage } from './routes/index'
import { SlidePage } from './routes/slide.$num'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexPage,
})

const slideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/slide/$num',
  component: SlidePage,
})

const routeTree = rootRoute.addChildren([indexRoute, slideRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

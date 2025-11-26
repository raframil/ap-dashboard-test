# Evolution & Scaling

How to take this from a demo project to a production application.

## Current State

What works: modern stack (Next.js 16, React 19, TypeScript 5), 67 passing tests, automated quality checks with Biome and Husky, performance optimizations like server components and caching.

What's missing for production: E2E testing, error monitoring, CI/CD pipeline, backend-for-frontend layer, database persistence.

## Short-Term (1-2 weeks)

### End-to-End Testing

Add Cypress or Playwright to test full user workflows. Current tests only cover components in isolation.

Test scenarios: Search for a character, click the card, reveal spoiler, open modal. Navigate to analytics and verify charts render. Enable spoiler mode, reload the page, confirm state persists.

Setup: `pnpm add -D cypress` and add test specs to `cypress/e2e/`.

### Error Boundaries

Create `src/components/organisms/ErrorBoundary.tsx` to catch unhandled React errors and prevent full app crashes. Wrap the app layout with the error boundary and log errors to a monitoring service like Sentry.

### Environment Configuration

Add `.env.local` and `.env.production` files to manage API URLs and secrets across environments.

Example variables:
```bash
NEXT_PUBLIC_GRAPHQL_API_URL=https://rickandmortyapi.com/graphql
NEXT_PUBLIC_SENTRY_DSN=...
```

### Performance Monitoring

Set up Vercel Analytics or Sentry Performance to track Core Web Vitals (LCP, FID, CLS), page load times, and API response times. Add the `<Analytics />` component to the layout - takes about 5 minutes.

## Medium-Term (2-4 weeks)

### Backend-for-Frontend Layer

Problem: Server-side aggregations are expensive. We fetch all 800+ characters to compute counts on every request.

Solution: Next.js API routes with Redis caching.

Structure:
```
app/api/
├── characters/
│   ├── aggregations/route.ts  # Cached counts
│   └── search/route.ts         # Proxy to GraphQL
└── locations/
    └── stats/route.ts          # Cached stats
```

Cache aggregations with 1-hour TTL to reduce API load by 99%. Add rate limiting and request sanitization. Hide API keys from the client. Combine multiple data sources if needed.

Use Redis (Upstash or Vercel KV) for caching and Next.js API routes for endpoints.

### Database Integration

Problem: No persistence for user data like favorites, custom lists, or preferences.

Solution: PostgreSQL with Prisma ORM.

Example schema:
```prisma
model User {
  id          String   @id @default(uuid())
  email       String   @unique
  favorites   UserFavorite[]
  preferences UserPreferences?
}

model UserFavorite {
  id          String   @id @default(uuid())
  userId      String
  characterId String
  @@unique([userId, characterId])
}
```

Use cases: Sync preferences across devices, save favorite characters/locations, create custom watchlists, pre-compute aggregations instead of live fetching.

### Type-Safe API with tRPC

Problem: No type safety between frontend and API routes.

Solution: tRPC for end-to-end type safety without code generation.

Example:
```typescript
// server/routers/characters.ts
export const charactersRouter = router({
  getStatusCounts: publicProcedure.query(async () => {
    return await redis.get('character:status:counts');
  }),
});

// Frontend (fully typed)
const { data } = trpc.characters.getStatusCounts.useQuery();
```

Get auto-complete, refactoring safety, and type errors at compile time.

### Authentication

Add NextAuth.js with Google/GitHub providers to enable user-specific features like favorites and synced preferences. Protect routes like `/favorites` and `/settings`.

## Long-Term (1-3 months)

### Design System Package

When you're building multiple apps (web, mobile, admin panel), extract components into a standalone design system.

Structure:
```
packages/
├── ui-library/           # Standalone design system
│   ├── src/atoms/
│   ├── src/molecules/
│   └── storybook/       # Documentation
└── dashboard/            # Main app
```

Use Storybook for component documentation and Chromatic for visual regression testing. Publish as an npm package (public or private registry).

### Monorepo with Turborepo

When you have multiple related apps that need to share code, use Turborepo.

Structure:
```
portal-hub/
├── apps/
│   ├── web/              # Next.js dashboard
│   ├── mobile/           # React Native app
│   └── admin/            # Admin panel
└── packages/
    ├── ui/               # Shared components
    ├── api-client/       # Shared tRPC/Apollo client
    └── utils/            # Shared utilities
```

Get shared dependencies, atomic builds across apps, and remote caching for faster CI.

### Real-Time Features

Add WebSockets (Pusher, Ably) when you need collaborative features or live updates.

Use cases: Show live user activity ("5 people viewing this character"), real-time aggregation updates, collaborative watchlists.

## Migration Strategy

Follow the strangler fig pattern: introduce new systems alongside the old ones, gradually migrate features, remove old systems when complete. No big rewrites.

Example - migrating to BFF:
1. Keep Apollo, add BFF for aggregations only
2. Move all queries to BFF (proxy to GraphQL)
3. Remove Apollo if desired

Each phase is production-ready and reversible.

## Recommended Order

Weeks 1-2: Production-ready (E2E tests, error boundaries, monitoring)
Weeks 3-6: Enhanced features (BFF, database, tRPC, auth)
Months 2-3: Enterprise scale (design system, monorepo, real-time)

Focus on solving real problems with clear success metrics. Skip anything that adds complexity without clear benefit. Don't optimize prematurely.

For current architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md).

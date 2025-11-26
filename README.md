# Rick & Morty Dashboard

Interactive dashboard for exploring Rick and Morty characters and locations. Built with Next.js 16, React 19, TypeScript, and the Rick and Morty GraphQL API.

## Setup

Requirements:
- Node.js 24.x LTS or higher
- pnpm 11.x or higher

```bash
git clone git@github.com:raframil/ap-dashboard-test.git
cd ap-dashboard-test
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000).

## Commands

```bash
pnpm dev              # Development server
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # Run Biome linter
pnpm format           # Auto-format code
pnpm test             # Tests (watch mode)
pnpm test:run         # Run tests once
pnpm test:coverage    # Coverage report
```

## What's Built

The app has three main pages: analytics dashboard showing character/location statistics, characters browser with search and infinite scroll, and locations explorer. All data comes from the Rick and Morty GraphQL API.

Features include real-time search filtering, data visualization with charts, infinite scroll pagination using Intersection Observer, and detailed modals for characters and locations.

There's also a spoiler protection system that hides character status (Alive/Dead/Unknown) until you click to reveal. You can toggle the feature globally or reveal individual characters. State persists in localStorage across sessions.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript 5
- Apollo Client for GraphQL
- Zustand for state management
- Tailwind CSS 4
- Victory charts
- Vitest + React Testing Library (67 passing tests)
- Biome for linting/formatting
- Husky for pre-commit hooks

## Project Structure

```
ap-dashboard-test/
├── app/                    # Next.js pages (App Router)
│   ├── analytics/
│   ├── characters/
│   └── locations/
├── src/
│   ├── components/         # UI components (Atomic Design pattern)
│   │   ├── atoms/         # Button, Badge, Card
│   │   ├── molecules/     # CharacterCard, LocationCard
│   │   └── organisms/     # CharacterGrid, Navigation
│   ├── features/           # Feature modules
│   │   ├── characters/    # Character logic + components
│   │   └── locations/     # Location logic + components
│   ├── lib/               # Apollo Client config
│   ├── stores/            # Zustand state
│   ├── types/             # TypeScript definitions
│   └── utils/             # Helper functions
└── tests/
    ├── unit/              # Component/hook tests
    ├── integration/       # Feature tests
    └── utils/             # Test utilities + mocks
```

## Testing

67 tests covering components, hooks, and feature workflows. Tests use Vitest with Apollo Client mocks to simulate API responses.

```bash
pnpm test              # Watch mode
pnpm test:run          # Single run
pnpm test:coverage     # Coverage report
```

## Code Quality

Pre-commit hooks run Biome (formatting + linting) and the full test suite before each commit. This keeps the codebase consistent and prevents broken code from being committed.

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture decisions, component design, and trade-offs
- [EVOLUTION.md](./EVOLUTION.md) - Roadmap for scaling to production

## API

Uses the public [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql).

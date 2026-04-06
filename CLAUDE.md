# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo with three independent sub-projects — each has its own `CLAUDE.md` with detailed guidance:

| Directory | Stack | Purpose |
|-----------|-------|---------|
| `bibleReact/` | Vite 6 + React 18 + TypeScript + Tailwind CSS v4 | Web frontend |
| `bibleNative/` | React Native 0.84.1 (New Architecture) | Mobile app (iOS/Android) |
| `bibleBack/` | Spring Boot 4.0.1 + Java 21 + Spring Data JPA | REST API backend |

There is no root-level package.json or workspace config. Each sub-project is built and run independently.

## Quick Commands

### bibleReact (web)
```bash
cd bibleReact
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build
```
> If npm cache permission errors occur: `npm install --cache /tmp/npm-cache`

### bibleNative (mobile)
```bash
cd bibleNative
npm start                    # Metro bundler (Terminal 1)
npm run ios                  # iOS (Terminal 2)
npm run android              # Android (Terminal 2)
npm run lint                 # ESLint
npm test -- --testPathPattern="App"  # Single test file
```
Requires Node ≥ 22.11.0. Run `bundle exec pod install` after native dependency changes (iOS).

### bibleBack (backend)
```bash
cd bibleBack
./gradlew bootRun            # Run Spring Boot app
./gradlew test               # All tests
./gradlew test --tests "com.bible.BibleApplicationTests"  # Single test class
```

## Architecture Overview

This is a **Bible reading application** — all three projects share the same domain and feature set:
- Bible reader with verse highlighting
- Reading plans
- Group reading / community features
- Notes

### Shared Design Decisions

- **State management**: No global state library in either frontend. All state is component-local `useState`, with cross-component state lifted to the root component (`App.tsx`).
- **Navigation**: Both frontends use a tab-based state machine (`activeTab`) — no router library. The `notes` and `profile` tabs are not in the bottom nav; they are accessed via `MoreMenu` callbacks.
- **Data layer**: Currently all Bible data and sample data are hardcoded in components. No API integration yet. `bibleBack` is a minimal Spring Boot scaffold awaiting implementation.

### bibleReact Key Architecture

- `src/app/App.tsx` — root; owns `activeTab` and `highlightedVerses` (Set<string>) state
- `src/app/components/` — feature components (`BibleReader`, `ReadingPlan`, `GroupReading`, `NotesPanel`, `MoreMenu`, `ProfilePage`)
- `src/app/components/ui/` — reusable Radix UI-based components (shadcn/ui style, no CLI)
- `src/styles/theme.css` — Tailwind v4 tokens via `@theme inline` (no `tailwind.config.js`)
- Path alias: `@/` → `src/`

### bibleBack Expected Structure

Spring Boot standard layering (not yet implemented beyond the entry point):
```
controller/ → service/ → repository/ (JpaRepository) → entity/
```
H2 runs in-memory by default. Add `spring.datasource.*` / `spring.jpa.*` to `application.properties` to customize.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install
bundle install              # iOS only, first time after clone

# iOS native deps (run after native dependency changes)
bundle exec pod install

# Development
npm start                   # Start Metro bundler (Terminal 1)
npm run android             # Build & run on Android (Terminal 2)
npm run ios                 # Build & run on iOS (Terminal 2)

# Quality
npm run lint                # ESLint
npm test                    # Jest (all tests)
npm test -- --testPathPattern="App"  # Run a single test file
```

## Architecture

This is a **React Native 0.84.1** app with **New Architecture enabled** (Fabric renderer + TurboModules) and **Hermes JS engine** on Android.

**Entry points:**
- `index.js` — registers the root component with React Native
- `App.tsx` — root React component

**Native layers** delegate to the JS layer via React Native's bridge/JSI:
- iOS: `ios/bible_native/AppDelegate.swift`
- Android: `android/app/src/main/java/com/bible_native/MainApplication.kt` + `MainActivity.kt`

**Key facts:**
- Node ≥ 22.11.0 required
- TypeScript 5.8.3 (config extends `@react-native/typescript-config`)
- Safe area handling via `react-native-safe-area-context`
- Tests use Jest with `react-native` preset; test files live in `__tests__/`
- Android min SDK 24, compile/target SDK 36

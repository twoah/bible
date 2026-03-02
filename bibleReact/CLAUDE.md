# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # 개발 서버 실행 (http://localhost:5173)
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 미리보기
```

> **참고**: npm 캐시 권한 문제가 발생하면 `npm install --cache /tmp/npm-cache` 로 설치

## Architecture

### Stack
- **Vite 6** + **React 18** + **TypeScript** (CRA가 아님)
- **Tailwind CSS v4** — `tailwind.config.js` 파일 없음. `@tailwindcss/vite` 플러그인 방식 사용. Tailwind 설정은 CSS 파일 내 `@theme inline` 블록(`src/styles/theme.css`)으로 정의
- **shadcn/ui 스타일 컴포넌트** — Radix UI 프리미티브 위에 직접 구현 (별도 shadcn CLI 없음)

### Navigation Flow

`App.tsx`가 전체 SPA 라우팅을 담당. `activeTab` 상태(`'read' | 'plan' | 'group' | 'more' | 'notes' | 'profile'`)로 화면을 전환하며, 실제 라우터(React Router 등)는 사용하지 않음. `notes`와 `profile` 탭은 하단 내비게이션 바에 노출되지 않고 `MoreMenu`의 버튼 콜백으로만 진입함.

### State Management

전역 상태 관리 라이브러리 없음. 모든 상태는 컴포넌트 로컬 `useState`. 유일한 cross-component 상태는 `App.tsx`에서 관리하는 `highlightedVerses`(Set<string>)로, `BibleReader`에 props로 전달됨.

### Data Layer

현재 모든 성경 데이터는 각 컴포넌트에 하드코딩된 샘플 데이터:
- `BibleReader.tsx` — `bibleData` 객체 (창세기, 요한복음, 시편 일부)
- `ReadingPlan.tsx` — `sampleGroupPlans` 배열
- `GroupReading.tsx` — `sampleMembers`, `sampleComments`, `sampleGroups` 배열
- `NotesPanel.tsx` — `sampleNotes` 배열

외부 API 또는 데이터베이스 연결 없음.

### Key Files

| 파일 | 역할 |
|------|------|
| `src/main.tsx` | 앱 진입점 |
| `src/app/App.tsx` | 탭 네비게이션 및 전역 상태 관리 |
| `src/app/components/` | 기능 컴포넌트 (`BibleReader`, `ReadingPlan`, `GroupReading`, `NotesPanel`, `MoreMenu`, `ProfilePage`) |
| `src/app/components/ui/` | 재사용 UI 컴포넌트 (Radix UI 기반) |
| `src/app/components/ui/utils.ts` | `cn()` 유틸리티 함수 (`clsx` + `tailwind-merge`) |
| `src/styles/theme.css` | CSS 커스텀 프로퍼티 및 `@theme inline` Tailwind 토큰 |
| `src/styles/index.css` | CSS import 진입점 |
| `vite.config.ts` | `@` → `./src` path alias 설정 |

### Path Alias

`@/` 는 `src/` 를 가리킴. 예: `import { cn } from '@/app/components/ui/utils'`

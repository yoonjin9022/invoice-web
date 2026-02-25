# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
# pnpm 경로 설정 (필요 시)
export PNPM_HOME="/Users/nam-yunjin/Library/pnpm" && export PATH="$PNPM_HOME:$PATH"

pnpm dev        # 개발 서버 실행
pnpm build      # 프로덕션 빌드
pnpm start      # 프로덕션 서버 실행
pnpm lint       # ESLint 검사

# shadcn/ui 컴포넌트 추가
pnpm dlx shadcn@latest add <component-name>
```

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx       # 루트 레이아웃: TooltipProvider + Toaster 래핑
│   ├── globals.css      # TailwindCSS v4 + shadcn CSS 변수 (oklch 색상)
│   └── page.tsx         # 메인 페이지 (컴포넌트 showcase)
├── components/
│   ├── ui/              # shadcn/ui 자동 생성 컴포넌트 (직접 수정 주의)
│   ├── layout/          # Header, Footer
│   └── sections/        # 페이지 섹션 컴포넌트
├── lib/
│   └── utils.ts         # cn() 유틸리티 (clsx + tailwind-merge)
└── types/
    └── index.ts         # ApiResponse, Pagination, PaginatedResponse 공통 타입
```

## 핵심 아키텍처

### TailwindCSS v4
- `tailwind.config` 파일 없음 — `globals.css`에서 `@import "tailwindcss"` + `@theme inline {}` 방식으로 설정
- CSS 변수는 `oklch` 색상 형식 사용 (hsl 아님)
- `shadcn/tailwind.css` import로 shadcn 토큰 자동 포함

### shadcn/ui 설정
- 스타일: `new-york`, 색상: `neutral`, CSS Variables 활성화
- `components.json`의 `tailwind.config: ""` (v4 호환을 위한 빈 값)
- 아이콘: `lucide-react`
- 경로 별칭: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`

### 전역 레이아웃 래핑 구조
`layout.tsx`에서 `TooltipProvider`가 전체 앱을 감싸고 있어, Tooltip 사용 시 별도 Provider 추가 불필요. `Toaster`(sonner)도 전역 등록되어 있음.

### 상태 관리
- 로컬 UI 상태: `useState` / `useReducer`
- 전역 클라이언트 상태: Zustand (`'use client'` 필수)
- 서버 데이터: 서버 컴포넌트 fetch 또는 React Query/SWR (Zustand에 캐시 금지)

### `'use client'` 사용 기준
서버 컴포넌트가 기본값. `useState`, `useEffect`, 이벤트 핸들러, Zustand, 브라우저 API를 사용하는 컴포넌트에만 `'use client'` 추가.

## 타입 패턴

API 관련 타입은 `src/types/index.ts`에 정의된 공통 타입 활용:
- `ApiResponse<T>` — 단일 응답
- `PaginatedResponse<T>` — 페이지네이션 응답

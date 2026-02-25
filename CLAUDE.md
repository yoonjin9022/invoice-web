# CLAUDE.md

**노션 인보이스 웹뷰어** — 노션 데이터베이스와 연동하여 견적서를 웹 URL로 공유하고 PDF 다운로드를 제공하는 서비스

상세 프로젝트 요구사항은 @/docs/PRD.md 참조

---

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

# 노션 패키지 설치 (최초 1회)
pnpm add @notionhq/client @react-pdf/renderer
```

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃: TooltipProvider + Toaster 래핑
│   ├── globals.css                 # TailwindCSS v4 + shadcn CSS 변수 (oklch 색상)
│   ├── page.tsx                    # 견적서 목록 페이지 (발행자용 대시보드)
│   └── invoices/
│       └── [id]/
│           ├── page.tsx            # 견적서 상세 페이지 (클라이언트 공유 URL)
│           └── not-found.tsx       # 견적서 없음 안내 페이지
├── components/
│   ├── ui/                         # shadcn/ui 자동 생성 컴포넌트 (직접 수정 주의)
│   └── layout/                     # Header, Footer
├── lib/
│   ├── utils.ts                    # cn() 유틸리티 (clsx + tailwind-merge)
│   └── notion.ts                   # 노션 클라이언트 설정 및 데이터 조회 함수
└── types/
    ├── index.ts                    # ApiResponse, Pagination, PaginatedResponse 공통 타입
    └── invoice.ts                  # Invoice, InvoiceItem, InvoiceStatus 타입
```

## 핵심 아키텍처

### 노션 API 연동 원칙
- 노션 API 호출은 **서버 컴포넌트에서만** 수행 (API 키 노출 방지)
- `src/lib/notion.ts`에서 노션 클라이언트 인스턴스 관리
- 데이터 조회 함수 (`getInvoices`, `getInvoice`)도 `notion.ts`에서 export
- Zustand 캐시 금지 — 서버 컴포넌트 fetch 방식 사용

### 환경변수
- `NOTION_API_KEY`: 노션 통합(Integration) API 키
- `NOTION_DATABASE_ID`: 견적서 데이터베이스 ID
- `.env.local.example` 참고하여 `.env.local` 생성

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
- 서버 데이터: 서버 컴포넌트 fetch (Zustand에 캐시 금지)

### `'use client'` 사용 기준
서버 컴포넌트가 기본값. `useState`, `useEffect`, 이벤트 핸들러, Zustand, 브라우저 API를 사용하는 컴포넌트에만 `'use client'` 추가.

## 타입 패턴

인보이스 관련 타입은 `src/types/invoice.ts` 활용:
- `Invoice` — 견적서 전체 데이터
- `InvoiceItem` — 견적 품목
- `InvoiceStatus` — 견적서 상태 (draft | sent | approved | completed)
- `INVOICE_STATUS_LABEL` — 상태 한국어 레이블 매핑
- `INVOICE_STATUS_VARIANT` — 상태별 Badge variant 매핑

API 관련 공통 타입은 `src/types/index.ts` 활용:
- `ApiResponse<T>` — 단일 응답
- `PaginatedResponse<T>` — 페이지네이션 응답

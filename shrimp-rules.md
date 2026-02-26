# Development Guidelines — 노션 인보이스 웹뷰어

## 프로젝트 개요

노션 데이터베이스와 연동하여 견적서를 웹 URL로 공유하고 PDF 다운로드를 제공하는 서비스.
- 노션이 **단일 데이터 소스(Source of Truth)** — 별도 DB 없음
- 발행자용 목록 페이지 + 클라이언트 공유용 상세 페이지 + PDF 다운로드

## 프로젝트 아키텍처

```
src/
├── app/
│   ├── layout.tsx                     # 루트 레이아웃 (ThemeProvider → TooltipProvider → Toaster)
│   ├── globals.css                    # TailwindCSS v4 설정 (tailwind.config 파일 없음)
│   ├── page.tsx                       # 견적서 목록 페이지 (서버 컴포넌트)
│   └── invoices/[id]/
│       ├── page.tsx                   # 견적서 상세 페이지 (서버 컴포넌트)
│       └── not-found.tsx              # 404 페이지
├── components/
│   ├── ui/                            # shadcn/ui 자동 생성 — 직접 수정 금지
│   ├── layout/                        # Header, Footer, ThemeToggle
│   └── providers/                     # ThemeProvider
├── lib/
│   ├── notion.ts                      # 노션 클라이언트 + getInvoices() + getInvoice()
│   └── utils.ts                       # cn() 유틸리티만 존재
└── types/
    ├── invoice.ts                     # Invoice, InvoiceItem, InvoiceStatus 타입
    └── index.ts                       # ApiResponse, PaginatedResponse 공통 타입
```

## 코드 작성 규칙

### 필수 준수
- 들여쓰기: 스페이스 2칸
- 세미콜론 사용 금지
- 문자열: 작은따옴표(`''`) 사용
- 컴포넌트명: PascalCase, 변수/함수명: camelCase
- 코드 주석/커밋 메시지/문서: **한국어** 작성

### `'use client'` 사용 기준
- **기본값은 서버 컴포넌트** — 아래 경우에만 `'use client'` 추가:
  - `useState`, `useEffect`, `useReducer` 사용 시
  - 이벤트 핸들러(`onClick`, `onChange` 등) 직접 정의 시
  - Zustand 사용 시
  - 브라우저 API(`window`, `document`, `navigator` 등) 사용 시

### 금지 패턴
- 노션 API 호출을 클라이언트 컴포넌트에서 수행하는 것 — **반드시 서버 컴포넌트에서만**
- Zustand에 노션 API 응답 데이터를 캐시하는 것 — **서버 fetch 방식 사용**
- `src/components/ui/` 내 파일 직접 수정 — **shadcn/ui CLI로만 업데이트**
- `tailwind.config` 파일 생성 — **TailwindCSS v4는 `globals.css`로 관리**
- CSS 변수에 `hsl()` 색상 형식 사용 — **반드시 `oklch()` 형식 사용**

## 기능 구현 규칙

### 노션 API 연동 (`src/lib/notion.ts`)
- 모든 노션 API 함수는 `notion.ts`에서만 export
- `getInvoices()`: 목록 조회 — F001/F002 기능 담당
- `getInvoice(pageId: string)`: 상세 조회 — 존재하지 않을 경우 `null` 반환 (F012)
- `mapNotionPageToInvoice()`: 노션 응답 → `Invoice` 타입 변환 (내부 함수)
- 환경변수 검사는 `validateEnvVariables()` 함수 사용 — 중복 구현 금지
- API 오류 시 에러를 throw하거나 `null` 반환 — 빈 배열 반환 금지

### 견적서 상세 페이지 (`src/app/invoices/[id]/page.tsx`)
- `getInvoice(id)` 호출 후 `null`이면 `notFound()` 호출 (next/navigation)
- `generateMetadata()`에서 실제 견적서 제목을 동적 메타데이터로 반영
- `params`는 반드시 `await params` 패턴 사용 (Next.js 15+ 비동기 params)

### PDF 생성 (`/api/invoices/[id]/pdf`)
- API Route에서 `@react-pdf/renderer`로 서버사이드 PDF Buffer 생성
- 다운로드 파일명: `invoice-{클라이언트명}-{발행일}.pdf`
- PDF 전용 레이아웃: `src/components/pdf/InvoicePdf.tsx` (별도 컴포넌트)
- PDF 다운로드 버튼은 클라이언트 컴포넌트로 구현 (진행 상태 표시 필요)

### 더미 데이터 (`src/lib/mock-data.ts`)
- Phase 2 UI 구현 시 사용하는 개발용 데이터
- Phase 3 실제 연동 시 완전히 교체 — 더미 데이터와 실제 데이터 혼용 금지

## 프레임워크/라이브러리 사용 규칙

### TailwindCSS v4
- `tailwind.config.ts` 파일 없음 — `src/app/globals.css`의 `@theme inline {}` 블록에서 CSS 변수 관리
- 색상 커스텀 시 반드시 `oklch()` 형식 사용 (`hsl()` 절대 금지)
- shadcn CSS 변수는 `shadcn/tailwind.css` import로 자동 포함

### shadcn/ui
- 컴포넌트 추가: `pnpm dlx shadcn@latest add <component-name>`
- `src/components/ui/` 파일 직접 수정 금지
- Tooltip 사용 시 별도 `TooltipProvider` 추가 불필요 — `layout.tsx`에서 전역 제공
- Toast 사용 시 `sonner` 패키지의 `toast()` 함수 직접 호출 — `layout.tsx`에서 `Toaster` 전역 등록됨

### 다크 모드
- `ThemeProvider`가 `next-themes` 기반 — `src/components/providers/ThemeProvider.tsx`에서 관리
- 컴포넌트에서 테마 접근: `useTheme()` 훅 (클라이언트 컴포넌트에서만)

## 타입 사용 규칙

### Invoice 관련 타입 (`src/types/invoice.ts`)
- `Invoice`: 견적서 전체 데이터 — 노션에서 변환된 앱 내부 타입
- `InvoiceItem`: 개별 품목 (invoiceId로 Invoice 참조)
- `InvoiceStatus`: `'draft' | 'sent' | 'approved' | 'completed'`
- `INVOICE_STATUS_LABEL`: 상태 → 한국어 레이블 매핑 상수
- `INVOICE_STATUS_VARIANT`: 상태 → shadcn Badge variant 매핑 상수

### 공통 타입 (`src/types/index.ts`)
- `ApiResponse<T>`: API Route 응답 시 사용
- `PaginatedResponse<T>`: 페이지네이션이 필요한 목록 API 응답 시 사용
- PDF API Route 응답은 `ApiResponse`가 아닌 binary stream 반환

## 워크플로우 규칙

### 새 페이지/기능 구현 순서
1. `src/types/`에서 필요한 타입 확인 또는 추가
2. `src/lib/notion.ts`에서 데이터 조회 함수 구현 (서버 전용)
3. 서버 컴포넌트에서 데이터 조회 및 props 전달
4. UI 컴포넌트 구현 (`'use client'` 최소화)
5. Playwright MCP로 동작 검증

### 컴포넌트 신규 추가 위치
- 특정 페이지 전용 컴포넌트: 해당 라우트 폴더 내 (예: `app/invoices/[id]/`)
- 여러 페이지에서 재사용: `src/components/` 하위 의미에 맞는 폴더
- PDF 전용 컴포넌트: `src/components/pdf/`
- 레이아웃 컴포넌트: `src/components/layout/`

### 환경변수 관련
- `.env.local`에서 관리 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)
- 서버 컴포넌트와 API Route에서만 접근 — 클라이언트에 노출 금지
- 클라이언트에 노출이 필요한 환경변수만 `NEXT_PUBLIC_` 접두사 사용

## 멀티 파일 동시 수정 규칙

| 상황 | 동시에 수정해야 할 파일 |
|------|----------------------|
| 새 Invoice 필드 추가 | `src/types/invoice.ts` + `src/lib/notion.ts`의 매핑 함수 |
| 새 공통 API 타입 추가 | `src/types/index.ts` |
| 새 페이지 라우트 추가 | `src/app/` 하위 폴더 + `src/components/layout/Header.tsx` (내비게이션 링크) |
| shadcn 컴포넌트 추가 | CLI 명령어만 실행 (`src/components/ui/` 파일 직접 수정 금지) |
| 노션 DB 스키마 변경 | `src/lib/notion.ts` 매핑 함수 + `src/types/invoice.ts` 타입 정의 |

## AI 의사결정 기준

### 새 컴포넌트를 서버 vs 클라이언트로 결정할 때
```
브라우저 API / 이벤트 핸들러 / useState / Zustand 필요?
├─ YES → 'use client' 추가
└─ NO  → 서버 컴포넌트 (기본값)
```

### 데이터 조회 방법 결정
```
노션 데이터 조회?
├─ YES → 서버 컴포넌트에서 직접 fetch (notion.ts 함수 호출)
└─ NO  → 해당 없음 (현재 외부 API 없음)
```

### 상태 관리 방법 결정
```
전역 공유 상태 (로그인/테마 등)?
├─ YES → Zustand (단, 'use client' 필수, 노션 데이터 캐시 금지)
└─ NO  → 로컬 UI 상태? → useState/useReducer
                └─ NO → 서버 컴포넌트 fetch
```

## 금지 행위 목록

- 노션 API 키(`NOTION_API_KEY`)를 클라이언트 번들에 포함시키는 행위
- `src/components/ui/` 파일을 CLI 없이 직접 편집하는 행위
- `tailwind.config.ts` 파일 생성하는 행위 (v4 호환 깨짐)
- CSS 변수에 `hsl()` 색상 형식 사용 (oklch만 허용)
- Zustand store에 `getInvoices()`/`getInvoice()` 응답을 캐시하는 행위
- `getInvoice()`가 `null` 반환 시 `notFound()` 호출 없이 렌더링 진행하는 행위
- PDF API Route를 클라이언트에서 직접 `fetch()`로 호출 시 Content-Type 검사 누락

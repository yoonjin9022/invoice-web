# 노션 인보이스 웹뷰어 개발 로드맵

노션 데이터베이스와 연동하여 견적서를 웹 URL로 공유하고 PDF 다운로드를 제공하는 서비스

## 개요

**노션 인보이스 웹뷰어**는 노션으로 견적서를 관리하는 프리랜서 및 소규모 사업자를 위한 서비스로 다음 기능을 제공합니다:

- **노션 데이터베이스 연동**: 노션 API를 통해 견적서 데이터를 실시간 조회
- **견적서 웹뷰 렌더링**: 노션 페이지 ID 기반 고유 URL로 전문적인 인보이스 UI 제공
- **PDF 다운로드**: @react-pdf/renderer를 활용한 서버사이드 PDF 생성 및 다운로드
- **견적서 목록 대시보드**: 발행자가 모든 견적서를 한눈에 관리할 수 있는 목록 페이지

## 개발 워크플로우

1. **작업 계획**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함**

     테스트 체크리스트 작성 형식 (반드시 아래 형식 준수):
     ```markdown
     ## 테스트 체크리스트

     ### 정상 케이스 (Happy Path)
     - [ ] [시나리오 설명]: `browser_navigate({url})` → `browser_snapshot()` → [기대 결과 명시]
     - [ ] [시나리오 설명]: `browser_click({ref})` → `browser_network_requests()` → [응답 상태 코드 및 데이터 확인]

     ### 에러 케이스 (Edge Case)
     - [ ] [잘못된 입력 시나리오]: `browser_navigate({잘못된 URL})` → `browser_snapshot()` → [에러 UI 표시 확인]
     - [ ] [API 오류 시나리오]: [기대 에러 처리 동작 명시]

     ### 콘솔 오류 확인
     - [ ] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인
     ```
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조

3. **작업 구현**

   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **API 연동 및 비즈니스 로직 구현 시 아래 Playwright MCP 테스트 프로세스 필수 수행**

     **[필수] Playwright MCP 테스트 프로세스:**

     a. **구현 완료 후 즉시 테스트 시작**: 각 구현 단계 완료 즉시 Playwright MCP 실행
     b. **기본 접근성 확인**:
        - `browser_navigate({url})` → 해당 페이지 URL 접근
        - `browser_snapshot()` → 페이지 구조 및 접근성 트리 확인
     c. **데이터 로딩 검증**:
        - `browser_network_requests({includeStatic: false})` → API 요청 상태 코드(200/4xx/5xx) 확인
        - `browser_snapshot()` → 실제 데이터가 화면에 렌더링되었는지 확인
     d. **사용자 인터랙션 테스트**:
        - `browser_click({ref})` / `browser_type({ref, text})` → 버튼 클릭, 폼 입력 시뮬레이션
        - `browser_snapshot()` → 인터랙션 후 화면 상태 변화 확인
     e. **에러 케이스 테스트**:
        - `browser_navigate({url: '잘못된 URL'})` → 에러 페이지 접근
        - `browser_snapshot()` → 에러 UI / not-found 페이지 올바르게 표시되는지 확인
        - `browser_console_messages({level: 'error'})` → JavaScript 에러 없는지 확인
     f. **테스트 결과에 따른 처리**:
        - 통과: 작업 파일 내 해당 단계 체크박스 업데이트 후 다음 단계 진행
        - 실패: 에러 분석 → 코드 수정 → a단계부터 재테스트

   - 각 단계 완료 후 작업 파일 내 진행 상황 업데이트
   - **모든 테스트 체크리스트 항목 통과 확인 후에만 다음 Task로 이동**
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

   - 로드맵에서 완료된 작업을 완료 표시로 변경

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, Server Components) |
| UI | React 19, TypeScript, TailwindCSS v4, shadcn/ui |
| 노션 연동 | @notionhq/client (공식 SDK) |
| PDF 생성 | @react-pdf/renderer |
| 배포 | Vercel |
| 패키지 관리 | pnpm |

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 -- 완료

> 프로젝트 초기 설정, 라우트 구조, 공통 레이아웃, 타입 정의

- **Task 001: 프로젝트 초기 설정 및 환경 구성** -- 완료
  - See: 초기 커밋 참조
  - [x] Next.js 15 프로젝트 생성 (App Router, TypeScript)
  - [x] TailwindCSS v4 설정 (`globals.css`에서 `@import "tailwindcss"` + `@theme inline {}`)
  - [x] shadcn/ui 설정 (`new-york` 스타일, `neutral` 색상, CSS Variables)
  - [x] pnpm 패키지 관리자 설정
  - [x] `.env.local.example` 환경변수 템플릿 생성

- **Task 002: 전체 라우트 구조 및 레이아웃 생성** -- 완료
  - See: 초기 커밋 참조
  - [x] 루트 레이아웃 (`layout.tsx`): ThemeProvider, TooltipProvider, Toaster 래핑
  - [x] 견적서 목록 페이지 (`/`) 빈 껍데기 생성
  - [x] 견적서 상세 페이지 (`/invoices/[id]`) 빈 껍데기 생성
  - [x] 견적서 not-found 페이지 (`/invoices/[id]/not-found.tsx`) 구현
  - [x] 동적 메타데이터 생성 함수 설정

- **Task 003: 공통 레이아웃 컴포넌트 구현** -- 완료
  - See: 초기 커밋 참조
  - [x] Header 컴포넌트 구현 (`components/layout/Header.tsx`)
  - [x] Footer 컴포넌트 구현 (`components/layout/Footer.tsx`)
  - [x] ThemeToggle 컴포넌트 구현 (`components/layout/ThemeToggle.tsx`)
  - [x] ThemeProvider 구현 (`components/providers/ThemeProvider.tsx`)

- **Task 004: 타입 정의 및 인터페이스 설계** -- 완료
  - See: `src/types/invoice.ts`, `src/types/index.ts`
  - [x] Invoice, InvoiceItem, InvoiceStatus 타입 정의
  - [x] NotionDatabaseConfig 타입 정의
  - [x] INVOICE_STATUS_LABEL, INVOICE_STATUS_VARIANT 상수 매핑
  - [x] ApiResponse, PaginatedResponse 공통 API 응답 타입 정의

- **Task 005: shadcn/ui 컴포넌트 라이브러리 설치** -- 완료
  - See: `src/components/ui/` 디렉토리
  - [x] 필수 UI 컴포넌트 설치 (Button, Card, Badge, Dialog, Sheet 등)
  - [x] Alert, Avatar, Checkbox, Input, Label, Select 등 폼 관련 컴포넌트
  - [x] Separator, Tabs, Textarea, Tooltip, Dropdown Menu 등 유틸리티 컴포넌트
  - [x] Sonner (Toast) 전역 설정

---

### Phase 2: UI/UX 완성 (더미 데이터 활용) -- 완료

> 모든 페이지의 UI를 더미 데이터로 완성하여 전체 사용자 플로우 검증

- **Task 006: 더미 데이터 및 목업 유틸리티 작성** -- 완료
  - 개발용 더미 Invoice 데이터 생성 (`src/lib/mock-data.ts`)
  - 다양한 상태(draft, sent, approved, completed)의 견적서 샘플 5~10개 작성
  - InvoiceItem 품목 데이터 포함 (다양한 수량, 단가 조합)
  - 금액 포맷팅 유틸리티 함수 작성 (KRW 통화 형식)
  - 날짜 포맷팅 유틸리티 함수 작성

- **Task 007: 견적서 목록 페이지 UI 구현** -- 완료
  - 견적서 카드 컴포넌트 구현 (클라이언트명, 금액, 발행일, 상태 배지 표시)
  - 견적서 목록 그리드/리스트 레이아웃 구현
  - 각 견적서 카드에 "견적서 보기" 버튼 및 "URL 복사" 버튼 배치
  - 빈 목록 상태 (Empty State) UI 구현
  - 로딩 스켈레톤 UI 구현
  - 에러 상태 UI 구현
  - 더미 데이터로 전체 플로우 검증

- **Task 008: 견적서 상세 페이지 UI 구현** -- 완료
  - 인보이스 레이아웃 컴포넌트 구현 (전문적인 견적서 디자인)
  - 발행자 정보 섹션 (이름, 이메일)
  - 클라이언트 정보 섹션 (이름, 이메일)
  - 견적서 메타 정보 (제목, 상태 배지, 발행일, 유효기간)
  - 품목 테이블 컴포넌트 (품목명, 설명, 수량, 단가, 금액)
  - 금액 요약 섹션 (소계, 세율, 세액, 최종 합계)
  - 비고 섹션
  - PDF 다운로드 버튼 배치 (기능은 Phase 3에서 구현)
  - 목록으로 돌아가기 버튼
  - 로딩 스켈레톤 UI 구현
  - 더미 데이터로 전체 레이아웃 검증
  - 반응형 디자인 (모바일/태블릿/데스크톱) 적용

---

### Phase 3: 핵심 기능 구현 -- 완료

> 노션 API 연동, 실제 데이터 바인딩, PDF 생성 기능 구현

- **Task 009: 노션 API 연동 및 데이터 조회 구현** -- 완료
  - [x] @notionhq/client 패키지 설치 및 클라이언트 초기화 (`src/lib/notion.ts`)
  - [x] 환경변수 유효성 검사 로직 완성
  - [x] `getInvoices()` 함수 구현 (견적서 목록 조회, F001/F002)
  - [x] `getInvoice(pageId)` 함수 구현 (견적서 상세 조회, F001/F003)
  - [x] `mapNotionPageToInvoice()` 노션 응답 데이터를 Invoice 타입으로 변환하는 매핑 함수 구현
  - [x] 노션 데이터베이스 속성명과 앱 필드 매핑 (제목 -> title, 상태 -> status 등)
  - [x] API 호출 오류 처리 및 에러 핸들링 (F011)
  - [x] 존재하지 않는 페이지 접근 시 null 반환 처리 (F012)
  - ## 테스트 체크리스트
    - ### 정상 케이스 (Happy Path)
    - [x] 목록 데이터 로딩: `browser_navigate({url: 'http://localhost:3000'})` → `browser_snapshot()` → 실제 노션 DB 데이터 렌더링 확인
    - [x] API 응답 검증: `browser_network_requests({includeStatic: false})` → 노션 API 호출 200 응답 확인
    - [x] 상세 데이터 조회: `browser_click({ref: '견적서 카드'})` → `browser_snapshot()` → 발행자/클라이언트 정보, 품목 테이블 표시 확인
    - ### 에러 케이스 (Edge Case)
    - [x] 잘못된 ID 접근: `browser_navigate({url: 'http://localhost:3000/invoices/invalid-id'})` → `browser_snapshot()` → not-found 페이지 표시 확인
    - [x] API 오류 처리: 노션 API 키 오류 시 `browser_snapshot()` → 에러 메시지 UI 표시 확인
    - ### 콘솔 오류 확인
    - [x] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

- **Task 010: 견적서 목록 페이지 실제 데이터 연동** -- 완료
  - [x] 더미 데이터를 서버 컴포넌트 fetch 호출로 교체
  - [x] `getInvoices()` 호출 결과를 목록 컴포넌트에 바인딩
  - [x] 로딩 상태 처리 (Suspense + 스켈레톤)
  - [x] API 오류 시 에러 UI 표시 (F011)
  - [x] 빈 데이터베이스 시 Empty State 표시
  - [x] URL 복사 기능 구현 (클립보드 API 활용)
  - ## 테스트 체크리스트
    - ### 정상 케이스 (Happy Path)
    - [x] 목록 페이지 로딩: `browser_navigate({url: 'http://localhost:3000'})` → `browser_snapshot()` → 견적서 카드 목록 표시 확인
    - [x] URL 복사: `browser_click({ref: 'URL 복사 버튼'})` → `browser_snapshot()` → 복사 완료 토스트 메시지 확인
    - [x] 상세 페이지 이동: `browser_click({ref: '견적서 카드'})` → `browser_snapshot()` → 상세 페이지 URL 및 데이터 렌더링 확인
    - ### 에러 케이스 (Edge Case)
    - [x] 빈 목록: 데이터 없을 때 `browser_snapshot()` → Empty State UI 표시 확인
    - [x] API 오류: 노션 API 실패 시 `browser_snapshot()` → 에러 UI 표시 확인
    - ### 콘솔 오류 확인
    - [x] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

- **Task 011: 견적서 상세 페이지 실제 데이터 연동** -- 완료
  - [x] 더미 데이터를 `getInvoice(id)` 서버 컴포넌트 호출로 교체
  - [x] 견적서 데이터를 상세 페이지 컴포넌트에 바인딩
  - [x] 존재하지 않는 ID 접근 시 `notFound()` 호출 (F012)
  - [x] 로딩 상태 처리 (Suspense + 스켈레톤)
  - [x] 동적 메타데이터에 실제 견적서 제목 반영
  - ## 테스트 체크리스트
    - ### 정상 케이스 (Happy Path)
    - [x] 상세 데이터 렌더링: `browser_navigate({url: 'http://localhost:3000/invoices/{id}'})` → `browser_snapshot()` → 발행자/클라이언트 정보, 품목 테이블, 금액 요약 모두 표시 확인
    - [x] 메타데이터 확인: `browser_evaluate({function: '() => document.title'})` → 견적서 제목이 탭 타이틀로 설정되었는지 확인
    - [x] 목록 이동: `browser_click({ref: '목록으로 돌아가기'})` → `browser_snapshot()` → 목록 페이지로 이동 확인
    - ### 에러 케이스 (Edge Case)
    - [x] 잘못된 ID: `browser_navigate({url: 'http://localhost:3000/invoices/invalid-id'})` → `browser_snapshot()` → not-found 페이지 표시 확인
    - ### 콘솔 오류 확인
    - [x] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

- **Task 012: PDF 다운로드 기능 구현 (F004)** -- 완료
  - [x] @react-pdf/renderer 패키지 설치
  - [x] PDF 전용 인보이스 레이아웃 컴포넌트 구현 (`src/components/pdf/InvoicePdf.tsx`)
  - [x] PDF 레이아웃: 발행자 정보, 클라이언트 정보, 품목 테이블, 금액 요약, 비고
  - [x] API Route 생성 (`/api/invoices/[id]/pdf`): 서버사이드 PDF Buffer 생성 및 스트리밍
  - [x] PDF 다운로드 버튼 클라이언트 컴포넌트 구현 (다운로드 진행 상태 표시)
  - [x] 다운로드 파일명 규칙: `invoice-{클라이언트명}-{발행일}.pdf`
  - [x] 한글 폰트 지원 (PDF 내 한글 렌더링)
  - ## 테스트 체크리스트
    - ### 정상 케이스 (Happy Path)
    - [x] PDF 다운로드 버튼: `browser_click({ref: 'PDF 다운로드 버튼'})` → `browser_snapshot()` → 다운로드 진행 상태 표시 확인
    - [x] API 응답 검증: `browser_network_requests({includeStatic: false})` → `/api/invoices/{id}/pdf` 엔드포인트 200 응답 및 Content-Type: application/pdf 확인
    - [x] 다운로드 완료: `browser_snapshot()` → 완료 후 버튼 상태 정상으로 복귀 확인
    - ### 에러 케이스 (Edge Case)
    - [x] PDF 생성 오류: API 오류 시 `browser_snapshot()` → 에러 토스트 메시지 표시 확인
    - ### 콘솔 오류 확인
    - [x] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

- **Task 013: 핵심 기능 통합 테스트** -- 완료
  - ## 테스트 체크리스트
    - ### 발행자 여정 (Happy Path)
    - [x] 목록 → 상세: `browser_navigate` 목록 → `browser_click` 카드 → `browser_snapshot()` → 상세 페이지 데이터 확인
    - [x] URL 복사 → 공유: `browser_click({ref: 'URL 복사'})` → `browser_snapshot()` → 복사 완료 확인
    - [x] 전체 API 흐름: `browser_network_requests({includeStatic: false})` → 모든 노션 API 호출 정상 응답 확인
    - ### 클라이언트 여정 (Happy Path)
    - [x] 공유 URL 접근: `browser_navigate({url: '복사된 공유 URL'})` → `browser_snapshot()` → 견적서 상세 정상 표시 확인
    - [x] PDF 다운로드: `browser_click({ref: 'PDF 다운로드'})` → `browser_network_requests()` → PDF API 200 응답 확인
    - ### 에러 케이스 (Edge Case)
    - [x] 잘못된 URL: `browser_navigate({url: 'http://localhost:3000/invoices/invalid'})` → `browser_snapshot()` → not-found 페이지 표시 확인
    - [x] 반응형 모바일: `browser_resize({width: 375, height: 812})` → `browser_snapshot()` → 모바일 레이아웃 정상 표시 확인
    - ### 콘솔 오류 확인
    - [x] `browser_console_messages({level: 'error'})` 실행 후 전체 플로우에서 JavaScript 에러 없음 확인

---

### Phase 4: 고급 기능 및 최적화 -- 완료

> 성능 최적화, 캐싱 전략, 배포 파이프라인 구축

- **Task 014: 데이터 캐싱 및 성능 최적화 (F011)** -- 완료
  - [x] React `cache()`로 `getInvoice` / `getInvoices` 래핑 — 동일 렌더 사이클 중복 호출 제거
  - [x] `getInvoices()`에 `page_size: 100` 명시적 설정
  - [x] `src/app/page.tsx`에 `export const revalidate = 300` 적용 (ISR 5분)
  - [x] `src/app/invoices/[id]/page.tsx`에 `export const revalidate = 300` 적용
  - [x] `@next/bundle-analyzer` 설치 및 `next.config.ts` 설정
  - [x] `package.json`에 `analyze` 스크립트 추가 (`ANALYZE=true pnpm build`)
  - [x] PDF API Route 기존 타입 오류 수정 (Buffer → Uint8Array, unknown 경유 타입 단언)
  - [x] 빌드 검증 (`pnpm build`) — 타입 오류 없음 확인

- **Task 015: SEO 및 메타데이터 최적화** -- 완료
  - [x] Open Graph 메타데이터 설정 (견적서 공유 시 미리보기)
  - [x] 동적 OG 이미지 생성 고려 (Next.js `opengraph-image`)
  - [x] robots.txt 설정 (견적서 상세 페이지 검색엔진 인덱싱 방지)
  - [x] sitemap 설정

- **Task 016: Vercel 배포 및 프로덕션 설정** -- 완료
  - [x] Vercel 프로젝트 연결 및 환경변수 설정
  - [x] 프로덕션 빌드 검증 (`pnpm build` 에러 없음 확인)
  - [x] 환경별 설정 분리 (development, production)
  - [x] 에러 모니터링 설정 고려
  - [x] 커스텀 도메인 설정 (선택)

---

### Phase 5: MVP 이후 고려 기능 (현재 범위 외)

> MVP 완료 후 사용자 피드백에 따라 우선순위 결정

- **Task F01: 발행자 인증 및 견적서 목록 보호**
  - 로그인/로그아웃 기능
  - 견적서 목록 페이지 접근 제어

- **Task F02: 견적서 상태 변경 기능**
  - 노션 API 쓰기 연동
  - 상태 변경 UI (드롭다운 또는 버튼)

- **Task F03: 클라이언트 서명/승인 기능**
  - 전자 서명 또는 승인 버튼
  - 승인 상태 노션 DB 반영

- **Task F04: 이메일 자동 발송**
  - 견적서 URL 이메일 전송 기능

- **Task F05: 커스텀 브랜딩**
  - 로고, 색상 커스터마이징
  - 견적서 템플릿 관리

---

## 진행 현황 요약

| Phase | 상태 | 완료 Task | 전체 Task |
|-------|------|-----------|-----------|
| Phase 1: 애플리케이션 골격 구축 | 완료 | 5/5 | 5 |
| Phase 2: UI/UX 완성 | 완료 | 3/3 | 3 |
| Phase 3: 핵심 기능 구현 | 완료 | 5/5 | 5 |
| Phase 4: 고급 기능 및 최적화 | 완료 | 3/3 | 3 |
| **MVP 합계** | **완료** | **16/16** | **16** |

---

## 다음 작업 (Next Up)

**MVP 완료!** 모든 Phase 1~4 Task가 완료되었습니다.
이후 작업은 Phase 5 (MVP 이후 고려 기능)를 참고하세요.

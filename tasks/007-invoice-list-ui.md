# Task 007: 견적서 목록 페이지 UI 구현

## 목적

더미 데이터를 기반으로 견적서 목록 페이지의 전체 UI를 완성하고, 사용자 플로우를 검증한다.

## 관련 파일

- `src/app/page.tsx` — 서버 컴포넌트 (더미 데이터 사용)
- `src/components/invoice/InvoiceCard.tsx` — 신규 (견적서 카드)
- `src/components/invoice/InvoiceList.tsx` — 신규 (목록 래퍼)
- `src/components/invoice/InvoiceListSkeleton.tsx` — 신규 (로딩 스켈레톤)
- `src/components/invoice/EmptyState.tsx` — 신규 (빈 목록 상태)
- `src/lib/mock-data.ts` — 참조 (Task 006 산출물)
- `src/lib/utils.ts` — `formatCurrency`, `formatDate` 사용

## 수락 기준

- [ ] `InvoiceCard` 컴포넌트: 클라이언트명, 금액(KRW 포맷), 발행일, 상태 배지 표시
- [ ] 각 카드에 "견적서 보기" 버튼 (`/invoices/[id]` 링크)
- [ ] 각 카드에 "URL 복사" 버튼 (클립보드 복사 + 토스트 알림)
- [ ] 목록 그리드 레이아웃 (모바일 1열 / 태블릿 2열 / 데스크톱 3열)
- [ ] `EmptyState` — 데이터 없을 때 안내 UI
- [ ] `InvoiceListSkeleton` — 로딩 중 스켈레톤 UI (카드 6개)
- [ ] 더미 데이터 5개 카드 렌더링 확인

## 구현 단계

### 1. `src/components/invoice/InvoiceCard.tsx`

- shadcn `Card`, `Badge`, `Button` 사용
- URL 복사 버튼: `navigator.clipboard.writeText(url)` + `toast.success('URL이 복사되었습니다')`
- `'use client'` — onClick(복사) 핸들러 필요

```tsx
interface InvoiceCardProps {
  invoice: Invoice
}
```

카드 레이아웃:
```
┌─────────────────────────────┐
│ [상태 배지]                  │
│ 클라이언트명                  │
│ 견적서 제목                  │
│ 발행일                       │
│ ₩1,234,567                  │
│ [견적서 보기] [URL 복사]      │
└─────────────────────────────┘
```

### 2. `src/components/invoice/InvoiceListSkeleton.tsx`

- 카드 6개의 Skeleton UI
- shadcn `Skeleton` 컴포넌트 활용

### 3. `src/components/invoice/EmptyState.tsx`

- 아이콘 + "등록된 견적서가 없습니다" 안내 텍스트
- 서버 컴포넌트 (이벤트 핸들러 없음)

### 4. `src/app/page.tsx` 업데이트

- `MOCK_INVOICES` import하여 렌더링
- `InvoiceList`, `EmptyState` 조건부 렌더링
- Suspense 경계 준비 (Phase 3 연동 시 활용)

## 테스트 체크리스트

### 정상 케이스 (Happy Path)
- [ ] 목록 페이지 렌더링: `browser_navigate({url: 'http://localhost:3000'})` → `browser_snapshot()` → 더미 데이터 5개 카드 표시 확인
- [ ] URL 복사: `browser_click({ref: 'URL 복사 버튼'})` → `browser_snapshot()` → 토스트 메시지 "URL이 복사되었습니다" 확인
- [ ] 견적서 보기: `browser_click({ref: '견적서 보기 버튼'})` → `browser_snapshot()` → `/invoices/mock-001` 페이지로 이동 확인

### 에러 케이스 (Edge Case)
- [ ] Empty State: `MOCK_INVOICES` 빈 배열로 교체 후 `browser_snapshot()` → EmptyState UI 표시 확인

### 콘솔 오류 확인
- [ ] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

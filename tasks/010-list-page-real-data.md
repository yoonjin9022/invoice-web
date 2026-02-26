# Task 010: 견적서 목록 페이지 실제 데이터 연동

## 목적

`src/app/page.tsx`의 더미 데이터(MOCK_INVOICES)를 실제 `getInvoices()` 서버 호출로 교체하고,
로딩/에러 상태를 Suspense 기반으로 처리한다.

## 선행 조건

- Task 009 완료 (getInvoices() 구현)

## 관련 파일

- `src/app/page.tsx` — 서버 컴포넌트 fetch 교체
- `src/app/loading.tsx` — 신규: 루트 Suspense 로딩 UI (선택)
- `src/app/error.tsx` — 신규: 루트 에러 바운더리
- `src/components/invoice/InvoiceList.tsx` — 변경 없음 (props 그대로 수신)
- `src/components/invoice/InvoiceListSkeleton.tsx` — 로딩 UI로 재사용
- `src/lib/mock-data.ts` — import 제거

## 수락 기준

- [ ] `page.tsx`에서 `MOCK_INVOICES` import 제거, `getInvoices()` 서버 호출로 교체
- [ ] `loading.tsx` — `InvoiceListSkeleton` 표시 (Next.js 파일 기반 로딩)
- [ ] `error.tsx` — API 오류 시 에러 UI 표시 (F011)
- [ ] 빈 데이터베이스 시 `EmptyState` 표시 (InvoiceList 내부 처리)
- [ ] URL 복사 기능 정상 작동 (InvoiceCard 기존 구현 유지)

## 구현 단계

### 1. `src/app/page.tsx` 교체

```tsx
import { getInvoices } from '@/lib/notion'

export default async function HomePage() {
  const invoices = await getInvoices()   // 서버에서 직접 fetch
  return (
    ...
    <InvoiceList invoices={invoices} />
  )
}
```

### 2. `src/app/loading.tsx` 신규

```tsx
import { InvoiceListSkeleton } from '@/components/invoice/InvoiceListSkeleton'

export default function Loading() {
  return (
    <main className='container mx-auto max-w-5xl flex-1 px-4 py-8'>
      <div className='mb-8'>
        <Skeleton className='h-8 w-32' />
        <Skeleton className='mt-1 h-4 w-64' />
      </div>
      <InvoiceListSkeleton />
    </main>
  )
}
```

### 3. `src/app/error.tsx` 신규 (클라이언트 컴포넌트)

```tsx
'use client'
// 노션 API 오류 등 서버 에러 시 표시
export default function Error({ error, reset }) {
  return (
    <main>에러 UI + 재시도 버튼</main>
  )
}
```

## 테스트 체크리스트

### 정상 케이스 (Happy Path)
- [ ] 목록 페이지 로딩: `browser_navigate({url: 'http://localhost:3000'})` → `browser_snapshot()` → 실제 노션 DB 견적서 카드 목록 표시 확인
- [ ] URL 복사: `browser_click({ref: 'URL 복사 버튼'})` → `browser_snapshot()` → 복사 완료 토스트 메시지 확인
- [ ] 상세 페이지 이동: `browser_click({ref: '견적서 보기'})` → `browser_snapshot()` → 상세 페이지 URL 및 데이터 렌더링 확인

### 에러 케이스 (Edge Case)
- [ ] 빈 목록: 노션 DB가 비어있을 때 `browser_snapshot()` → EmptyState UI 표시 확인
- [ ] API 오류: 노션 API 실패 시 `browser_snapshot()` → 에러 UI 표시 확인

### 콘솔 오류 확인
- [ ] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

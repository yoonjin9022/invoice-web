# Task 011: 견적서 상세 페이지 실제 데이터 연동

## 목적

`src/app/invoices/[id]/page.tsx`의 더미 데이터(getMockInvoice)를 실제 `getInvoice(id)` 서버 호출로 교체하고,
로딩/에러/not-found 상태를 올바르게 처리한다.

## 선행 조건

- Task 009 완료 (getInvoice() 구현)

## 관련 파일

- `src/app/invoices/[id]/page.tsx` — 서버 컴포넌트 fetch 교체
- `src/app/invoices/[id]/loading.tsx` — 신규: 상세 페이지 로딩 UI
- `src/app/invoices/[id]/error.tsx` — 신규: 상세 페이지 에러 바운더리
- `src/components/invoice/InvoiceDetailSkeleton.tsx` — 로딩 UI로 재사용
- `src/lib/mock-data.ts` — import 제거

## 수락 기준

- [ ] `getMockInvoice(id)` → `getInvoice(id)` 교체
- [ ] `null` 반환 시 `notFound()` 호출 유지 (F012)
- [ ] `generateMetadata()` 에서 실제 견적서 제목 반영
- [ ] `loading.tsx` — `InvoiceDetailSkeleton` 표시
- [ ] `error.tsx` — API 오류 시 에러 UI 표시 (F011)

## 구현 단계

### 1. `src/app/invoices/[id]/page.tsx` 교체

```tsx
import { getInvoice } from '@/lib/notion'

export async function generateMetadata({ params }) {
  const { id } = await params
  const invoice = await getInvoice(id)
  return {
    title: invoice
      ? `${invoice.title} | 노션 인보이스 웹뷰어`
      : '견적서를 찾을 수 없습니다 | 노션 인보이스 웹뷰어',
  }
}

export default async function InvoiceDetailPage({ params }) {
  const { id } = await params
  const invoice = await getInvoice(id)
  if (!invoice) notFound()
  return <InvoiceDetail invoice={invoice} />
}
```

### 2. `src/app/invoices/[id]/loading.tsx` 신규

```tsx
import { InvoiceDetailSkeleton } from '@/components/invoice/InvoiceDetailSkeleton'

export default function Loading() {
  return (
    <main className='container mx-auto max-w-5xl flex-1 px-4 py-8'>
      <InvoiceDetailSkeleton />
    </main>
  )
}
```

### 3. `src/app/invoices/[id]/error.tsx` 신규

```tsx
'use client'
export default function Error({ error, reset }) {
  return <main>에러 UI + 재시도 버튼</main>
}
```

## 테스트 체크리스트

### 정상 케이스 (Happy Path)
- [ ] 상세 데이터 렌더링: `browser_navigate({url: 'http://localhost:3000/invoices/{실제ID}'})` → `browser_snapshot()` → 발행자/클라이언트 정보, 품목 테이블, 금액 요약 모두 표시 확인
- [ ] 메타데이터 확인: `browser_evaluate({function: '() => document.title'})` → 실제 견적서 제목이 탭 타이틀로 설정되었는지 확인
- [ ] 목록 이동: `browser_click({ref: '목록으로 돌아가기'})` → `browser_snapshot()` → 목록 페이지로 이동 확인

### 에러 케이스 (Edge Case)
- [ ] 잘못된 ID: `browser_navigate({url: 'http://localhost:3000/invoices/invalid-id'})` → `browser_snapshot()` → not-found 페이지 표시 확인

### 콘솔 오류 확인
- [ ] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

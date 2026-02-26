# Task 008: 견적서 상세 페이지 UI 구현

## 목적

더미 데이터를 기반으로 견적서 상세 페이지의 전문적인 인보이스 UI를 완성하고, 반응형 디자인 및 전체 레이아웃을 검증한다.

## 관련 파일

- `src/app/invoices/[id]/page.tsx` — 업데이트
- `src/components/invoice/InvoiceDetail.tsx` — 신규 (인보이스 메인 레이아웃)
- `src/components/invoice/InvoiceDetailSkeleton.tsx` — 신규 (로딩 스켈레톤)
- `src/lib/mock-data.ts` — `getMockInvoice(id)` 사용
- `src/lib/utils.ts` — `formatCurrency`, `formatDate` 사용

## 수락 기준

- [ ] 발행자 정보 섹션: 이름, 이메일
- [ ] 클라이언트 정보 섹션: 이름, 이메일
- [ ] 견적서 메타 정보: 제목, 상태 배지, 발행일, 유효기간
- [ ] 품목 테이블: 품목명, 설명, 수량, 단가, 금액 (shadcn Table 활용)
- [ ] 금액 요약 섹션: 소계, 세율(%), 세액, 최종 합계 (KRW 포맷)
- [ ] 비고 섹션 (notes 있을 때만 표시)
- [ ] PDF 다운로드 버튼 (비활성 상태 — 기능은 Task 012에서 구현)
- [ ] "목록으로 돌아가기" 버튼 (`/` 링크)
- [ ] `InvoiceDetailSkeleton` 로딩 UI
- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 더미 데이터 `mock-001` 로 레이아웃 검증

## 구현 단계

### 1. `src/components/invoice/InvoiceDetail.tsx`

서버 컴포넌트 (이벤트 핸들러 없음, PDF 버튼만 클라이언트).

레이아웃 구조:
```
┌─────────────────────────────────────────┐
│  견적서 제목              [상태 배지]    │
│  발행일: 2025년 01월 31일  유효기간: ... │
├──────────────────┬──────────────────────┤
│ [발행자]          │ [클라이언트]         │
│ 홍길동 프리랜서    │ 김민준               │
│ issuer@ex.com    │ client@ex.com        │
├──────────────────┴──────────────────────┤
│ 품목                 수량  단가    금액  │
│ ─────────────────────────────────────── │
│ 웹 개발               1  500,000  500,000│
│ 디자인 작업            2  200,000  400,000│
├─────────────────────────────────────────┤
│                        소계: ₩900,000   │
│                  세율(10%): ₩90,000     │
│                  최종 합계: ₩990,000    │
├─────────────────────────────────────────┤
│ 비고                                    │
│ ...                                     │
├─────────────────────────────────────────┤
│ [← 목록으로]              [PDF 다운로드] │
└─────────────────────────────────────────┘
```

- shadcn `Table`, `TableHeader`, `TableRow`, `TableCell` 활용
- 금액 우측 정렬
- `Badge` variant는 `INVOICE_STATUS_VARIANT[invoice.status]` 사용

### 2. PDF 다운로드 버튼 (임시)

```tsx
// Task 012 구현 전까지 비활성 상태로 배치
<Button disabled variant='outline'>
  PDF 다운로드 (준비 중)
</Button>
```

### 3. `src/components/invoice/InvoiceDetailSkeleton.tsx`

- 전체 레이아웃 구조와 동일한 Skeleton UI
- shadcn `Skeleton` 컴포넌트 활용

### 4. `src/app/invoices/[id]/page.tsx` 업데이트

- `getMockInvoice(id)` 호출
- `undefined` 이면 `notFound()` 호출 (F012 준비)
- `generateMetadata`에서 더미 데이터 제목 반영

```tsx
const invoice = getMockInvoice(id)
if (!invoice) notFound()
```

## 테스트 체크리스트

### 정상 케이스 (Happy Path)
- [ ] 상세 페이지 렌더링: `browser_navigate({url: 'http://localhost:3000/invoices/mock-001'})` → `browser_snapshot()` → 발행자/클라이언트 정보, 품목 테이블, 금액 요약 모두 표시 확인
- [ ] 메타데이터 확인: `browser_evaluate({function: '() => document.title'})` → 견적서 제목이 탭 타이틀에 포함되는지 확인
- [ ] 목록 이동: `browser_click({ref: '목록으로 돌아가기'})` → `browser_snapshot()` → 목록 페이지로 이동 확인
- [ ] 모바일 반응형: `browser_resize({width: 375, height: 812})` → `browser_snapshot()` → 모바일 레이아웃 정상 표시 확인

### 에러 케이스 (Edge Case)
- [ ] 잘못된 ID: `browser_navigate({url: 'http://localhost:3000/invoices/invalid-id'})` → `browser_snapshot()` → not-found 페이지 표시 확인

### 콘솔 오류 확인
- [ ] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

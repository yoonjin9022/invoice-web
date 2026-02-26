# Task 012: PDF 다운로드 기능 구현 (F004)

## 목적

견적서 상세 페이지에서 PDF 다운로드 버튼을 클릭하면 서버사이드에서 PDF를 생성하여
`invoice-{클라이언트명}-{발행일}.pdf` 파일명으로 다운로드한다.

## 선행 조건

- Task 010, 011 완료 (실제 데이터 연동)

## 관련 파일

- `src/components/pdf/InvoicePdf.tsx` — 신규: PDF 전용 레이아웃 컴포넌트
- `src/app/api/invoices/[id]/pdf/route.ts` — 신규: PDF 생성 API Route
- `src/components/invoice/PdfDownloadButton.tsx` — 신규: 다운로드 버튼 (클라이언트)
- `src/components/invoice/InvoiceDetail.tsx` — PDF 버튼 교체 (disabled → 실제 버튼)
- `public/fonts/` — 한글 폰트 파일 (Noto Sans KR 등)

## 수락 기준

- [ ] `@react-pdf/renderer` 패키지 설치
- [ ] `InvoicePdf.tsx` — 발행자/클라이언트/품목 테이블/금액 요약/비고 포함
- [ ] 한글 폰트 등록 (`Font.register()`)
- [ ] `GET /api/invoices/[id]/pdf` — PDF Buffer 생성 및 스트리밍 응답
- [ ] 응답 헤더: `Content-Type: application/pdf`, `Content-Disposition: attachment; filename=...`
- [ ] `PdfDownloadButton.tsx` — 다운로드 진행 상태 표시 (로딩 스피너)
- [ ] 다운로드 파일명: `invoice-{clientName}-{issuedAt}.pdf`
- [ ] `InvoiceDetail.tsx`에서 disabled 버튼 → `PdfDownloadButton` 교체

## 구현 단계

### 1. 패키지 설치
```bash
pnpm add @react-pdf/renderer
```

### 2. 한글 폰트 준비

`public/fonts/NotoSansKR-Regular.ttf` 다운로드 후:
```ts
Font.register({
  family: 'NotoSansKR',
  src: '/fonts/NotoSansKR-Regular.ttf',
})
```

### 3. `src/components/pdf/InvoicePdf.tsx`

`@react-pdf/renderer`의 Document/Page/View/Text/StyleSheet 사용:
```tsx
export function InvoicePdf({ invoice }: { invoice: Invoice }) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* 발행자 / 클라이언트 정보 */}
        {/* 품목 테이블 */}
        {/* 금액 요약 */}
        {/* 비고 */}
      </Page>
    </Document>
  )
}
```

### 4. `src/app/api/invoices/[id]/pdf/route.ts`

```ts
import { renderToBuffer } from '@react-pdf/renderer'
import { getInvoice } from '@/lib/notion'
import { InvoicePdf } from '@/components/pdf/InvoicePdf'
import { formatDate } from '@/lib/utils'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const invoice = await getInvoice(id)
  if (!invoice) return new Response('Not Found', { status: 404 })

  const buffer = await renderToBuffer(<InvoicePdf invoice={invoice} />)
  const filename = `invoice-${invoice.clientName}-${formatDate(invoice.issuedAt)}.pdf`

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  })
}
```

### 5. `src/components/invoice/PdfDownloadButton.tsx`

```tsx
'use client'
// 클릭 → fetch('/api/invoices/{id}/pdf') → Blob → a태그 다운로드
// 진행 중: 스피너 표시, 완료 후 버튼 정상 복귀
```

### 6. `InvoiceDetail.tsx` 수정

```tsx
// disabled 버튼 제거 → PdfDownloadButton 삽입
<PdfDownloadButton invoiceId={invoice.id} />
```

## 테스트 체크리스트

### 정상 케이스 (Happy Path)
- [ ] PDF 다운로드 버튼: `browser_click({ref: 'PDF 다운로드 버튼'})` → `browser_snapshot()` → 다운로드 진행 상태(로딩) 표시 확인
- [ ] API 응답 검증: `browser_network_requests({includeStatic: false})` → `/api/invoices/{id}/pdf` 200 응답 및 `Content-Type: application/pdf` 확인
- [ ] 다운로드 완료: `browser_snapshot()` → 버튼 상태 정상 복귀 확인

### 에러 케이스 (Edge Case)
- [ ] PDF 생성 오류: API 오류 시 `browser_snapshot()` → 에러 토스트 메시지 표시 확인

### 콘솔 오류 확인
- [ ] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

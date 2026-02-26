# Task 006: 더미 데이터 및 목업 유틸리티 작성

## 목적

Phase 2 UI 구현의 기반이 되는 개발용 더미 데이터와 포맷팅 유틸리티를 작성한다.

## 관련 파일

- `src/lib/mock-data.ts` — 신규 생성
- `src/lib/utils.ts` — 포맷팅 유틸리티 함수 추가
- `src/types/invoice.ts` — 참조 (수정 없음)

## 수락 기준

- [ ] 5개 이상의 더미 Invoice 데이터 (다양한 status 포함)
- [ ] InvoiceItem 품목 데이터 포함 (수량·단가 다양한 조합)
- [ ] `formatCurrency(amount, currency)` — KRW 통화 형식 포맷터
- [ ] `formatDate(date)` — 한국어 날짜 포맷터 (YYYY년 MM월 DD일)
- [ ] subtotal, taxAmount, totalAmount 계산이 정확히 일치

## 구현 단계

### 1. `src/lib/utils.ts` — 포맷팅 유틸리티 추가

```ts
// KRW 통화 형식: ₩1,234,567
export function formatCurrency(amount: number, currency = 'KRW'): string

// 한국어 날짜: 2025년 01월 31일
export function formatDate(date: Date): string
```

### 2. `src/lib/mock-data.ts` — 더미 데이터 생성

더미 데이터 요구사항:

| ID | status | clientName | items 수 |
|----|--------|------------|---------|
| mock-001 | draft | 김민준 | 2 |
| mock-002 | sent | (주)테크스타트업 | 3 |
| mock-003 | approved | 이서연 디자인 스튜디오 | 4 |
| mock-004 | completed | 박지호 | 2 |
| mock-005 | sent | 최유나 마케팅 | 3 |

- `issuerName`: '홍길동 프리랜서', `issuerEmail`: 'issuer@example.com'
- `taxRate`: 0.1 (10%)
- `currency`: 'KRW'
- `notionPageUrl`: `https://notion.so/{id}`

export 항목:
```ts
export const MOCK_INVOICES: Invoice[]
export function getMockInvoice(id: string): Invoice | undefined
```

## 참고 사항

- Phase 3 실제 연동 시 이 파일은 완전히 교체됨 (혼용 금지)
- `subtotal = items.map(i => i.amount).reduce(sum)` 로 정확히 계산
- `taxAmount = Math.round(subtotal * taxRate)`
- `totalAmount = subtotal + taxAmount`

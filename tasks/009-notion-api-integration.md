# Task 009: 노션 API 연동 및 데이터 조회 구현

## 목적

`src/lib/notion.ts`에 실제 노션 API 연동 코드를 구현하여 견적서 데이터를 실시간으로 조회한다.
Task 010, 011의 선행 작업.

## 관련 파일

- `src/lib/notion.ts` — 주 구현 파일 (현재 주석 처리된 코드 활성화 및 완성)
- `src/types/invoice.ts` — Invoice, InvoiceItem 타입 참조
- `.env.local` — NOTION_API_KEY, NOTION_DATABASE_ID 필요

## 노션 데이터베이스 스키마 매핑

| 노션 속성명 | 속성 타입 | Invoice 필드 |
|------------|----------|------------|
| 제목 (Title) | title | title |
| 상태 | select | status |
| 클라이언트명 | rich_text | clientName |
| 클라이언트 이메일 | email | clientEmail |
| 발행자명 | rich_text | issuerName |
| 발행자 이메일 | email | issuerEmail |
| 발행일 | date | issuedAt |
| 유효기간 | date | validUntil |
| 통화 | select | currency |
| 세율 | number | taxRate |
| 비고 | rich_text | notes |
| 품목 | (하위 블록 또는 관계형) | items |

> **품목 처리 전략**: 노션 DB 속성으로 품목 정보를 직접 저장하기 어려우므로,
> 각 페이지의 하위 블록(bulleted_list_item 또는 numbered_list_item)에서
> `품목명|수량|단가` 형식으로 파싱하거나, 별도 속성(JSON text)으로 저장하는 방식 사용.

## 수락 기준

- [ ] `pnpm add @notionhq/client` 설치 완료
- [ ] `notionClient` 싱글톤 인스턴스 초기화
- [ ] `validateEnvVariables()` 재사용 (기존 함수 유지)
- [ ] `getInvoices()` — 발행일 내림차순 정렬, Invoice[] 반환
- [ ] `getInvoice(pageId)` — 존재하지 않으면 null 반환 (F012)
- [ ] `mapNotionPageToInvoice()` — 노션 응답 → Invoice 타입 변환
- [ ] API 오류 시 에러 throw (빈 배열 반환 금지)
- [ ] TypeScript 타입 오류 없음 (`pnpm tsc --noEmit`)

## 구현 단계

### 1. 패키지 설치
```bash
pnpm add @notionhq/client
```

### 2. `src/lib/notion.ts` 구현

```ts
import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Invoice, InvoiceItem, InvoiceStatus } from '@/types/invoice'

// 노션 클라이언트 싱글톤
export const notionClient = new Client({
  auth: validateEnvVariables().apiKey,
})

// 견적서 목록 조회 (발행일 내림차순)
export async function getInvoices(): Promise<Invoice[]>

// 견적서 상세 조회 (없으면 null)
export async function getInvoice(pageId: string): Promise<Invoice | null>

// 노션 페이지 → Invoice 변환 (내부 함수)
function mapNotionPageToInvoice(page: PageObjectResponse): Invoice

// 속성 추출 헬퍼
function getText(prop): string
function getSelect(prop): string
function getEmail(prop): string | undefined
function getDate(prop): Date | undefined
function getNumber(prop): number
```

### 3. 품목(InvoiceItem) 처리

노션 페이지의 `blocks.children`에서 품목 파싱:
- 각 블록: `품목명 | 설명(선택) | 수량 | 단가` 형식의 paragraph/bulleted_list_item
- 파싱 실패 시 빈 배열 반환 (견적서 표시는 가능하게)

### 4. 금액 계산

```ts
const subtotal = items.reduce((sum, i) => sum + i.amount, 0)
const taxAmount = Math.round(subtotal * taxRate)
const totalAmount = subtotal + taxAmount
```

## 테스트 체크리스트

### 정상 케이스 (Happy Path)
- [ ] 목록 데이터 로딩: `browser_navigate({url: 'http://localhost:3000'})` → `browser_snapshot()` → 실제 노션 DB 데이터 카드 렌더링 확인
- [ ] API 응답 검증: `browser_network_requests({includeStatic: false})` → 노션 API 호출 상태 코드 확인
- [ ] 상세 데이터 조회: `browser_click({ref: '견적서 카드'})` → `browser_snapshot()` → 발행자/클라이언트/품목 테이블 표시 확인

### 에러 케이스 (Edge Case)
- [ ] 잘못된 ID 접근: `browser_navigate({url: 'http://localhost:3000/invoices/invalid-id'})` → `browser_snapshot()` → not-found 페이지 표시 확인
- [ ] API 오류 처리: 노션 API 키 오류 시 `browser_snapshot()` → 에러 메시지 UI 표시 확인

### 콘솔 오류 확인
- [ ] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

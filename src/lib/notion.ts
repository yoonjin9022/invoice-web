// 노션 클라이언트 설정 및 데이터 조회 함수 (F001, F010)
import { Client, APIErrorCode, isNotionClientError } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Invoice, InvoiceItem, InvoiceStatus } from '@/types/invoice'

// 환경변수 유효성 검사
function validateEnvVariables() {
  const apiKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!apiKey) {
    throw new Error('NOTION_API_KEY 환경변수가 설정되지 않았습니다.')
  }
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.')
  }

  return { apiKey, databaseId }
}

// 노션 클라이언트 싱글톤
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
})

// ─────────────────────────────────────────────────────────────────────────────
// 속성 추출 헬퍼 함수
// ─────────────────────────────────────────────────────────────────────────────

type NotionProperty = PageObjectResponse['properties'][string] | undefined

// Title 속성 → string
function getTitle(prop: NotionProperty): string {
  if (!prop || prop.type !== 'title') return ''
  return prop.title.map((t) => t.plain_text).join('')
}

// RichText 속성 → string
function getRichText(prop: NotionProperty): string {
  if (!prop || prop.type !== 'rich_text') return ''
  return prop.rich_text.map((t) => t.plain_text).join('')
}

// Select 속성 → InvoiceStatus (노션 한글 값 → 영문 타입)
function getStatus(prop: NotionProperty): InvoiceStatus {
  if (!prop || prop.type !== 'select' || !prop.select) return 'pending'

  const NOTION_STATUS_MAP: Record<string, InvoiceStatus> = {
    '대기': 'pending',
    '발송됨': 'sent',
    '승인됨': 'approved',
    '완료': 'completed',
  }

  return NOTION_STATUS_MAP[prop.select.name] ?? 'pending'
}

// Date 속성 → Date | undefined
function getDate(prop: NotionProperty): Date | undefined {
  if (!prop || prop.type !== 'date' || !prop.date) return undefined
  return new Date(prop.date.start)
}

// Number 속성 → number
function getNumber(prop: NotionProperty): number {
  if (!prop || prop.type !== 'number') return 0
  return prop.number ?? 0
}

// Formula / Rollup / Number 속성 → number (총 금액 처리)
function getAmount(prop: NotionProperty): number {
  if (!prop) return 0
  if (prop.type === 'number') return prop.number ?? 0

  if (prop.type === 'formula') {
    if (prop.formula.type === 'number') return prop.formula.number ?? 0
    return 0
  }

  if (prop.type === 'rollup') {
    if (prop.rollup.type === 'number') return prop.rollup.number ?? 0
    return 0
  }

  return 0
}

// Relation 속성 → 연관 페이지 ID 목록
function getRelationIds(prop: NotionProperty): string[] {
  if (!prop || prop.type !== 'relation') return []
  return prop.relation.map((r) => r.id)
}

// ─────────────────────────────────────────────────────────────────────────────
// 데이터 변환 함수
// ─────────────────────────────────────────────────────────────────────────────

// 노션 Items 페이지 → InvoiceItem 타입 변환
function mapNotionPageToInvoiceItem(
  page: PageObjectResponse,
  invoiceId: string
): InvoiceItem {
  const props = page.properties
  const quantity = getNumber(props['수량'])
  const unitPrice = getNumber(props['단가'])

  return {
    id: page.id,
    invoiceId,
    name: getTitle(props['항목명']),
    quantity,
    unitPrice,
    amount: getAmount(props['금액']) || quantity * unitPrice,
  }
}

// 노션 Invoices 페이지 + items → Invoice 타입 변환
function mapNotionPageToInvoice(
  page: PageObjectResponse,
  items: InvoiceItem[]
): Invoice {
  const props = page.properties

  return {
    id: page.id,
    title: getTitle(props['견적서 번호']),
    status: getStatus(props['상태']),
    clientName: getRichText(props['클라이언트명']),
    issuedAt: getDate(props['발행일']) ?? new Date(page.created_time),
    validUntil: getDate(props['유효기간']),
    items,
    totalAmount: getAmount(props['총 금액']),
    notes: getRichText(props['비고']) || undefined,
    notionPageUrl: page.url,
    createdAt: new Date(page.created_time),
    updatedAt: new Date(page.last_edited_time),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 품목 조회 함수
// ─────────────────────────────────────────────────────────────────────────────

// Items DB에서 견적서 품목 병렬 조회 - F001
async function getInvoiceItems(
  itemPageIds: string[],
  invoiceId: string
): Promise<InvoiceItem[]> {
  if (itemPageIds.length === 0) return []

  const itemPages = await Promise.all(
    itemPageIds.map((id) => notionClient.pages.retrieve({ page_id: id }))
  )

  return itemPages
    .filter((p): p is PageObjectResponse => p.object === 'page')
    .map((p) => mapNotionPageToInvoiceItem(p, invoiceId))
}

// ─────────────────────────────────────────────────────────────────────────────
// 공개 API 함수
// ─────────────────────────────────────────────────────────────────────────────

// 견적서 목록 조회 - F002
// items는 목록 UI에서 불필요하므로 빈 배열 반환 (API 호출 최소화)
export async function getInvoices(): Promise<Invoice[]> {
  const { databaseId } = validateEnvVariables()

  const response = await notionClient.databases.query({
    database_id: databaseId,
    sorts: [{ property: '발행일', direction: 'descending' }],
  })

  return response.results
    .filter((p): p is PageObjectResponse => p.object === 'page')
    .map((page) => mapNotionPageToInvoice(page, []))
}

// 견적서 상세 조회 - F003
// items를 포함한 완전한 데이터 반환
// 존재하지 않는 페이지 접근 시 null 반환 - F012
export async function getInvoice(pageId: string): Promise<Invoice | null> {
  try {
    const page = await notionClient.pages.retrieve({ page_id: pageId })

    if (page.object !== 'page') return null

    const typedPage = page as PageObjectResponse
    const itemIds = getRelationIds(typedPage.properties['항목'])
    const items = await getInvoiceItems(itemIds, pageId)

    return mapNotionPageToInvoice(typedPage, items)
  } catch (error) {
    // 존재하지 않거나 접근 불가 또는 잘못된 ID 형식 → null 반환 (F012)
    if (isNotionClientError(error)) {
      if (
        error.code === APIErrorCode.ObjectNotFound ||
        error.code === APIErrorCode.Unauthorized ||
        error.code === APIErrorCode.ValidationError ||
        error.code === APIErrorCode.InvalidRequestURL
      ) {
        return null
      }
    }
    // 기타 에러는 상위로 전파 (F011)
    throw error
  }
}

export { validateEnvVariables }

// 견적서 상태 타입 — 노션 DB Select 값 기준 ("대기" → 'pending')
export type InvoiceStatus = 'pending' | 'sent' | 'approved' | 'completed'

// 견적 품목 타입 — 노션 Items DB 컬럼: 항목명, 수량, 단가, 금액
export interface InvoiceItem {
  id: string
  // 소속 견적서 ID
  invoiceId: string
  // 품목명 (항목명)
  name: string
  // 수량
  quantity: number
  // 단가
  unitPrice: number
  // 품목 합계 (quantity × unitPrice)
  amount: number
}

// 견적서 타입 — 노션 Invoices DB 컬럼 기준
export interface Invoice {
  // 노션 페이지 ID (고유 식별자)
  id: string
  // 견적서 번호 (견적서 번호 속성, 예: INV-2025-001)
  title: string
  // 견적서 상태 (상태 Select)
  status: InvoiceStatus
  // 클라이언트명
  clientName: string
  // 발행일
  issuedAt: Date
  // 유효기간 (선택)
  validUntil?: Date
  // 견적 품목 목록 (Items DB relation)
  items: InvoiceItem[]
  // 총 금액 (노션 DB에서 직접 읽음, KRW)
  totalAmount: number
  // 비고 (선택)
  notes?: string
  // 노션 원본 페이지 URL
  notionPageUrl: string
  // 노션 페이지 생성일시
  createdAt: Date
  // 노션 페이지 최종 수정일시
  updatedAt: Date
}

// 노션 연동 설정 타입 (환경변수 참조용)
export interface NotionDatabaseConfig {
  // 노션 통합(Integration) API 키 - 환경변수: NOTION_API_KEY
  apiKey: string
  // 견적서 데이터베이스 ID - 환경변수: NOTION_DATABASE_ID
  databaseId: string
}

// 견적서 상태 레이블 매핑 — 노션 DB Korean Select 값 기준
export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  pending: '대기',
  sent: '발송됨',
  approved: '승인됨',
  completed: '완료',
}

// 견적서 상태 배지 색상 매핑 (shadcn/ui Badge variant 기준)
export const INVOICE_STATUS_VARIANT: Record<
  InvoiceStatus,
  'default' | 'secondary' | 'outline' | 'destructive'
> = {
  pending: 'secondary',
  sent: 'default',
  approved: 'default',
  completed: 'outline',
}

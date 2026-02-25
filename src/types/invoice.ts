// 견적서 상태 타입
export type InvoiceStatus = 'draft' | 'sent' | 'approved' | 'completed'

// 견적 품목 타입
export interface InvoiceItem {
  id: string
  // 소속 견적서 ID
  invoiceId: string
  // 품목명
  name: string
  // 품목 상세 설명 (선택)
  description?: string
  // 수량
  quantity: number
  // 단가
  unitPrice: number
  // 품목 합계 (quantity × unitPrice)
  amount: number
}

// 견적서 타입 (노션 데이터베이스에서 읽어온 데이터 구조)
export interface Invoice {
  // 노션 페이지 ID (고유 식별자)
  id: string
  // 견적서 제목
  title: string
  // 견적서 상태
  status: InvoiceStatus
  // 클라이언트(수신자) 이름 또는 회사명
  clientName: string
  // 클라이언트 이메일 (선택)
  clientEmail?: string
  // 발행자 이름 또는 회사명
  issuerName: string
  // 발행자 이메일 (선택)
  issuerEmail?: string
  // 발행일
  issuedAt: Date
  // 견적 유효기간 (선택)
  validUntil?: Date
  // 견적 품목 목록
  items: InvoiceItem[]
  // 소계 (세전 합산)
  subtotal: number
  // 세율 (예: 0.1 = 10%)
  taxRate: number
  // 세액
  taxAmount: number
  // 최종 합계 (세후)
  totalAmount: number
  // 통화 단위 (기본값: 'KRW')
  currency: string
  // 비고 사항 (선택)
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

// 견적서 상태 레이블 매핑
export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  draft: '초안',
  sent: '발송됨',
  approved: '승인됨',
  completed: '완료',
}

// 견적서 상태 배지 색상 매핑 (shadcn/ui Badge variant 기준)
export const INVOICE_STATUS_VARIANT: Record<
  InvoiceStatus,
  'default' | 'secondary' | 'outline' | 'destructive'
> = {
  draft: 'secondary',
  sent: 'default',
  approved: 'default',
  completed: 'outline',
}

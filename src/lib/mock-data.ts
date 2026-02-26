/**
 * Phase 2 UI 개발용 더미 데이터 — 실제 노션 DB 스키마 기준
 * Phase 3 실제 노션 API 연동 시 이 파일 전체를 교체 — 실제 데이터와 혼용 금지
 *
 * 노션 DB 컬럼: 견적서 번호(Title), 발행일, 상태, 유효기간, 총 금액, 클라이언트명, 항목(relation)
 * 노션 Items DB 컬럼: 항목명, Invoices(relation), 금액, 단가, 수량
 */

import type { Invoice } from '@/types/invoice'

export const MOCK_INVOICES: Invoice[] = [
  // mock-001: 대기 상태
  (() => {
    const items = [
      {
        id: 'item-001-1',
        invoiceId: 'mock-001',
        name: '웹사이트 기획 및 설계',
        quantity: 1,
        unitPrice: 800_000,
        amount: 800_000,
      },
      {
        id: 'item-001-2',
        invoiceId: 'mock-001',
        name: '프로토타입 제작',
        quantity: 1,
        unitPrice: 400_000,
        amount: 400_000,
      },
    ]
    return {
      id: 'mock-001',
      title: 'INV-2025-001',
      status: 'pending',
      clientName: '김민준',
      issuedAt: new Date('2025-01-10'),
      validUntil: new Date('2025-02-10'),
      items,
      totalAmount: items.reduce((sum, i) => sum + i.amount, 0),
      notes: '요구사항 확정 후 일정 재조율 예정입니다.',
      notionPageUrl: 'https://notion.so/mock-001',
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-10'),
    } satisfies Invoice
  })(),

  // mock-002: 발송됨 상태
  (() => {
    const items = [
      {
        id: 'item-002-1',
        invoiceId: 'mock-002',
        name: 'React 웹 앱 개발',
        quantity: 1,
        unitPrice: 3_000_000,
        amount: 3_000_000,
      },
      {
        id: 'item-002-2',
        invoiceId: 'mock-002',
        name: 'UI/UX 디자인',
        quantity: 1,
        unitPrice: 1_200_000,
        amount: 1_200_000,
      },
      {
        id: 'item-002-3',
        invoiceId: 'mock-002',
        name: 'QA 및 배포',
        quantity: 1,
        unitPrice: 300_000,
        amount: 300_000,
      },
    ]
    return {
      id: 'mock-002',
      title: 'INV-2025-002',
      status: 'sent',
      clientName: '(주)테크스타트업',
      issuedAt: new Date('2025-01-15'),
      validUntil: new Date('2025-02-15'),
      items,
      totalAmount: items.reduce((sum, i) => sum + i.amount, 0),
      notionPageUrl: 'https://notion.so/mock-002',
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-16'),
    } satisfies Invoice
  })(),

  // mock-003: 승인됨 상태
  (() => {
    const items = [
      {
        id: 'item-003-1',
        invoiceId: 'mock-003',
        name: '브랜드 로고 디자인',
        quantity: 1,
        unitPrice: 600_000,
        amount: 600_000,
      },
      {
        id: 'item-003-2',
        invoiceId: 'mock-003',
        name: '명함 디자인',
        quantity: 2,
        unitPrice: 150_000,
        amount: 300_000,
      },
      {
        id: 'item-003-3',
        invoiceId: 'mock-003',
        name: '소셜 미디어 템플릿',
        quantity: 1,
        unitPrice: 400_000,
        amount: 400_000,
      },
      {
        id: 'item-003-4',
        invoiceId: 'mock-003',
        name: '브랜드 가이드라인 문서',
        quantity: 1,
        unitPrice: 250_000,
        amount: 250_000,
      },
    ]
    return {
      id: 'mock-003',
      title: 'INV-2025-003',
      status: 'approved',
      clientName: '이서연 디자인 스튜디오',
      issuedAt: new Date('2025-01-20'),
      validUntil: new Date('2025-02-20'),
      items,
      totalAmount: items.reduce((sum, i) => sum + i.amount, 0),
      notes: '계약금 50% 선입금 후 작업 시작 예정입니다.',
      notionPageUrl: 'https://notion.so/mock-003',
      createdAt: new Date('2025-01-20'),
      updatedAt: new Date('2025-01-22'),
    } satisfies Invoice
  })(),

  // mock-004: 완료 상태
  (() => {
    const items = [
      {
        id: 'item-004-1',
        invoiceId: 'mock-004',
        name: '쇼핑몰 랜딩페이지 개발',
        quantity: 1,
        unitPrice: 1_500_000,
        amount: 1_500_000,
      },
      {
        id: 'item-004-2',
        invoiceId: 'mock-004',
        name: '유지보수 (1개월)',
        quantity: 1,
        unitPrice: 200_000,
        amount: 200_000,
      },
    ]
    return {
      id: 'mock-004',
      title: 'INV-2024-012',
      status: 'completed',
      clientName: '박지호',
      issuedAt: new Date('2024-12-01'),
      items,
      totalAmount: items.reduce((sum, i) => sum + i.amount, 0),
      notes: '프로젝트 완료 후 잔금 정산되었습니다. 감사합니다.',
      notionPageUrl: 'https://notion.so/mock-004',
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2025-01-05'),
    } satisfies Invoice
  })(),

  // mock-005: 발송됨 상태
  (() => {
    const items = [
      {
        id: 'item-005-1',
        invoiceId: 'mock-005',
        name: 'SNS 콘텐츠 기획',
        quantity: 1,
        unitPrice: 500_000,
        amount: 500_000,
      },
      {
        id: 'item-005-2',
        invoiceId: 'mock-005',
        name: '카드뉴스 제작',
        quantity: 2,
        unitPrice: 300_000,
        amount: 600_000,
      },
      {
        id: 'item-005-3',
        invoiceId: 'mock-005',
        name: '광고 소재 디자인',
        quantity: 5,
        unitPrice: 80_000,
        amount: 400_000,
      },
    ]
    return {
      id: 'mock-005',
      title: 'INV-2025-005',
      status: 'sent',
      clientName: '최유나 마케팅',
      issuedAt: new Date('2025-01-25'),
      validUntil: new Date('2025-02-25'),
      items,
      totalAmount: items.reduce((sum, i) => sum + i.amount, 0),
      notionPageUrl: 'https://notion.so/mock-005',
      createdAt: new Date('2025-01-25'),
      updatedAt: new Date('2025-01-25'),
    } satisfies Invoice
  })(),
]

// ID로 특정 더미 견적서 조회
export function getMockInvoice(id: string): Invoice | undefined {
  return MOCK_INVOICES.find((invoice) => invoice.id === id)
}

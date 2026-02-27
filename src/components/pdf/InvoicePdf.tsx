// PDF 전용 인보이스 레이아웃 컴포넌트 — @react-pdf/renderer 기반 (F004)
// 이 파일은 서버(API Route)에서만 import됩니다.
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type { Invoice } from '@/types/invoice'
import { INVOICE_STATUS_LABEL } from '@/types/invoice'

// 한글 폰트 등록 — 서버 파일 시스템 절대 경로 사용
Font.register({
  family: 'NotoSansKR',
  src: process.cwd() + '/public/fonts/NotoSansKR-Regular.ttf',
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansKR',
    fontSize: 10,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: '#ffffff',
    color: '#111111',
  },

  // 헤더 영역
  header: {
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    fontSize: 9,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },

  // 날짜 정보
  dateRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  dateText: {
    fontSize: 9,
    color: '#666666',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    marginBottom: 20,
  },

  // 클라이언트 정보
  sectionLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  clientName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  // 품목 테이블
  tableContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  colName: { flex: 3 },
  colQty: { flex: 1, textAlign: 'right' },
  colPrice: { flex: 2, textAlign: 'right' },
  colAmount: { flex: 2, textAlign: 'right' },
  headerText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#555555',
  },
  cellText: {
    fontSize: 9,
  },

  // 합계
  totalContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 11,
    fontWeight: 'bold',
  },

  // 비고
  notesTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 9,
    color: '#555555',
    lineHeight: 1.6,
  },
})

// 금액 포맷 (KRW)
function formatCurrency(amount: number): string {
  return `₩${amount.toLocaleString('ko-KR')}`
}

// 날짜 포맷
function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

interface InvoicePdfProps {
  invoice: Invoice
}

export function InvoicePdf({ invoice }: InvoicePdfProps) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* 헤더: 제목 + 상태 */}
        <View style={styles.header}>
          <Text style={styles.title}>{invoice.title}</Text>
          <Text style={styles.statusBadge}>
            {INVOICE_STATUS_LABEL[invoice.status]}
          </Text>
        </View>

        {/* 날짜 정보 */}
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>
            발행일: {formatDate(invoice.issuedAt)}
          </Text>
          {invoice.validUntil && (
            <Text style={styles.dateText}>
              유효기간: {formatDate(invoice.validUntil)}
            </Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* 클라이언트 정보 */}
        <Text style={styles.sectionLabel}>클라이언트</Text>
        <Text style={styles.clientName}>{invoice.clientName}</Text>

        <View style={styles.divider} />

        {/* 품목 테이블 */}
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>견적 품목</Text>

          {/* 테이블 헤더 */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.colName]}>품목명</Text>
            <Text style={[styles.headerText, styles.colQty]}>수량</Text>
            <Text style={[styles.headerText, styles.colPrice]}>단가</Text>
            <Text style={[styles.headerText, styles.colAmount]}>금액</Text>
          </View>

          {/* 테이블 행 */}
          {invoice.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={[styles.cellText, styles.colName]}>{item.name}</Text>
              <Text style={[styles.cellText, styles.colQty]}>
                {item.quantity}
              </Text>
              <Text style={[styles.cellText, styles.colPrice]}>
                {formatCurrency(item.unitPrice)}
              </Text>
              <Text style={[styles.cellText, styles.colAmount]}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))}
        </View>

        {/* 합계 */}
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>합계</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(invoice.totalAmount)}
            </Text>
          </View>
        </View>

        {/* 비고 */}
        {invoice.notes && (
          <>
            <View style={styles.divider} />
            <Text style={styles.notesTitle}>비고</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </>
        )}
      </Page>
    </Document>
  )
}

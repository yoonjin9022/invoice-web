import type { Invoice } from '@/types/invoice'
import { InvoiceCard } from './InvoiceCard'
import { EmptyState } from './EmptyState'

interface InvoiceListProps {
  invoices: Invoice[]
}

// 견적서 목록 그리드 (모바일 1열 / 태블릿 2열 / 데스크톱 3열)
export function InvoiceList({ invoices }: InvoiceListProps) {
  if (invoices.length === 0) {
    return <EmptyState />
  }

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </div>
  )
}

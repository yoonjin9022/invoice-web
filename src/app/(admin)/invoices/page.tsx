import type { Metadata } from 'next'
import { InvoiceList } from '@/components/invoice/InvoiceList'
import { getInvoices } from '@/lib/notion'

// 5분 ISR 캐싱 — 노션 데이터 업데이트 최대 반영 지연: 300초
export const revalidate = 300

export const metadata: Metadata = {
  title: '견적서 목록',
}

// 견적서 목록 페이지 (관리자 레이아웃 하위) — F001, F002, F011
export default async function InvoicesPage() {
  const invoices = await getInvoices()

  return (
    <div className='container mx-auto max-w-5xl px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>견적서 목록</h1>
        <p className='mt-1 text-sm text-muted-foreground'>
          노션 데이터베이스에 등록된 견적서를 확인하세요.
        </p>
      </div>

      <InvoiceList invoices={invoices} />
    </div>
  )
}

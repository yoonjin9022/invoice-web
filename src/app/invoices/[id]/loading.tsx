import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { InvoiceDetailSkeleton } from '@/components/invoice/InvoiceDetailSkeleton'

// 상세 페이지 로딩 상태 (Next.js 파일 기반 로딩 UI)
export default function Loading() {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />

      <main className='container mx-auto max-w-5xl flex-1 px-4 py-8'>
        <InvoiceDetailSkeleton />
      </main>

      <Footer />
    </div>
  )
}

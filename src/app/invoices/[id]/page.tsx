import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { InvoiceDetail } from '@/components/invoice/InvoiceDetail'
import { getInvoice } from '@/lib/notion'

// 견적서 상세 페이지 파라미터 타입
interface InvoiceDetailPageProps {
  params: Promise<{ id: string }>
}

// 동적 메타데이터 생성 — 견적서 제목 반영
export async function generateMetadata(
  { params }: InvoiceDetailPageProps
): Promise<Metadata> {
  const { id } = await params
  const invoice = await getInvoice(id)

  return {
    title: invoice
      ? `${invoice.title} | 노션 인보이스 웹뷰어`
      : '견적서를 찾을 수 없습니다 | 노션 인보이스 웹뷰어',
    description: '견적서 상세 내용을 확인하고 PDF로 다운로드할 수 있습니다.',
  }
}

// 견적서 상세 페이지 (클라이언트 공유 URL) - F001, F003, F004, F011, F012
export default async function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  const { id } = await params

  const invoice = await getInvoice(id)
  if (!invoice) notFound()

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />

      <main className='container mx-auto max-w-5xl flex-1 px-4 py-8'>
        <InvoiceDetail invoice={invoice} />
      </main>

      <Footer />
    </div>
  )
}

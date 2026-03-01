import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { InvoiceDetail } from '@/components/invoice/InvoiceDetail'
import { getInvoice } from '@/lib/notion'

// 5분 ISR 캐싱 — 노션 데이터 업데이트 최대 반영 지연: 300초
export const revalidate = 300

// 견적서 상세 페이지 파라미터 타입
interface InvoiceDetailPageProps {
  params: Promise<{ id: string }>
}

// 동적 메타데이터 생성 — 견적서 제목 + OG + noindex
export async function generateMetadata(
  { params }: InvoiceDetailPageProps
): Promise<Metadata> {
  const { id } = await params
  const invoice = await getInvoice(id)

  const title = invoice
    ? invoice.title
    : '견적서를 찾을 수 없습니다'
  const description = invoice
    ? `${invoice.clientName} 견적서 — ${invoice.title}`
    : '요청하신 견적서를 찾을 수 없습니다.'

  return {
    title,
    description,
    // 견적서 상세 페이지는 검색엔진 인덱싱 방지 (클라이언트 전용 URL)
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description,
      type: 'article',
    },
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

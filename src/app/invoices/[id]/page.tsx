import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// 견적서 상세 페이지 파라미터 타입
interface InvoiceDetailPageProps {
  params: Promise<{ id: string }>
}

// 동적 메타데이터 생성
export async function generateMetadata(
  { params }: InvoiceDetailPageProps
): Promise<Metadata> {
  const { id } = await params
  return {
    title: `견적서 ${id} | 노션 인보이스 웹뷰어`,
    description: '견적서 상세 내용을 확인하고 PDF로 다운로드할 수 있습니다.',
  }
}

// 견적서 상세 페이지 (클라이언트 공유 URL) - F001, F003, F004, F011, F012
export default async function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  const { id } = await params

  // TODO: 노션 API 연동 후 실제 데이터 조회로 교체
  // const invoice = await getInvoice(id)
  // if (!invoice) notFound()

  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />

      <main className='container mx-auto max-w-5xl flex-1 px-4 py-8'>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>견적서 상세</h1>
            <p className='mt-1 text-sm text-muted-foreground'>
              노션 페이지 ID: {id}
            </p>
          </div>
          {/* TODO: PDF 다운로드 버튼 (F004) */}
        </div>

        {/* TODO: 노션 API 연동 후 견적서 상세 컴포넌트로 교체 */}
        <div className='flex h-96 items-center justify-center rounded-lg border border-dashed'>
          <p className='text-muted-foreground'>
            노션 API 설정 후 견적서 내용이 표시됩니다.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

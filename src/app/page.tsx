import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// 견적서 목록 페이지 (발행자용 대시보드) - F001, F002, F011
export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />

      <main className='container mx-auto max-w-5xl flex-1 px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold'>견적서 목록</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            노션 데이터베이스에 등록된 견적서를 확인하세요.
          </p>
        </div>

        {/* TODO: 노션 API 연동 후 견적서 목록 컴포넌트로 교체 */}
        <div className='flex h-64 items-center justify-center rounded-lg border border-dashed'>
          <p className='text-muted-foreground'>
            노션 API 설정 후 견적서 목록이 표시됩니다.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

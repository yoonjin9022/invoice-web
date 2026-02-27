'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

// 목록 페이지 에러 바운더리 (F011)
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />

      <main className='container mx-auto max-w-5xl flex-1 px-4 py-8'>
        <div className='flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-16 text-center'>
          <AlertCircle className='mb-4 h-10 w-10 text-destructive' />
          <h2 className='text-lg font-semibold'>데이터를 불러오지 못했습니다</h2>
          <p className='mt-2 max-w-sm text-sm text-muted-foreground'>
            {error.message || '노션 API 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'}
          </p>
          <Button className='mt-6' variant='outline' onClick={reset}>
            다시 시도
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

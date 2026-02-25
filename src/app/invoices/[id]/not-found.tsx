import Link from 'next/link'
import { FileX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// 견적서를 찾을 수 없을 때 표시되는 페이지 - F012
export default function InvoiceNotFound() {
  return (
    <div className='flex min-h-screen flex-col bg-background'>
      <Header />

      <main className='container mx-auto max-w-5xl flex-1 px-4 py-8'>
        <div className='flex flex-col items-center justify-center py-24 text-center'>
          <FileX className='mb-4 h-12 w-12 text-muted-foreground' />
          <h1 className='mb-2 text-2xl font-bold'>견적서를 찾을 수 없습니다</h1>
          <p className='mb-8 max-w-sm text-muted-foreground'>
            요청하신 견적서가 존재하지 않거나 삭제되었습니다.
            URL을 다시 확인하거나 발행자에게 문의해 주세요.
          </p>
          <Button asChild>
            <Link href='/'>목록으로 돌아가기</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

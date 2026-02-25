import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

// 인보이스 앱 공통 헤더
export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60'>
      <div className='container mx-auto flex h-14 max-w-5xl items-center px-4'>
        {/* 로고 */}
        <Link href='/' className='flex items-center gap-2 font-semibold'>
          <FileText className='h-5 w-5 text-primary' />
          <span>인보이스 뷰어</span>
        </Link>
      </div>
      <Separator />
    </header>
  )
}

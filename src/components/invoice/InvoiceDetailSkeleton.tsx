import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

// 견적서 상세 페이지 로딩 스켈레톤
export function InvoiceDetailSkeleton() {
  return (
    <div className='rounded-lg border bg-card p-6 shadow-sm md:p-10'>
      {/* 헤더: 제목 + 배지 */}
      <div className='mb-6 flex items-start justify-between gap-4'>
        <div className='flex-1'>
          <Skeleton className='mb-2 h-8 w-2/3' />
          <Skeleton className='h-4 w-48' />
        </div>
        <Skeleton className='h-6 w-20 rounded-full' />
      </div>

      <Separator className='mb-8' />

      {/* 발행자 / 클라이언트 정보 */}
      <div className='mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2'>
        <div>
          <Skeleton className='mb-2 h-4 w-16' />
          <Skeleton className='mb-1 h-5 w-32' />
          <Skeleton className='h-4 w-40' />
        </div>
        <div className='sm:text-right'>
          <Skeleton className='mb-2 ml-auto h-4 w-16' />
          <Skeleton className='mb-1 ml-auto h-5 w-32' />
          <Skeleton className='ml-auto h-4 w-40' />
        </div>
      </div>

      <Separator className='mb-8' />

      {/* 품목 테이블 */}
      <div className='mb-8'>
        <Skeleton className='mb-4 h-5 w-24' />
        <div className='space-y-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex gap-4'>
              <Skeleton className='h-4 flex-1' />
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-24' />
            </div>
          ))}
        </div>
      </div>

      {/* 금액 요약 */}
      <div className='mb-8 flex justify-end'>
        <div className='w-full max-w-xs space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-6 w-full' />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className='flex justify-between'>
        <Skeleton className='h-9 w-32' />
        <Skeleton className='h-9 w-32' />
      </div>
    </div>
  )
}

import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

// 견적서 카드 하나의 스켈레톤
function InvoiceCardSkeleton() {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <Skeleton className='mb-2 h-5 w-16' />
        <Skeleton className='h-6 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </CardHeader>
      <CardContent className='pb-3'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='mt-2 h-7 w-32' />
      </CardContent>
      <CardFooter className='gap-2'>
        <Skeleton className='h-9 flex-1' />
        <Skeleton className='h-9 w-24' />
      </CardFooter>
    </Card>
  )
}

// 목록 로딩 중 카드 6개 스켈레톤
export function InvoiceListSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, i) => (
        <InvoiceCardSkeleton key={i} />
      ))}
    </div>
  )
}

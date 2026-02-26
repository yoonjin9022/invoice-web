import { FileX2 } from 'lucide-react'

// 견적서 목록이 비어있을 때 표시하는 안내 UI
export function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg border border-dashed py-20 text-center'>
      <FileX2 className='mb-4 h-12 w-12 text-muted-foreground' />
      <h3 className='mb-1 text-lg font-semibold'>등록된 견적서가 없습니다</h3>
      <p className='text-sm text-muted-foreground'>
        노션 데이터베이스에 견적서를 추가하면 여기에 표시됩니다.
      </p>
    </div>
  )
}

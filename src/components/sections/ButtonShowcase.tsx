import { Download, Mail, Trash2, Plus, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function ButtonShowcase() {
  return (
    <section id='buttons' className='py-12'>
      <h2 className='mb-2 text-2xl font-bold'>Button</h2>
      <p className='mb-8 text-muted-foreground'>
        다양한 variant, size, 아이콘, 상태 조합을 지원합니다.
      </p>

      <div className='space-y-8'>
        {/* Variants */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Variants
          </h3>
          <div className='flex flex-wrap gap-3'>
            <Button variant='default'>Default</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='link'>Link</Button>
            <Button variant='destructive'>Destructive</Button>
          </div>
        </div>

        <Separator />

        {/* Sizes */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Sizes
          </h3>
          <div className='flex flex-wrap items-center gap-3'>
            <Button size='lg'>Large</Button>
            <Button size='default'>Default</Button>
            <Button size='sm'>Small</Button>
            <Button size='icon'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Icons */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Icons
          </h3>
          <div className='flex flex-wrap gap-3'>
            <Button>
              <Mail className='mr-2 h-4 w-4' />
              이메일 보내기
            </Button>
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              다운로드
            </Button>
            <Button variant='secondary'>
              다음으로
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
            <Button variant='destructive'>
              <Trash2 className='mr-2 h-4 w-4' />
              삭제
            </Button>
          </div>
        </div>

        <Separator />

        {/* States */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            States
          </h3>
          <div className='flex flex-wrap gap-3'>
            <Button disabled>비활성화</Button>
            <Button disabled variant='outline'>
              비활성화 Outline
            </Button>
            <Button disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              로딩 중...
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

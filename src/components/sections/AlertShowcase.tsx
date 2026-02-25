'use client'

import { toast } from 'sonner'
import { Terminal, AlertCircle, CheckCircle2, Bell } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function AlertShowcase() {
  return (
    <section id='alerts' className='py-12'>
      <h2 className='mb-2 text-2xl font-bold'>Alert & Toast</h2>
      <p className='mb-8 text-muted-foreground'>
        Alert 컴포넌트와 Sonner Toast 알림을 보여줍니다.
      </p>

      <div className='space-y-8'>
        {/* Alert 컴포넌트 */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Alert 컴포넌트
          </h3>
          <div className='space-y-3'>
            <Alert>
              <Terminal className='h-4 w-4' />
              <AlertTitle>기본 알림</AlertTitle>
              <AlertDescription>
                CLI 명령어를 실행하면 환경 변수가 자동으로 로드됩니다.
              </AlertDescription>
            </Alert>

            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>오류 발생</AlertTitle>
              <AlertDescription>
                세션이 만료되었습니다. 다시 로그인해주세요.
              </AlertDescription>
            </Alert>

            <Alert className='border-green-500/50 text-green-700 dark:border-green-500/30 dark:text-green-400'>
              <CheckCircle2 className='h-4 w-4 !text-green-600 dark:!text-green-400' />
              <AlertTitle>성공</AlertTitle>
              <AlertDescription>
                변경사항이 성공적으로 저장되었습니다.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <Separator />

        {/* Toast 트리거 */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            Toast (Sonner) - 버튼 클릭으로 확인
          </h3>
          <div className='flex flex-wrap gap-3'>
            <Button
              variant='outline'
              onClick={() => toast('기본 알림 메시지입니다.')}
            >
              <Bell className='mr-2 h-4 w-4' />
              기본 Toast
            </Button>

            <Button
              variant='outline'
              onClick={() =>
                toast.success('저장 완료!', {
                  description: '변경사항이 성공적으로 저장되었습니다.',
                })
              }
            >
              <CheckCircle2 className='mr-2 h-4 w-4 text-green-600' />
              성공 Toast
            </Button>

            <Button
              variant='outline'
              onClick={() =>
                toast.error('오류 발생', {
                  description: '요청을 처리하는 중 문제가 발생했습니다.',
                })
              }
            >
              <AlertCircle className='mr-2 h-4 w-4 text-destructive' />
              오류 Toast
            </Button>

            <Button
              variant='outline'
              onClick={() => {
                const promise = new Promise((resolve) =>
                  setTimeout(resolve, 2000)
                )
                toast.promise(promise, {
                  loading: '처리 중...',
                  success: '완료되었습니다!',
                  error: '오류가 발생했습니다.',
                })
              }}
            >
              Promise Toast
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

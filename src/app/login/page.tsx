'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginAction, type LoginState } from './actions'

// 로그인 버튼 (useFormStatus 사용을 위해 별도 컴포넌트)
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' className='w-full' disabled={pending}>
      {pending ? '로그인 중...' : '로그인'}
    </Button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useActionState<LoginState | null, FormData>(loginAction, null)

  return (
    <div className='flex min-h-screen items-center justify-center bg-background px-4'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='space-y-1 text-center'>
          {/* 로고 */}
          <div className='mb-2 flex justify-center'>
            <div className='flex h-10 w-10 items-center justify-center rounded-md bg-primary'>
              <FileText className='h-5 w-5 text-primary-foreground' />
            </div>
          </div>
          <CardTitle className='text-xl'>관리자 로그인</CardTitle>
          <CardDescription>비밀번호를 입력하여 관리자 페이지에 접근하세요</CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='password'>비밀번호</Label>
              <Input
                id='password'
                name='password'
                type='password'
                placeholder='비밀번호 입력'
                autoComplete='current-password'
                autoFocus
                required
              />
            </div>

            {/* 에러 메시지 */}
            {state?.error && (
              <p className='text-sm text-destructive'>{state.error}</p>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

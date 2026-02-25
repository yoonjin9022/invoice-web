'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function FormShowcase() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section id='forms' className='py-12'>
      <h2 className='mb-2 text-2xl font-bold'>Form</h2>
      <p className='mb-8 text-muted-foreground'>
        로그인 폼, 설정 폼 등 다양한 폼 패턴을 보여줍니다.
      </p>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* 로그인 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>계정 정보를 입력하여 로그인하세요.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>이메일</Label>
              <Input
                id='email'
                type='email'
                placeholder='name@example.com'
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>비밀번호</Label>
                <Button variant='link' size='sm' className='h-auto p-0 text-xs'>
                  비밀번호 찾기
                </Button>
              </div>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute right-0 top-0 h-full px-3 hover:bg-transparent'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4 text-muted-foreground' />
                  ) : (
                    <Eye className='h-4 w-4 text-muted-foreground' />
                  )}
                </Button>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Checkbox id='remember' />
              <Label htmlFor='remember' className='text-sm font-normal cursor-pointer'>
                로그인 상태 유지
              </Label>
            </div>
            <Button className='w-full'>로그인</Button>
            <Separator />
            <p className='text-center text-sm text-muted-foreground'>
              계정이 없으신가요?{' '}
              <Button variant='link' size='sm' className='h-auto p-0'>
                회원가입
              </Button>
            </p>
          </CardContent>
        </Card>

        {/* 설정 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>프로필 설정</CardTitle>
            <CardDescription>프로필 정보를 업데이트하세요.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-2'>
                <Label htmlFor='first-name'>성</Label>
                <Input id='first-name' placeholder='홍' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='last-name'>이름</Label>
                <Input id='last-name' placeholder='길동' />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='role'>직군</Label>
              <Select>
                <SelectTrigger id='role'>
                  <SelectValue placeholder='직군을 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='frontend'>프론트엔드</SelectItem>
                  <SelectItem value='backend'>백엔드</SelectItem>
                  <SelectItem value='fullstack'>풀스택</SelectItem>
                  <SelectItem value='design'>디자인</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='bio'>자기소개</Label>
              <Textarea
                id='bio'
                placeholder='간단한 자기소개를 입력하세요...'
                rows={3}
              />
            </div>
            <div className='flex items-center justify-between rounded-lg border p-3'>
              <div>
                <p className='text-sm font-medium'>이메일 알림</p>
                <p className='text-xs text-muted-foreground'>새 활동 알림을 받습니다</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className='w-full'>변경사항 저장</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, FileText, LayoutDashboard, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/app/login/actions'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
  { href: '/invoices', icon: FileText, label: '견적서 목록' },
]

// 관리자 헤더 (모바일 햄버거 메뉴 + ThemeToggle 포함)
export function AdminHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className='flex h-14 flex-shrink-0 items-center border-b bg-background px-4 md:px-6'>
      {/* 모바일 햄버거 메뉴 */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon' className='mr-2 md:hidden' aria-label='메뉴 열기'>
            <Menu className='h-5 w-5' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-60 p-0'>
          <SheetHeader className='flex h-14 items-center border-b px-6 py-0'>
            <SheetTitle asChild>
              <Link
                href='/dashboard'
                className='flex items-center gap-2 font-semibold'
                onClick={() => setOpen(false)}
              >
                <FileText className='h-5 w-5 text-primary' />
                <span>인보이스 뷰어</span>
              </Link>
            </SheetTitle>
            <SheetDescription className='sr-only'>관리자 네비게이션 메뉴</SheetDescription>
          </SheetHeader>

          {/* 모바일 사이드바 네비게이션 */}
          <nav className='space-y-1 px-3 py-4'>
            {menuItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  pathname === href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className='h-4 w-4' />
                {label}
              </Link>
            ))}

            {/* 설정 메뉴 (비활성) */}
            <div className='flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground/40'>
              <Settings className='h-4 w-4' />
              설정
            </div>
          </nav>

          {/* 로그아웃 버튼 */}
          <div className='border-t px-3 py-4'>
            <form action={logoutAction}>
              <Button
                variant='ghost'
                type='submit'
                className='w-full justify-start text-muted-foreground hover:text-foreground'
                onClick={() => setOpen(false)}
              >
                <LogOut className='mr-2 h-4 w-4' />
                로그아웃
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>

      {/* 모바일 로고 */}
      <Link href='/dashboard' className='flex items-center gap-2 font-semibold md:hidden'>
        <FileText className='h-5 w-5 text-primary' />
        <span>인보이스 뷰어</span>
      </Link>

      {/* 우측 액션 영역 */}
      <div className='ml-auto flex items-center gap-2'>
        <ThemeToggle />
      </div>
    </header>
  )
}

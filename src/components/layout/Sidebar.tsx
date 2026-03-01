'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FileText, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

// 사이드바 메뉴 항목 정의
const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
  { href: '/invoices', icon: FileText, label: '견적서 목록' },
]

// 관리자 사이드바 (데스크톱 전용, 모바일에서는 AdminHeader의 Sheet 사용)
export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='hidden w-60 flex-shrink-0 flex-col border-r bg-background md:flex'>
      {/* 로고 영역 */}
      <div className='flex h-14 items-center border-b px-6'>
        <Link href='/dashboard' className='flex items-center gap-2 font-semibold'>
          <FileText className='h-5 w-5 text-primary' />
          <span>인보이스 뷰어</span>
        </Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className='flex-1 space-y-1 px-3 py-4'>
        {menuItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
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
    </aside>
  )
}

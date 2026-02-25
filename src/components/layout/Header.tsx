import Link from 'next/link'
import { Github, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

const navItems = [
  { label: '버튼', href: '#buttons' },
  { label: '카드', href: '#cards' },
  { label: '폼', href: '#forms' },
  { label: '알림', href: '#alerts' },
  { label: '색상', href: '#colors' },
]

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-14 max-w-6xl items-center justify-between px-4'>
        {/* 로고 */}
        <Link href='/' className='flex items-center gap-2 font-semibold'>
          <Layers className='h-5 w-5 text-primary' />
          <span>Next.js Starter</span>
          <Badge variant='secondary' className='text-xs'>
            v15
          </Badge>
        </Link>

        {/* 네비게이션 */}
        <nav className='hidden items-center gap-1 md:flex'>
          {navItems.map((item) => (
            <Button key={item.href} variant='ghost' size='sm' asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* 우측 액션 그룹 */}
        <div className='flex items-center gap-2'>
          <ThemeToggle />
          <Button variant='outline' size='sm' asChild>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2'
            >
              <Github className='h-4 w-4' />
              <span className='hidden sm:inline'>GitHub</span>
            </a>
          </Button>
        </div>
      </div>
      <Separator />
    </header>
  )
}

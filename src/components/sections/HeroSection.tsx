import Link from 'next/link'
import { ArrowRight, Zap, Palette, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const techCards = [
  {
    icon: Zap,
    title: 'Next.js 15',
    description: 'App Router, React 19, Server Components, Turbopack',
    badge: 'Latest',
  },
  {
    icon: Palette,
    title: 'TailwindCSS v4',
    description: '@import 방식, tailwind.config 불필요, CSS 변수 테마',
    badge: 'New',
  },
  {
    icon: Shield,
    title: 'shadcn/ui',
    description: '접근성 우선 컴포넌트, 완전한 커스터마이징 가능',
    badge: 'Included',
  },
]

export function HeroSection() {
  return (
    <section className='py-20 text-center'>
      {/* 배지 */}
      <Badge variant='secondary' className='mb-4'>
        Production Ready Starter Kit
      </Badge>

      {/* 제목 */}
      <h1 className='mb-4 text-4xl font-bold tracking-tight md:text-6xl'>
        Next.js 15{' '}
        <span className='text-muted-foreground'>Starter Kit</span>
      </h1>

      {/* 설명 */}
      <p className='mx-auto mb-8 max-w-2xl text-lg text-muted-foreground'>
        TypeScript · TailwindCSS v4 · shadcn/ui로 구성된 프로덕션 레디 스타터 키트.
        바로 개발을 시작하세요.
      </p>

      {/* CTA 버튼 */}
      <div className='mb-16 flex flex-wrap items-center justify-center gap-3'>
        <Button size='lg' asChild>
          <Link href='#buttons'>
            컴포넌트 보기
            <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </Button>
        <Button size='lg' variant='outline' asChild>
          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub에서 보기
          </a>
        </Button>
      </div>

      {/* 기술 스택 카드 */}
      <div className='grid gap-4 md:grid-cols-3'>
        {techCards.map((card) => (
          <Card key={card.title} className='text-left'>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <card.icon className='h-6 w-6 text-primary' />
                <Badge variant='outline' className='text-xs'>
                  {card.badge}
                </Badge>
              </div>
              <CardTitle className='text-lg'>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

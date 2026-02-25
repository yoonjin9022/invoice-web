import { TrendingUp, Users, DollarSign } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const statsCards = [
  {
    icon: DollarSign,
    title: '총 매출',
    value: '₩12,345,678',
    change: '+20.1%',
    period: '지난달 대비',
  },
  {
    icon: Users,
    title: '활성 사용자',
    value: '2,350',
    change: '+15.3%',
    period: '지난주 대비',
  },
  {
    icon: TrendingUp,
    title: '전환율',
    value: '3.24%',
    change: '+4.6%',
    period: '지난달 대비',
  },
]

const profileUsers = [
  {
    name: '김지수',
    role: '프론트엔드 개발자',
    avatar: '',
    initials: '김지',
    badge: '온라인',
  },
  {
    name: '이민준',
    role: '백엔드 개발자',
    avatar: '',
    initials: '이민',
    badge: '자리비움',
  },
  {
    name: '박서연',
    role: '디자이너',
    avatar: '',
    initials: '박서',
    badge: '온라인',
  },
]

export function CardShowcase() {
  return (
    <section id='cards' className='py-12'>
      <h2 className='mb-2 text-2xl font-bold'>Card</h2>
      <p className='mb-8 text-muted-foreground'>
        기본 카드, 프로필 카드, 통계 카드 등 다양한 레이아웃 패턴을 제공합니다.
      </p>

      <div className='space-y-8'>
        {/* 기본 카드 */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            기본 카드
          </h3>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>알림 설정</CardTitle>
                <CardDescription>이메일 알림 수신 방법을 설정하세요.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  새 메시지, 팔로워, 멘션에 대한 알림을 개별적으로 설정할 수 있습니다.
                </p>
              </CardContent>
              <CardFooter className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  취소
                </Button>
                <Button size='sm'>저장</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle>프로젝트 현황</CardTitle>
                  <Badge>진행 중</Badge>
                </div>
                <CardDescription>Next.js 15 스타터 키트 개발</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>진행률</span>
                  <span className='font-medium'>75%</span>
                </div>
                <div className='h-2 rounded-full bg-secondary'>
                  <div className='h-2 w-3/4 rounded-full bg-primary' />
                </div>
                <p className='text-xs text-muted-foreground'>마감: 2026년 3월 1일</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* 프로필 카드 */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            프로필 카드 (Avatar)
          </h3>
          <div className='grid gap-4 md:grid-cols-3'>
            {profileUsers.map((user) => (
              <Card key={user.name}>
                <CardContent className='flex flex-col items-center gap-3 pt-6'>
                  <Avatar className='h-16 w-16'>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div className='text-center'>
                    <p className='font-medium'>{user.name}</p>
                    <p className='text-sm text-muted-foreground'>{user.role}</p>
                  </div>
                  <Badge
                    variant={user.badge === '온라인' ? 'default' : 'secondary'}
                    className='text-xs'
                  >
                    {user.badge}
                  </Badge>
                  <div className='flex gap-2 w-full'>
                    <Button variant='outline' size='sm' className='flex-1'>
                      메시지
                    </Button>
                    <Button size='sm' className='flex-1'>
                      팔로우
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* 통계 카드 */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            통계 카드
          </h3>
          <div className='grid gap-4 md:grid-cols-3'>
            {statsCards.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <CardTitle className='text-sm font-medium text-muted-foreground'>
                    {stat.title}
                  </CardTitle>
                  <stat.icon className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{stat.value}</div>
                  <p className='text-xs text-muted-foreground'>
                    <span className='text-green-600 font-medium'>{stat.change}</span>{' '}
                    {stat.period}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

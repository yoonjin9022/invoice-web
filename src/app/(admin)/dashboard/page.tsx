import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, TrendingUp, Clock, Send, CheckCircle, Archive } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getInvoices } from '@/lib/notion'
import { formatCurrency } from '@/lib/utils'
import { INVOICE_STATUS_LABEL, INVOICE_STATUS_VARIANT } from '@/types/invoice'

// 5분 ISR 캐싱
export const revalidate = 300

export const metadata: Metadata = {
  title: '대시보드',
}

// 관리자 대시보드 — 견적서 통계 및 최근 견적서 목록
export default async function DashboardPage() {
  const invoices = await getInvoices()

  // 통계 계산
  const stats = {
    total: invoices.length,
    pending: invoices.filter((i) => i.status === 'pending').length,
    sent: invoices.filter((i) => i.status === 'sent').length,
    approved: invoices.filter((i) => i.status === 'approved').length,
    completed: invoices.filter((i) => i.status === 'completed').length,
    totalRevenue: invoices.reduce((sum, i) => sum + i.totalAmount, 0),
  }

  // 최근 견적서 5건
  const recentInvoices = invoices.slice(0, 5)

  return (
    <div className='container mx-auto max-w-5xl px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>대시보드</h1>
        <p className='mt-1 text-sm text-muted-foreground'>견적서 현황 및 통계를 확인하세요.</p>
      </div>

      {/* 상태별 통계 카드 */}
      <div className='mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
        <Card className='col-span-2 sm:col-span-1'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>전체</CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.total}건</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>대기</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>발송됨</CardTitle>
            <Send className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.sent}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>승인됨</CardTitle>
            <CheckCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>완료</CardTitle>
            <Archive className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* 총 매출 카드 */}
      <Card className='mb-8'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>총 매출 금액</CardTitle>
          <TrendingUp className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-3xl font-bold'>{formatCurrency(stats.totalRevenue)}</div>
          <p className='mt-1 text-xs text-muted-foreground'>전체 견적서 합산 기준</p>
        </CardContent>
      </Card>

      {/* 최근 견적서 5건 */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-base font-semibold'>최근 견적서</CardTitle>
            <Link href='/invoices' className='text-sm text-primary hover:underline'>
              전체 보기
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentInvoices.length === 0 ? (
            <p className='text-sm text-muted-foreground'>등록된 견적서가 없습니다.</p>
          ) : (
            <ul className='space-y-2'>
              {recentInvoices.map((invoice) => (
                <li key={invoice.id}>
                  <Link
                    href={`/invoices/${invoice.id}`}
                    className='flex items-center justify-between rounded-md p-2 transition-colors hover:bg-accent'
                  >
                    <div className='flex min-w-0 items-center gap-3'>
                      <FileText className='h-4 w-4 flex-shrink-0 text-muted-foreground' />
                      <div className='min-w-0'>
                        <p className='truncate text-sm font-medium'>{invoice.title}</p>
                        <p className='truncate text-xs text-muted-foreground'>{invoice.clientName}</p>
                      </div>
                    </div>
                    <div className='ml-4 flex flex-shrink-0 items-center gap-3'>
                      <span className='text-sm font-medium'>{formatCurrency(invoice.totalAmount)}</span>
                      <Badge variant={INVOICE_STATUS_VARIANT[invoice.status]} className='text-xs'>
                        {INVOICE_STATUS_LABEL[invoice.status]}
                      </Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PdfDownloadButton } from '@/components/invoice/PdfDownloadButton'
import { ShareDropdown } from '@/components/invoice/ShareDropdown'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'
import { INVOICE_STATUS_LABEL, INVOICE_STATUS_VARIANT } from '@/types/invoice'
import type { Invoice } from '@/types/invoice'

interface InvoiceDetailProps {
  invoice: Invoice
}

// 견적서 상세 UI — 전문적인 인보이스 레이아웃
export function InvoiceDetail({ invoice }: InvoiceDetailProps) {
  return (
    <div className='rounded-lg border bg-card shadow-sm'>
      {/* 인보이스 본문 */}
      <div className='p-6 md:p-10'>
        {/* 헤더: 제목 + 상태 배지 */}
        <div className='mb-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <h2 className='text-2xl font-bold leading-tight'>{invoice.title}</h2>
          <Badge
            variant={INVOICE_STATUS_VARIANT[invoice.status]}
            className='w-fit shrink-0'
          >
            {INVOICE_STATUS_LABEL[invoice.status]}
          </Badge>
        </div>

        {/* 날짜 정보 */}
        <div className='mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground'>
          <span>발행일: {formatDate(invoice.issuedAt)}</span>
          {invoice.validUntil && (
            <span>유효기간: {formatDate(invoice.validUntil)}</span>
          )}
        </div>

        <Separator className='mb-8' />

        {/* 클라이언트 정보 */}
        <div className='mb-8'>
          <p className='mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            클라이언트
          </p>
          <p className='font-semibold'>{invoice.clientName}</p>
        </div>

        <Separator className='mb-8' />

        {/* 품목 테이블 */}
        <div className='mb-8'>
          <h3 className='mb-4 font-semibold'>견적 품목</h3>
          <div className='overflow-x-auto rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='min-w-[140px]'>품목명</TableHead>
                  <TableHead className='text-right'>수량</TableHead>
                  <TableHead className='text-right'>단가</TableHead>
                  <TableHead className='text-right'>금액</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className='font-medium'>{item.name}</TableCell>
                    <TableCell className='text-right'>{item.quantity}</TableCell>
                    <TableCell className='text-right'>
                      {formatCurrency(item.unitPrice)}
                    </TableCell>
                    <TableCell className='text-right font-medium'>
                      {formatCurrency(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 금액 합계 */}
        <div className='mb-8 flex justify-end'>
          <div className='w-full max-w-xs'>
            <Separator className='mb-3' />
            <div className='flex justify-between text-base font-bold'>
              <span>합계</span>
              <span>{formatCurrency(invoice.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* 비고 */}
        {invoice.notes && (
          <>
            <Separator className='mb-6' />
            <div className='mb-8'>
              <h3 className='mb-2 font-semibold'>비고</h3>
              <p className='whitespace-pre-wrap text-sm text-muted-foreground'>
                {invoice.notes}
              </p>
            </div>
          </>
        )}
      </div>

      {/* 하단 액션 버튼 */}
      <div className='flex flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-between md:px-10'>
        <Button variant='outline' asChild>
          <Link href='/invoices'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            목록으로 돌아가기
          </Link>
        </Button>
        <div className='flex gap-2'>
          <ShareDropdown invoiceId={invoice.id} />
          <PdfDownloadButton invoiceId={invoice.id} clientName={invoice.clientName} />
        </div>
      </div>
    </div>
  )
}

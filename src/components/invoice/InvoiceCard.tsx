'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { Copy, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { formatCurrency, formatDate } from '@/lib/utils'
import { INVOICE_STATUS_LABEL, INVOICE_STATUS_VARIANT } from '@/types/invoice'
import type { Invoice } from '@/types/invoice'

interface InvoiceCardProps {
  invoice: Invoice
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  // 공유 URL 클립보드 복사
  const handleCopyUrl = async () => {
    const url = `${window.location.origin}/invoices/${invoice.id}`
    try {
      await navigator.clipboard.writeText(url)
      toast.success('URL이 복사되었습니다', {
        description: '클라이언트에게 공유할 수 있습니다.',
      })
    } catch {
      toast.error('URL 복사에 실패했습니다')
    }
  }

  return (
    <Card className='flex flex-col'>
      <CardHeader className='pb-3'>
        <div className='mb-1'>
          <Badge variant={INVOICE_STATUS_VARIANT[invoice.status]}>
            {INVOICE_STATUS_LABEL[invoice.status]}
          </Badge>
        </div>
        <h3 className='line-clamp-1 font-semibold leading-snug'>{invoice.clientName}</h3>
        <p className='line-clamp-1 text-sm text-muted-foreground'>{invoice.title}</p>
      </CardHeader>

      <CardContent className='flex-1 pb-3'>
        <p className='text-xs text-muted-foreground'>
          발행일: {formatDate(invoice.issuedAt)}
        </p>
        <p className='mt-1 text-xl font-bold tracking-tight'>
          {formatCurrency(invoice.totalAmount)}
        </p>
      </CardContent>

      <CardFooter className='gap-2'>
        <Button asChild className='flex-1' size='sm'>
          <Link href={`/invoices/${invoice.id}`}>
            <ExternalLink className='mr-1.5 h-3.5 w-3.5' />
            견적서 보기
          </Link>
        </Button>
        <Button variant='outline' size='sm' onClick={handleCopyUrl}>
          <Copy className='mr-1.5 h-3.5 w-3.5' />
          URL 복사
        </Button>
      </CardFooter>
    </Card>
  )
}

'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PdfDownloadButtonProps {
  invoiceId: string
  clientName: string
}

// PDF 다운로드 버튼 — 다운로드 진행 상태 표시 (F004)
export function PdfDownloadButton({ invoiceId, clientName }: PdfDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/pdf`)

      if (!response.ok) {
        throw new Error('PDF 생성에 실패했습니다.')
      }

      // Blob → a 태그 클릭으로 다운로드 트리거
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${clientName}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      toast.error('PDF 다운로드에 실패했습니다.', {
        description: '잠시 후 다시 시도해주세요.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Download className='mr-2 h-4 w-4' />
      )}
      {isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
    </Button>
  )
}

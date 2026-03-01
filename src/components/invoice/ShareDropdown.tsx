'use client'

import { Share2, Link as LinkIcon, Mail, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ShareDropdownProps {
  invoiceId: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'icon'
}

// 견적서 공유 드롭다운 — 링크 복사, 이메일로 공유, 새 탭 미리보기
export function ShareDropdown({ invoiceId, variant = 'outline', size = 'sm' }: ShareDropdownProps) {
  const getShareUrl = () => `${window.location.origin}/invoices/${invoiceId}`

  // 링크 복사
  const handleCopyLink = async () => {
    const url = getShareUrl()
    try {
      await navigator.clipboard.writeText(url)
      const shortUrl = url.length > 40 ? `...${url.slice(-30)}` : url
      toast.success('링크가 복사되었습니다', {
        description: shortUrl,
      })
    } catch {
      toast.error('링크 복사에 실패했습니다', {
        description: '직접 URL을 복사해 주세요.',
      })
    }
  }

  // 이메일로 공유
  const handleShareByEmail = () => {
    const url = getShareUrl()
    const subject = encodeURIComponent('견적서를 공유합니다')
    const body = encodeURIComponent(`안녕하세요,\n\n아래 링크에서 견적서를 확인하실 수 있습니다.\n\n${url}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  // 새 탭에서 미리보기
  const handlePreviewInNewTab = () => {
    window.open(getShareUrl(), '_blank', 'noopener,noreferrer')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} aria-label='공유'>
          <Share2 className='mr-1.5 h-3.5 w-3.5' />
          공유
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={handleCopyLink}>
          <LinkIcon className='mr-2 h-4 w-4' />
          링크 복사
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShareByEmail}>
          <Mail className='mr-2 h-4 w-4' />
          이메일로 공유
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePreviewInNewTab}>
          <ExternalLink className='mr-2 h-4 w-4' />
          새 탭에서 미리보기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

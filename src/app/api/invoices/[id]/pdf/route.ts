// PDF 생성 API Route — 서버사이드 PDF Buffer 생성 및 스트리밍 (F004)
import { renderToBuffer } from '@react-pdf/renderer'
import type { DocumentProps } from '@react-pdf/renderer'
import React, { type ReactElement } from 'react'
import { getInvoice } from '@/lib/notion'
import { InvoicePdf } from '@/components/pdf/InvoicePdf'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const invoice = await getInvoice(id)

    if (!invoice) {
      return new Response('견적서를 찾을 수 없습니다.', { status: 404 })
    }

    // PDF Buffer 생성
    // InvoicePdf는 내부적으로 <Document>를 최상위로 반환
    // @react-pdf/renderer 타입과 React 컴포넌트 타입 불일치로 unknown 경유 단언 필요
    const buffer = await renderToBuffer(
      React.createElement(InvoicePdf, { invoice }) as unknown as ReactElement<DocumentProps>
    )

    // 다운로드 파일명: invoice-{클라이언트명}-{발행일}.pdf
    const issuedDate = invoice.issuedAt
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace('.', '')
    const rawFilename = `invoice-${invoice.clientName}-${issuedDate}.pdf`
    const encodedFilename = encodeURIComponent(rawFilename)

    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('PDF 생성 오류:', error)
    return new Response('PDF 생성에 실패했습니다.', { status: 500 })
  }
}

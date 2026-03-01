import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// robots.txt 생성
// 견적서 상세 페이지(/invoices/*)는 검색엔진 인덱싱 방지
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/invoices/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

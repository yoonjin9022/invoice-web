import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// sitemap.xml 생성
// 공개 인덱싱 대상: 견적서 목록 페이지(루트)만 포함
// 견적서 상세 페이지는 noindex이므로 제외
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}

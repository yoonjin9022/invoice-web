import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// 프로덕션 보안 헤더
const securityHeaders = [
  // MIME 타입 스니핑 방지
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // iframe 임베드 방지 (클릭재킹 방어)
  { key: 'X-Frame-Options', value: 'DENY' },
  // 레퍼러 정보 최소화
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // 민감한 브라우저 기능 비활성화
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // 모든 라우트에 보안 헤더 적용
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)

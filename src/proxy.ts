import { NextRequest, NextResponse } from 'next/server'

// Edge Runtime에서 Node.js crypto 모듈을 사용할 수 없으므로 상수를 직접 정의
const SESSION_COOKIE_NAME = 'admin_session'

// Next.js 16에서 middleware → proxy로 이름 변경
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const session = request.cookies.get(SESSION_COOKIE_NAME)

  // 로그인 페이지: 이미 세션이 있으면 대시보드로 리다이렉트
  if (pathname === '/login') {
    if (session?.value) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // 관리자 라우트 보호: /dashboard/* 또는 정확히 /invoices
  const isAdminRoute = pathname.startsWith('/dashboard') || pathname === '/invoices'

  if (!isAdminRoute) return NextResponse.next()

  // 세션 쿠키 없으면 로그인 페이지로 리다이렉트
  if (!session?.value) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // /invoices/[id] 공개 공유 URL은 제외하고, /invoices (정확히)와 /dashboard/* 만 매칭
  matcher: ['/dashboard/:path*', '/invoices', '/login'],
}

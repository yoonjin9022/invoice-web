import { createHmac } from 'crypto'

export const SESSION_COOKIE_NAME = 'admin_session'
// 7일
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

// ADMIN_PASSWORD를 AUTH_SECRET으로 서명한 세션 토큰 생성
export function createSessionToken(): string {
  const password = process.env.ADMIN_PASSWORD ?? ''
  const secret = process.env.AUTH_SECRET ?? ''
  return createHmac('sha256', secret).update(password).digest('hex')
}

// 쿠키 값이 유효한 세션 토큰인지 검증
export function verifySessionToken(token: string): boolean {
  return token === createSessionToken()
}

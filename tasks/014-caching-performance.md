# Task 014: 데이터 캐싱 및 성능 최적화

## 개요

Phase 3에서 완성된 노션 API 연동 코드에 캐싱 전략을 적용하여 성능을 개선합니다.
현재는 모든 요청마다 노션 API를 새로 호출하며, 같은 페이지에서 중복 호출이 발생합니다.

## 관련 파일

- `src/lib/notion.ts` — 노션 API 호출 함수 (React cache() 적용)
- `src/app/page.tsx` — 견적서 목록 페이지 (revalidate 설정)
- `src/app/invoices/[id]/page.tsx` — 견적서 상세 페이지 (revalidate 설정)
- `next.config.ts` — Next.js 설정 (번들 분석기 추가)
- `package.json` — 스크립트 및 의존성

## 구현 단계

### 1단계: React cache() 적용 — 중복 API 호출 제거
- [x] `src/lib/notion.ts`에 `import { cache } from 'react'` 추가
- [x] `getInvoices`를 `cache()` 래핑된 const로 변환
- [x] `getInvoice`를 `cache()` 래핑된 const로 변환
- [x] `getInvoices()`에 `page_size: 100` 명시적 설정

### 2단계: ISR revalidate 옵션 추가
- [x] `src/app/page.tsx`에 `export const revalidate = 300` 추가
- [x] `src/app/invoices/[id]/page.tsx`에 `export const revalidate = 300` 추가

### 3단계: 번들 사이즈 분석 도구 설정
- [x] `@next/bundle-analyzer` 설치 (devDependency)
- [x] `next.config.ts`에 bundle analyzer 설정 추가
- [x] `package.json`에 `analyze` 스크립트 추가

## 수락 기준

- 견적서 상세 페이지 로드 시 노션 API 호출이 1회 (기존 2회 → 1회로 감소)
- 페이지 최초 요청 후 5분 내 재요청은 캐시에서 응답
- `pnpm analyze` 명령으로 번들 분석 보고서 생성 가능
- 기존 기능 모두 정상 동작

## 테스트 체크리스트

### 정상 케이스 (Happy Path)
- [x] 목록 페이지 로딩: `browser_navigate({url: 'http://localhost:3000'})` → `browser_snapshot()` → 견적서 목록 정상 표시 확인
- [x] 상세 페이지 로딩: `browser_navigate({url: 'http://localhost:3000/invoices/{id}'})` → `browser_snapshot()` → 견적서 데이터 정상 표시 확인
- [x] API 중복 호출 확인: `browser_network_requests({includeStatic: false})` → 노션 API 호출 횟수 확인

### 에러 케이스 (Edge Case)
- [x] 잘못된 ID 접근: `browser_navigate({url: 'http://localhost:3000/invoices/invalid-id'})` → `browser_snapshot()` → not-found 페이지 표시 확인

### 콘솔 오류 확인
- [x] `browser_console_messages({level: 'error'})` 실행 후 JavaScript 에러 없음 확인

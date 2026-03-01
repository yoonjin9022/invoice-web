# 노션 인보이스 웹뷰어

노션 데이터베이스와 연동하여 견적서별 고유 웹 URL을 자동 생성하고, 클라이언트가 링크만으로 견적서 확인 및 PDF 다운로드가 가능한 서비스.

## 프로젝트 개요

**목적**: 노션에서 작성한 견적서를 클라이언트에게 URL만으로 전달 — 별도 권한 부여나 PDF 변환 불필요

**범위**: MVP — 견적서 목록 조회, 견적서 상세 웹뷰, PDF 다운로드

**사용자**:
- 발행자: 노션으로 견적서를 관리하는 1인 프리랜서 및 소규모 사업자
- 수신자: 견적서를 수령하는 클라이언트

## 주요 페이지

| 경로 | 설명 |
|------|------|
| `/` | 견적서 목록 페이지 — 발행자용 대시보드 |
| `/invoices/[id]` | 견적서 상세 페이지 — 클라이언트 공유 URL |
| `/invoices/[id]` (not-found) | 존재하지 않는 견적서 접근 시 안내 페이지 |

## 핵심 기능

- **F001** 노션 데이터베이스 연동: `@notionhq/client`로 서버 컴포넌트에서 직접 호출
- **F002** 견적서 목록 조회: 노션 DB의 모든 견적서를 카드/리스트 형태로 표시
- **F003** 견적서 상세 웹뷰: 노션 페이지 ID 기반 고유 URL로 전문적인 인보이스 UI 렌더링
- **F004** PDF 다운로드: `@react-pdf/renderer`로 서버사이드 PDF 생성 후 다운로드
- **F010** 환경변수 관리: `NOTION_API_KEY`, `NOTION_DATABASE_ID`
- **F011** 캐싱 및 오류 처리: 로딩 스켈레톤, API 오류 메시지 표시
- **F012** 견적서 없음 처리: 잘못된 URL 접근 시 안내 페이지

## 기술 스택

- **Framework**: Next.js 16 (App Router, Server Components)
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **노션 연동**: @notionhq/client
- **PDF 생성**: @react-pdf/renderer
- **패키지 관리**: pnpm

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열어 아래 환경변수를 입력합니다.

```env
# 노션 API 키 — https://www.notion.so/my-integrations 에서 생성
NOTION_API_KEY=secret_xxxxxxxxxxxxx

# 견적서 데이터베이스 ID
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 사이트 URL (OG 메타데이터, sitemap에 사용)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. 노션 패키지 설치

```bash
pnpm add @notionhq/client @react-pdf/renderer
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

http://localhost:3000 에서 확인합니다.

### 빌드

```bash
pnpm build
pnpm start
```

## Vercel 배포

### 1. Vercel CLI로 배포

```bash
# Vercel CLI 설치 (최초 1회)
pnpm add -g vercel

# 프로젝트 연결 및 배포
vercel
```

### 2. Vercel 대시보드에서 환경변수 설정

Vercel 프로젝트 → Settings → Environment Variables에서 아래 항목을 추가합니다.

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NOTION_API_KEY` | 노션 통합 API 키 | `secret_xxx...` |
| `NOTION_DATABASE_ID` | 견적서 데이터베이스 ID | `xxxxxxxx...` |
| `NEXT_PUBLIC_SITE_URL` | 배포된 사이트 URL | `https://your-project.vercel.app` |

### 3. 배포 확인

- **robots.txt**: `https://your-domain/robots.txt`
- **sitemap.xml**: `https://your-domain/sitemap.xml`
- **견적서 목록**: `https://your-domain/`
- **견적서 상세**: `https://your-domain/invoices/{notion-page-id}`

> **참고**: `vercel.json`에 서울 리전(`icn1`)이 설정되어 있어 국내 사용자 응답 속도가 최적화됩니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx                  # 루트 레이아웃
│   ├── page.tsx                    # 견적서 목록 페이지 (/)
│   └── invoices/
│       └── [id]/
│           ├── page.tsx            # 견적서 상세 페이지 (/invoices/[id])
│           └── not-found.tsx       # 견적서 없음 페이지
├── components/
│   ├── ui/                         # shadcn/ui 자동 생성 컴포넌트
│   └── layout/                     # Header, Footer
├── lib/
│   ├── utils.ts                    # cn() 유틸리티
│   └── notion.ts                   # 노션 클라이언트 및 데이터 조회 함수
└── types/
    ├── index.ts                    # 공통 API 응답 타입
    └── invoice.ts                  # Invoice, InvoiceItem 타입 정의
```

## 개발 상태 (MVP 완료)

- [x] Phase 1: 프로젝트 초기 설정, 라우트 구조, 공통 레이아웃, 타입 정의
- [x] Phase 2: 전체 UI/UX 구현 (더미 데이터 기반 플로우 검증)
- [x] Phase 3: 노션 API 연동, 실제 데이터 바인딩, PDF 다운로드 구현
- [x] Phase 4: 캐싱 최적화, SEO 메타데이터, Vercel 배포 설정

## 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 가이드](./CLAUDE.md) - 개발 지침 및 아키텍처 안내

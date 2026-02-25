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

`.env.local` 파일을 열어 노션 API 키와 데이터베이스 ID를 입력합니다.

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

노션 통합(Integration) 생성: https://www.notion.so/my-integrations

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

## 개발 상태

- 기본 프로젝트 구조 설정 완료
- 견적서 상세 라우트 구조 생성 완료
- 타입 정의 완료 (Invoice, InvoiceItem)
- 노션 클라이언트 설정 파일 준비 완료
- 노션 API 연동 구현 예정
- 견적서 목록 UI 구현 예정
- 견적서 상세 UI 구현 예정
- PDF 다운로드 기능 구현 예정

## 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 가이드](./CLAUDE.md) - 개발 지침 및 아키텍처 안내

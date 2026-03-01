# 에러 디버거 메모리

## Next.js 16 Turbopack proxy.ts 빌드 오류

**오류 메시지**:
```
./src/proxy.ts
Proxy is missing expected function export name
- Ensure this file has either a default or "proxy" function export.
```

**원인**: Next.js 16 Turbopack은 `src/proxy.ts` 파일을 HTTP 프록시 설정 파일로 인식함.
파일에 `proxy` 또는 `default` 함수 export가 없으면 빌드 실패.

**상황**: `proxy.ts`에 미들웨어 로직(`export function middleware`)이 잘못 배치된 경우.

**해결 방법**:
1. 미들웨어 로직을 `src/middleware.ts`로 이동 (Next.js 표준 미들웨어 파일)
2. `src/proxy.ts`는 Turbopack이 요구하는 `proxy` 함수 export만 남김:
   ```typescript
   export function proxy() {
     // 미들웨어는 src/middleware.ts를 참조하세요
   }
   ```

**핵심 원칙**: Next.js 미들웨어는 반드시 `src/middleware.ts`에 위치해야 함.
`proxy.ts`는 Turbopack 전용 HTTP 프록시 설정 파일이며, 미들웨어와 혼용 불가.

---

## @react-pdf/renderer renderToBuffer 타입 오류

**패턴**: `renderToBuffer(React.createElement(MyPdfComponent, props))` 호출 시 타입 오류 발생

**오류 메시지**:
```
Argument of type 'FunctionComponentElement<MyProps>' is not assignable to
parameter of type 'ReactElement<DocumentProps, ...>'
```

**원인**: `renderToBuffer`는 `ReactElement<DocumentProps>` 타입을 요구하지만,
`React.createElement`로 함수형 컴포넌트를 생성하면 `FunctionComponentElement<Props>` 타입이 반환됨.
컴포넌트 내부에서 `<Document>`를 반환하더라도 TypeScript는 시그니처만 보고 타입을 결정함.

**해결 방법**: `route.ts`에서 타입 단언 적용 (컴포넌트 구조 변경 없이 최소 수정)

```typescript
import type { DocumentProps } from '@react-pdf/renderer'
import React, { type ReactElement, type JSXElementConstructor } from 'react'

const buffer = await renderToBuffer(
  React.createElement(InvoicePdf, { invoice }) as ReactElement<
    DocumentProps,
    string | JSXElementConstructor<DocumentProps>
  >
)
```

**주의**: `as any` 금지 원칙에 따라 정확한 타입(`DocumentProps`)으로 단언해야 함.

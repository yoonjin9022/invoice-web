# Task 013: 핵심 기능 통합 테스트

## 목적

Phase 3 전체 기능(노션 API 연동, PDF 다운로드)의 발행자/클라이언트 여정을 Playwright로 통합 검증한다.

## 선행 조건

- Task 009, 010, 011, 012 모두 완료

## 테스트 체크리스트

### 발행자 여정 (Happy Path)
- [ ] 목록 → 상세: `browser_navigate({url: 'http://localhost:3000'})` → `browser_click({ref: '견적서 보기'})` → `browser_snapshot()` → 상세 페이지 실제 데이터 표시 확인
- [ ] URL 복사 → 공유: `browser_click({ref: 'URL 복사'})` → `browser_snapshot()` → 복사 완료 토스트 확인
- [ ] 전체 API 흐름: `browser_network_requests({includeStatic: false})` → 모든 노션 API 호출 정상 응답 확인

### 클라이언트 여정 (Happy Path)
- [ ] 공유 URL 직접 접근: `browser_navigate({url: 'http://localhost:3000/invoices/{실제ID}'})` → `browser_snapshot()` → 견적서 상세 정상 표시 확인
- [ ] PDF 다운로드: `browser_click({ref: 'PDF 다운로드'})` → `browser_network_requests({includeStatic: false})` → `/api/invoices/{id}/pdf` 200 응답 확인

### 에러 케이스 (Edge Case)
- [ ] 잘못된 URL: `browser_navigate({url: 'http://localhost:3000/invoices/invalid'})` → `browser_snapshot()` → not-found 페이지 표시 확인
- [ ] 반응형 모바일: `browser_resize({width: 375, height: 812})` → `browser_navigate({url: 'http://localhost:3000'})` → `browser_snapshot()` → 모바일 레이아웃 정상 표시 확인
- [ ] 반응형 상세: `browser_navigate({url: 'http://localhost:3000/invoices/{실제ID}'})` → `browser_snapshot()` → 모바일 상세 레이아웃 확인

### 콘솔 오류 확인
- [ ] `browser_console_messages({level: 'error'})` 실행 후 전체 플로우에서 JavaScript 에러 없음 확인

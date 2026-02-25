// 노션 클라이언트 설정 및 유틸리티 (F001, F010)
// @notionhq/client 설치 후 주석 해제하여 사용
// import { Client } from '@notionhq/client'
// import type { Invoice, InvoiceItem } from '@/types/invoice'

// 환경변수 유효성 검사
function validateEnvVariables() {
  const apiKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID

  if (!apiKey) {
    throw new Error('NOTION_API_KEY 환경변수가 설정되지 않았습니다.')
  }
  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.')
  }

  return { apiKey, databaseId }
}

// TODO: @notionhq/client 패키지 설치 후 아래 코드 활성화
// pnpm add @notionhq/client
//
// export const notionClient = new Client({
//   auth: validateEnvVariables().apiKey,
// })
//
// // 견적서 목록 조회 - F002
// export async function getInvoices(): Promise<Invoice[]> {
//   const { databaseId } = validateEnvVariables()
//
//   const response = await notionClient.databases.query({
//     database_id: databaseId,
//     sorts: [{ property: '발행일', direction: 'descending' }],
//   })
//
//   return response.results.map(mapNotionPageToInvoice)
// }
//
// // 견적서 상세 조회 - F003
// export async function getInvoice(pageId: string): Promise<Invoice | null> {
//   try {
//     const page = await notionClient.pages.retrieve({ page_id: pageId })
//     return mapNotionPageToInvoice(page)
//   } catch {
//     // 존재하지 않는 페이지 - F012
//     return null
//   }
// }
//
// // 노션 페이지 데이터를 Invoice 타입으로 변환
// function mapNotionPageToInvoice(page: unknown): Invoice {
//   // TODO: 노션 API 응답 구조에 맞게 구현
//   throw new Error('구현 필요')
// }

export { validateEnvVariables }

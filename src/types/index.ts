// 공통 API 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// 페이지네이션 타입
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 페이지네이션이 포함된 API 응답 타입
export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: Pagination
}

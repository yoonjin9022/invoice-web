import { Sidebar } from '@/components/layout/Sidebar'
import { AdminHeader } from '@/components/layout/AdminHeader'

// 관리자 전용 레이아웃 - 사이드바 + 헤더 구조
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen bg-background'>
      {/* 데스크톱 사이드바 (md 이상에서 표시) */}
      <Sidebar />

      {/* 메인 콘텐츠 영역 */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* 모바일 햄버거 + ThemeToggle 포함 헤더 */}
        <AdminHeader />
        <main className='flex-1 overflow-y-auto'>{children}</main>
      </div>
    </div>
  )
}

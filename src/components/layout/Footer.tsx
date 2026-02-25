// 인보이스 앱 공통 푸터
export function Footer() {
  return (
    <footer className='mt-auto border-t'>
      <div className='container mx-auto max-w-5xl px-4 py-6'>
        <p className='text-center text-sm text-muted-foreground'>
          © {new Date().getFullYear()} 인보이스 뷰어. Notion API 연동 서비스.
        </p>
      </div>
    </footer>
  )
}

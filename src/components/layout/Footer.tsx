import { Separator } from '@/components/ui/separator'

const techLinks = [
  { label: 'Next.js 15', href: 'https://nextjs.org' },
  { label: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { label: 'TailwindCSS v4', href: 'https://tailwindcss.com' },
  { label: 'shadcn/ui', href: 'https://ui.shadcn.com' },
  { label: 'Lucide Icons', href: 'https://lucide.dev' },
]

export function Footer() {
  return (
    <footer className='mt-20 border-t'>
      <div className='container mx-auto max-w-6xl px-4 py-8'>
        <div className='flex flex-col items-center gap-4 text-center'>
          {/* 기술 스택 링크 */}
          <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground'>
            {techLinks.map((link, index) => (
              <span key={link.href} className='flex items-center gap-4'>
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-foreground transition-colors'
                >
                  {link.label}
                </a>
                {index < techLinks.length - 1 && (
                  <Separator orientation='vertical' className='h-3' />
                )}
              </span>
            ))}
          </div>

          {/* 저작권 */}
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Next.js 15 Starter Kit. MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}

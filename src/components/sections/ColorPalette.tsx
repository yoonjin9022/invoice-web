import { Separator } from '@/components/ui/separator'

const colorTokens = [
  { name: 'background', label: 'Background', className: 'bg-background border' },
  { name: 'foreground', label: 'Foreground', className: 'bg-foreground' },
  { name: 'primary', label: 'Primary', className: 'bg-primary' },
  { name: 'primary-foreground', label: 'Primary FG', className: 'bg-primary-foreground border' },
  { name: 'secondary', label: 'Secondary', className: 'bg-secondary' },
  { name: 'secondary-foreground', label: 'Secondary FG', className: 'bg-secondary-foreground' },
  { name: 'muted', label: 'Muted', className: 'bg-muted' },
  { name: 'muted-foreground', label: 'Muted FG', className: 'bg-muted-foreground' },
  { name: 'accent', label: 'Accent', className: 'bg-accent' },
  { name: 'destructive', label: 'Destructive', className: 'bg-destructive' },
  { name: 'border', label: 'Border', className: 'bg-border' },
  { name: 'ring', label: 'Ring', className: 'bg-ring' },
]

const chartColors = [
  { name: 'chart-1', className: 'bg-chart-1' },
  { name: 'chart-2', className: 'bg-chart-2' },
  { name: 'chart-3', className: 'bg-chart-3' },
  { name: 'chart-4', className: 'bg-chart-4' },
  { name: 'chart-5', className: 'bg-chart-5' },
]

export function ColorPalette() {
  return (
    <section id='colors' className='py-12'>
      <h2 className='mb-2 text-2xl font-bold'>Color Palette</h2>
      <p className='mb-8 text-muted-foreground'>
        CSS 변수 기반 테마 색상 팔레트. 다크 모드에서 자동으로 전환됩니다.
      </p>

      <div className='space-y-8'>
        {/* 시맨틱 색상 */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            시맨틱 색상 토큰
          </h3>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            {colorTokens.map((color) => (
              <div key={color.name} className='flex flex-col gap-1.5'>
                <div
                  className={`h-12 rounded-md ${color.className}`}
                />
                <div>
                  <p className='text-xs font-medium'>{color.label}</p>
                  <p className='text-xs text-muted-foreground font-mono'>
                    --{color.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 차트 색상 */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            차트 색상
          </h3>
          <div className='flex gap-3'>
            {chartColors.map((color) => (
              <div key={color.name} className='flex flex-col items-center gap-1.5'>
                <div className={`h-12 w-12 rounded-md ${color.className}`} />
                <p className='text-xs text-muted-foreground font-mono'>{color.name}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tailwind 텍스트 색상 확인 */}
        <div>
          <h3 className='mb-4 text-sm font-medium text-muted-foreground uppercase tracking-wider'>
            텍스트 색상 유틸 클래스 (TailwindCSS v4 @theme inline)
          </h3>
          <div className='flex flex-wrap gap-4 text-sm font-medium'>
            <span className='text-foreground'>text-foreground</span>
            <span className='text-primary'>text-primary</span>
            <span className='text-secondary-foreground'>text-secondary-foreground</span>
            <span className='text-muted-foreground'>text-muted-foreground</span>
            <span className='text-destructive'>text-destructive</span>
            <span className='text-accent-foreground'>text-accent-foreground</span>
          </div>
        </div>
      </div>
    </section>
  )
}

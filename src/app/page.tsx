import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { ButtonShowcase } from '@/components/sections/ButtonShowcase'
import { CardShowcase } from '@/components/sections/CardShowcase'
import { FormShowcase } from '@/components/sections/FormShowcase'
import { AlertShowcase } from '@/components/sections/AlertShowcase'
import { ColorPalette } from '@/components/sections/ColorPalette'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />

      <main className='container mx-auto max-w-6xl px-4'>
        <HeroSection />
        <Separator />
        <ButtonShowcase />
        <Separator />
        <CardShowcase />
        <Separator />
        <FormShowcase />
        <Separator />
        <AlertShowcase />
        <Separator />
        <ColorPalette />
      </main>

      <Footer />
    </div>
  )
}

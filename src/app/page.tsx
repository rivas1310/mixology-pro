import { Hero } from '@/components/sections/Hero'
import { FeaturedCocktails } from '@/components/sections/FeaturedCocktails'
import { Categories } from '@/components/sections/Categories'
import { SpiritsShowcase } from '@/components/sections/SpiritsShowcase'
import { BeerShowcase } from '@/components/sections/BeerShowcase'
import { WineShowcase } from '@/components/sections/WineShowcase'
import { IngredientsSearch } from '@/components/sections/IngredientsSearch'
import { Stats } from '@/components/sections/Stats'
import { Testimonials } from '@/components/sections/Testimonials'
import { Newsletter } from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <FeaturedCocktails />
      <Categories />
      <SpiritsShowcase />
      <BeerShowcase />
      <WineShowcase />
      <IngredientsSearch />
      <Testimonials />
      <Newsletter />
    </main>
  )
}


import { Hero } from '@/components/sections/Hero'
import { FeaturedCocktails } from '@/components/sections/FeaturedCocktails'
import { Categories } from '@/components/sections/Categories'
import CocktailFinder from '@/components/sections/CocktailFinder'
import { Newsletter } from '@/components/sections/Newsletter'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="section-divider mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
      <CocktailFinder />
      <div className="section-divider mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
      <FeaturedCocktails />
      <div className="section-divider mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" />
      <Categories />
      <Newsletter />
    </main>
  )
}

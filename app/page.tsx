export const revalidate = 60 // ISR: re-fetch products every 60s

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import Story from '@/components/Story'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import AmbientParticles from '@/components/AmbientParticles'
import { fetchProducts, countByCategory } from '@/lib/fetchProducts'

export default async function Home() {
  const allProducts = await fetchProducts()
  const featured = allProducts.filter((p) => p.featured)
  const counts = countByCategory(allProducts)

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <AmbientParticles />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Categories counts={counts} />
          <FeaturedProducts products={featured} />
          <Story />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </div>
  )
}

import { fetchProducts } from '@/lib/fetchProducts'
import ShopClient from './ShopClient'

export const revalidate = 60 // ISR: rebuild at most every 60s

export default async function ShopPage() {
  const products = await fetchProducts()
  return <ShopClient initialProducts={products} />
}

// Server-only. Never import this from client components.
import 'server-only'
import { adminClient } from '@/lib/supabase/admin'
import type { Product } from '@/lib/products'

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await adminClient
    .from('products')
    .select('*')
    .eq('active', true)
    .order('category')
    .order('name')
  if (error || !data) return []
  return data as Product[]
}

export async function fetchFeatured(): Promise<Product[]> {
  const { data, error } = await adminClient
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('name')
  if (error || !data) return []
  return data as Product[]
}

export type CategoryCounts = Record<string, number>

export function countByCategory(products: Product[]): CategoryCounts {
  return products.reduce<CategoryCounts>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1
    return acc
  }, {})
}

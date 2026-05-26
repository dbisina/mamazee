// Client-safe: types and static UI metadata only.
// For actual product data, use lib/fetchProducts.ts (server-only).

export interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  description: string
  image: string
  featured?: boolean
  tag?: string | null
  stock_quantity?: number
  active?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export const categories: Category[] = [
  {
    id: 'pantry',
    name: 'Pantry Staples',
    description: 'Garri, palm oil, fufu, stockfish, crayfish',
    image: '/images/category-pantry.jpg',
  },
  {
    id: 'spices',
    name: 'Spices & Peppers',
    description: 'Uziza, ehuru, uda, suya spice',
    image: '/images/category-spices.jpg',
  },
  {
    id: 'snacks',
    name: 'Snacks & Drinks',
    description: 'Chin chin, puff puff, zobo, kunu',
    image: '/images/category-snacks.jpg',
  },
  {
    id: 'beauty',
    name: 'Hair & Beauty',
    description: 'Shea butter, black soap, natural oils',
    image: '/images/category-beauty.jpg',
  },
]

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  image: string;
  featured?: boolean;
  tag?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: "pantry",
    name: "Pantry Staples",
    description: "Garri, palm oil, fufu, stockfish, crayfish",
    image: "/images/category-pantry.jpg",
    count: 48,
  },
  {
    id: "spices",
    name: "Spices & Peppers",
    description: "Uziza, ehuru, uda, suya spice",
    image: "/images/category-spices.jpg",
    count: 32,
  },
  {
    id: "snacks",
    name: "Snacks & Drinks",
    description: "Chin chin, puff puff, zobo, kunu",
    image: "/images/category-snacks.jpg",
    count: 24,
  },
  {
    id: "beauty",
    name: "Hair & Beauty",
    description: "Shea butter, black soap, natural oils",
    image: "/images/category-beauty.jpg",
    count: 18,
  },
];

export const products: Product[] = [
  // Pantry
  { id: "palm-oil-1l", name: "Red Palm Oil", category: "pantry", price: 18.95, unit: "1L", description: "Cold-pressed red palm oil from West Africa. Deep colour, full-bodied flavour.", image: "https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=600&q=80", featured: true, tag: "Bestseller" },
  { id: "garri-white-2kg", name: "White Garri (Ijebu)", category: "pantry", price: 14.95, unit: "2kg", description: "Fine-grained Ijebu garri. Soaks to silky smooth eba every time.", image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80", featured: true },
  { id: "garri-yellow-2kg", name: "Yellow Garri", category: "pantry", price: 13.95, unit: "2kg", description: "Toasted yellow garri with a rich cassava flavour. Perfect for drinking cold.", image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80", featured: false },
  { id: "fufu-500g", name: "Fufu Powder", category: "pantry", price: 11.95, unit: "500g", description: "Smooth, stretchy fufu every time. Just add hot water.", image: "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=600&q=80", featured: false },
  { id: "egusi-500g", name: "Ground Egusi", category: "pantry", price: 16.95, unit: "500g", description: "Stone-ground melon seeds. Nutty and rich: the soul of egusi soup.", image: "https://images.unsplash.com/photo-1612257999756-58bc4f1e4393?w=600&q=80", featured: false, tag: "Popular" },
  { id: "stockfish-500g", name: "Stockfish Pieces", category: "pantry", price: 24.95, unit: "500g", description: "Norwegian-dried stockfish. Gives depth to any pot of soup.", image: "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=600&q=80", featured: false },
  { id: "ofe-onugbu-leaf", name: "Bitter Leaf (Onugbu)", category: "pantry", price: 8.95, unit: "100g", description: "Dried bitter leaf, essential for ofe onugbu and Igbo soups.", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80", featured: false },
  { id: "ogbono-200g", name: "Ogbono Seeds", category: "pantry", price: 19.95, unit: "200g", description: "Wild mango seeds. Creates that irresistible draw soup texture.", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80", featured: false },
  // Spices
  { id: "crayfish-ground-200g", name: "Ground Crayfish", category: "spices", price: 12.50, unit: "200g", description: "Sun-dried and stone-ground. The backbone of jollof, egusi and ofe akwu.", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80", featured: true, tag: "New" },
  { id: "suya-spice-150g", name: "Suya Spice Blend", category: "spices", price: 9.95, unit: "150g", description: "Authentic yaji mix with groundnuts, ginger, and paprika. Northern Nigeria in a jar.", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&q=80", featured: true },
  { id: "uziza-leaf-50g", name: "Uziza Leaf", category: "spices", price: 7.50, unit: "50g", description: "Peppery dried uziza, for ofe akwu, fisherman soup, and pepper soup.", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80", featured: false },
  { id: "ehuru-100g", name: "Ehuru (Calabash Nutmeg)", category: "spices", price: 8.95, unit: "100g", description: "Smoky, aromatic seeds. Essential in Igbo pepper soups and nsala.", image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&q=80", featured: false },
  { id: "uda-50g", name: "Uda (Negro Pepper)", category: "spices", price: 6.50, unit: "50g", description: "Deeply aromatic pepper used in pepper soup and banga.", image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80", featured: false },
  { id: "jollof-seasoning-80g", name: "Jollof Seasoning Mix", category: "spices", price: 5.95, unit: "80g", description: "Our signature blend: tomato, thyme, bay, and secret spices.", image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=600&q=80", featured: false, tag: "New" },
  // Snacks
  { id: "chin-chin-300g", name: "Crunchy Chin Chin", category: "snacks", price: 10.50, unit: "300g", description: "Golden, lightly sweetened. Childhood in every crunch.", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&q=80", featured: false },
  { id: "plantain-chips-150g", name: "Plantain Chips", category: "snacks", price: 7.95, unit: "150g", description: "Crisp thin-sliced plantain. Lightly salted or spiced, both available.", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80", featured: false, tag: "Popular" },
  { id: "zobo-concentrate-500ml", name: "Zobo Concentrate", category: "snacks", price: 12.95, unit: "500ml", description: "Hibiscus flower concentrate. Just dilute and serve chilled. No added preservatives.", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80", featured: false },
  { id: "kilishi-100g", name: "Kilishi (Beef Jerky)", category: "snacks", price: 14.95, unit: "100g", description: "Northern Nigerian spiced dried beef. Protein-packed, intensely flavoured.", image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80", featured: false, tag: "New" },
  // Beauty
  { id: "shea-butter-raw-500g", name: "Raw Shea Butter", category: "beauty", price: 22.00, unit: "500g", description: "Unrefined karite butter. Pure ivory grade, hand-scooped from the Sahel.", image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&q=80", featured: false, tag: "Organic" },
  { id: "black-soap-200g", name: "African Black Soap", category: "beauty", price: 15.95, unit: "200g", description: "Traditional Ose Dudu from Yoruba craftswomen. Gentle, clarifying, nourishing.", image: "https://images.unsplash.com/photo-1556228841-a3c527ebefe5?w=600&q=80", featured: false },
  { id: "coconut-oil-300ml", name: "Virgin Coconut Oil", category: "beauty", price: 18.50, unit: "300ml", description: "Cold-pressed unrefined coconut oil. Multi-use: skin, hair, cooking.", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80", featured: false },
];

export const featuredProducts = products.filter((p) => p.featured);

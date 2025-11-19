'use client'

import { useState } from 'react'
import ProductCard from './product-card'

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
  description: string
}

interface ProductShowcaseProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export default function ProductShowcase({ products, onAddToCart }: ProductShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState('Alle')

  const categories = ['Alle', ...Array.from(new Set(products.map(p => p.category)))]
  const filteredProducts = selectedCategory === 'Alle'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-xs font-light tracking-widest text-accent uppercase">Unsere Stücke</span>
          <h2 className="font-serif text-5xl sm:text-6xl font-light text-foreground mt-4 mb-6">
            Exklusive Stücke
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Eine sorgfältig kuratierte Kollektion hochwertiger Produkte
          </p>
        </div>

        <div className="mb-12 flex gap-3 justify-center flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-sm tracking-widest font-light transition-all ${
                selectedCategory === category
                  ? 'text-foreground border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

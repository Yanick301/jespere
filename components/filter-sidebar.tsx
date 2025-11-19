'use client'

import { X } from 'lucide-react'
import { Product } from '@/lib/products'

interface FilterSidebarProps {
  products: Product[]
  selectedCategory: string
  selectedSubcategory: string
  selectedPriceRange: [number, number]
  onCategoryChange: (category: string) => void
  onSubcategoryChange: (subcategory: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onClose?: () => void
}

export default function FilterSidebar({
  products,
  selectedCategory,
  selectedSubcategory,
  selectedPriceRange,
  onCategoryChange,
  onSubcategoryChange,
  onPriceRangeChange,
  onClose,
}: FilterSidebarProps) {
  const categories = Array.from(new Set(products.map(p => p.category)))
  const subcategories = selectedCategory !== 'Alle'
    ? Array.from(new Set(products.filter(p => p.category === selectedCategory).map(p => p.subcategory)))
    : Array.from(new Set(products.map(p => p.subcategory)))

  const maxPrice = Math.max(...products.map(p => p.price))
  const minPrice = Math.min(...products.map(p => p.price))

  return (
    <div className="space-y-8">
      {/* Close button for mobile */}
      {onClose && (
        <button onClick={onClose} className="md:hidden flex items-center gap-2 text-foreground hover:text-accent transition-colors">
          <X size={20} />
          Fermer les filtres
        </button>
      )}

      <div>
        <h3 className="font-serif text-lg font-light text-foreground mb-4">Catégories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('Alle')}
            className={`block w-full text-left text-sm font-light transition-colors ${
              selectedCategory === 'Alle'
                ? 'text-accent'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Alle
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`block w-full text-left text-sm font-light transition-colors ${
                selectedCategory === category
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory filter */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="font-serif text-lg font-light text-foreground mb-4">Sous-catégories</h3>
          <div className="space-y-2">
            <button
              onClick={() => onSubcategoryChange('')}
              className={`block w-full text-left text-sm font-light transition-colors ${
                selectedSubcategory === ''
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Alle
            </button>
            {subcategories.map(subcategory => (
              <button
                key={subcategory}
                onClick={() => onSubcategoryChange(subcategory)}
                className={`block w-full text-left text-sm font-light transition-colors ${
                  selectedSubcategory === subcategory
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price range filter */}
      <div>
        <h3 className="font-serif text-lg font-light text-foreground mb-4">Gamme de prix</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">€{minPrice.toFixed(0)}</span>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={selectedPriceRange[0]}
              onChange={(e) => onPriceRangeChange([Number(e.target.value), selectedPriceRange[1]])}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">€{maxPrice.toFixed(0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={selectedPriceRange[1]}
              onChange={(e) => onPriceRangeChange([selectedPriceRange[0], Number(e.target.value)])}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between text-sm font-light text-foreground">
            <span>€{selectedPriceRange[0].toFixed(0)}</span>
            <span>€{selectedPriceRange[1].toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h3 className="font-serif text-lg font-light text-foreground mb-4">Évaluation minimale</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={rating === 5}
                className="w-4 h-4 accent-accent rounded"
              />
              <span className="text-sm font-light text-muted-foreground">
                {rating}+ stars
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

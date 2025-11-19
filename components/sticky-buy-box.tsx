'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  sizes?: string[]
  colors?: string[]
  image?: string
}

export default function StickyBuyBox({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    const finalPrice = product.discount ? product.price : (product.originalPrice || product.price)
    addToCart({ id: product.id, name: product.name, price: finalPrice, image: product.image, quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 bg-card border border-border rounded-xl p-6 shadow-md">
        <div className="mb-4">
          <h2 className="font-serif text-2xl font-light text-foreground">{product.name}</h2>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="font-serif text-3xl font-light">€{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">€{product.originalPrice.toFixed(2)}</span>
            )}
            {product.discount && (
              <span className="text-sm text-accent font-bold">-{product.discount}%</span>
            )}
          </div>
        </div>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <label className="text-xs text-muted-foreground uppercase tracking-widest">Taille</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-2 border rounded text-sm ${selectedSize === size ? 'border-accent bg-accent text-accent-foreground' : 'border-border'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors && product.colors.length > 0 && (
          <div className="mb-4">
            <label className="text-xs text-muted-foreground uppercase tracking-widest">Couleur</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-2 border rounded text-sm ${selectedColor === color ? 'border-accent bg-accent text-accent-foreground' : 'border-border'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center border border-border rounded">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2">−</button>
            <div className="px-4 py-2">{quantity}</div>
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2">+</button>
          </div>
        </div>

        <button onClick={handleAdd} className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-accent text-primary font-semibold shadow hover:scale-105 transition-transform ${added ? 'opacity-80' : ''}`}>
          <ShoppingCart /> {added ? 'Ajouté' : 'Ajouter au panier'}
        </button>

        <div className="mt-4 text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Livraison</span>
            <span className="text-xs">Express disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Retour</span>
            <span className="text-xs">Gratuit sous 30 jours</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

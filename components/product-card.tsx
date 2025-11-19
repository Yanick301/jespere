'use client'

import { Star, ShoppingCart, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  category: string
  image: string
  description: string
  rating?: number
  reviews?: number
}

interface ProductCardProps {
  product: any // Using any to support both static and DB products for now
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { language } = useLanguage()
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product.id)
  }

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-lg relative">
      <Link href={`/product/${product.id}`} className="block relative h-72 bg-muted overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 z-10"
          aria-label="Add to wishlist"
        >
          <Heart size={18} className={isWishlisted ? "fill-accent text-accent" : "text-foreground"} />
        </button>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.discount && (
            <div className="bg-accent text-accent-foreground px-3 py-1 text-xs font-bold tracking-widest">
              -{product.discount}%
            </div>
          )}
          <div className="bg-foreground/90 text-background px-3 py-1 text-xs font-light tracking-widest">
            {product.category}
          </div>
        </div>
      </Link>

      <div className="p-6 flex flex-col justify-between h-auto">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-serif text-lg font-light text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground font-light mb-3 line-clamp-2">
            {product.description}
          </p>
          {product.reviews && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating || 4) ? 'fill-accent text-accent' : 'text-border'}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-light">({product.reviews})</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
          <div className="flex flex-col gap-1">
            <span className="font-serif text-xl text-foreground font-light">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="text-foreground hover:text-accent transition-colors group/btn p-2 hover:bg-muted rounded-lg"
            aria-label={`Ajouter au panier: ${product.name}`}
          >
            <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

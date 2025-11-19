'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  description?: string
}

export default function ProductCardVariant({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
      <Link href={`/product/${product.id}`} className="relative block overflow-hidden aspect-[4/5] bg-gray-50">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        {product.discount && (
          <span className="absolute top-3 left-3 bg-accent text-primary px-3 py-1 rounded-full text-xs font-semibold">-{product.discount}%</span>
        )}
      </Link>

      <div className="p-4 md:p-6">
        <h3 className="font-serif text-lg text-primary mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-medium">€{product.price.toFixed(2)}</div>
            {product.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">€{product.originalPrice.toFixed(2)}</div>
            )}
          </div>

          <button
            onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 })}
            className="inline-flex items-center justify-center rounded-lg bg-primary text-white p-3 hover:scale-105 transition-transform"
            aria-label={`In den Warenkorb: ${product.name}`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </article>
  )
}

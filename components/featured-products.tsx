'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'
import { getFeaturedProducts, Product } from '@/lib/supabase-products'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    async function loadProducts() {
      const data = await getFeaturedProducts(language, 8)
      setProducts(data)
      setLoading(false)
    }
    loadProducts()
  }, [language])

  if (loading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-light tracking-[0.3em] text-accent uppercase mb-4">
              {t(language, 'home.featured')}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-foreground">
              {t(language, 'home.featuredSubtitle')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-light tracking-[0.3em] text-accent uppercase mb-4">
            {t(language, 'home.featured')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-4">
            {t(language, 'home.featuredSubtitle')}
          </h2>
          <div className="w-24 h-px bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <button className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-4 h-4 text-foreground" />
                </button>

                {product.isNew && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-xs font-medium tracking-wider rounded-full">
                    NEW
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-light text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="font-serif text-lg text-foreground">
                  €{product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/?featured=true"
            className="inline-block px-12 py-4 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 tracking-[0.2em] text-sm font-light rounded-lg"
          >
            {t(language, 'home.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}

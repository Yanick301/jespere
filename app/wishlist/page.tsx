'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useWishlist } from '@/lib/wishlist-context'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'
import ProductCard from '@/components/product-card'
import { createBrowserClient } from '@supabase/ssr'

export default function WishlistPage() {
  const { wishlistItems, isLoading } = useWishlist()
  const { language } = useLanguage()
  const [products, setProducts] = useState<any[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlistItems.length === 0) {
        setProducts([])
        return
      }

      setLoadingProducts(true)
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data } = await supabase
        .from('products')
        .select('*')
        .in('id', wishlistItems)

      if (data) {
        setProducts(data)
      }
      setLoadingProducts(false)
    }

    fetchProducts()
  }, [wishlistItems])

  if (isLoading || loadingProducts) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-24 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-secondary/20 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[3/4] bg-secondary/10 rounded-md w-64"></div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (products.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-3xl font-light text-foreground mb-4">{t(language, 'wishlist.empty')}</h2>
          <p className="text-muted-foreground mb-8 max-w-md font-light">{t(language, 'wishlist.emptyDesc')}</p>
          <Link href="/" className="btn-luxury-filled px-8 py-3 flex items-center gap-2">
            {t(language, 'cart.continueShopping')}
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-light text-foreground mb-4 text-center">{t(language, 'wishlist.title')}</h1>
      <p className="text-center text-muted-foreground font-light mb-12">{products.length} {t(language, 'wishlist.items')}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

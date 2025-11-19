'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Newsletter from '@/components/newsletter'
import HeroSlider from '@/components/hero-slider'
import FeaturedProducts from '@/components/featured-products'
import CategoryShowcase from '@/components/category-showcase'
import EditorialSection from '@/components/editorial-section'
import CategoryBanner from '@/components/category-banner'
import ProductCard from '@/components/product-card'
import SortFilter, { SortOption } from '@/components/sort-filter'
import LookbookGrid from '@/components/lookbook-grid'
import MagazineArticles from '@/components/magazine-articles'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'
import { getAllProducts, getProductsByCategory, searchProducts, Product, getCategories } from '@/lib/supabase-products'
import Cart from '@/components/cart'

export default function Home() {
  const { items, addToCart, removeFromCart, updateQuantity } = useCart()
  const { language } = useLanguage()
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showProductView, setShowProductView] = useState(false)
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      const cats = await getCategories()
      setCategories(cats)
    }
    loadCategories()
  }, [])

  // Handle URL params
  useEffect(() => {
    const cat = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    if (cat) {
      setSelectedCategory(decodeURIComponent(cat))
      setShowProductView(true)
    } else if (search) {
      setSearchQuery(search)
      setShowProductView(true)
    } else if (featured) {
      setShowProductView(true)
    } else {
      setShowProductView(false)
      setSelectedCategory(null)
      setSearchQuery('')
    }
  }, [searchParams])

  // Load products based on filters
  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      let results: Product[] = []

      if (searchQuery) {
        results = await searchProducts(searchQuery, language)
      } else if (selectedCategory) {
        results = await getProductsByCategory(selectedCategory, language)
      } else {
        results = await getAllProducts(language)
      }

      // Sort products
      const sorted = [...results].sort((a, b) => {
        switch (sortOption) {
          case 'price-low':
            return a.price - b.price
          case 'price-high':
            return b.price - a.price
          case 'name':
            return a.name.localeCompare(b.name)
          case 'newest':
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
          case 'oldest':
            return (a.isNew ? 1 : 0) - (b.isNew ? 1 : 0)
          default:
            return 0
        }
      })

      setProducts(sorted)
      setLoading(false)
    }

    if (showProductView) {
      loadProducts()
    }
  }, [selectedCategory, searchQuery, sortOption, language, showProductView])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: parseInt(product.id) || 0,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
  }

  if (showCart) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={items.length} onCartClick={() => setShowCart(!showCart)} />
        <Cart items={items} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
      </div>
    )
  }

  if (!showProductView) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={items.length} onCartClick={() => setShowCart(true)} />
        
        <main>
          <HeroSlider />
          <LookbookGrid />
          <FeaturedProducts />
          <MagazineArticles />
          <CategoryShowcase />
          <EditorialSection />
          <Newsletter />
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={items.length} onCartClick={() => setShowCart(true)} />

      {selectedCategory && <CategoryBanner category={selectedCategory} />}

      <section className="py-16 bg-background min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedCategory && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
              <div>
                <button
                  onClick={() => {
                    router.push('/')
                    setShowProductView(false)
                    setSelectedCategory(null)
                    setSearchQuery('')
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 font-light tracking-widest flex items-center gap-2 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour à l'accueil
                </button>
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-foreground capitalize">
                  {searchQuery ? `"${searchQuery}"` : t(language, 'home.allProducts')}
                </h2>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-2xl relative">
              <input
                type="text"
                placeholder={t(language, 'header.search')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (e.target.value) {
                    router.push(`/?search=${encodeURIComponent(e.target.value)}`)
                  } else if (selectedCategory) {
                    router.push(`/?category=${encodeURIComponent(selectedCategory)}`)
                  } else {
                    router.push('/')
                  }
                }}
                className="w-full px-6 py-4 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent font-light transition-all"
              />
            </div>
          </div>

          {/* Sort Filter */}
          <SortFilter 
            onSortChange={setSortOption} 
            currentSort={sortOption}
            productCount={products.length}
          />

          {/* Category Filters */}
          <div className="mb-12 flex gap-2 justify-center flex-wrap">
            <button
              onClick={() => { 
                setSelectedCategory(null)
                setSearchQuery('')
                router.push('/?featured=true') 
              }}
              className={`px-6 py-2 text-sm tracking-widest font-light transition-all ${
                !selectedCategory
                  ? 'text-foreground border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
              }`}
            >
              Tous
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => { 
                  setSelectedCategory(category)
                  setSearchQuery('')
                  router.push(`/?category=${encodeURIComponent(category)}`) 
                }}
                className={`px-6 py-2 text-sm tracking-widest font-light transition-all capitalize ${
                  selectedCategory === category
                    ? 'text-foreground border-b-2 border-accent'
                    : 'text-muted-foreground hover:text-foreground border-b-2 border-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard
                    product={{
                      ...product,
                      id: parseInt(product.id) || 0,
                      image: product.images[0],
                      rating: 5,
                      reviews: 0,
                      quantity: product.stock,
                      subcategory: product.subcategory || '',
                      longDescription: product.description
                    }}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg mb-6">Aucun produit trouvé</p>
              <button
                onClick={() => { 
                  setSearchQuery('')
                  setSelectedCategory(null)
                  router.push('/')
                }}
                className="px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all font-light tracking-widest hover:scale-105 rounded-lg"
              >
                Réinitialiser
              </button>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}

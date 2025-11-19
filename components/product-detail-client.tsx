"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart, ArrowLeft, Truck, RotateCcw, Shield, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'
import ProductCard from '@/components/product-card'

export default function ProductDetailClient({ product, relatedProducts = [] }: { product: any; relatedProducts?: any[] }) {
  const { addToCart } = useCart()
  const { language } = useLanguage()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '')
  const [addedToCart, setAddedToCart] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) return <div className="p-8 text-center">{t(language, 'product.notFound')}</div>

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image]

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      name: product.translations?.[language]?.name || product.name, 
      price: product.price, 
      image: productImages[0], 
      quantity,
      size: selectedSize,
      color: selectedColor
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  const productName = product.translations?.[language]?.name || product.name
  const productDescription = product.translations?.[language]?.description || product.description

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-accent transition-colors">{t(language, 'nav.home')}</Link>
          <span>/</span>
          <Link href={`/?category=${product.category}`} className="hover:text-accent transition-colors capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{productName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-4">
            <div className="relative bg-secondary/5 rounded-lg overflow-hidden aspect-[3/4] group">
              <Image 
                src={productImages[selectedImageIndex] || '/placeholder.svg'} 
                alt={productName} 
                fill 
                className="object-cover" 
                priority 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
              
              {productImages.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {productImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {productImages.length}
                </div>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedImageIndex(i)}
                    className={`bg-secondary/5 rounded-lg overflow-hidden aspect-square relative transition-all ${
                      selectedImageIndex === i ? 'ring-2 ring-accent' : 'hover:ring-2 hover:ring-accent/50'
                    }`}
                  >
                    <Image src={img || '/placeholder.svg'} alt={`${productName} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <span className="inline-block text-xs font-light tracking-widest text-accent uppercase bg-accent/10 px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="font-serif text-4xl lg:text-5xl font-light text-foreground leading-tight">{productName}</h1>
              </div>
              <div className="flex gap-2 ml-4">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full border transition-colors ${
                    isWishlisted ? 'bg-accent text-white border-accent' : 'border-border hover:border-accent'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>
                <button className="p-3 rounded-full border border-border hover:border-accent transition-colors" aria-label="Share">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(product.rating || 4.5) ? 'fill-accent text-accent' : 'text-border'} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating?.toFixed(1)} ({product.reviews || 0} {t(language, 'product.reviews')})
              </span>
            </div>

            <p className="text-lg text-muted-foreground font-light mb-8 leading-relaxed">
              {productDescription}
            </p>

            <div className="mb-8 pb-8 border-b border-border">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl font-light text-foreground">€{product.price.toFixed(2)}</span>
                {product.original_price && product.original_price > product.price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through font-light">
                      €{product.original_price.toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                      -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t(language, 'product.taxIncluded')}</p>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-light tracking-widest text-foreground uppercase">
                    {t(language, 'product.size')}
                  </label>
                  <button className="text-sm text-accent hover:underline">{t(language, 'product.sizeGuide')}</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size: string) => (
                    <button 
                      key={size} 
                      onClick={() => setSelectedSize(size)} 
                      className={`px-4 py-3 border text-sm font-light transition-all ${
                        selectedSize === size 
                          ? 'border-accent bg-accent text-white' 
                          : 'border-border hover:border-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <label className="text-sm font-light tracking-widest text-foreground uppercase mb-3 block">
                  {t(language, 'product.color')}: <span className="text-accent">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color: string) => (
                    <button 
                      key={color} 
                      onClick={() => setSelectedColor(color)} 
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-accent scale-110' : 'border-border hover:border-accent/50'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="px-4 py-3 hover:bg-secondary/10 transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-3 font-light text-foreground border-x border-border min-w-[60px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="px-4 py-3 hover:bg-secondary/10 transition-colors"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart} 
                disabled={addedToCart}
                className={`flex-1 btn-luxury-filled flex items-center justify-center gap-2 transition-all ${
                  addedToCart ? 'bg-green-600 hover:bg-green-600 text-white' : ''
                }`}
              >
                {addedToCart ? (
                  <>✓ {t(language, 'product.addedToCart')}</>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    {t(language, 'product.addToCart')}
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4 pt-8 border-t border-border">
              <div className="flex gap-4">
                <Truck size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">{t(language, 'product.freeShipping')}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(language, 'product.freeShippingFrom')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <RotateCcw size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">{t(language, 'product.freeReturn')}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(language, 'product.freeReturnWithin')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">{t(language, 'product.warranty')}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(language, 'product.warrantyFull')}</p>
                </div>
              </div>
            </div>

            {product.material && (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-sm font-light tracking-widest uppercase mb-3">{t(language, 'product.composition')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.material}</p>
              </div>
            )}
          </div>
        </div>

        {relatedProducts && relatedProducts.length > 0 && (
          <div className="border-t border-border pt-16">
            <h2 className="font-serif text-3xl font-light text-center mb-12">
              {t(language, 'product.youMayAlsoLike')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct: any) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

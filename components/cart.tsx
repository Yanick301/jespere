"use client"

import { Trash2, Plus, Minus, ShoppingBag, Lock, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'
import { CartItem } from '@/lib/cart-context'

interface CartProps {
  items: CartItem[]
  onRemove: (productId: number, size?: string, color?: string) => void
  onUpdateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void
}

export default function Cart({ items, onRemove, onUpdateQuantity }: CartProps) {
  const { language } = useLanguage()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 25 // Luxury shipping threshold
  const tax = subtotal * 0.20
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-3xl font-light text-foreground mb-4">{t(language, 'cart.empty')}</h2>
          <p className="text-muted-foreground mb-8 max-w-md font-light">{t(language, 'cart.continueShopping')}</p>
          <Link href="/" className="btn-luxury-filled px-8 py-3 flex items-center gap-2">
            {t(language, 'cart.continueShopping')}
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-light text-foreground mb-12 text-center">{t(language, 'cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex gap-6 border-b border-border pb-6 last:border-0">
                <div className="relative w-32 aspect-[3/4] bg-secondary/5 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl font-light text-foreground">{item.name}</h3>
                      <p className="font-serif text-xl font-light text-foreground">€{item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="text-sm text-muted-foreground font-light space-y-1 mb-4">
                      {item.size && <p>{t(language, 'product.size')}: <span className="text-foreground">{item.size}</span></p>}
                      {item.color && <p>{t(language, 'product.color')}: <span className="text-foreground">{item.color}</span></p>}
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-border rounded-md">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                        className="p-2 hover:bg-secondary/10 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 font-light text-foreground min-w-[40px] text-center border-x border-border">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                        className="p-2 hover:bg-secondary/10 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemove(item.id, item.size, item.color)}
                      className="text-muted-foreground hover:text-destructive transition-colors text-sm underline decoration-1 underline-offset-4"
                    >
                      {t(language, 'cart.remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-secondary/5 p-8 rounded-lg sticky top-24">
            <h2 className="font-serif text-2xl font-light text-foreground mb-6">{t(language, 'cart.summary')}</h2>

            <div className="space-y-4 mb-8 pb-8 border-b border-border/50">
              <div className="flex justify-between text-foreground font-light">
                <span>{t(language, 'cart.subtotal')}</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground font-light">
                <span>{t(language, 'cart.shipping')}</span>
                <span className={shipping === 0 ? 'text-accent' : ''}>
                  {shipping === 0 ? t(language, 'product.freeShipping') : `€${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm font-light">
                <span>{t(language, 'product.taxIncluded')}</span>
                <span>€{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <span className="text-xl font-medium text-foreground">{t(language, 'cart.total')}</span>
              <span className="font-serif text-2xl font-light text-foreground">€{total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="w-full btn-luxury-filled py-4 flex items-center justify-center gap-2 mb-4 text-lg">
              <Lock size={18} />
              {t(language, 'cart.checkout')}
            </Link>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6">
              <Shield size={14} />
              <span>{t(language, 'product.securePayment')}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

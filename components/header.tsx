'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, LogOut, User, Heart, Search } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { getCategories } from '@/lib/products'
import LanguageSelector from './language-selector'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'

interface HeaderProps {
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { language } = useLanguage()
  const { getTotalItems } = useCart()
  const { wishlistItems } = useWishlist()
  const cartCount = getTotalItems()

  useEffect(() => {
    let mounted = true

    const getUser = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        if (mounted) setUser(data.user ?? null)
      } catch (e) {
        if (mounted) setUser(null)
      }
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return
      if (event === 'SIGNED_IN') {
        setUser(session?.user ?? null)
      }
      if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMobileMenuOpen(false)
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 35L40 50L25 65" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M75 35L60 50L75 65" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6"/>
              <circle cx="50" cy="50" r="3" fill="currentColor"/>
            </svg>
            <div>
              <div className="text-xl font-serif font-bold text-foreground tracking-widest">EZCENTIALS</div>
              <div className="text-xs text-accent tracking-widest font-light">COLLECTION</div>
            </div>
          </Link>

          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-sm font-light text-foreground hover:text-accent transition-colors tracking-wide">
              {t(language, 'nav.home')}
            </Link>
            {useMemo(() => {
              const cats = getCategories()
              return cats.map(cat => (
                <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`} className="text-sm font-light text-foreground hover:text-accent transition-colors tracking-wide">
                  {cat.toUpperCase()}
                </Link>
              ))
            }, [language])}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            <button className="p-2 hover:bg-secondary/10 rounded-full transition-colors hidden md:block">
              <Search size={20} className="text-foreground" />
            </button>
            
            <Link href="/wishlist" className="relative p-2 hover:bg-secondary/10 rounded-full transition-colors hidden md:block">
              <Heart size={20} className="text-foreground" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative p-2 hover:text-accent transition-colors group"
              aria-label={t(language, 'header.cart')}
            >
              <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t(language, 'header.logout')}
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-4">
                <Link
                  href="/auth/login"
                  className="text-sm text-foreground hover:text-accent transition-colors"
                >
                  {t(language, 'header.login')}
                </Link>
                <Link href="/auth/signup" className="text-sm px-4 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">
                  {t(language, 'header.signup')}
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:text-accent transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 border-t border-border mt-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-light text-foreground hover:text-accent transition-colors tracking-wide">
              {t(language, 'nav.home')}
            </Link>
            {getCategories().map(cat => (
              <Link key={cat} href={`/?category=${encodeURIComponent(cat)}`} className="text-sm font-light text-foreground hover:text-accent transition-colors tracking-wide">
                {cat}
              </Link>
            ))}
            <div className="pt-2 border-t border-border">
              <LanguageSelector />
            </div>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm text-foreground hover:text-accent transition-colors text-left flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t(language, 'header.logout')}
              </button>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-foreground hover:text-accent transition-colors">
                  {t(language, 'header.login')}
                </Link>
                <Link href="/auth/signup" className="text-sm text-foreground hover:text-accent transition-colors">
                  {t(language, 'header.signup')}
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

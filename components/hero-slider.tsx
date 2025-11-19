'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'

const heroSlides = [
  {
    id: 1,
    image: '/luxury-fashion-model-elegant-dress.jpg',
    title: { fr: 'Nouvelle Collection', en: 'New Collection', es: 'Nueva Colección', de: 'Neue Kollektion', it: 'Nuova Collezione' },
    subtitle: { fr: 'Élégance Intemporelle', en: 'Timeless Elegance', es: 'Elegancia Atemporal', de: 'Zeitlose Eleganz', it: 'Eleganza Senza Tempo' },
    cta: 'femme',
  },
  {
    id: 2,
    image: '/luxury-mens-fashion-suit.jpg',
    title: { fr: 'Collection Homme', en: 'Men\'s Collection', es: 'Colección Hombre', de: 'Herrenkollektion', it: 'Collezione Uomo' },
    subtitle: { fr: 'Raffinement Masculin', en: 'Masculine Refinement', es: 'Refinamiento Masculino', de: 'Männliche Raffinesse', it: 'Raffinatezza Maschile' },
    cta: 'homme',
  },
  {
    id: 3,
    image: '/luxury-accessories-leather-bag.jpg',
    title: { fr: 'Accessoires', en: 'Accessories', es: 'Accesorios', de: 'Accessoires', it: 'Accessori' },
    subtitle: { fr: 'Détails Précieux', en: 'Precious Details', es: 'Detalles Preciosos', de: 'Kostbare Details', it: 'Dettagli Preziosi' },
    cta: 'accessoires',
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title[language]}
            fill
            priority={index === 0}
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <p className="text-sm font-light tracking-[0.3em] text-white/90 uppercase mb-4 animate-fade-in">
                  {t(language, 'home.welcome')}
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight animate-fade-in" style={{animationDelay: '0.2s'}}>
                  {slide.title[language]}
                </h1>
                <p className="text-xl sm:text-2xl text-white/90 font-light mb-8 leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
                  {slide.subtitle[language]}
                </p>
                <Link
                  href={`/?category=${slide.cta}`}
                  className="inline-block px-12 py-4 bg-white text-foreground hover:bg-accent hover:text-white transition-all duration-300 tracking-[0.2em] text-sm font-medium rounded-lg shadow-2xl hover:shadow-accent/50 hover:scale-105 animate-fade-in"
                  style={{animationDelay: '0.6s'}}
                >
                  {t(language, 'home.discoverCollection')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-12 bg-white' : 'w-8 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'

const categories = [
  {
    id: 'femme',
    name: { fr: 'Femme', en: 'Women', es: 'Mujer', de: 'Damen', it: 'Donna' },
    image: '/luxury-womens-fashion-elegant.jpg',
    description: { 
      fr: 'Découvrez notre collection raffinée pour femmes', 
      en: 'Discover our refined women\'s collection',
      es: 'Descubre nuestra refinada colección para mujeres',
      de: 'Entdecken Sie unsere raffinierte Damenkollektion',
      it: 'Scopri la nostra raffinata collezione donna'
    },
  },
  {
    id: 'homme',
    name: { fr: 'Homme', en: 'Men', es: 'Hombre', de: 'Herren', it: 'Uomo' },
    image: '/luxury-mens-fashion-suit.jpg',
    description: { 
      fr: 'Explorez notre sélection masculine sophistiquée', 
      en: 'Explore our sophisticated men\'s selection',
      es: 'Explora nuestra sofisticada selección masculina',
      de: 'Erkunden Sie unsere raffinierte Herrenauswahl',
      it: 'Esplora la nostra sofisticata selezione maschile'
    },
  },
  {
    id: 'accessoires',
    name: { fr: 'Accessoires', en: 'Accessories', es: 'Accesorios', de: 'Accessoires', it: 'Accessori' },
    image: '/luxury-accessories-leather-goods.jpg',
    description: { 
      fr: 'Sublimez votre style avec nos accessoires', 
      en: 'Elevate your style with our accessories',
      es: 'Eleva tu estilo con nuestros accesorios',
      de: 'Veredeln Sie Ihren Stil mit unseren Accessoires',
      it: 'Eleva il tuo stile con i nostri accessori'
    },
  },
  {
    id: 'fitness',
    name: { fr: 'Fitness', en: 'Fitness', es: 'Fitness', de: 'Fitness', it: 'Fitness' },
    image: 'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&w=1200&q=80',
    description: {
      fr: 'Performance premium et silhouettes athlétiques',
      en: 'Premium performance and athletic silhouettes',
      es: 'Rendimiento premium y siluetas atléticas',
      de: 'Premium-Performance und athletische Silhouetten',
      it: 'Performance premium e silhouette atletiche',
    },
  },
]

export default function CategoryShowcase() {
  const { language } = useLanguage()

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name[language]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-serif text-3xl sm:text-4xl font-light text-white mb-2">
                  {category.name[language]}
                </h3>
                <p className="text-white/90 font-light mb-6">
                  {category.description[language]}
                </p>
                <span className="inline-flex items-center text-white font-light tracking-[0.2em] text-sm group-hover:gap-3 transition-all duration-300">
                  {t(language, 'home.shopNow')}
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

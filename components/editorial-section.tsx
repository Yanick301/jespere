'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

export default function EditorialSection() {
  const { language } = useLanguage()

  const content = {
    fr: {
      subtitle: 'L\'Art du Luxe',
      title: 'Créations Exceptionnelles',
      description: 'Chaque pièce de notre collection est soigneusement sélectionnée pour son excellence artisanale et son design intemporel. Nous célébrons l\'art de la mode de luxe avec des créations qui transcendent les tendances.',
      cta: 'Découvrir Notre Histoire',
    },
    en: {
      subtitle: 'The Art of Luxury',
      title: 'Exceptional Creations',
      description: 'Each piece in our collection is carefully selected for its artisanal excellence and timeless design. We celebrate the art of luxury fashion with creations that transcend trends.',
      cta: 'Discover Our Story',
    },
    es: {
      subtitle: 'El Arte del Lujo',
      title: 'Creaciones Excepcionales',
      description: 'Cada pieza de nuestra colección es cuidadosamente seleccionada por su excelencia artesanal y diseño atemporal. Celebramos el arte de la moda de lujo con creaciones que trascienden las tendencias.',
      cta: 'Descubre Nuestra Historia',
    },
    de: {
      subtitle: 'Die Kunst des Luxus',
      title: 'Außergewöhnliche Kreationen',
      description: 'Jedes Stück unserer Kollektion wird sorgfältig nach handwerklicher Exzellenz und zeitlosem Design ausgewählt. Wir feiern die Kunst der Luxusmode mit Kreationen, die Trends überschreiten.',
      cta: 'Entdecken Sie Unsere Geschichte',
    },
    it: {
      subtitle: 'L\'Arte del Lusso',
      title: 'Creazioni Eccezionali',
      description: 'Ogni pezzo della nostra collezione è accuratamente selezionato per la sua eccellenza artigianale e il design senza tempo. Celebriamo l\'arte della moda di lusso con creazioni che trascendono le tendenze.',
      cta: 'Scopri La Nostra Storia',
    },
  }

  const text = content[language]

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="/luxury-fashion-atelier-craftsmanship.jpg"
              alt="Editorial"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-light tracking-[0.3em] text-accent uppercase mb-4">
                {text.subtitle}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-6 leading-tight">
                {text.title}
              </h2>
              <div className="w-24 h-px bg-accent mb-8" />
            </div>

            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              {text.description}
            </p>

            <Link
              href="/about"
              className="inline-block px-12 py-4 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 tracking-[0.2em] text-sm font-light rounded-lg"
            >
              {text.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

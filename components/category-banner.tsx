'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'

interface CategoryBannerProps {
  category: string
}

const categoryData = {
  femme: {
    image: '/luxury-womens-fashion-elegant.jpg',
    title: {
      fr: 'Collection Femme',
      en: 'Women\'s Collection',
      es: 'Colección Mujer',
      de: 'Damenkollektion',
      it: 'Collezione Donna',
    },
    subtitle: {
      fr: 'Élégance & Raffinement',
      en: 'Elegance & Refinement',
      es: 'Elegancia y Refinamiento',
      de: 'Eleganz & Raffinesse',
      it: 'Eleganza & Raffinatezza',
    },
    description: {
      fr: 'Découvrez notre collection exclusive de pièces féminines, où chaque création incarne l\'élégance intemporelle et le savoir-faire d\'exception.',
      en: 'Discover our exclusive collection of feminine pieces, where each creation embodies timeless elegance and exceptional craftsmanship.',
      es: 'Descubre nuestra colección exclusiva de piezas femeninas, donde cada creación encarna la elegancia atemporal y la artesanía excepcional.',
      de: 'Entdecken Sie unsere exklusive Kollektion femininer Stücke, wo jede Kreation zeitlose Eleganz und außergewöhnliche Handwerkskunst verkörpert.',
      it: 'Scopri la nostra collezione esclusiva di pezzi femminili, dove ogni creazione incarna eleganza senza tempo e artigianato eccezionale.',
    },
  },
  homme: {
    image: '/luxury-mens-fashion-suit.jpg',
    title: {
      fr: 'Collection Homme',
      en: 'Men\'s Collection',
      es: 'Colección Hombre',
      de: 'Herrenkollektion',
      it: 'Collezione Uomo',
    },
    subtitle: {
      fr: 'Sophistication Masculine',
      en: 'Masculine Sophistication',
      es: 'Sofisticación Masculina',
      de: 'Männliche Raffinesse',
      it: 'Sofisticazione Maschile',
    },
    description: {
      fr: 'Une sélection raffinée de vêtements masculins alliant confort, durabilité et style intemporel pour l\'homme moderne.',
      en: 'A refined selection of men\'s clothing combining comfort, durability and timeless style for the modern man.',
      es: 'Una selección refinada de ropa masculina que combina comodidad, durabilidad y estilo atemporal para el hombre moderno.',
      de: 'Eine raffinierte Auswahl an Herrenbekleidung, die Komfort, Langlebigkeit und zeitlosen Stil für den modernen Mann vereint.',
      it: 'Una selezione raffinata di abbigliamento maschile che unisce comfort, durata e stile senza tempo per l\'uomo moderno.',
    },
  },
  accessoires: {
    image: '/luxury-accessories-leather-bag.jpg',
    title: {
      fr: 'Accessoires',
      en: 'Accessories',
      es: 'Accesorios',
      de: 'Accessoires',
      it: 'Accessori',
    },
    subtitle: {
      fr: 'Détails d\'Exception',
      en: 'Exceptional Details',
      es: 'Detalles Excepcionales',
      de: 'Außergewöhnliche Details',
      it: 'Dettagli Eccezionali',
    },
    description: {
      fr: 'Sublimez votre style avec notre collection d\'accessoires de luxe, des pièces uniques qui font toute la différence.',
      en: 'Elevate your style with our luxury accessories collection, unique pieces that make all the difference.',
      es: 'Eleva tu estilo con nuestra colección de accesorios de lujo, piezas únicas que marcan la diferencia.',
      de: 'Veredeln Sie Ihren Stil mit unserer Luxus-Accessoires-Kollektion, einzigartige Stücke, die den Unterschied machen.',
      it: 'Eleva il tuo stile con la nostra collezione di accessori di lusso, pezzi unici che fanno la differenza.',
    },
  },
  fitness: {
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
    title: {
      fr: 'Atelier Fitness',
      en: 'Fitness Atelier',
      es: 'Atelier Fitness',
      de: 'Fitness-Atelier',
      it: 'Atelier Fitness',
    },
    subtitle: {
      fr: 'Performance Sculptée',
      en: 'Sculpted Performance',
      es: 'Performance Esculpida',
      de: 'Skulptierte Performance',
      it: 'Performance Scolpita',
    },
    description: {
      fr: 'Des silhouettes athlétiques et des textiles techniques imaginés comme des tenues couture prêtes pour le training.',
      en: 'Athletic silhouettes and technical textiles imagined like couture pieces ready for training.',
      es: 'Siluetas atléticas y textiles técnicos imaginados como piezas couture listas para entrenar.',
      de: 'Athletische Silhouetten und technische Textilien wie Couture-Pieces für das Training.',
      it: 'Silhouette atletiche e tessuti tecnici immaginati come pezzi couture pronti per l\'allenamento.',
    },
  },
}

export default function CategoryBanner({ category }: CategoryBannerProps) {
  const { language } = useLanguage()
  const data = categoryData[category.toLowerCase() as keyof typeof categoryData]

  if (!data) {
    return null
  }

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden mb-16">
      <Image
        src={data.image || "/placeholder.svg"}
        alt={data.title[language]}
        fill
        priority
        className="object-cover"
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-sm font-light tracking-[0.3em] text-white/90 uppercase mb-4 animate-fade-in">
              {data.subtitle[language]}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-white mb-6 leading-tight animate-fade-in" style={{animationDelay: '0.2s'}}>
              {data.title[language]}
            </h1>
            <div className="w-24 h-px bg-white/50 mb-6 animate-fade-in" style={{animationDelay: '0.3s'}} />
            <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
              {data.description[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

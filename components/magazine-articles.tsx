'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

type Locale = 'fr' | 'en' | 'es' | 'de' | 'it'

const editorialArticles = [
  {
    id: 'atelier',
    badge: {
      fr: 'Atelier',
      en: 'Atelier',
      es: 'Atelier',
      de: 'Atelier',
      it: 'Atelier',
    },
    title: {
      fr: 'Les mannequins bijoux de la Maison',
      en: 'Maison Iconic Muses',
      es: 'Las musas icónicas de la Maison',
      de: 'Ikonische Musen des Hauses',
      it: 'Le muse iconiche della Maison',
    },
    excerpt: {
      fr: 'Coulisses photo, coupes sur-mesure et jeux de lumière holographiques immortalisent notre nouvelle garde-robe couture.',
      en: 'Behind the scenes shots, bespoke tailoring and holographic light create this season’s couture wardrobe.',
      es: 'Tomas backstage, sastrería a medida y luces holográficas dan vida a este guardarropa couture.',
      de: 'Backstage-Aufnahmen, Maßtailoring und holografisches Licht formen die Couture-Garderobe.',
      it: 'Scatti di backstage, sartoria su misura e luci olografiche danno vita al guardaroba couture.',
    },
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1600&q=80',
    href: '/?featured=true',
  },
  {
    id: 'runway',
    badge: {
      fr: 'Runway 3D',
      en: '3D Runway',
      es: 'Pasarela 3D',
      de: '3D Runway',
      it: 'Runway 3D',
    },
    title: {
      fr: 'Défilé digital néon-gravity',
      en: 'Neon Gravity Show',
      es: 'Desfile Neon Gravity',
      de: 'Neon Gravity Show',
      it: 'Sfilata Neon Gravity',
    },
    excerpt: {
      fr: 'Une scène immersive où mannequins et effets volumétriques fusionnent pour dévoiler les textures liquides de la saison.',
      en: 'An immersive scene mixing models and volumetric FX to unveil this season’s liquid textures.',
      es: 'Una escena inmersiva donde modelos y FX volumétricos revelan las texturas líquidas de la temporada.',
      de: 'Immersive Bühne, auf der Models und volumetrische Effekte flüssige Texturen enthüllen.',
      it: 'Una scena immersiva dove modelle ed effetti volumetrici svelano le texture liquide di stagione.',
    },
    image: 'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&w=1600&q=80',
    href: '/?category=femme',
  },
  {
    id: 'wellness',
    badge: {
      fr: 'Fitness Luxury',
      en: 'Luxury Fitness',
      es: 'Fitness de Lujo',
      de: 'Luxury Fitness',
      it: 'Luxury Fitness',
    },
    title: {
      fr: 'Studio wellness à gravité zéro',
      en: 'Zero Gravity Wellness Lab',
      es: 'Estudio Wellness de Gravedad Cero',
      de: 'Zero-Gravity Wellness Studio',
      it: 'Studio Wellness a Gravità Zero',
    },
    excerpt: {
      fr: 'Activewear sculptant, mannequins athlétiques et halos néon pour booster les silhouettes performantes.',
      en: 'Sculpting activewear, athletic muses and neon halos boosting performance silhouettes.',
      es: 'Activewear moldeador, musas atléticas y halos neón que potencian las siluetas performativas.',
      de: 'Formende Activewear, athletische Musen und Neon-Halos für Performance-Silhouetten.',
      it: 'Activewear scolpente, muse atletiche e aloni neon per silhouette performanti.',
    },
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
    href: '/?category=fitness',
  },
]

export default function MagazineArticles() {
  const { language } = useLanguage()
  const locale = language as Locale

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-light tracking-[0.3em] text-accent uppercase mb-3">
              {locale === 'fr' ? 'Journal' : locale === 'en' ? 'Journal' : locale === 'es' ? 'Journal' : locale === 'de' ? 'Journal' : 'Journal'}
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-foreground">
              {locale === 'fr'
                ? 'Articles & éditos avec mannequins iconiques'
                : locale === 'en'
                ? 'Articles & editorials with iconic muses'
                : locale === 'es'
                ? 'Artículos y editoriales con musas icónicas'
                : locale === 'de'
                ? 'Artikel & Editorials mit ikonischen Musen'
                : 'Articoli ed editoriali con muse iconiche'}
            </h2>
          </div>
          <Link
            href="/?featured=true"
            className="self-start inline-flex items-center gap-3 px-8 py-3 border border-foreground rounded-full text-sm tracking-[0.3em] uppercase font-light hover:bg-foreground hover:text-background transition-colors"
          >
            {locale === 'fr' ? 'Voir tous les articles' : locale === 'en' ? 'View all stories' : locale === 'es' ? 'Ver todos los artículos' : locale === 'de' ? 'Alle Artikel' : 'Tutti gli articoli'}
            <span className="text-lg">↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editorialArticles.map((article, index) => (
            <article
              key={article.id}
              className="group border border-border rounded-[28px] overflow-hidden bg-card shadow-[0_25px_80px_rgba(15,13,10,0.12)] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title[locale]}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 px-4 py-1 bg-white/90 text-xs tracking-[0.3em] uppercase text-foreground rounded-full">
                  {article.badge[locale]}
                </div>
              </div>

              <div className="p-8 space-y-4">
                <h3 className="font-serif text-2xl font-light text-foreground leading-tight">
                  {article.title[locale]}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {article.excerpt[locale]}
                </p>
                <Link
                  href={article.href}
                  className="inline-flex items-center gap-3 text-sm tracking-[0.3em] uppercase font-light text-foreground group-hover:gap-5 transition-all"
                >
                  {locale === 'fr'
                    ? 'Lire l\'article'
                    : locale === 'en'
                    ? 'Read article'
                    : locale === 'es'
                    ? 'Leer artículo'
                    : locale === 'de'
                    ? 'Artikel lesen'
                    : 'Leggi l\'articolo'}
                  <span className="text-base">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


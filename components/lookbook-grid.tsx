'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'

const lookbookScenes = [
  {
    id: 'celestial-couture',
    tag: {
      fr: 'Nouvelle capsule',
      en: 'New capsule',
      es: 'Nueva cápsula',
      de: 'Neue Capsule',
      it: 'Nuova capsule',
    },
    title: {
      fr: 'Couture Astrale',
      en: 'Celestial Couture',
      es: 'Alta Costura Celestial',
      de: 'Astrale Couture',
      it: 'Couture Celeste',
    },
    description: {
      fr: 'Textures holographiques et silhouettes ultra fluides inspirées des podiums parisiens.',
      en: 'Holographic textures and ultra-fluid silhouettes inspired by Parisian runways.',
      es: 'Texturas holográficas y siluetas fluidas inspiradas en las pasarelas parisinas.',
      de: 'Holografische Texturen und fließende Silhouetten, inspiriert von Pariser Laufstegen.',
      it: 'Texture olografiche e silhouette fluide ispirate alle passerelle parigine.',
    },
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
    href: '/?category=femme',
  },
  {
    id: 'tailored-motion',
    tag: {
      fr: 'Signature Homme',
      en: 'Men Signature',
      es: 'Firma Hombre',
      de: 'Signature Herren',
      it: 'Firma Uomo',
    },
    title: {
      fr: 'Tailoring Cinétique',
      en: 'Kinetic Tailoring',
      es: 'Sastrería Cinética',
      de: 'Kinetisches Tailoring',
      it: 'Sartoria Cinetica',
    },
    description: {
      fr: 'Vestes sculpturales, matières techniques et jeux de volumes en 3D.',
      en: 'Sculptural blazers, technical fabrics and volumetric 3D work.',
      es: 'Blazers escultóricos, tejidos técnicos y trabajo volumétrico 3D.',
      de: 'Skulpturale Blazer, technische Stoffe und 3D-Volumen.',
      it: 'Blazer scultorei, tessuti tecnici e volumi 3D.',
    },
    image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=1600&q=80',
    href: '/?category=homme',
  },
  {
    id: 'fit-lab',
    tag: {
      fr: 'Sport Couture',
      en: 'Sport Couture',
      es: 'Sport Couture',
      de: 'Sport Couture',
      it: 'Sport Couture',
    },
    title: {
      fr: 'Studio Performance',
      en: 'Performance Studio',
      es: 'Estudio Performance',
      de: 'Performance Studio',
      it: 'Studio Performance',
    },
    description: {
      fr: 'Activewear haute performance, coupes futuristes et reflets néon.',
      en: 'High-performance activewear, futuristic cuts and neon reflections.',
      es: 'Activewear de alto rendimiento, cortes futuristas y reflejos neón.',
      de: 'High-Performance Activewear, futuristische Schnitte und Neonreflexe.',
      it: 'Activewear performante, tagli futuristici e riflessi neon.',
    },
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
    href: '/?category=fitness',
  },
]

export default function LookbookGrid() {
  const { language } = useLanguage()

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-background to-muted/40 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-accent/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-12 w-72 h-72 bg-foreground/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto text-center mb-16 px-4">
        <p className="text-sm tracking-[0.3em] uppercase text-accent font-light">
          {t(language, 'home.discoverCollection')}
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl font-light text-foreground mt-4">
          {language === 'fr'
            ? 'Lookbook immersif'
            : language === 'en'
            ? 'Immersive Lookbook'
            : language === 'es'
            ? 'Lookbook Inmersivo'
            : language === 'de'
            ? 'Immersives Lookbook'
            : 'Lookbook Immersivo'}
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-light">
          {language === 'fr'
            ? 'Une scénographie digitale avec effets 3D, silhouettes de mannequins et ambiances lumineuses pour dévoiler nos capsules.'
            : language === 'en'
            ? 'A digital scenography with 3D effects, supermodel silhouettes and luminous moods to unveil our capsules.'
            : language === 'es'
            ? 'Una escenografía digital con efectos 3D, siluetas de modelos y atmósferas luminosas para revelar nuestras cápsulas.'
            : language === 'de'
            ? 'Digitale Szenografie mit 3D-Effekten, Model-Silhouetten und lichtvollen Atmosphären für unsere Kapseln.'
            : 'Una scenografia digitale con effetti 3D, silhouette di modelle e atmosfere luminose per svelare le capsule.'}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
        {lookbookScenes.map((scene, index) => (
          <Link
            key={scene.id}
            href={scene.href}
            className="group relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_35px_120px_rgba(15,13,10,0.25)]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="relative h-[500px]">
              <Image
                src={scene.image}
                alt={scene.title[language]}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-8 text-left text-white space-y-4 transform transition-transform duration-500 group-hover:-translate-y-2">
              <span className="inline-flex items-center text-xs tracking-[0.3em] uppercase bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                {scene.tag[language]}
              </span>
              <h3 className="font-serif text-3xl font-light">{scene.title[language]}</h3>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                {scene.description[language]}
              </p>
              <span className="inline-flex items-center gap-3 text-sm tracking-[0.2em]">
                {t(language, 'home.shopNow')}
                <span className="w-12 h-px bg-white/60 inline-block group-hover:w-20 transition-all duration-500" />
              </span>
            </div>

            <div className="absolute inset-0 border border-white/20 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  )
}


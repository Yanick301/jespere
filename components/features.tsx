'use client'

import { Shield, Leaf, Clock, Gem } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Gem,
      title: 'Qualité Exceptionnelle',
      description: 'Sorgfältig ausgewählte Premium-Produkte'
    },
    {
      icon: Leaf,
      title: 'Éthique & Durabilité',
      description: 'Matériaux responsables et production durable'
    },
    {
      icon: Clock,
      title: 'Service Premium',
      description: 'Sorgfältiger Versand und persönlicher Support'
    },
    {
      icon: Shield,
      title: 'Vollständige Garantie',
      description: 'Vollständiger Schutz für alle unsere Produkte'
    }
  ]

  return (
    <section className="py-24 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-accent" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

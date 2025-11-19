'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section id="newsletter" className="py-24 bg-foreground text-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-light tracking-widest text-accent uppercase">Bleiben Sie informiert</span>
        <h2 className="font-serif text-5xl sm:text-6xl font-light mt-4 mb-6">
          Neue Kollektionen
        </h2>
        <p className="text-lg font-light mb-8 opacity-90">
          Melden Sie sich an, um exklusive Ankündigungen zu neuen Stücken und Sonderangeboten zu erhalten
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-3 bg-background/20 text-background placeholder:text-background/60 border border-background/30 focus:outline-none focus:border-accent transition-colors"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-background text-foreground hover:bg-accent hover:text-background transition-all flex items-center justify-center gap-2 font-light tracking-wide"
          >
            {submitted ? '✓ Danke' : 'Abonnieren'}
            <ArrowRight size={18} />
          </button>
        </form>

        {submitted && (
          <p className="text-accent text-sm mt-4 font-light">
            Anmeldung bestätigt. Danke für Ihr Interesse!
          </p>
        )}
      </div>
    </section>
  )
}

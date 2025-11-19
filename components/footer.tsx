'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-light mb-4">EZCENTIALS</h3>
            <p className="text-sm opacity-80 font-light leading-relaxed">
              Collection de luxe premium pour ceux qui apprécient l'excellence et la qualité intemporelle.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-widest uppercase mb-4 opacity-90">Collections</h4>
            <ul className="space-y-2">
              {['Homme', 'Femme', 'Fitness Luxe', 'Accessoires'].map(item => (
                <li key={item}>
                  <Link href={`/?category=${encodeURIComponent(item)}`} className="text-sm opacity-70 hover:opacity-100 font-light transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-widest uppercase mb-4 opacity-90">Informations</h4>
            <ul className="space-y-2">
              {['À propos', 'Blog', 'Carrières', 'Durabilité'].map(item => (
                <li key={item}>
                  <Link href="/" className="text-sm opacity-70 hover:opacity-100 font-light transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-widest uppercase mb-4 opacity-90">Support</h4>
            <ul className="space-y-2">
              {['Contact', 'FAQ', 'Livraison', 'Retours'].map(item => (
                <li key={item}>
                  <Link href="/" className="text-sm opacity-70 hover:opacity-100 font-light transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-light tracking-widest uppercase mb-4 opacity-90">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <Mail size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                <a href="mailto:contact@ezcentials.com" className="text-sm opacity-70 hover:opacity-100 font-light transition-opacity">
                  contact@ezcentials.com
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                <a href="tel:+33123456789" className="text-sm opacity-70 hover:opacity-100 font-light transition-opacity">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-0.5 text-accent" />
                <span className="text-sm opacity-70 font-light">
                  Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-75">
          <p className="text-sm font-light">
            © 2025 EZCENTIALS. Tous droits réservés.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Politique de confidentialité', 'Conditions d\'utilisation', 'Paramètres des cookies'].map(item => (
              <Link key={item} href="/" className="text-sm opacity-70 hover:opacity-100 font-light transition-opacity">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

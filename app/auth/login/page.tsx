"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'

export default function LoginPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message || 'Erreur lors de la connexion')
      } else if (data) {
        router.push('/')
      }
    } catch (err) {
      setError('Erreur lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-2">EZCENTIALS</h1>
          <p className="text-muted-foreground tracking-widest text-sm">COLLECTION PREMIUM</p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Connexion</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@exemple.fr"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive rounded text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-luxury-filled disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Divider */}
            <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">OU</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground">
            Pas encore client ?{' '}
            <Link href="/auth/signup" className="text-accent font-semibold hover:underline">
              Inscription
            </Link>
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-8 space-y-2">
          <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
            Retour à l'accueil
          </Link>
          <p className="text-xs text-muted-foreground">
            © 2025 EZCENTIALS. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}

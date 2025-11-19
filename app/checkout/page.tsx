'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import { ChevronRight, Lock, Truck, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'FR',
  })
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.20
  const total = subtotal + shipping + tax

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2')
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4)
    }

    setPaymentData(prev => ({ ...prev, [name]: formattedValue }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.firstName && formData.lastName && formData.email && formData.address && formData.city && formData.zipCode) {
      setCurrentStep('payment')
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      clearCart()
      setCurrentStep('confirmation')
      setIsProcessing(false)
    }, 2000)
  }

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header cartCount={items.length} onCartClick={() => {}} />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="flex flex-col items-center justify-center py-24">
            <AlertCircle className="w-16 h-16 text-muted-foreground mb-6" />
            <h2 className="text-3xl font-serif font-light text-foreground mb-3">Ihr Warenkorb ist leer</h2>
            <p className="text-muted-foreground mb-8 font-light">Fügen Sie Artikel hinzu, bevor Sie zur Kasse gehen</p>
            <Link href="/" className="btn-luxury-filled">
              Zurück zur Kollektion
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header cartCount={0} onCartClick={() => {}} />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-accent" />
            </div>
            <h1 className="font-serif text-5xl font-light text-foreground mb-4 text-center">Bestellung bestätigt!</h1>
            <p className="text-xl text-muted-foreground mb-12 font-light">Danke für Ihr Vertrauen</p>
            <div className="bg-card border border-border rounded-lg p-8 mb-12 w-full max-w-md text-center">
              <p className="text-sm text-muted-foreground mb-3 font-light tracking-widest uppercase">Bestellnummer</p>
              <p className="text-3xl font-serif font-light text-foreground mb-6">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p className="text-sm text-muted-foreground font-light">Eine Bestätigungs-E-Mail wurde an <span className="text-foreground font-medium">{formData.email}</span> gesendet</p>
            </div>
            <div className="text-center mb-8">
              <p className="text-muted-foreground font-light mb-6">Sie erhalten innerhalb von 24 Stunden eine Versand-Benachrichtigung per E-Mail</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/" className="btn-luxury-filled">
                  Zurück zur Startseite
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartCount={items.length} onCartClick={() => {}} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-foreground mb-8">Bestellung abschließen</h1>

          <div className="flex items-center gap-2 sm:gap-4 mb-12 overflow-x-auto pb-2">
              <div className={`flex items-center gap-3 flex-shrink-0 ${currentStep === 'shipping' || currentStep !== 'shipping' ? '' : ''}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-light text-sm ${
                currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'confirmation'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                1
              </div>
              <span className={`text-sm font-light whitespace-nowrap ${currentStep === 'shipping' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Lieferadresse
              </span>
            </div>
            <ChevronRight className="text-muted-foreground flex-shrink-0" size={16} />
            <div className={`flex items-center gap-3 flex-shrink-0`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-light text-sm ${
                currentStep === 'payment' || currentStep === 'confirmation'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                2
              </div>
              <span className={`text-sm font-light whitespace-nowrap ${currentStep === 'payment' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Zahlung
              </span>
            </div>
            <ChevronRight className="text-muted-foreground flex-shrink-0" size={16} />
            <div className={`flex items-center gap-3 flex-shrink-0`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-light text-sm ${
                currentStep === 'confirmation'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                3
              </div>
              <span className={`text-sm font-light whitespace-nowrap ${currentStep === 'confirmation' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Bestätigung
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-6 bg-card border border-border rounded-lg p-8">
                <h2 className="font-serif text-2xl font-light text-foreground mb-8">Lieferadresse</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Vorname</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Max"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Nachname</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Mustermann"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2 tracking-wide">E-Mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="max@example.de"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="+49 30 12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Hauptstraße 123"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Stadt</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Berlin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Postleitzahl</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="10115"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Land</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="FR">Frankreich</option>
                    <option value="BE">Belgien</option>
                    <option value="DE">Deutschland</option>
                    <option value="IT">Italien</option>
                    <option value="ES">Spanien</option>
                    <option value="CH">Schweiz</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-border">
                  <Link href="/" className="flex-1 px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all text-center font-light tracking-wide">
                    Abbrechen
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 btn-luxury-filled"
                  >
                    Weiter zur Zahlung
                  </button>
                </div>
              </form>
            )}

            {currentStep === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6 bg-card border border-border rounded-lg p-8">
                <h2 className="font-serif text-2xl font-light text-foreground mb-8 flex items-center gap-3">
                  <Lock size={24} className="text-accent" />
                  Sichere Zahlungsinformationen
                </h2>

                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex gap-3">
                  <AlertCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-accent font-light">Verwenden Sie die Testnummer: <span className="font-mono font-medium">4242 4242 4242 4242</span></p>
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Karteninhaber</label>
                  <input
                    type="text"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handlePaymentChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent uppercase"
                    placeholder="MAX MUSTERMANN"
                  />
                </div>

                <div>
                    <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Kartennummer</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    required
                    maxLength="23"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-light text-foreground mb-2 tracking-wide">Gültig bis</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentChange}
                      required
                      maxLength="5"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-foreground mb-2 tracking-wide">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      required
                      maxLength="4"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-8 border-t border-border">
                    <button
                    type="button"
                    onClick={() => setCurrentStep('shipping')}
                    className="flex-1 px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all font-light tracking-wide"
                  >
                    Zurück
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 btn-luxury-filled disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Verarbeitung...' : 'Bestellung bestätigen'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="bg-card border border-border rounded-lg p-6 lg:p-8 h-fit sticky top-4">
            <h2 className="font-serif text-xl font-light text-foreground mb-6">Bestellübersicht</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-72 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-light text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-light">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-light text-foreground flex-shrink-0">€{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm text-foreground">
                <span className="font-light">Zwischensumme</span>
                <span className="font-light">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-foreground">
                <span className="font-light flex items-center gap-2">
                  <Truck size={14} />
                  Versand
                </span>
                <span className={`font-light ${shipping === 0 ? 'text-accent' : ''}`}>
                  {shipping === 0 ? 'Kostenlos' : `€${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm text-foreground">
                <span className="font-light">Steuer (20%)</span>
                <span className="font-light">€{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <span className="font-serif text-lg font-light text-foreground">Gesamt</span>
              <span className="font-serif text-2xl font-light text-accent">€{total.toFixed(2)}</span>
            </div>

            {shipping === 0 && (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-center">
                <p className="text-xs text-accent font-light">Kostenloser Versand aktiviert</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

'use client'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-8"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8 inline-block">
          <span className="text-xs font-light tracking-widest text-accent uppercase px-4 py-2 border border-accent/30 rounded-full">Neue Kollektion</span>
        </div>

        <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light text-foreground mb-8 leading-tight text-balance">
          EZCENTIALS
        </h1>

        <p className="font-light text-xl sm:text-2xl text-accent mb-6 tracking-widest">
          Feiner Luxus
        </p>

        <p className="font-light text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
          Entdecken Sie unsere kuratierte Auswahl außergewöhnlicher Stücke für Herren, Damen und Premium-Fitness. Außergewöhnliche Qualität, zeitlose Designs und höchsten Tragekomfort.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#products" className="btn-luxury-filled">
            Kollektion entdecken
          </a>
          <button className="btn-luxury">
            Mehr erfahren
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce text-muted-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

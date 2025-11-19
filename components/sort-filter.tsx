'use client'

import { useState } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { t } from '@/lib/i18n'

export type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name'

interface SortFilterProps {
  onSortChange: (sort: SortOption) => void
  currentSort: SortOption
  productCount: number
}

export default function SortFilter({ onSortChange, currentSort, productCount }: SortFilterProps) {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: 'newest', label: t(language, 'common.newest'), icon: <Sparkles className="w-4 h-4" /> },
    { value: 'oldest', label: t(language, 'common.oldest'), icon: <ArrowUpDown className="w-4 h-4" /> },
    { value: 'price-low', label: t(language, 'common.lowToHigh'), icon: <ArrowUp className="w-4 h-4" /> },
    { value: 'price-high', label: t(language, 'common.highToLow'), icon: <ArrowDown className="w-4 h-4" /> },
    { value: 'name', label: t(language, 'common.name'), icon: <ArrowUpDown className="w-4 h-4" /> },
  ]

  const currentOption = sortOptions.find(opt => opt.value === currentSort)

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="text-sm text-muted-foreground font-light">
        {productCount} {productCount === 1 ? t(language, 'home.products').slice(0, -1) : t(language, 'home.products')}
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent transition-all bg-card hover:bg-accent/5"
        >
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-light text-foreground">
            {t(language, 'common.sort')}: {currentOption?.label}
          </span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-accent/10 transition-colors ${
                  currentSort === option.value ? 'bg-accent/5 text-accent' : 'text-foreground'
                }`}
              >
                <span className="text-muted-foreground">{option.icon}</span>
                <span className="text-sm font-light">{option.label}</span>
                {currentSort === option.value && (
                  <span className="ml-auto text-accent">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

export function ShopFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'candles', label: 'Candles' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'stationery', label: 'Stationery' },
    { id: 'accessories', label: 'Accessories' },
  ]

  const toggleCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories([])
      return
    }
    
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={category.id === 'all' ? selectedCategories.length === 0 : selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="w-4 h-4 border-ink-900/20 text-ink-900 focus:ring-ink-900"
              />
              <span className="text-ink-800 group-hover:text-ink-900 transition-colors">
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}


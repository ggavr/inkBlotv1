'use client'

import { useRegionStore } from '@/lib/store/useRegionStore'
import type { Region, Currency } from '@/lib/types'

export function RegionSelector() {
  const { region, currency, setRegion } = useRegionStore()

  const options: Array<{ region: Region; currency: Currency; label: string }> = [
    { region: 'UK', currency: 'GBP', label: 'UK (£)' },
    { region: 'EU', currency: 'EUR', label: 'EU (€)' },
  ]

  return (
    <select
      value={`${region}-${currency}`}
      onChange={(e) => {
        const [newRegion, newCurrency] = e.target.value.split('-') as [Region, Currency]
        setRegion(newRegion, newCurrency)
      }}
      className="px-3 py-2 text-sm border border-ink-900/20 bg-white text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900"
    >
      {options.map((option) => (
        <option key={`${option.region}-${option.currency}`} value={`${option.region}-${option.currency}`}>
          {option.label}
        </option>
      ))}
    </select>
  )
}


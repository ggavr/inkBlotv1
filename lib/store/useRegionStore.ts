import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Currency, Region } from '@/lib/types'

interface RegionState {
  region: Region
  currency: Currency
  setRegion: (region: Region, currency: Currency) => void
}

export const useRegionStore = create<RegionState>()(
  persist(
    (set) => ({
      region: 'UK',
      currency: 'GBP',
      setRegion: (region, currency) => set({ region, currency }),
    }),
    {
      name: 'inkblot-region-storage',
    }
  )
)


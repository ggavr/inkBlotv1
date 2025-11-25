import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
  cartId: string | null
  isOpen: boolean
  setCartId: (id: string) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartId: null,
      isOpen: false,
      setCartId: (id) => set({ cartId: id }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'inkblot-cart-storage',
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
)


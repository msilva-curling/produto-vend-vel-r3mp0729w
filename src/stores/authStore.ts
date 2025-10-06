import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  user: { id: string; name: string; initials: string } | null
  login: (name: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (name) => {
        const initials = name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
        set({
          isAuthenticated: true,
          user: { id: 'user-1', name, initials },
        })
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

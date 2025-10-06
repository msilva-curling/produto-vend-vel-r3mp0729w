import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Dashboard } from '@/types/dashboard'
import { format } from 'date-fns'

interface DashboardState {
  dashboards: Dashboard[]
  addDashboard: (title: string) => Dashboard
  updateDashboard: (dashboard: Dashboard) => void
  deleteDashboard: (id: string) => void
  getDashboardById: (id: string) => Dashboard | undefined
}

const initialDashboards: Dashboard[] = [
  {
    id: '1',
    title: 'Dashboard de Vendas',
    lastModified: new Date('2025-10-05T10:00:00Z').toISOString(),
    previewUrl: 'https://img.usecurling.com/p/600/400?q=sales%20dashboard',
    layout: [],
    widgets: [],
  },
  {
    id: '2',
    title: 'Relatório de Marketing',
    lastModified: new Date('2025-10-04T14:30:00Z').toISOString(),
    previewUrl: 'https://img.usecurling.com/p/600/400?q=marketing%20report',
    layout: [],
    widgets: [],
  },
  {
    id: '3',
    title: 'Análise Financeira',
    lastModified: new Date('2025-10-03T09:15:00Z').toISOString(),
    previewUrl: 'https://img.usecurling.com/p/600/400?q=financial%20analysis',
    layout: [],
    widgets: [],
  },
]

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      dashboards: initialDashboards,
      addDashboard: (title) => {
        const newDashboard: Dashboard = {
          id: new Date().getTime().toString(),
          title,
          lastModified: new Date().toISOString(),
          previewUrl: `https://img.usecurling.com/p/600/400?q=abstract%20dashboard&seed=${new Date().getTime()}`,
          layout: [],
          widgets: [],
        }
        set((state) => ({ dashboards: [...state.dashboards, newDashboard] }))
        return newDashboard
      },
      updateDashboard: (updatedDashboard) => {
        updatedDashboard.lastModified = new Date().toISOString()
        set((state) => ({
          dashboards: state.dashboards.map((d) =>
            d.id === updatedDashboard.id ? updatedDashboard : d,
          ),
        }))
      },
      deleteDashboard: (id) => {
        set((state) => ({
          dashboards: state.dashboards.filter((d) => d.id !== id),
        }))
      },
      getDashboardById: (id) => {
        return get().dashboards.find((d) => d.id === id)
      },
    }),
    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Dashboard, ShareSetting } from '@/types/dashboard'

interface DashboardState {
  dashboards: Dashboard[]
  addDashboard: (title: string, ownerId: string) => Dashboard
  updateDashboard: (dashboard: Dashboard) => void
  deleteDashboard: (id: string) => void
  getDashboardById: (id: string) => Dashboard | undefined
  updateSharingSettings: (dashboardId: string, sharing: ShareSetting[]) => void
}

const initialDashboards: Dashboard[] = [
  {
    id: '1',
    title: 'Dashboard de Vendas',
    ownerId: 'user-1',
    lastModified: new Date('2025-10-05T10:00:00Z').toISOString(),
    previewUrl: 'https://img.usecurling.com/p/600/400?q=sales%20dashboard',
    layout: [],
    widgets: [],
    sharing: [
      { userId: 'user-2', permission: 'view-only' },
      { userId: 'user-3', permission: 'edit' },
    ],
  },
  {
    id: '2',
    title: 'Relatório de Marketing',
    ownerId: 'user-1',
    lastModified: new Date('2025-10-04T14:30:00Z').toISOString(),
    previewUrl: 'https://img.usecurling.com/p/600/400?q=marketing%20report',
    layout: [],
    widgets: [],
    sharing: [],
  },
  {
    id: '3',
    title: 'Análise Financeira',
    ownerId: 'user-2',
    lastModified: new Date('2025-10-03T09:15:00Z').toISOString(),
    previewUrl: 'https://img.usecurling.com/p/600/400?q=financial%20analysis',
    layout: [],
    widgets: [],
    sharing: [{ userId: 'user-1', permission: 'view-only' }],
  },
]

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      dashboards: initialDashboards,
      addDashboard: (title, ownerId) => {
        const newDashboard: Dashboard = {
          id: new Date().getTime().toString(),
          title,
          ownerId,
          lastModified: new Date().toISOString(),
          previewUrl: `https://img.usecurling.com/p/600/400?q=abstract%20dashboard&seed=${new Date().getTime()}`,
          layout: [],
          widgets: [],
          sharing: [],
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
      updateSharingSettings: (dashboardId, sharing) => {
        set((state) => ({
          dashboards: state.dashboards.map((d) =>
            d.id === dashboardId
              ? { ...d, sharing, lastModified: new Date().toISOString() }
              : d,
          ),
        }))
      },
    }),
    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

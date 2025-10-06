import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { addDays, addMonths, addWeeks } from 'date-fns'
import { ScheduledReport } from '@/types/scheduledReport'

interface ReportState {
  schedules: ScheduledReport[]
  addSchedule: (
    data: Omit<ScheduledReport, 'id' | 'isActive' | 'nextRun' | 'createdAt'>,
  ) => void
  updateSchedule: (data: ScheduledReport) => void
  deleteSchedule: (id: string) => void
  toggleSchedule: (id: string) => void
  getSchedulesForDashboard: (dashboardId: string) => ScheduledReport[]
  getScheduleById: (id: string) => ScheduledReport | undefined
}

const calculateNextRun = (
  frequency: ScheduledReport['frequency'],
  startDate: Date = new Date(),
): string => {
  switch (frequency) {
    case 'daily':
      return addDays(startDate, 1).toISOString()
    case 'weekly':
      return addWeeks(startDate, 1).toISOString()
    case 'monthly':
      return addMonths(startDate, 1).toISOString()
    default:
      return new Date().toISOString()
  }
}

export const useReportStore = create<ReportState>()(
  persist(
    (set, get) => ({
      schedules: [
        {
          id: 'rep-1',
          dashboardId: '1',
          format: 'PDF',
          frequency: 'weekly',
          recipients: ['manager@email.com', 'team@email.com'],
          isActive: true,
          nextRun: calculateNextRun('weekly'),
          createdAt: new Date().toISOString(),
        },
      ],
      addSchedule: (data) => {
        const newSchedule: ScheduledReport = {
          ...data,
          id: `rep-${new Date().getTime()}`,
          isActive: true,
          createdAt: new Date().toISOString(),
          nextRun: calculateNextRun(data.frequency),
        }
        set((state) => ({ schedules: [...state.schedules, newSchedule] }))
      },
      updateSchedule: (updatedSchedule) => {
        set((state) => ({
          schedules: state.schedules.map((s) =>
            s.id === updatedSchedule.id ? updatedSchedule : s,
          ),
        }))
      },
      deleteSchedule: (id) => {
        set((state) => ({
          schedules: state.schedules.filter((s) => s.id !== id),
        }))
      },
      toggleSchedule: (id) => {
        set((state) => ({
          schedules: state.schedules.map((s) =>
            s.id === id ? { ...s, isActive: !s.isActive } : s,
          ),
        }))
      },
      getSchedulesForDashboard: (dashboardId) => {
        return get().schedules.filter((s) => s.dashboardId === dashboardId)
      },
      getScheduleById: (id) => {
        return get().schedules.find((s) => s.id === id)
      },
    }),
    {
      name: 'report-schedule-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

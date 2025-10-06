export type ReportFormat = 'PDF'
export type ReportFrequency = 'daily' | 'weekly' | 'monthly'

export interface ScheduledReport {
  id: string
  dashboardId: string
  format: ReportFormat
  frequency: ReportFrequency
  recipients: string[]
  isActive: boolean
  nextRun: string
  createdAt: string
}

export type DataSourceType = 'REST_API' | 'SQL_DATABASE' | 'CSV_UPLOAD'

export interface DataSource {
  id: string
  name: string
  type: DataSourceType
  connection: {
    url?: string
    apiKey?: string
    username?: string
    password?: string
  }
  status: 'connected' | 'disconnected' | 'error'
  lastChecked: string
}

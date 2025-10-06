export interface Dashboard {
  id: string
  title: string
  lastModified: string
  previewUrl: string
  layout: WidgetLayout[]
  widgets: Widget[]
}

export interface WidgetLayout {
  i: string // widget id
  x: number
  y: number
  w: number
  h: number
}

export type WidgetType =
  | 'BarChart'
  | 'LineChart'
  | 'PieChart'
  | 'AreaChart'
  | 'ScatterChart'
  | 'SimpleTable'
  | 'PivotTable'
  | 'SingleNumberKPI'
  | 'ProgressKPI'
  | 'RichText'
  | 'Title'
  | 'Image'
  | 'Video'

export interface Widget {
  id: string
  type: WidgetType
  title: string
  dataSourceId?: string
  config: Record<string, any>
}

import { Widget, WidgetLayout } from './dashboard'

export interface Template {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  widgets: Omit<Widget, 'id'>[]
  layout: WidgetLayout[]
}

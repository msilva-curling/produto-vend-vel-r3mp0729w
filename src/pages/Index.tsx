import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, X, ArrowDownUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDashboardStore } from '@/stores/dashboardStore'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { EmptyState } from '@/components/dashboard/EmptyState'

export default function Index() {
  const navigate = useNavigate()
  const dashboards = useDashboardStore((state) => state.dashboards)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('recent')

  const filteredDashboards = dashboards
    .filter((d) => d.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'recent') {
        return (
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
        )
      }
      if (sortOrder === 'oldest') {
        return (
          new Date(a.lastModified).getTime() -
          new Date(b.lastModified).getTime()
        )
      }
      if (sortOrder === 'name') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

  return (
    <div className="container mx-auto py-8 px-4 max-w-screen-2xl bg-secondary">
      <div className="relative flex flex-col items-center justify-center text-center py-16 md:py-24 rounded-xl bg-background overflow-hidden mb-10">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_hsl(var(--primary)/0.1)_0,_transparent_50%)] animate-spotlight"
          aria-hidden="true"
        />
        <div className="relative z-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient bg-gradient-to-br from-primary to-purple-500">
              Seus Dashboards
            </span>
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl">
            Visualize, gerencie e dê vida aos seus dados. Tudo em um só lugar.
          </p>
          <Button
            size="lg"
            className="mt-8"
            onClick={() => navigate('/editor/new')}
          >
            <Plus className="mr-2 h-5 w-5" />
            Criar Novo Dashboard
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-background rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome..."
            className="pl-10 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ArrowDownUp className="h-5 w-5 text-muted-foreground" />
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[200px] h-12 text-base">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Mais Recentes</SelectItem>
              <SelectItem value="oldest">Mais Antigos</SelectItem>
              <SelectItem value="name">Por Nome (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredDashboards.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDashboards.map((dashboard, index) => (
            <div
              key={dashboard.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DashboardCard dashboard={dashboard} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, X } from 'lucide-react'
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
    <div className="container mx-auto py-8 px-4 max-w-screen-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Dashboards</h1>
          <p className="text-muted-foreground">
            Visualize e gerencie seus dashboards existentes.
          </p>
        </div>
        <Button size="lg" onClick={() => navigate('/editor/new')}>
          <Plus className="mr-2 h-5 w-5" />
          Criar Novo Dashboard
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Mais Recentes</SelectItem>
            <SelectItem value="oldest">Mais Antigos</SelectItem>
            <SelectItem value="name">Por Nome (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredDashboards.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDashboards.map((dashboard) => (
            <DashboardCard key={dashboard.id} dashboard={dashboard} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

import { useParams, useNavigate } from 'react-router-dom'
import { Save, Eye, LogOut, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useEffect, useState } from 'react'
import { Dashboard } from '@/types/dashboard'
import { toast } from '@/hooks/use-toast'
import { useDataSourceStore } from '@/stores/dataSourceStore'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/authStore'

export default function EditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { getDashboardById, updateDashboard, addDashboard } =
    useDashboardStore()
  const { dataSources } = useDataSourceStore()
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (id && id !== 'new') {
      const foundDashboard = getDashboardById(id)
      if (foundDashboard) {
        setDashboard(foundDashboard)
        setTitle(foundDashboard.title)
      } else {
        navigate('/404')
      }
    } else if (user) {
      const newDashboard: Omit<Dashboard, 'id'> = {
        title: 'Novo Dashboard',
        ownerId: user.id,
        lastModified: '',
        previewUrl: '',
        layout: [],
        widgets: [],
        sharing: [],
      }
      setDashboard({ ...newDashboard, id: 'new' })
      setTitle(newDashboard.title)
    }
  }, [id, getDashboardById, navigate, user])

  const handleSave = () => {
    if (!dashboard || !user) return
    let savedDashboard
    if (dashboard.id === 'new') {
      savedDashboard = addDashboard(title, user.id)
    } else {
      savedDashboard = { ...dashboard, title }
      updateDashboard(savedDashboard)
    }
    toast({ title: 'Dashboard salvo com sucesso!' })
    if (dashboard.id === 'new' && savedDashboard) {
      navigate(`/editor/${savedDashboard.id}`, { replace: true })
    }
  }

  if (!dashboard) {
    return <div>Carregando...</div>
  }

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <header className="flex items-center justify-between p-4 bg-white border-b">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-semibold max-w-md"
        />
        <div className="flex items-center space-x-2">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Salvar
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/viewer/${dashboard.id}`)}
            disabled={dashboard.id === 'new'}
          >
            <Eye className="mr-2 h-4 w-4" /> Pré-visualizar
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white p-4 border-r overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Biblioteca de Widgets</h2>
          <p className="text-sm text-muted-foreground">
            Arraste widgets para o canvas.
          </p>
        </aside>
        <main className="flex-1 p-4 overflow-auto">
          <div className="bg-white h-full rounded-lg border border-dashed">
            <p className="text-center text-muted-foreground p-8">
              Área de Canvas
            </p>
          </div>
        </main>
        <aside className="w-80 bg-white p-4 border-l overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">
            Configurações do Widget
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Selecione um widget para configurar.
            </p>
            <div className="space-y-2">
              <Label>Fonte de Dados</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma fonte" />
                </SelectTrigger>
                <SelectContent>
                  {dataSources.map((ds) => (
                    <SelectItem key={ds.id} value={ds.id}>
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2" />
                        {ds.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

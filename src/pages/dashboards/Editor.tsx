import { useParams, useNavigate } from 'react-router-dom'
import { Save, Eye, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useEffect, useState } from 'react'
import { Dashboard } from '@/types/dashboard'
import { toast } from '@/hooks/use-toast'

export default function EditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getDashboardById, updateDashboard, addDashboard } =
    useDashboardStore()
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
    } else {
      const newDashboard = {
        id: 'new',
        title: 'Novo Dashboard',
        lastModified: '',
        previewUrl: '',
        layout: [],
      }
      setDashboard(newDashboard)
      setTitle(newDashboard.title)
    }
  }, [id, getDashboardById, navigate])

  const handleSave = () => {
    if (!dashboard) return
    let savedDashboard
    if (dashboard.id === 'new') {
      savedDashboard = addDashboard(title)
    } else {
      savedDashboard = { ...dashboard, title }
      updateDashboard(savedDashboard)
    }
    toast({ title: 'Dashboard salvo com sucesso!' })
    if (dashboard.id === 'new') {
      navigate(`/editor/${savedDashboard.id}`, { replace: true })
    }
  }

  if (!dashboard) {
    return <div>Carregando...</div> // Or a skeleton loader
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
          <Button variant="outline">
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
          {/* Widget library content goes here */}
          <p className="text-sm text-muted-foreground">
            Arraste widgets para o canvas.
          </p>
        </aside>
        <main className="flex-1 p-4 overflow-auto">
          <div className="bg-white h-full rounded-lg border border-dashed">
            {/* Canvas content goes here */}
            <p className="text-center text-muted-foreground p-8">
              Área de Canvas
            </p>
          </div>
        </main>
        <aside className="w-80 bg-white p-4 border-l overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">
            Configurações do Widget
          </h2>
          {/* Widget configuration panel content goes here */}
          <p className="text-sm text-muted-foreground">
            Selecione um widget para configurar.
          </p>
        </aside>
      </div>
    </div>
  )
}

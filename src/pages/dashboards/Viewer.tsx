import { useParams, useNavigate } from 'react-router-dom'
import { Pencil, Share2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useEffect, useState } from 'react'
import { Dashboard } from '@/types/dashboard'
import { toast } from '@/hooks/use-toast'

export default function ViewerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const getDashboardById = useDashboardStore((state) => state.getDashboardById)
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)

  useEffect(() => {
    if (id) {
      const foundDashboard = getDashboardById(id)
      if (foundDashboard) {
        setDashboard(foundDashboard)
      } else {
        navigate('/404')
      }
    }
  }, [id, getDashboardById, navigate])

  if (!dashboard) {
    return <div>Carregando...</div> // Or a skeleton loader
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <header className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
        <h1 className="text-xl font-semibold">{dashboard.title}</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/editor/${dashboard.id}`)}
          >
            <Pencil className="mr-2 h-4 w-4" /> Editar
          </Button>
          <Button
            variant="outline"
            onClick={() => toast({ title: 'Link copiado!' })}
          >
            <Share2 className="mr-2 h-4 w-4" /> Compartilhar
          </Button>
          <Button
            variant="outline"
            onClick={() => toast({ title: 'Gerando PDF...' })}
          >
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mock widgets */}
          <div className="bg-white p-4 rounded-lg shadow col-span-2 h-64">
            Widget 1
          </div>
          <div className="bg-white p-4 rounded-lg shadow h-64">Widget 2</div>
          <div className="bg-white p-4 rounded-lg shadow h-64">Widget 3</div>
          <div className="bg-white p-4 rounded-lg shadow col-span-4 h-80">
            Widget 4
          </div>
        </div>
      </main>
    </div>
  )
}

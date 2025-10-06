import { useNavigate } from 'react-router-dom'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useDashboardStore } from '@/stores/dashboardStore'
import { toast } from '@/hooks/use-toast'

const templates = [
  {
    title: 'Dashboard de Vendas',
    description:
      'Monitore suas métricas de vendas, KPIs e desempenho da equipe.',
    imageUrl: 'https://img.usecurling.com/p/600/400?q=sales%20analytics',
  },
  {
    title: 'Dashboard de Marketing',
    description: 'Acompanhe o desempenho de campanhas, tráfego e engajamento.',
    imageUrl: 'https://img.usecurling.com/p/600/400?q=marketing%20kpi',
  },
  {
    title: 'Dashboard Pessoal',
    description: 'Organize suas tarefas, metas e produtividade diária.',
    imageUrl: 'https://img.usecurling.com/p/600/400?q=personal%20productivity',
  },
]

export default function TemplatesPage() {
  const navigate = useNavigate()
  const addDashboard = useDashboardStore((state) => state.addDashboard)

  const handleUseTemplate = (title: string) => {
    const newDashboard = addDashboard(`Cópia de ${title}`)
    toast({
      title: 'Modelo duplicado!',
      description: `O dashboard "${newDashboard.title}" foi criado.`,
    })
    navigate(`/editor/${newDashboard.id}`)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-screen-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Modelos</h1>
        <p className="text-muted-foreground">
          Comece rapidamente com um de nossos modelos pré-definidos.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="p-0">
              <img
                src={template.imageUrl}
                alt={template.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <CardTitle>{template.title}</CardTitle>
              <CardDescription className="mt-2">
                {template.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                className="w-full"
                onClick={() => handleUseTemplate(template.title)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Usar Modelo
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

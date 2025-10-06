import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/hooks/use-toast'
import { dashboardTemplates } from '@/data/templates'
import { Template } from '@/types/template'

export default function TemplatesPage() {
  const navigate = useNavigate()
  const addDashboard = useDashboardStore((state) => state.addDashboard)
  const { user } = useAuthStore()
  const [activeCategory, setActiveCategory] = useState('Todos')

  const categories = [
    'Todos',
    ...Array.from(new Set(dashboardTemplates.map((t) => t.category))),
  ]

  const filteredTemplates =
    activeCategory === 'Todos'
      ? dashboardTemplates
      : dashboardTemplates.filter((t) => t.category === activeCategory)

  const handleUseTemplate = (template: Template) => {
    if (!user) {
      toast({
        title: 'Erro',
        description: 'Você precisa estar logado para usar um modelo.',
        variant: 'destructive',
      })
      return
    }
    const newDashboard = addDashboard('', user.id, template)
    toast({
      title: 'Modelo duplicado!',
      description: `O dashboard "${newDashboard.title}" foi criado.`,
    })
    navigate(`/editor/${newDashboard.id}`)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-screen-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Biblioteca de Modelos
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Comece rapidamente com um de nossos modelos pré-definidos. Cada um é
          totalmente personalizável para atender às suas necessidades.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="flex flex-wrap justify-center items-center gap-2 p-1 bg-muted rounded-lg">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'ghost'}
              onClick={() => setActiveCategory(category)}
              className="rounded-md capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="p-0 relative">
              <img
                src={template.imageUrl}
                alt={template.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge className="absolute top-4 right-4">
                {template.category}
              </Badge>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <CardTitle>{template.title}</CardTitle>
              <CardDescription className="mt-2">
                {template.description}
              </CardDescription>
              <h4 className="font-semibold mt-4 mb-2">Widgets Inclusos:</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {template.widgets.map((widget, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                    <span>{widget.title}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                className="w-full"
                onClick={() => handleUseTemplate(template)}
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

import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const EmptyState = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-background rounded-xl h-full min-h-[400px] animate-fade-in">
      <div className="mb-6">
        <img
          src="https://img.usecurling.com/p/160/160?q=data%20visualization&color=indigo"
          alt="Data visualization illustration"
          className="opacity-75"
        />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Sua tela de dashboards está vazia
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Comece a transformar seus dados em insights visuais. Crie seu primeiro
        dashboard agora mesmo.
      </p>
      <Button
        size="lg"
        onClick={() => navigate('/editor/new')}
        className="animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        <Plus className="mr-2 h-5 w-5" />
        Criar Meu Primeiro Dashboard
      </Button>
    </div>
  )
}

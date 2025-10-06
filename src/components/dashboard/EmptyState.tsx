import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const EmptyState = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-xl h-full min-h-[400px]">
      <div className="mb-4">
        <img
          src="https://img.usecurling.com/p/128/128?q=empty%20box&color=gray"
          alt="Caixa vazia"
          className="opacity-50"
        />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Você ainda não criou nenhum dashboard.
      </h2>
      <p className="text-muted-foreground mb-6">Que tal começar um novo?</p>
      <Button size="lg" onClick={() => navigate('/editor/new')}>
        <Plus className="mr-2 h-5 w-5" />
        Criar Meu Primeiro Dashboard
      </Button>
    </div>
  )
}

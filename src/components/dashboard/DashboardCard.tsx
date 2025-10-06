import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Eye, Pencil, Share2, Trash2, MoreVertical } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Dashboard } from '@/types/dashboard'
import { useDashboardStore } from '@/stores/dashboardStore'
import { toast } from '@/hooks/use-toast'

interface DashboardCardProps {
  dashboard: Dashboard
}

export const DashboardCard = ({ dashboard }: DashboardCardProps) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const deleteDashboard = useDashboardStore((state) => state.deleteDashboard)
  const navigate = useNavigate()

  const handleDelete = () => {
    deleteDashboard(dashboard.id)
    toast({
      title: 'Dashboard excluído',
      description: `O dashboard "${dashboard.title}" foi excluído com sucesso.`,
    })
    setIsDeleteAlertOpen(false)
  }

  return (
    <>
      <Card className="group relative flex flex-col overflow-hidden transition-all duration-200 ease-out hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <Link to={`/viewer/${dashboard.id}`}>
            <img
              src={dashboard.previewUrl}
              alt={`Pré-visualização de ${dashboard.title}`}
              className="w-full h-48 object-cover"
            />
          </Link>
        </CardHeader>
        <CardContent className="p-4 flex-1">
          <CardTitle className="text-lg font-semibold">
            {dashboard.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Última modificação:{' '}
            {format(new Date(dashboard.lastModified), 'dd/MM/yyyy HH:mm', {
              locale: ptBR,
            })}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/viewer/${dashboard.id}`)}
            >
              <Eye className="h-4 w-4 mr-2" /> Visualizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/editor/${dashboard.id}`)}
            >
              <Pencil className="h-4 w-4 mr-2" /> Editar
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  /* Mock share */ toast({ title: 'Link copiado!' })
                }}
              >
                <Share2 className="mr-2 h-4 w-4" /> Compartilhar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteAlertOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              dashboard "{dashboard.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

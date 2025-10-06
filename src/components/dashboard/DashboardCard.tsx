import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Eye, Pencil, Share2, Trash2, MoreVertical } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
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
import { ShareDialog } from './ShareDialog'
import { useAuthStore } from '@/stores/authStore'

interface DashboardCardProps {
  dashboard: Dashboard
}

export const DashboardCard = ({ dashboard }: DashboardCardProps) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const deleteDashboard = useDashboardStore((state) => state.deleteDashboard)
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const isOwner = dashboard.ownerId === user?.id

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
      <Card className="group relative flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 border-transparent hover:border-primary">
        <CardHeader className="p-0 relative">
          <Link to={`/viewer/${dashboard.id}`} className="block">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={dashboard.previewUrl}
                alt={`Pré-visualização de ${dashboard.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </CardHeader>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <CardTitle className="text-lg font-semibold text-white">
            {dashboard.title}
          </CardTitle>
          <p className="text-sm text-primary-foreground/80 mt-1">
            Modificado em:{' '}
            {format(new Date(dashboard.lastModified), 'dd/MM/yyyy', {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="absolute top-2 right-2 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(`/viewer/${dashboard.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar
              </DropdownMenuItem>
              {isOwner && (
                <DropdownMenuItem
                  onClick={() => navigate(`/editor/${dashboard.id}`)}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
              )}
              {isOwner && (
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  onClick={() => setIsShareDialogOpen(true)}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Compartilhar
                </DropdownMenuItem>
              )}
              {isOwner && (
                <DropdownMenuItem
                  onClick={() => setIsDeleteAlertOpen(true)}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Excluir
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {isOwner && (
        <ShareDialog
          dashboard={dashboard}
          isOpen={isShareDialogOpen}
          onOpenChange={setIsShareDialogOpen}
        />
      )}

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

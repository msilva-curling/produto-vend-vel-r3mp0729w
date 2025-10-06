import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Database,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from '@/components/ui/badge'
import { DataSource } from '@/types/dataSource'
import { useDataSourceStore } from '@/stores/dataSourceStore'
import { toast } from '@/hooks/use-toast'
import { AddDataSourceDialog } from './AddDataSourceDialog'
import { cn } from '@/lib/utils'

interface DataSourceCardProps {
  dataSource: DataSource
}

const statusInfo = {
  connected: {
    icon: CheckCircle,
    color: 'bg-green-500',
    text: 'Conectado',
  },
  disconnected: {
    icon: XCircle,
    color: 'bg-gray-500',
    text: 'Desconectado',
  },
  error: {
    icon: AlertTriangle,
    color: 'bg-red-500',
    text: 'Erro',
  },
}

export const DataSourceCard = ({ dataSource }: DataSourceCardProps) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const deleteDataSource = useDataSourceStore((state) => state.deleteDataSource)

  const handleDelete = () => {
    deleteDataSource(dataSource.id)
    toast({
      title: 'Fonte de dados excluída',
      description: `A fonte "${dataSource.name}" foi excluída.`,
    })
    setIsDeleteAlertOpen(false)
  }

  const { icon: StatusIcon, color, text } = statusInfo[dataSource.status]

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                {dataSource.name}
              </CardTitle>
              <CardDescription className="mt-1">
                {dataSource.type}
              </CardDescription>
            </div>
            <Badge
              className={cn(
                'text-white',
                color,
                'hover:bg-opacity-90',
                `hover:${color}`,
              )}
            >
              <StatusIcon className="h-3 w-3 mr-1" />
              {text}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground break-all">
            URL: {dataSource.connection.url || 'N/A'}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Verificado em:{' '}
            {format(new Date(dataSource.lastChecked), 'dd/MM/yyyy HH:mm', {
              locale: ptBR,
            })}
          </p>
          <div className="flex items-center gap-2">
            <AddDataSourceDialog dataSource={dataSource} />
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => setIsDeleteAlertOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a
              fonte de dados "{dataSource.name}".
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

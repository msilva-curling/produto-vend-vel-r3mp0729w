import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarClock, Trash2, FileText, Repeat, Users } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ScheduledReport } from '@/types/scheduledReport'
import { useReportStore } from '@/stores/reportStore'
import { useDashboardStore } from '@/stores/dashboardStore'
import { toast } from '@/hooks/use-toast'
import { ScheduleReportDialog } from '@/components/dashboard/ScheduleReportDialog'

interface ReportScheduleCardProps {
  schedule: ScheduledReport
}

const frequencyMap = {
  daily: 'Diário',
  weekly: 'Semanal',
  monthly: 'Mensal',
}

export const ReportScheduleCard = ({ schedule }: ReportScheduleCardProps) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { deleteSchedule, toggleSchedule } = useReportStore()
  const getDashboardById = useDashboardStore((state) => state.getDashboardById)
  const dashboard = getDashboardById(schedule.dashboardId)

  const handleDelete = () => {
    deleteSchedule(schedule.id)
    toast({ title: 'Agendamento excluído com sucesso.' })
    setIsDeleteAlertOpen(false)
  }

  const handleToggle = (isActive: boolean) => {
    toggleSchedule(schedule.id)
    toast({ title: `Agendamento ${isActive ? 'ativado' : 'pausado'}.` })
  }

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarClock className="h-5 w-5" />
                Relatório de "{dashboard?.title ?? 'Dashboard Excluído'}"
              </CardTitle>
              <CardDescription className="mt-1">
                Criado em:{' '}
                {format(new Date(schedule.createdAt), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label
                htmlFor={`status-switch-${schedule.id}`}
                className="text-sm font-medium"
              >
                {schedule.isActive ? 'Ativo' : 'Pausado'}
              </Label>
              <Switch
                id={`status-switch-${schedule.id}`}
                checked={schedule.isActive}
                onCheckedChange={handleToggle}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>
              Formato: <Badge variant="secondary">{schedule.format}</Badge>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-muted-foreground" />
            <span>
              Frequência:{' '}
              <Badge variant="secondary">
                {frequencyMap[schedule.frequency]}
              </Badge>
            </span>
          </div>
          <div className="flex items-start gap-2 col-span-full">
            <Users className="h-4 w-4 text-muted-foreground mt-1" />
            <div className="flex flex-wrap gap-1">
              <span className="font-medium">Destinatários:</span>
              {schedule.recipients.map((r) => (
                <Badge key={r} variant="outline">
                  {r}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center mt-auto pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Próximo envio:{' '}
            {format(new Date(schedule.nextRun), "dd/MM/yyyy 'às' HH:mm", {
              locale: ptBR,
            })}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditDialogOpen(true)}
            >
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => setIsDeleteAlertOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Excluir
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ScheduleReportDialog
        dashboardId={schedule.dashboardId}
        schedule={schedule}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente
              este agendamento de relatório.
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

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { customZodResolver as zodResolver } from '@/lib/zod-resolver'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useReportStore } from '@/stores/reportStore'
import { toast } from '@/hooks/use-toast'
import { ScheduledReport } from '@/types/scheduledReport'

const reportSchema = z.object({
  format: z.enum(['PDF']),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  recipients: z
    .string()
    .min(1, 'Pelo menos um destinatário é obrigatório.')
    .refine(
      (value) =>
        value
          .split(',')
          .every((email) => z.string().email().safeParse(email.trim()).success),
      'Contém um ou mais emails inválidos.',
    ),
})

interface ScheduleReportDialogProps {
  dashboardId: string
  schedule?: ScheduledReport
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const ScheduleReportDialog = ({
  dashboardId,
  schedule,
  isOpen,
  onOpenChange,
}: ScheduleReportDialogProps) => {
  const { addSchedule, updateSchedule } = useReportStore()
  const isEditing = !!schedule

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      format: schedule?.format ?? 'PDF',
      frequency: schedule?.frequency ?? 'weekly',
      recipients: schedule?.recipients.join(', ') ?? '',
    },
  })

  const onSubmit = (values: z.infer<typeof reportSchema>) => {
    const recipients = values.recipients.split(',').map((email) => email.trim())
    const data = { ...values, recipients, dashboardId }

    if (isEditing) {
      updateSchedule({ ...schedule, ...data })
      toast({ title: 'Agendamento atualizado!' })
    } else {
      addSchedule(data)
      toast({ title: 'Relatório agendado com sucesso!' })
    }
    onOpenChange(false)
    if (!isEditing) form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Agendamento' : 'Agendar Relatório'}
          </DialogTitle>
          <DialogDescription>
            Configure o envio automático de relatórios para este dashboard.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Formato</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Diariamente</SelectItem>
                      <SelectItem value="weekly">Semanalmente</SelectItem>
                      <SelectItem value="monthly">Mensalmente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destinatários</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="exemplo1@email.com, exemplo2@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Separe múltiplos emails por vírgula.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit">
                {isEditing ? 'Salvar Alterações' : 'Agendar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

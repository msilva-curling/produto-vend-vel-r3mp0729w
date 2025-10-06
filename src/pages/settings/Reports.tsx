import { useReportStore } from '@/stores/reportStore'
import { ReportScheduleCard } from '@/components/settings/ReportScheduleCard'
import { CalendarClock } from 'lucide-react'

export default function ReportsPage() {
  const schedules = useReportStore((state) => state.schedules)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Relatórios Agendados
        </h1>
        <p className="text-muted-foreground">
          Gerencie todos os seus relatórios agendados em um só lugar.
        </p>
      </div>
      {schedules.length > 0 ? (
        <div className="space-y-6">
          {schedules.map((schedule) => (
            <ReportScheduleCard key={schedule.id} schedule={schedule} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-xl h-full min-h-[300px]">
          <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Nenhum relatório agendado.
          </h2>
          <p className="text-muted-foreground">
            Vá para um dashboard e agende o envio de relatórios.
          </p>
        </div>
      )}
    </div>
  )
}

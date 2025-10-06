import { useDataSourceStore } from '@/stores/dataSourceStore'
import { DataSourceCard } from '@/components/settings/DataSourceCard'
import { AddDataSourceDialog } from '@/components/settings/AddDataSourceDialog'

export default function DataSourcesPage() {
  const dataSources = useDataSourceStore((state) => state.dataSources)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fontes de Dados</h1>
          <p className="text-muted-foreground">
            Conecte e gerencie suas fontes de dados externas.
          </p>
        </div>
        <AddDataSourceDialog />
      </div>
      {dataSources.length > 0 ? (
        <div className="space-y-6">
          {dataSources.map((ds) => (
            <DataSourceCard key={ds.id} dataSource={ds} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-xl h-full min-h-[300px]">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Nenhuma fonte de dados conectada.
          </h2>
          <p className="text-muted-foreground mb-6">
            Adicione uma para começar a criar dashboards dinâmicos.
          </p>
          <AddDataSourceDialog />
        </div>
      )}
    </div>
  )
}

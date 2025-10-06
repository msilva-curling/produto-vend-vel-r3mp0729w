import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DataSource } from '@/types/dataSource'

interface DataSourceState {
  dataSources: DataSource[]
  addDataSource: (
    dataSource: Omit<DataSource, 'id' | 'status' | 'lastChecked'>,
  ) => DataSource
  updateDataSource: (dataSource: DataSource) => void
  deleteDataSource: (id: string) => void
  getDataSourceById: (id: string) => DataSource | undefined
}

const initialDataSources: DataSource[] = [
  {
    id: 'ds-1',
    name: 'API de Vendas Mock',
    type: 'REST_API',
    connection: {
      url: 'https://api.example.com/sales',
    },
    status: 'connected',
    lastChecked: new Date().toISOString(),
  },
  {
    id: 'ds-2',
    name: 'Banco de Dados de Clientes',
    type: 'SQL_DATABASE',
    connection: {
      url: 'postgresql://user:pass@host:port/db',
    },
    status: 'error',
    lastChecked: new Date().toISOString(),
  },
]

export const useDataSourceStore = create<DataSourceState>()(
  persist(
    (set, get) => ({
      dataSources: initialDataSources,
      addDataSource: (newDataSource) => {
        const dataSource: DataSource = {
          ...newDataSource,
          id: `ds-${new Date().getTime()}`,
          status: 'connected', // Mock status
          lastChecked: new Date().toISOString(),
        }
        set((state) => ({ dataSources: [...state.dataSources, dataSource] }))
        return dataSource
      },
      updateDataSource: (updatedDataSource) => {
        updatedDataSource.lastChecked = new Date().toISOString()
        set((state) => ({
          dataSources: state.dataSources.map((ds) =>
            ds.id === updatedDataSource.id ? updatedDataSource : ds,
          ),
        }))
      },
      deleteDataSource: (id) => {
        set((state) => ({
          dataSources: state.dataSources.filter((ds) => ds.id !== id),
        }))
      },
      getDataSourceById: (id) => {
        return get().dataSources.find((ds) => ds.id === id)
      },
    }),
    {
      name: 'datasource-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

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
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DataSource, DataSourceType } from '@/types/dataSource'
import { useDataSourceStore } from '@/stores/dataSourceStore'
import { toast } from '@/hooks/use-toast'
import { Plus } from 'lucide-react'

const dataSourceSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  type: z.enum(['REST_API', 'SQL_DATABASE', 'CSV_UPLOAD']),
  url: z.string().url('URL inválida.').optional().or(z.literal('')),
})

interface AddDataSourceDialogProps {
  dataSource?: DataSource
  onSuccess?: () => void
}

export const AddDataSourceDialog = ({
  dataSource,
  onSuccess,
}: AddDataSourceDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { addDataSource, updateDataSource } = useDataSourceStore()
  const isEditing = !!dataSource

  const form = useForm<z.infer<typeof dataSourceSchema>>({
    resolver: zodResolver(dataSourceSchema),
    defaultValues: {
      name: dataSource?.name ?? '',
      type: dataSource?.type ?? 'REST_API',
      url: dataSource?.connection.url ?? '',
    },
  })

  const onSubmit = (values: z.infer<typeof dataSourceSchema>) => {
    const data = {
      name: values.name,
      type: values.type as DataSourceType,
      connection: { url: values.url },
    }

    if (isEditing) {
      updateDataSource({ ...dataSource, ...data })
      toast({ title: 'Fonte de dados atualizada!' })
    } else {
      addDataSource(data)
      toast({ title: 'Fonte de dados adicionada!' })
    }
    onSuccess?.()
    setIsOpen(false)
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="outline" size="sm">
            Editar
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Fonte de Dados
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Fonte de Dados' : 'Adicionar Fonte de Dados'}
          </DialogTitle>
          <DialogDescription>
            Conecte uma nova fonte para usar em seus dashboards.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: API de Vendas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="REST_API">API REST</SelectItem>
                      <SelectItem value="SQL_DATABASE" disabled>
                        Banco de Dados SQL (em breve)
                      </SelectItem>
                      <SelectItem value="CSV_UPLOAD" disabled>
                        Upload de CSV (em breve)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {isEditing ? 'Salvar Alterações' : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

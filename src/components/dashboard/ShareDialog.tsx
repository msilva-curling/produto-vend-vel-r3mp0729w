import { useState, useEffect } from 'react'
import { Globe, Link, Trash2, X } from 'lucide-react'
import { Dashboard, PermissionLevel, ShareSetting } from '@/types/dashboard'
import { User } from '@/types/user'
import { useDashboardStore } from '@/stores/dashboardStore'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from '@/hooks/use-toast'
import { Separator } from '../ui/separator'

interface ShareDialogProps {
  dashboard: Dashboard
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const ShareDialog = ({
  dashboard,
  isOpen,
  onOpenChange,
}: ShareDialogProps) => {
  const { user: currentUser } = useAuthStore()
  const { getUserById, findUsers } = useUserStore()
  const { updateSharingSettings } = useDashboardStore()
  const [sharing, setSharing] = useState<ShareSetting[]>(dashboard.sharing)
  const [searchQuery, setSearchQuery] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)

  useEffect(() => {
    setSharing(dashboard.sharing)
  }, [dashboard])

  const owner = getUserById(dashboard.ownerId)
  const sharedWithUsers = sharing
    .map((s) => ({
      user: getUserById(s.userId),
      permission: s.permission,
    }))
    .filter((item): item is { user: User; permission: PermissionLevel } =>
      Boolean(item.user),
    )

  const searchResults = findUsers(searchQuery, [
    dashboard.ownerId,
    ...sharing.map((s) => s.userId),
  ])

  const handleAddUser = (user: User) => {
    setSharing([...sharing, { userId: user.id, permission: 'view-only' }])
    setSearchQuery('')
    setPopoverOpen(false)
  }

  const handleRemoveUser = (userId: string) => {
    setSharing(sharing.filter((s) => s.userId !== userId))
  }

  const handlePermissionChange = (
    userId: string,
    permission: PermissionLevel,
  ) => {
    setSharing(
      sharing.map((s) => (s.userId === userId ? { ...s, permission } : s)),
    )
  }

  const handleSaveChanges = () => {
    updateSharingSettings(dashboard.id, sharing)
    toast({ title: 'Permissões atualizadas com sucesso!' })
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Compartilhar "{dashboard.title}"</DialogTitle>
          <DialogDescription>
            Gerencie quem pode visualizar e editar este dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center gap-4">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={popoverOpen}
                  className="flex-1 justify-start"
                >
                  Adicionar pessoas e times
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Pesquisar por nome ou email..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                    {searchResults.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => handleAddUser(user)}
                        className="flex items-center gap-2"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatarUrl} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              onClick={() =>
                toast({ title: 'Link copiado para a área de transferência!' })
              }
            >
              <Link className="mr-2 h-4 w-4" />
              Copiar Link
            </Button>
          </div>
          <Separator />
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            <h3 className="text-sm font-medium text-foreground">
              Pessoas com acesso
            </h3>
            {owner && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={owner.avatarUrl} />
                    <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{owner.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {owner.email}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  Proprietário
                </span>
              </div>
            )}
            {sharedWithUsers.map(({ user, permission }) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatarUrl} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={permission}
                    onValueChange={(p: PermissionLevel) =>
                      handlePermissionChange(user.id, p)
                    }
                    disabled={user.id === currentUser?.id}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edit">Pode Editar</SelectItem>
                      <SelectItem value="view-only">Pode Visualizar</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveUser(user.id)}
                    disabled={user.id === currentUser?.id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveChanges}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

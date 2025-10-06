import { Link, useLocation } from 'react-router-dom'
import { User, Database, CalendarClock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems = [
  { to: '/settings', label: 'Perfil', icon: User },
  { to: '/settings/data-sources', label: 'Fontes de Dados', icon: Database },
  {
    to: '/settings/reports',
    label: 'Relatórios Agendados',
    icon: CalendarClock,
  },
]

export const SettingsSidebar = () => {
  const location = useLocation()

  return (
    <aside className="w-64 border-r bg-background p-4">
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link to={item.to} key={item.to}>
            <Button
              variant={location.pathname === item.to ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronLeft,
  LayoutDashboard,
  Star,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const navItems = [
  { to: '/', label: 'Meus Dashboards', icon: LayoutDashboard },
  { to: '/templates', label: 'Modelos', icon: Star },
  { to: '/settings', label: 'Configurações', icon: Settings },
  { to: '/help', label: 'Ajuda', icon: HelpCircle },
]

export const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <aside
      className={cn(
        'relative hidden h-screen border-r bg-background transition-width duration-300 ease-in-out md:flex flex-col',
        isCollapsed ? 'w-20' : 'w-64',
      )}
    >
      <div className="flex-1 py-4">
        <nav className="flex flex-col items-center px-4 space-y-2">
          {navItems.map((item) => (
            <TooltipProvider key={item.to} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.to} className="w-full">
                    <Button
                      variant={
                        location.pathname === item.to ? 'secondary' : 'ghost'
                      }
                      className={cn(
                        'w-full flex justify-start items-center',
                        isCollapsed && 'justify-center',
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && (
                        <span className="ml-4">{item.label}</span>
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          className="w-full flex justify-center"
        >
          <ChevronLeft
            className={cn(
              'h-5 w-5 transition-transform',
              isCollapsed && 'rotate-180',
            )}
          />
        </Button>
      </div>
    </aside>
  )
}

import { Outlet } from 'react-router-dom'
import { SettingsSidebar } from '@/components/settings/SettingsSidebar'

export default function SettingsLayout() {
  return (
    <div className="container mx-auto max-w-screen-2xl">
      <div className="flex">
        <SettingsSidebar />
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
